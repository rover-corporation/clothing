<!-- components/Filters/SizeFilter.vue -->
<template>
  <div class="size-filter">
    <h3 class="filter-title">Размер</h3>
    
    <div class="sizes-list">
      <!-- Перебираем доступные размеры -->
      <button
        v-for="size in availableSizes"
        :key="size.value"
        type="button"
        class="size-btn"
        :class="{ 'is-active': selectedSizes.includes(size.value) }"
        @click="toggleSize(size.value)"
      >
        {{ size.label }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

// 1. Принимаем данные от родителя через v-model
const props = defineProps({
  modelValue: {
    type: Array,
    default: () => []
  },
  // Стандартная сетка размеров по умолчанию
  availableSizes: {
    type: Array,
    default: () => [
      { value: 'xs', label: 'XS' },
      { value: 's', label: 'S' },
      { value: 'm', label: 'M' },
      { value: 'l', label: 'L' },
      { value: 'xl', label: 'XL' },
      { value: 'xxl', label: 'XXL' }
    ]
  }
})

// 2. Объявляем событие обновления
const emit = defineEmits(['update:modelValue'])

// 3. Вычисляемое свойство для работы с v-model
const selectedSizes = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})

// 4. Функция переключения размера (добавить/удалить из массива)
const toggleSize = (sizeValue) => {
  const currentSelected = [...selectedSizes.value]
  const index = currentSelected.indexOf(sizeValue)

  if (index === -1) {
    // Если размера нет в массиве — добавляем
    currentSelected.push(sizeValue)
  } else {
    // Если есть — удаляем
    currentSelected.splice(index, 1)
  }
  
  // Отправляем обновленный массив родителю
  selectedSizes.value = currentSelected
}
</script>

<style lang="scss" scoped>
    @use './SizeFilter.scss' as *;
</style>