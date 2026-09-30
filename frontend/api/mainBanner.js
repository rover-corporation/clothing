// ~/composables/useFetchMainBanner.ts
export const useFetchMainBannerApi = async () => {
  const config = useRuntimeConfig();
  const baseUrl = config.public.strapi.url;
  
  // $fetch авто-импортируется в Nuxt 3 и корректно работает с SSR
  const res = await $fetch(`${baseUrl}/api/hero?populate=*`);
  return res;
};