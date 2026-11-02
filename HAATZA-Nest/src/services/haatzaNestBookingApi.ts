import {
  CreateHaatzaNestBookingPayload,
  CreateHaatzaNestBookingResponse,
  OrderConfirmationPayload,
  OrderConfirmationResponse,
  CreateRazorpayOrderResponse,
  HaatzaNestBookingResult,
} from '../types/haatzaNest.types';

export class HaatzaApiException extends Error {
  statusCode?: number;
  retryable: boolean;

  constructor(message: string, statusCode?: number, retryable = false) {
    super(message);
    this.name = 'HaatzaApiException';
    this.statusCode = statusCode;
    this.retryable = retryable;
  }
}

export function getApiErrorMessage(d: any): string {
  if (d && typeof d === 'object') {
    if (typeof d.message === 'string') return d.message;
    if (d.message && typeof d.message === 'object') {
      if (typeof d.message.message === 'string') return d.message.message;
      if (typeof d.message.error === 'string') return d.message.error;
    }
    if (typeof d.error === 'string') return d.error;
  }
  return 'Something went wrong. Please try again.';
}

const API_BASE = typeof window !== 'undefined' && window.location.hostname === 'localhost'
  ? '/_functions'
  : 'https://haatza.com/_functions';
const REQUEST_TIMEOUT_MS = 30000;

async function postWithTimeout<T>(endpoint: string, body: any): Promise<T> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  let response: Response;
  try {
    response = await fetch(`${API_BASE}/${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(body),
      signal: controller.signal,
    });
  } catch (err: any) {
    if (err.name === 'AbortError') {
      throw new HaatzaApiException('Request timed out', 408, true);
    }
    throw new HaatzaApiException('Network error. Please check your connection.', 0, true);
  } finally {
    clearTimeout(timer);
  }

  let decoded: any = null;
  try {
    decoded = await response.json();
  } catch {
    decoded = null;
  }

  if (response.status === 200 && decoded && decoded.status === 'success') {
    const inner = decoded.message;
    if (inner && inner.status === true) {
      return inner;
    }
    // Wix functions sometimes return the object directly inside message
    if (inner && inner.booking) {
      return inner;
    }
  }

  const msg = getApiErrorMessage(decoded);
  const isRetryable = response.status >= 500 || msg.toLowerCase().includes('in progress');
  throw new HaatzaApiException(msg, response.status, isRetryable);
}

/**
 * 1. Create booking (all 3 scenarios)
 * POST https://haatza.com/_functions/createHaatzaNestBooking
 */
export async function createHaatzaNestBooking(
  payload: CreateHaatzaNestBookingPayload
): Promise<{ status: boolean; message?: string; booking: HaatzaNestBookingResult }> {
  // Clean string fields and format values defensively
  const cleanedPayload: Record<string, any> = {
    customerName: (payload.customerName || '').trim(),
    customerPhone: (payload.customerPhone || '').trim(),
    customerEmail: (payload.customerEmail || '').trim().toLowerCase(),
    bookingType: payload.bookingType || 'scheduled',
    basePrice: Number(payload.basePrice),
    latitude: Number(payload.latitude),
    longitude: Number(payload.longitude),
    address: (payload.address || '').trim(),
    areaName: (payload.areaName || '').trim(),
    duration: Number(payload.duration),
    bookingDate: (payload.bookingDate || '').trim(),
    bookingTime: (payload.bookingTime || '').trim(),
    totalAmount: payload.totalAmount !== undefined ? Number(payload.totalAmount) : Number(payload.basePrice),
    walletUsage: payload.walletUsage !== undefined ? Number(payload.walletUsage) : 0,
    coupon: (payload.coupon || '').trim(),
    passbooking: Boolean(payload.passbooking),
    passId: (payload.passId || '').trim(),
    passbookingId: (payload.passbookingId || '').trim(),
    razorpayOrderId: (payload.razorpayOrderId || '').trim(),
    paymentMethod: payload.paymentMethod || 'Razorpay',
    paymentStatus: payload.paymentStatus || 'Pending',
    paymentId: (payload.paymentId || '').trim(),
  };

  const result = await postWithTimeout<{
    status: boolean;
    message?: string;
    booking: HaatzaNestBookingResult;
  }>('createHaatzaNestBooking', cleanedPayload);

  return result;
}

/**
 * 2. Confirm booking after online Razorpay payment
 * POST https://haatza.com/_functions/orderConfirmation
 */
export async function confirmOrder(params: {
  tableId: string;
  orderId: string;
  paymentId: string;
  signature: string;
}): Promise<{ status: boolean; message?: string; booking: HaatzaNestBookingResult }> {
  const body: OrderConfirmationPayload = {
    _id: params.tableId,
    razorpay_order_id: params.orderId,
    razorpay_payment_id: params.paymentId,
    razorpay_signature: params.signature,
  };

  const result = await postWithTimeout<{
    status: boolean;
    message?: string;
    booking: HaatzaNestBookingResult;
  }>('orderConfirmation', body);

  return result;
}

/**
 * Retry helper for order confirmation:
 * Delays: [2, 4, 8, 16] seconds
 */
export async function confirmWithRetry(params: {
  tableId: string;
  orderId: string;
  paymentId: string;
  signature: string;
}): Promise<{ status: boolean; message?: string; booking: HaatzaNestBookingResult }> {
  const delays = [2, 4, 8, 16]; // seconds
  for (let i = 0; ; i++) {
    try {
      return await confirmOrder(params);
    } catch (err: any) {
      const isRetryable = err instanceof HaatzaApiException ? err.retryable : false;
      if (!isRetryable || i >= delays.length) {
        throw err;
      }
      await new Promise((resolve) => setTimeout(resolve, delays[i] * 1000));
    }
  }
}

/**
 * 3. Create Razorpay order for online payment amount
 * POST https://haatza.com/_functions/createRazorpayOrder
 */
export async function createRazorpayOrder(
  amountInRupees: number,
  options?: { receipt?: string; notes?: Record<string, string> }
): Promise<{
  orderId: string;
  amountPaise: number;
  keyId: string;
}> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  const requestBody: Record<string, any> = {
    amount: Math.round(amountInRupees),
  };
  if (options?.receipt) {
    requestBody.receipt = options.receipt;
  }
  if (options?.notes) {
    requestBody.notes = options.notes;
  }

  let response: Response;
  try {
    response = await fetch(`${API_BASE}/createRazorpayOrder`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(requestBody),
      signal: controller.signal,
    });
  } catch (err: any) {
    if (err.name === 'AbortError') {
      throw new HaatzaApiException('Order creation request timed out', 408, true);
    }
    throw new HaatzaApiException('Network error creating payment order', 0, true);
  } finally {
    clearTimeout(timer);
  }

  let decoded: CreateRazorpayOrderResponse | null = null;
  try {
    decoded = await response.json();
  } catch {
    decoded = null;
  }

  if (response.status === 200 && decoded?.status === 'success' && decoded.message?.order) {
    const order = decoded.message.order;
    const keyId = decoded.message.keyId || 'rzp_live_R8ib0QZopkaicy';
    return {
      orderId: order.id,
      amountPaise: order.amount,
      keyId,
    };
  }

  const errMsg = getApiErrorMessage(decoded);
  throw new HaatzaApiException(errMsg || 'Failed to create payment order', response.status);
}
