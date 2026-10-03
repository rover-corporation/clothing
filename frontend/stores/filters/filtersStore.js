import { defineStore } from 'pinia';
import { useFiltersApi } from '~/api/filters/getFilters';
import { ref } from 'vue';

export const useFiltersStore = defineStore('filters', () => {
  const categories = ref([])
  const materials = ref([])
  const sizes = ref([])
  const colors = ref([])
  const patterns = ref([])
  
  const isLoading = ref(false)
  const error = ref(null)

  const mapStandardFilter = (items) => {
    if (!items || !Array.isArray(items)) return []

    
    return items.map(item => {
      const attr = item.attributes || item 
      
      
      return {
        value: attr.value || attr.name || item.id.toString(),
        label: attr.label || 'Без названия'
      }
    })
  }

  const mapColorFilter = (items) => {
    if (!items || !Array.isArray(items)) return []
    
    return items.map(item => {
      const attr = item.attributes || item 
      
      return {
        value: attr.value || attr.name || item.id.toString(),
        label: attr.label || 'Без названия',
        hex: attr.hex || attr.colorCode || '#000000' 
      }
    })
  }

  const fetchFilters = async () => {
    if (categories.value.length > 0) return 

    isLoading.value = true
    error.value = null

    try {
      const response = await useFiltersApi()

      console.log(response.categories)

      categories.value = mapStandardFilter(response.categories?.data)
      materials.value  = mapStandardFilter(response.materials?.data)
      sizes.value      = mapStandardFilter(response.sizes?.data)
      patterns.value   = mapStandardFilter(response.patterns?.data)
      
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