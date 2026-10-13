import { Product, ProductVariant } from './product.types';
import { Address } from './user.types';

export interface OrderItem {
  product: Product;
  selectedVariant?: ProductVariant;
  quantity: number;
  price: number;
}

export interface OrderTrackingStep {
  title: string;
  date: string;
  description: string;
  completed: boolean;
  current?: boolean;
}

export interface Order {
  id: string;
  orderNumber: string;
  date: string;
  items: OrderItem[];
  subtotal: number;
  discount: number;
  deliveryCharge: number;
  total: number;
  paymentMethod: 'upi' | 'card' | 'netbanking' | 'cod';
  paymentStatus: 'paid' | 'pending';
  shippingAddress: Address;
  status: 'placed' | 'confirmed' | 'processing' | 'shipped' | 'out_for_delivery' | 'delivered' | 'cancelled' | 'returned';
  trackingSteps: OrderTrackingStep[];
  estimatedDelivery: string;
}

export interface ReturnRequest {
  id: string;
  orderId: string;
  orderNumber: string;
  productId: string;
  productName: string;
  productImage: string;
  reason: string;
  comment?: string;
  status: 'requested' | 'approved' | 'picked_up' | 'refunded';
  requestedAt: string;
  refundAmount: number;
  resolutionType: 'refund' | 'replacement';
}
