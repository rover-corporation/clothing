export const useCreateOrderApi = async (orderData) => {
  const config = useRuntimeConfig();
  const baseUrl = config.public.strapi.url;
  
  // ВАЖНО: Strapi v4 требует, чтобы данные при POST-запросе 
  // были обернуты в объект { data: { ... } }
  return await $fetch(`${baseUrl}/api/orders`, {
    method: 'POST',
    body: {
      data: orderData
    }
  });
};