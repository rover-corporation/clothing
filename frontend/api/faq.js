// ~/composables/useFetchMainBanner.ts
export const useFaqApi = async () => {
  const config = useRuntimeConfig();
  const baseUrl = config.public.strapi.url;
  
  
    const res = await $fetch(`${baseUrl}/api/faq-section?populate=*`)
  return res;
};