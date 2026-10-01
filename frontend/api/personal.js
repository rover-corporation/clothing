export const usePersonalApi = async () => {
  const config = useRuntimeConfig();
  const baseUrl = config.public.strapi.url;
  
  // Запрашиваем Single Type и просим раскрыть вложенный компонент sections
  return await $fetch(`${baseUrl}/api/personal`, {
    query: {
      populate: 'sections'
    }
  });
};