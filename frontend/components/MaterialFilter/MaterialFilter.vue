<template>
  <div class="material-filter">
    <h3 class="filter-title">{{ props.title }}</h3>
    
    <div class="materials-list">
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

const props = defineProps({
  modelValue: {
    type: Array,
    default: () => []
  },
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
  },
  title: {
    type: String,
    default: '',
  }
})

const emit = defineEmits(['update:modelValue'])

const selectedMaterials = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})

const toggleMaterial = (materialValue) => {
  const currentSelected = [...selectedMaterials.value]
  const index = currentSelected.indexOf(materialValue)

  if (index === -1) {
    currentSelected.push(materialValue)
  } else {
    currentSelected.splice(index, 1)
  }
  
  selectedMaterials.value = currentSelected
}
</script>

<style lang="scss" scoped>
 @use './MaterialFilter.scss' as *;
</style>