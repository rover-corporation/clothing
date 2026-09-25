<!-- pages/catalog/[id].vue -->
<template>
  <div class="container product-page" >
    
    <!-- Ссылка для возврата назад -->
    <NuxtLink to="/catalog" class="back-link">
      &larr; Вернуться в каталог
    </NuxtLink>

    <!-- Состояние загрузки -->
    <div v-if="pending" class="loading-state">
      <p>Загрузка данных о товаре...</p>
    </div>

    <!-- Состояние ошибки (если товар не найден) -->
    <div v-else-if="error || !product" class="error-state">
      <h2>Товар не найден</h2>
      <p>К сожалению, такого товара не существует.</p>
    </div>

    <!-- Если всё ок, рендерим наш компонент, передавая в него объект product -->
    <ProductDetails v-else :product="product" />

  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
// В Nuxt 3 компоненты импортируются автоматически, но можно импортировать и явно:
import ProductDetails from '@/components/ProductDetails/ProductDetails.vue'

// Получаем объект маршрута
const route = useRoute()

// Достаем ID из URL (например, из /catalog/123 достанет '123')
const productId = route.params.id

/*
  Делаем "запрос" за данными с помощью useAsyncData.
  В реальном проекте вместо setTimeout здесь будет:
  const { data: product, pending, error } = await useFetch(`https://твое-апи.com/products/${productId}`)
*/
const { data: product, pending, error } = await useAsyncData(`product-${productId}`, async () => {
  
  // Искусственная задержка в полсекунды (имитация работы сети)
  await new Promise(resolve => setTimeout(resolve, 500))

  // Имитация ответа от сервера с данными конкретного товара
  return {
    id: productId,
    title: `Базовая футболка оверсайз`,
    price: 1990,
    description: 'Идеальная базовая футболка из 100% органического хлопка. Свободный крой не сковывает движения, а плотная ткань отлично держит форму после стирок. Подойдет как для повседневной носки, так и для спорта.',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=500&q=80'
  }
})


definePageMeta({
layout: 'lay'
})
</script>

<style lang="scss" scoped>
.back-link {
  display: inline-block;
  margin-bottom: 24px;
  color: #4b5563;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s;

  &:hover {
    color: #111827;
  }
}

.loading-state, .error-state {
  text-align: center;
  padding: 100px 0;
  font-size: 18px;
  color: #6b7280;
}
.product-page
{
  padding: 40px 1rem;
}
</style>