// ~/composables/useFetchMainBanner.ts
export const useBrandFeatureApi = async () => {
  const config = useRuntimeConfig();
  const baseUrl = config.public.strapi.url;
  
  // $fetch авто-импортируется в Nuxt 3 и корректно работает с SSR
  // Этот синтаксис говорит Strapi: "Раскрой массив features, а внутри него раскрой image"
    const res = await $fetch(`${baseUrl}/api/brand-feature?populate[FeatureCard][populate]=*`)
  return res;
};