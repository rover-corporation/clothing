// ~/composables/useFetchMainBanner.ts
export const useCollectionShowApi = async () => {
  const config = useRuntimeConfig();
  const baseUrl = config.public.strapi.url;
  
  // $fetch авто-импортируется в Nuxt 3 и корректно работает с SSR
  // Этот синтаксис говорит Strapi: "Раскрой массив features, а внутри него раскрой image"
    const res = await $fetch(`${baseUrl}/api/showcase?populate[items][populate]=*`)
  return res;
};