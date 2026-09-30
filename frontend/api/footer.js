// ~/composables/useFetchMainBanner.ts
export const useFooterApi = async () => {
  const config = useRuntimeConfig();
  const baseUrl = config.public.strapi.url;
  
  
    const res = await $fetch(`${baseUrl}/api/footer?populate=*`)
  return res;
};