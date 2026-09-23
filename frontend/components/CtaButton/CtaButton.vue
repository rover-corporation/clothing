<template>
  <button 
    type="button" 
    class="cta-button" 
    :class="[`cta-button--${variant}`]"
    @click="$emit('click', $event)"
  >
    <slot />
  </button>
</template>

<script setup>
defineProps({
  variant: {
    type: String,
    default: 'primary',
    validator: (v) => ['primary', 'secondary'].includes(v)
  }
})

defineEmits(['click'])
</script>

<style lang="scss" scoped>
@use './CtaButton.scss' as *;
</style>