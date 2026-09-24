<!-- components/Filters/ColorFilter.vue -->
<template>
  <div class="color-filter">
    <h3 class="filter-title">Цвет</h3>
    
    <div class="colors-list">
      <!-- Перебираем доступные цвета -->
      <button
        v-for="color in availableColors"
        :key="color.value"
        type="button"
        class="color-btn"
        :class="{ 'is-active': selectedColors.includes(color.value) }"
        @click="toggleColor(color.value)"
        :title="color.label"
      >
        <!-- Сам цветной кружок -->
        <span class="color-circle" :style="{ backgroundColor: color.hex }"></span>
        <!-- Название цвета (опционально, можно скрыть) -->
        <span class="color-label">{{ color.label }}</span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

// 1. Принимаем данные от родителя (modelValue - стандартное имя для v-model)
const props = defineProps({
  modelValue: {
    type: Array,
    default: () => []
  },
  // Можно передавать список цветов из родителя, но для начала зададим их здесь по умолчанию
  availableColors: {
    type: Array,
    default: () => [
      { value: 'black', label: 'Черный', hex: '#000000' },
      { value: 'white', label: 'Белый', hex: '#FFFFFF' },
      { value: 'red', label: 'Красный', hex: '#E53935' },
      { value: 'blue', label: 'Синий', hex: '#1E88E5' },
      { value: 'green', label: 'Зеленый', hex: '#43A047' }
    ]
  }
})

// 2. Объявляем событие обновления (стандарт для v-model)
const emit = defineEmits(['update:modelValue'])

// 3. Создаем вычисляемое свойство для удобной работы с массивом выбранных цветов
const selectedColors = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})

// 4. Функция переключения цвета (добавить/удалить из массива)
const toggleColor = (colorValue) => {
  const currentSelected = [...selectedColors.value]
  const index = currentSelected.indexOf(colorValue)

  if (index === -1) {
    // Если цвета нет в массиве — добавляем
    currentSelected.push(colorValue)
  } else {
    // Если есть — удаляем (снимаем галочку)
    currentSelected.splice(index, 1)
  }
  
  // Отправляем обновленный массив родителю
  selectedColors.value = currentSelected
}
</script>

<style lang="scss" scoped>

@use './ColorFilter.scss' as *;

</style>