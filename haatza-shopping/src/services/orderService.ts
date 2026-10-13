import { Order, ReturnRequest } from '../types';
import { generateOrderNumber } from '../utils/formatters';
import { mockInitialOrders, mockReturnRequests } from './mock/data/mockOrders';

const ORDERS_STORAGE_KEY = 'haatza_mock_orders';
const RETURNS_STORAGE_KEY = 'haatza_mock_returns';

function getStoredOrders(): Order[] {
  try {
    const raw = localStorage.getItem(ORDERS_STORAGE_KEY);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch (e) {
    console.error('Failed reading orders from storage', e);
  }
  return mockInitialOrders;
}

function saveOrders(orders: Order[]): void {
  try {
    localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders));
  } catch (e) {
    console.error('Failed saving orders to storage', e);
  }
}

function getStoredReturns(): ReturnRequest[] {
  try {
    const raw = localStorage.getItem(RETURNS_STORAGE_KEY);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch (e) {
    console.error('Failed reading returns from storage', e);
  }
  return mockReturnRequests;
}

function saveReturns(returns: ReturnRequest[]): void {
  try {
    localStorage.setItem(RETURNS_STORAGE_KEY, JSON.stringify(returns));
  } catch (e) {
    console.error('Failed saving returns to storage', e);
  }
}

export const orderService = {
  async getOrders(): Promise<Order[]> {
    return getStoredOrders();
  },

  async getOrderById(idOrNumber: string): Promise<Order | null> {
    const orders = getStoredOrders();
    const found = orders.find(
      (o) => o.id === idOrNumber || o.orderNumber.toLowerCase() === idOrNumber.toLowerCase()
    );
    return found ? { ...found } : null;
  },

  async placeOrder(orderPayload: Omit<Order, 'id' | 'orderNumber' | 'date' | 'status' | 'trackingSteps' | 'estimatedDelivery'>): Promise<Order> {
    const orderNumber = generateOrderNumber();
    const now = new Date();
    
    // Estimate delivery in 3 days
    const estDate = new Date();
    estDate.setDate(estDate.getDate() + 3);
    const estDeliveryStr = estDate.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });

    const newOrder: Order = {
      ...orderPayload,
      id: `ord-${Date.now()}`,
      orderNumber,
      date: now.toISOString(),
      status: 'confirmed',
      estimatedDelivery: estDeliveryStr,
      trackingSteps: [
        {
          title: 'Order Confirmed',
          date: now.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' }) + ', Just now',
          description: `Order successfully placed and verified. Payment method: ${orderPayload.paymentMethod.toUpperCase()}`,
          completed: true,
          current: true,
        },
        {
          title: 'Packed & Invoiced',
          date: 'Expected tomorrow',
          description: 'Package will be securely packed at the nearest fulfillment facility.',
          completed: false,
        },
        {
          title: 'In Transit',
          date: 'Expected in 2 days',
          description: 'Handover to courier partner with tracking details.',
          completed: false,
        },
        {
          title: 'Delivered',
          date: estDeliveryStr,
          description: 'Scheduled delivery to your doorstep.',
          completed: false,
        },
      ],
    };

    const existing = getStoredOrders();
    const updated = [newOrder, ...existing];
    saveOrders(updated);
    return newOrder;
  },

  async getReturns(): Promise<ReturnRequest[]> {
    return getStoredReturns();
  },

  async createReturnRequest(payload: {
    orderId: string;
    orderNumber: string;
    productId: string;
    productName: string;
    productImage: string;
    reason: string;
    comment?: string;
    refundAmount: number;
    resolutionType: 'refund' | 'replacement';
  }): Promise<ReturnRequest> {
    const newReturn: ReturnRequest = {
      ...payload,
      id: `ret-${Date.now()}`,
      status: 'requested',
      requestedAt: new Date().toISOString(),
    };

    const existing = getStoredReturns();
    const updated = [newReturn, ...existing];
    saveReturns(updated);
    return newReturn;
  },
};
