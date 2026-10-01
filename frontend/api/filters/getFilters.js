// composables/useFiltersApi.js
export const useFiltersApi = async () => {
  const config = useRuntimeConfig();
  const baseUrl = config.public.strapi.url;

  // Если у вас может быть больше 25 категорий или цветов, 
  // лучше сразу добавить лимит для пагинации, как и в товарах
  const query = '?pagination[limit]=100';

  // Promise.all запускает все 5 запросов параллельно
  const [categories, materials, sizes, colors, patterns] = await Promise.all([
    $fetch(`${baseUrl}/api/categories${query}`),
    $fetch(`${baseUrl}/api/materials${query}`),
    $fetch(`${baseUrl}/api/sizes${query}`),
    $fetch(`${baseUrl}/api/colors${query}`),
    $fetch(`${baseUrl}/api/patterns${query}`)
  ]);

  return {
    categories,
    materials,
    sizes,
    colors,
    patterns
  };
};