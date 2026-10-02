<template>
  <div class="price-filter">
    <h3 class="filter-title">Цена, ₽</h3>
    
    <div class="range-slider">
      <div class="slider-track">
        <div 
          class="slider-range" 
          :style="{ left: minPercent + '%', right: 100 - maxPercent + '%' }"
        ></div>
      </div>
      
      <input 
        type="range" 
        :min="MIN_LIMIT" 
        :max="MAX_LIMIT" 
        :value="sliderMin" 
        @input="updateMin"
        class="range-thumb min"
      />
      
      <input 
        type="range" 
        :min="MIN_LIMIT" 
        :max="MAX_LIMIT" 
        :value="sliderMax" 
        @input="updateMax"
        class="range-thumb max"
      />
    </div>

    <div class="price-inputs">
      <div class="input-wrapper">
        <span class="input-prefix">от</span>
        <input 
          type="number" 
          v-model.number="minPrice" 
          placeholder="0"
          :min="MIN_LIMIT"
          :max="MAX_LIMIT"
        />
      </div>

      <span class="separator">-</span>

      <div class="input-wrapper">
        <span class="input-prefix">до</span>
        <input 
          type="number" 
          v-model.number="maxPrice" 
          placeholder="99999"
          :min="MIN_LIMIT"
          :max="MAX_LIMIT"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const MIN_LIMIT = 0
const MAX_LIMIT = 100000

const props = defineProps({
  modelValue: {
    type: Object,
    default: () => ({ min: null, max: null })
  }
})

const emit = defineEmits(['update:modelValue'])

const sliderMin = computed(() => props.modelValue.min ?? MIN_LIMIT)
const sliderMax = computed(() => props.modelValue.max ?? MAX_LIMIT)

const minPercent = computed(() => ((sliderMin.value - MIN_LIMIT) / (MAX_LIMIT - MIN_LIMIT)) * 100)
const maxPercent = computed(() => ((sliderMax.value - MIN_LIMIT) / (MAX_LIMIT - MIN_LIMIT)) * 100)

const updateMin = (event) => {
  let val = Number(event.target.value)
  const currentMax = props.modelValue.max ?? MAX_LIMIT
  if (val > currentMax - 100) val = currentMax - 100
  emit('update:modelValue', { ...props.modelValue, min: val })
}

const updateMax = (event) => {
  let val = Number(event.target.value)
  const currentMin = props.modelValue.min ?? MIN_LIMIT
  if (val < currentMin + 100) val = currentMin + 100
  emit('update:modelValue', { ...props.modelValue, max: val })
}

const minPrice = computed({
  get: () => props.modelValue.min,
  set: (newValue) => {
    if (newValue === '' || newValue === null) {
      emit('update:modelValue', { ...props.modelValue, min: null })
      return
    }
    let val = Number(newValue)
    if (isNaN(val)) return
    
    const currentMax = props.modelValue.max ?? MAX_LIMIT
    if (val > currentMax - 100) val = currentMax - 100
    if (val < MIN_LIMIT) val = MIN_LIMIT
    
    emit('update:modelValue', { ...props.modelValue, min: val })
  }
})

const maxPrice = computed({
  get: () => props.modelValue.max,
  set: (newValue) => {
    if (newValue === '' || newValue === null) {
      emit('update:modelValue', { ...props.modelValue, max: null })
      return
    }
    let val = Number(newValue)
    if (isNaN(val)) return
    
    const currentMin = props.modelValue.min ?? MIN_LIMIT
    if (val < currentMin + 100) val = currentMin + 100
    if (val > MAX_LIMIT) val = MAX_LIMIT
    
    emit('update:modelValue', { ...props.modelValue, max: val })
  }
})
</script>

<style lang="scss" scoped>
@use './PriceFilter.scss' as *;
</style>