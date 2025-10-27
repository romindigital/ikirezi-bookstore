import { mockApi } from '../data/mockData';

export const orderService = {
  async createOrder(orderData) {
    try {
      return await mockApi.createOrder(orderData);
    } catch (error) {
      throw new Error(error.message || 'Failed to create order');
    }
  },

  async getOrderById(id) {
    try {
      await mockApi.delay(300);
      const orders = await mockApi.getOrders();
      const order = orders.find(o => o.id === id);
      if (!order) throw new Error('Order not found');
      return order;
    } catch (error) {
      throw new Error(error.message || 'Failed to fetch order details');
    }
  },

  async getUserOrders() {
    try {
      return await mockApi.getOrders();
    } catch (error) {
      throw new Error(error.message || 'Failed to fetch orders');
    }
  },

  async updateOrderStatus(id, status) {
    try {
      await mockApi.delay(500);
      return { success: true, message: 'Order status updated successfully' };
    } catch (error) {
      throw new Error(error.message || 'Failed to update order status');
    }
  },

  async cancelOrder(id) {
    try {
      await mockApi.delay(400);
      return { success: true, message: 'Order cancelled successfully' };
    } catch (error) {
      throw new Error(error.message || 'Failed to cancel order');
    }
  },

  async processPayment(orderId, paymentData) {
    try {
      await mockApi.delay(1000);
      return { success: true, message: 'Payment processed successfully' };
    } catch (error) {
      throw new Error(error.message || 'Payment processing failed');
    }
  },

  // Admin functions
  async getAllOrders(filters = {}) {
    try {
      return await mockApi.getOrders();
    } catch (error) {
      throw new Error(error.message || 'Failed to fetch all orders');
    }
  },

  async getOrderStatistics() {
    try {
      await mockApi.delay(300);
      return {
        totalOrders: 150,
        totalRevenue: 12500.50,
        averageOrderValue: 83.34,
        ordersThisMonth: 25,
        revenueThisMonth: 2100.75
      };
    } catch (error) {
      throw new Error(error.message || 'Failed to fetch order statistics');
    }
  }
};
