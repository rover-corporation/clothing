// ~/composables/useFetchMainBanner.ts
export const useCreationProcessApi = async () => {
  const config = useRuntimeConfig();
  const baseUrl = config.public.strapi.url;
  
  
    const res = await $fetch(`${baseUrl}/api/creation-process?populate=*`)
  return res;
};