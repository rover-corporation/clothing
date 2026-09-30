export const fetchHeaderApi = async () => {
  const config = useRuntimeConfig()
  const baseUrl = config.public.strapi.url
  
  // В Nuxt используем $fetch, а не обычный fetch!
  // $fetch сам превращает ответ в JSON и корректно работает с SSR
  const res = await $fetch(`${baseUrl}/api/headers`)
  return res
}