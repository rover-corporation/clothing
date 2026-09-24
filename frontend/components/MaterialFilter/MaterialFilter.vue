<!-- components/Filters/MaterialFilter.vue -->
<template>
  <div class="material-filter">
    <h3 class="filter-title">Материал</h3>
    
    <div class="materials-list">
      <!-- Перебираем доступные материалы -->
      <button
        v-for="material in availableMaterials"
        :key="material.value"
        type="button"
        class="material-btn"
        :class="{ 'is-active': selectedMaterials.includes(material.value) }"
        @click="toggleMaterial(material.value)"
      >
        {{ material.label }}
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
  // Список материалов по умолчанию
  availableMaterials: {
    type: Array,
    default: () => [
      { value: 'cotton', label: 'Хлопок' },
      { value: 'linen', label: 'Лён' },
      { value: 'wool', label: 'Шерсть' },
      { value: 'polyester', label: 'Полиэстер' },
      { value: 'denim', label: 'Деним' },
      { value: 'leather', label: 'Кожа' }
    ]
  }
})

// 2. Объявляем событие обновления
const emit = defineEmits(['update:modelValue'])

// 3. Вычисляемое свойство для работы с v-model
const selectedMaterials = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})

// 4. Функция переключения материала
const toggleMaterial = (materialValue) => {
  const currentSelected = [...selectedMaterials.value]
  const index = currentSelected.indexOf(materialValue)

  if (index === -1) {
    // Если материала нет в массиве — добавляем
    currentSelected.push(materialValue)
  } else {
    // Если есть — удаляем
    currentSelected.splice(index, 1)
  }
  
  // Отправляем обновленный массив родителю
  selectedMaterials.value = currentSelected
}
</script>

<style lang="scss" scoped>
 @use './MaterialFilter.scss' as *;
</style>