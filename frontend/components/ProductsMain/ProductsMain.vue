<template>
    <section class="products">
        <div class="container">

            <div class="products-general">
                <h1>Каталог Одежды</h1>
                <p>Выберите одежду под ваш вкус</p>
            </div>

            <div class="products-catalog">

                <div class="products-filters">
                    <!-- Фильтр по цене -->
                    <PriceFilter v-model="selectedPrice" />

                    <!-- Фильтры, которые мы сделали ранее -->
                    <ColorFilter v-model="selectedColors" />
                    <SizeFilter v-model="selectedSizes" />
                    <MaterialFilter v-model="selectedMaterials" />
                    
                    <!-- Обновленный блок для отладки -->
                    <div style="margin-top: 20px; padding: 10px; background: #f3f4f6; border-radius: 8px;">
                       <p style="font-size: 12px; color: gray; margin-bottom: 5px;"><strong>Собранные фильтры:</strong></p>
                       <p style="font-size: 12px; margin: 0;">Цена: {{ selectedPrice }}</p>
                       <p style="font-size: 12px; margin: 0;">Цвета: {{ selectedColors }}</p>
                       <p style="font-size: 12px; margin: 0;">Размеры: {{ selectedSizes }}</p>
                       <p style="font-size: 12px; margin: 0;">Материалы: {{ selectedMaterials }}</p>
                    </div>
                </div>

                <div class="product-list">
                    <div v-for="item in productMockup">
                        <NuxtLink :to="`/catalog/${item.id}`">
                            <ProductCard  :prod-obj="item"/>
                        </NuxtLink>
                        

                    </div>
                </div>

            </div>
            
        </div>
    </section>
</template>

<script setup>
import { ref, reactive } from 'vue' 
import ProductCard from '@/components/ProductCard/ProductCard.vue'
import PriceFilter from '@/components/PriceFilter/PriceFilter.vue' // Новый импорт
import ColorFilter from '@/components/ColorFilter/ColorFilter.vue'
import SizeFilter from '@/components/SizeFilter/SizeFilter.vue'
import MaterialFilter from '@/components/MaterialFilter/MaterialFilter.vue'

import dress from '@/assets/images/banner.webp'

// Реактивные переменные
const selectedPrice = ref({ min: null, max: null }) // Объект для цены
const selectedColors = ref([])
const selectedSizes = ref([])
const selectedMaterials = ref([])

const productMockup = reactive([
    {
        id: 1,
        img: dress,
        name: 'Платье',
        price: 6000,

    },
    {
        id: 2,
        img: dress,
        name: 'Брюки',
        price: 6000,

    },
    {
        id: 3,
        img: dress,
        name: 'Юбка',
        price: 6000,

    },
])



</script>

<style lang="scss" scoped>
@use './ProductsMain.scss' as *;
</style>