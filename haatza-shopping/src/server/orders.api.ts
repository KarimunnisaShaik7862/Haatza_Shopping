import { Order } from '../types';
import { orderService } from '../services/orderService';

/**
 * Orders API Module
 */
export const ordersApi = {
  async getOrders(): Promise<Order[]> {
    return orderService.getOrders();
  },

  async getOrderById(orderId: string): Promise<Order | null> {
    return orderService.getOrderById(orderId);
  },
};

export default ordersApi;
