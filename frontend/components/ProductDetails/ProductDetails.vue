<!-- components/ProductDetails/ProductDetails.vue -->
<template>
  <div class="product-details">
    
    <!-- Левая колонка: Изображение -->
    <div class="product-gallery">
      <!-- Если у товара нет картинки, покажем заглушку -->
      <img 
        :src="product.image || 'https://via.placeholder.com/500x700?text=Нет+фото'" 
        :alt="product.title" 
        class="main-image"
      />
    </div>

    <!-- Правая колонка: Информация -->
    <div class="product-info">
      <h1 class="title">{{ product.title }}</h1>
      <p class="article">Артикул: {{ product.id }}</p>
      
      <div class="price-block">
        <span class="price">{{ product.price }} ₽</span>
      </div>

      <div class="description-block">
        <h3>Описание</h3>
        <p>{{ product.description }}</p>
      </div>

      <!-- Кнопка добавления в корзину -->
      <CtaButton>
        Заказать
      </CtaButton>
    </div>

  </div>
</template>

<script setup>

import CtaButton from '@/components/CtaButton/CtaButton.vue';


// 1. Принимаем пропс product
const props = defineProps({
  product: {
    type: Object,
    required: true // Обязательный пропс
  }
})


</script>

<style lang="scss" scoped>
@use './ProductDetails.scss' as *;
</style>