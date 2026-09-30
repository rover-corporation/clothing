// composables/useSingleProductApi.js
export const useSingleProductApi = async (id) => {
  const config = useRuntimeConfig();
  const baseUrl = config.public.strapi.url;
  
  // Добавляем ID в URL и оставляем populate=*, чтобы подтянулась картинка
  return await $fetch(`${baseUrl}/api/products/${id}?populate=*`);
};