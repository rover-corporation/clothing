<template>
  <div class="prod">
    <div class="prod-img">
      <img :src="prodObj.img" :alt="prodObj.name" loading="lazy" />
    </div>
    
    <div class="prod-content">
      <h3 class="prod-title">
        {{ prodObj.name }}
      </h3>
      
      <p class="prod-desc">
        {{ prodObj.shortDesc }}
      </p>
      
      <div class="prod-footer">
        <span class="prod-price">{{ prodObj.price }} ₽</span>
        
        <div class="prod-action">
          <!-- Стили кнопки теперь полностью контролируются внутри CtaButton.vue -->
          <CtaButton>
            Связаться
          </CtaButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import CtaButton from '@/components/CtaButton/CtaButton.vue'

defineProps({
  prodObj: {
    type: Object,
    required: true,
    default: () => ({})
  }
})
</script>

<style lang="scss" scoped>
@use './ProductCard.scss';
</style>