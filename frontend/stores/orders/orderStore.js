import { defineStore } from 'pinia'
import { useCreateOrderApi } from '~/api/orders/createOrder';


export const useOrdersStore = defineStore('orders', {
  state: () => ({
    isSubmitting: false,
    error: null,
  }),
  
  actions: {
    async submitOrder(orderData) {
      this.isSubmitting = true;
      this.error = null;
      
      try {
        const response = await useCreateOrderApi(orderData);
        
        return response.data; 
        
      } catch (err) {
        console.error('Ошибка при отправке заказа в Strapi:', err);
        this.error = err.data?.error?.message || 'Произошла ошибка при оформлении заказа';
        throw err;
      } finally {
        this.isSubmitting = false;
      }
    }
  }
})