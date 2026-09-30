<!-- pages/catalog/[id].vue -->
<template>
  <div class="container product-page" >
    
    <!-- Ссылка для возврата назад -->
    <NuxtLink to="/catalog" class="back-link">
      &larr; Вернуться в каталог
    </NuxtLink>

    <!-- Состояние загрузки. Используем pending из useAsyncData -->
    <div v-if="pending || store.isLoading" class="loading-state">
      <p>Загрузка данных о товаре...</p>
    </div>

    <!-- Состояние ошибки (если товар не найден или ID неверный) -->
    <div v-else-if="store.error || !store.product" class="error-state">
      <h2>Товар не найден</h2>
      <p>К сожалению, такого товара не существует или он был удален.</p>
    </div>

    <!-- Если всё ок, рендерим наш компонент -->
    <!-- 🚨 Передаем store.product -->
    <ProductDetails v-else :product="store.product" />

  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { useSingleProductStore } from '~/stores/products/singleProductStore'
import ProductDetails from '@/components/ProductDetails/ProductDetails.vue'

definePageMeta({ layout: 'lay' })

const route = useRoute()
const productId = route.params.id

const store = useSingleProductStore()

// 🚨 Делаем SSR запрос. Ключ должен содержать ID, чтобы Nuxt кешировал товары раздельно!
const { data, pending } = await useAsyncData(`product-data-${productId}`, async () => {
  return await store.loadProduct(productId)
})

// Гидратация: Если сервер отдал данные, а клиентский стор пуст — кладем их туда
if (data.value && data.value.product) {
    store.product = data.value.product
}
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
.product-page {
  padding: 40px 1rem;
}
</style>