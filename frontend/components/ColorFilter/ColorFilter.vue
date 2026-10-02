<template>
  <div class="color-filter">
    <h3 class="filter-title">Цвет</h3>
    
    <div class="colors-list">
      <button
        v-for="color in availableColors"
        :key="color.value"
        type="button"
        class="color-btn"
        :class="{ 'is-active': selectedColors.includes(color.value) }"
        @click="toggleColor(color.value)"
        :title="color.label"
      >
        <span class="color-circle" :style="{ backgroundColor: color.hex }"></span>
        <span class="color-label">{{ color.label }}</span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  modelValue: {
    type: Array,
    default: () => []
  },
  
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

const emit = defineEmits(['update:modelValue'])

const selectedColors = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})

const toggleColor = (colorValue) => {
  const currentSelected = [...selectedColors.value]
  const index = currentSelected.indexOf(colorValue)

  if (index === -1) {
    currentSelected.push(colorValue)
  } else {
    currentSelected.splice(index, 1)
  }
  
  selectedColors.value = currentSelected
}
</script>

<style lang="scss" scoped>

@use './ColorFilter.scss' as *;

</style>