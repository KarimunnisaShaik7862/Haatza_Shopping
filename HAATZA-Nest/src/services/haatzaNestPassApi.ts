import {
  CreateNestPassPayload,
  CreateNestPassResponse,
  ConfirmNestPassPayload,
  ConfirmNestPassResponse,
  PendingPassConfirmationStoreItem,
} from '../types/haatzaNest.types';
import { HaatzaApiException, getApiErrorMessage } from './haatzaNestBookingApi';

const PENDING_PASS_KEY = 'haatza_nest_pending_pass_confirmation';
const REQUEST_TIMEOUT_MS = 30000;

const API_BASE = typeof window !== 'undefined' && window.location.hostname === 'localhost'
  ? '/_functions'
  : 'https://haatza.com/_functions';

/**
 * 1. Create Nest Pass booking API
 * Primary endpoint on live backend: POST createHaatzaNestPassBooking
 * Specification fallback: POST createHaatzaNestPass
 */
export async function createNestPassBooking(
  payload: CreateNestPassPayload
): Promise<CreateNestPassResponse> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  // Exact request fields documented in PDF Section 2.1
  const body = {
    userId: (payload.userId || '').trim(),
    packId: (payload.packId || '').trim(),
    baseprice: Number(payload.baseprice),
    paidAmount: Number(payload.paidAmount || 0),
    walletuseage: Number(payload.walletuseage || 0), // exact spelling from PDF
  };

  try {
    // Attempt primary live endpoint
    let response = await fetch(`${API_BASE}/createHaatzaNestPassBooking`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(body),
      signal: controller.signal,
    });

    // Fallback to createHaatzaNestPass if 404
    if (response.status === 404) {
      response = await fetch(`${API_BASE}/createHaatzaNestPass`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(body),
        signal: controller.signal,
      });
    }

    let decoded: any = null;
    try {
      decoded = await response.json();
    } catch {
      decoded = null;
    }

    if (response.status === 200 && decoded && decoded.success === true) {
      return decoded as CreateNestPassResponse;
    }

    const msg = getApiErrorMessage(decoded);
    throw new HaatzaApiException(
      msg,
      response.status,
      response.status >= 500 || msg.toLowerCase().includes('in progress')
    );
  } catch (err: any) {
    if (err instanceof HaatzaApiException) throw err;
    if (err.name === 'AbortError') {
      throw new HaatzaApiException('Pass creation request timed out', 408, true);
    }
    throw new HaatzaApiException('Network error creating Nest Pass. Please check your connection.', 0, true);
  } finally {
    clearTimeout(timer);
  }
}

/**
 * 2. Confirm Nest Pass payment API
 * POST confirmNestPassBooking
 */
export async function confirmNestPassBooking(
  payload: ConfirmNestPassPayload
): Promise<ConfirmNestPassResponse> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  const body = {
    _id: payload._id,
    razorpay_order_id: payload.razorpay_order_id,
    razorpay_payment_id: payload.razorpay_payment_id,
    razorpay_signature: payload.razorpay_signature,
  };

  try {
    const response = await fetch(`${API_BASE}/confirmNestPassBooking`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(body),
      signal: controller.signal,
    });

    let decoded: any = null;
    try {
      decoded = await response.json();
    } catch {
      decoded = null;
    }

    if (response.status === 200 && decoded && decoded.success === true) {
      return decoded as ConfirmNestPassResponse;
    }

    // Per PDF Section 3.2: If already confirmed, it is safe to treat as success
    if (decoded?.message?.toLowerCase().includes('already confirmed')) {
      return {
        success: true,
        message: 'Already confirmed',
        data: decoded.data,
      };
    }

    const msg = getApiErrorMessage(decoded);
    throw new HaatzaApiException(
      msg,
      response.status,
      response.status >= 500 || msg.toLowerCase().includes('in progress')
    );
  } catch (err: any) {
    if (err instanceof HaatzaApiException) throw err;
    if (err.name === 'AbortError') {
      throw new HaatzaApiException('Pass confirmation request timed out', 408, true);
    }
    throw new HaatzaApiException('Network error confirming Nest Pass. Please check your connection.', 0, true);
  } finally {
    clearTimeout(timer);
  }
}

/**
 * 3. Safe retry confirmation wrapper (Delays: [2, 4, 8, 16] seconds)
 */
export async function confirmNestPassWithRetry(
  payload: ConfirmNestPassPayload
): Promise<ConfirmNestPassResponse> {
  const delays = [2, 4, 8, 16]; // seconds
  for (let i = 0; ; i++) {
    try {
      return await confirmNestPassBooking(payload);
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
 * Storage helpers for pending pass confirmations across app/page reload
 */
export function savePendingPassConfirmation(item: PendingPassConfirmationStoreItem): void {
  try {
    localStorage.setItem(PENDING_PASS_KEY, JSON.stringify(item));
  } catch (e) {
    console.error('Failed saving pending pass confirmation to storage', e);
  }
}

export function getPendingPassConfirmation(): PendingPassConfirmationStoreItem | null {
  try {
    const raw = localStorage.getItem(PENDING_PASS_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error('Failed reading pending pass confirmation from storage', e);
  }
  return null;
}

export function clearPendingPassConfirmation(): void {
  try {
    localStorage.removeItem(PENDING_PASS_KEY);
  } catch (e) {
    console.error('Failed clearing pending pass confirmation from storage', e);
  }
}
