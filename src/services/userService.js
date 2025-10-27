import { mockApi } from '../data/mockData';

export const userService = {
  async login(email, password) {
    try {
      const result = await mockApi.login(email, password);
      if (result.success) {
        return result;
      } else {
        throw new Error('Login failed');
      }
    } catch (error) {
      throw new Error(error.message || 'Login failed');
    }
  },

  async register(userData) {
    try {
      const result = await mockApi.register(userData);
      if (result.success) {
        return result;
      } else {
        throw new Error('Registration failed');
      }
    } catch (error) {
      throw new Error(error.message || 'Registration failed');
    }
  },

  async getCurrentUser() {
    try {
      return await mockApi.getCurrentUser();
    } catch (error) {
      throw new Error(error.message || 'Failed to get user data');
    }
  },

  async updateProfile(userData) {
    try {
      return await mockApi.updateProfile(userData);
    } catch (error) {
      throw new Error(error.message || 'Failed to update profile');
    }
  },

  async changePassword(currentPassword, newPassword) {
    try {
      await mockApi.delay(500);
      return { success: true, message: 'Password changed successfully' };
    } catch (error) {
      throw new Error(error.message || 'Failed to change password');
    }
  },

  async getOrderHistory() {
    try {
      return await mockApi.getOrders();
    } catch (error) {
      throw new Error(error.message || 'Failed to get order history');
    }
  },

  async forgotPassword(email) {
    try {
      return await mockApi.forgotPassword(email);
    } catch (error) {
      throw new Error(error.message || 'Failed to send reset email');
    }
  },

  async resetPassword(token, newPassword) {
    try {
      return await mockApi.resetPassword(token, newPassword);
    } catch (error) {
      throw new Error(error.message || 'Failed to reset password');
    }
  }
};
