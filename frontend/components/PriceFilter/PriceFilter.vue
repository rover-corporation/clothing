<!-- components/Filters/PriceFilter.vue -->
<template>
  <div class="price-filter">
    <h3 class="filter-title">Цена, ₽</h3>
    
    <div class="price-inputs">
      <div class="input-wrapper">
        <span class="input-prefix">от</span>
        <!-- Используем v-model.number, чтобы данные передавались как числа, а не как строки -->
        <input 
          type="number" 
          v-model.number="minPrice" 
          placeholder="0"
          min="0"
        />
      </div>

      <span class="separator">-</span>

      <div class="input-wrapper">
        <span class="input-prefix">до</span>
        <input 
          type="number" 
          v-model.number="maxPrice" 
          placeholder="99999"
          min="0"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

// 1. Принимаем объект с ценами от родителя
const props = defineProps({
  modelValue: {
    type: Object,
    // По умолчанию обе цены не заданы (null)
    default: () => ({ min: null, max: null })
  }
})

// 2. Объявляем событие обновления
const emit = defineEmits(['update:modelValue'])

// 3. Создаем computed для минимальной цены
const minPrice = computed({
  get: () => props.modelValue.min,
  set: (newValue) => {
    // Отправляем родителю новый объект, обновляя только min
    emit('update:modelValue', { ...props.modelValue, min: newValue })
  }
})

// 4. Создаем computed для максимальной цены
const maxPrice = computed({
  get: () => props.modelValue.max,
  set: (newValue) => {
    // Отправляем родителю новый объект, обновляя только max
    emit('update:modelValue', { ...props.modelValue, max: newValue })
  }
})
</script>

<style lang="scss" scoped>

@use './PriceFilter.scss' as *;

</style>