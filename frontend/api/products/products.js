// composables/useProductsApi.js (или в вашей папке api)
export const useProductsApi = async () => {
  const config = useRuntimeConfig();
  const baseUrl = config.public.strapi.url;
  
  // Для Collection Type запрос всегда во множественном числе (products)
  return await $fetch(`${baseUrl}/api/products?populate=*&pagination[limit]=100`);
};