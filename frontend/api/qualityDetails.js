// ~/composables/useFetchMainBanner.ts
export const useQualityDetailsApi = async () => {
  const config = useRuntimeConfig();
  const baseUrl = config.public.strapi.url;
  
  
    const res = await $fetch(`${baseUrl}/api/quality-detail?populate=*`)
  return res;
};