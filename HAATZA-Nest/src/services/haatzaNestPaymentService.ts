import { PendingConfirmationStoreItem } from '../types/haatzaNest.types';

const PENDING_CONFIRMATION_KEY = 'haatza_nest_pending_confirmation';

/**
 * Dynamically load Razorpay standard web checkout SDK
 */
export function loadRazorpaySdk(): Promise<boolean> {
  return new Promise((resolve) => {
    if (typeof window === 'undefined') {
      resolve(false);
      return;
    }

    if ((window as any).Razorpay) {
      resolve(true);
      return;
    }

    const existingScript = document.getElementById('razorpay-checkout-script');
    if (existingScript) {
      existingScript.addEventListener('load', () => resolve(true));
      existingScript.addEventListener('error', () => resolve(false));
      return;
    }

    const script = document.createElement('script');
    script.id = 'razorpay-checkout-script';
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

export interface RazorpaySuccessResponse {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}

export interface OpenCheckoutParams {
  keyId: string;
  orderId: string;
  amountPaise: number;
  bookingId: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  onSuccess: (response: RazorpaySuccessResponse) => void;
  onDismiss?: () => void;
  onError?: (error: any) => void;
}

/**
 * Open Razorpay Checkout modal in browser
 */
export async function openRazorpayCheckout(params: OpenCheckoutParams): Promise<void> {
  const loaded = await loadRazorpaySdk();
  if (!loaded || !(window as any).Razorpay) {
    throw new Error('Could not load payment gateway checkout SDK. Please check your internet connection.');
  }

  // Sanitize contact phone: must be exactly 10 digits without country code or spaces
  const cleanPhone = (params.customerPhone || '').replace(/\D/g, '').slice(-10);
  const cleanEmail = (params.customerEmail || '').trim();
  const cleanName = (params.customerName || '').trim();

  // Allow optional client-side environment key override for test-mode development if provided
  const activeKey = (typeof import.meta !== 'undefined' && import.meta.env?.VITE_RAZORPAY_KEY_ID)
    ? String(import.meta.env.VITE_RAZORPAY_KEY_ID).trim()
    : params.keyId;

  const prefillData: Record<string, string> = {
    name: cleanName || 'Customer',
  };
  if (cleanEmail && cleanEmail.includes('@') && !cleanEmail.includes('example.com')) {
    prefillData.email = cleanEmail;
  }
  // Only prefill contact if it is a genuine 10-digit number and NOT the dummy placeholder 9994998746
  if (cleanPhone.length === 10 && cleanPhone !== '9994998746') {
    prefillData.contact = cleanPhone;
  }

  const options: Record<string, any> = {
    key: activeKey,
    order_id: params.orderId,
    amount: Math.round(Number(params.amountPaise)),
    currency: 'INR',
    name: 'HAATZA Nest',
    description: `Nest Booking ${params.bookingId}`,
    image: 'https://static.wixstatic.com/media/73d0ef_0b2f688068434e46a538a629de0a6e17~mv2.png',
    prefill: prefillData,
    handler: (response: RazorpaySuccessResponse) => {
      console.log('[Razorpay Payment Success Response]:', response);
      params.onSuccess(response);
    },
    theme: {
      color: '#7027C9', // HAATZA Nest brand purple
    },
    modal: {
      ondismiss: () => {
        if (params.onDismiss) {
          params.onDismiss();
        }
      },
      escape: true,
      backdropclose: false,
    },
    retry: {
      enabled: true,
      max_count: 3,
    },
  };

  // Listen for iframe communication to capture validation errors or state transitions
  const handleCheckoutMessage = (event: MessageEvent) => {
    try {
      if (typeof event.data === 'string' && event.data.includes('razorpay')) {
        const parsed = JSON.parse(event.data);
        console.debug('[Razorpay Checkout Frame Event]:', parsed);
      }
    } catch {
      // ignore parsing errors
    }
  };
  window.addEventListener('message', handleCheckoutMessage);

  const rzpInstance = new (window as any).Razorpay(options);

  if (params.onError) {
    rzpInstance.on('payment.failed', (resp: any) => {
      console.warn('[Razorpay Checkout Error Details]:', resp?.error || resp);
      params.onError?.(resp?.error || resp);
    });
  }

  rzpInstance.open();
}

/**
 * Save pending booking confirmation to localStorage so it survives page reloads / network recovery
 */
export function savePendingConfirmation(item: PendingConfirmationStoreItem): void {
  try {
    localStorage.setItem(PENDING_CONFIRMATION_KEY, JSON.stringify(item));
  } catch (e) {
    console.error('Failed saving pending confirmation to storage', e);
  }
}

/**
 * Get any saved pending confirmation waiting to be verified with server
 */
export function getPendingConfirmation(): PendingConfirmationStoreItem | null {
  try {
    const raw = localStorage.getItem(PENDING_CONFIRMATION_KEY);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch (e) {
    console.error('Failed reading pending confirmation from storage', e);
  }
  return null;
}

/**
 * Clear pending confirmation once server confirmation completes
 */
export function clearPendingConfirmation(): void {
  try {
    localStorage.removeItem(PENDING_CONFIRMATION_KEY);
  } catch (e) {
    console.error('Failed clearing pending confirmation from storage', e);
  }
}
