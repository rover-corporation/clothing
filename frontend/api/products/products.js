export const useProductsApi = async () => {
  const config = useRuntimeConfig();
  const baseUrl = config.public.strapi.url;

  const query = '?populate=images,categories,colors,sizes,materials,patterns&pagination[limit]=100';

  return await $fetch(`${baseUrl}/api/products${query}`);
};