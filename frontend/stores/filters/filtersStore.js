// stores/filters.js
import { defineStore } from 'pinia';
import { useFiltersApi } from '~/api/filters/getFilters';
import { ref } from 'vue';

export const useFiltersStore = defineStore('filters', () => {
  // === СОСТОЯНИЯ (Уже в нужном формате для компонентов) ===
  const categories = ref([])
  const materials = ref([])
  const sizes = ref([])
  const colors = ref([])
  const patterns = ref([])
  
  const isLoading = ref(false)
  const error = ref(null)

  // === ФУНКЦИИ МАППИНГА ===
  
  // 1. Стандартный маппинг (для категорий, материалов, размеров, узоров)
  const mapStandardFilter = (items) => {
    if (!items || !Array.isArray(items)) return []

    
    return items.map(item => {
      // Поддержка Strapi v4 (данные в attributes) и v5 (плоская структура)
      const attr = item.attributes || item 
      
      
      return {
        value: attr.value || attr.name || item.id.toString(),
        label: attr.label || 'Без названия'
      }
    })
  }

  // 2. Специальный маппинг для цветов (добавляем hex)
  const mapColorFilter = (items) => {
    if (!items || !Array.isArray(items)) return []
    
    return items.map(item => {
      const attr = item.attributes || item 
      
      return {
        value: attr.value || attr.name || item.id.toString(),
        label: attr.label || 'Без названия',
        // Убедитесь, что поле с кодом цвета в Strapi называется 'hex' (или поменяйте тут)
        hex: attr.hex || attr.colorCode || '#000000' 
      }
    })
  }

  // === ЭКШЕН ЗАГРУЗКИ ===
  const fetchFilters = async () => {
    // Не делаем запрос, если данные уже загружены
    if (categories.value.length > 0) return 

    isLoading.value = true
    error.value = null

    try {
      const response = await useFiltersApi()

      console.log(response.categories)

      // Маппим данные сразу при сохранении в State
      categories.value = mapStandardFilter(response.categories?.data)
      materials.value  = mapStandardFilter(response.materials?.data)
      sizes.value      = mapStandardFilter(response.sizes?.data)
      patterns.value   = mapStandardFilter(response.patterns?.data)
      
      // Цвета маппим через отдельную функцию
      colors.value     = mapColorFilter(response.colors?.data)

    } catch (err) {
      console.error('Ошибка при загрузке фильтров:', err)
      error.value = err
    } finally {
      isLoading.value = false
    }
  }

  return {
    categories,
    materials,
    sizes,
    colors,
    patterns,
    isLoading,
    error,
    fetchFilters
  }
})