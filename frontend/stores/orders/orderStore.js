import { defineStore } from 'pinia'
import { useCreateOrderApi } from '~/api/orders/createOrder';

// Если ты используешь автоимпорт Nuxt, useCreateOrderApi подтянется сам.
// Иначе нужно импортировать вручную.

export const useOrdersStore = defineStore('orders', {
  state: () => ({
    isSubmitting: false, // Флаг для лоадера
    error: null,         // Для вывода ошибок сервера
  }),
  
  actions: {
    async submitOrder(orderData) {
      this.isSubmitting = true;
      this.error = null;
      
      try {
        // Вызываем наш API метод
        const response = await useCreateOrderApi(orderData);
        
        // Strapi вернет объект { data: { id, attributes: {...} }, meta }
        return response.data; 
        
      } catch (err) {
        console.error('Ошибка при отправке заказа в Strapi:', err);
        this.error = err.data?.error?.message || 'Произошла ошибка при оформлении заказа';
        throw err; // Прокидываем ошибку дальше в компонент
      } finally {
        this.isSubmitting = false;
      }
    }
  }
})