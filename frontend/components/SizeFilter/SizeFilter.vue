<!-- components/Filters/SizeFilter.vue -->
<template>
  <div class="size-filter">
    <h3 class="filter-title">Размер</h3>
    
    <div class="sizes-list">
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

const props = defineProps({
  modelValue: {
    type: Array,
    default: () => []
  },
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

const emit = defineEmits(['update:modelValue'])

const selectedSizes = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})

const toggleSize = (sizeValue) => {
  const currentSelected = [...selectedSizes.value]
  const index = currentSelected.indexOf(sizeValue)

  if (index === -1) {
    currentSelected.push(sizeValue)
  } else {
    currentSelected.splice(index, 1)
  }
  
  selectedSizes.value = currentSelected
}
</script>

<style lang="scss" scoped>
    @use './SizeFilter.scss' as *;
</style>