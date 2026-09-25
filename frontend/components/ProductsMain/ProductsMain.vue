<template>
    <section class="products">
        <div class="container">

            <div class="products-general">
                <h1>Каталог Одежды</h1>
                <p>Выберите одежду под ваш вкус</p>
            </div>

            <div class="products-catalog">

                <div class="products-filters">

                    <CtaButton @click="resetFiltets">
                        Сбросить фильтры
                    </CtaButton>


                                      
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
                    <!-- Если товары есть, выводим их -->
                    <template v-if="filteredProducts.length > 0">
                        <div v-for="item in filteredProducts" :key="item.id">
                            <NuxtLink :to="`/catalog/${item.id}`">
                                <ProductCard :prod-obj="item"/>
                            </NuxtLink>
                        </div>
                    </template>
                    
                    <!-- Если после фильтрации массив пустой, показываем сообщение -->
                    <div v-else class="empty-state">
                        <h3>Товары не найдены</h3>
                        <p>Попробуйте изменить условия фильтрации.</p>
                    </div>
                </div>

            </div>
            
        </div>
    </section>
</template>

<script setup>
import { ref, reactive, computed } from 'vue' // Добавили computed
import CtaButton from '@/components/CtaButton/CtaButton.vue'
import ProductCard from '@/components/ProductCard/ProductCard.vue'
import PriceFilter from '@/components/PriceFilter/PriceFilter.vue'
import ColorFilter from '@/components/ColorFilter/ColorFilter.vue'
import SizeFilter from '@/components/SizeFilter/SizeFilter.vue'
import MaterialFilter from '@/components/MaterialFilter/MaterialFilter.vue'

import dress from '@/assets/images/banner.webp'

// Реактивные переменные фильтров
const selectedPrice = ref({ min: null, max: null })
const selectedColors = ref([])
const selectedSizes = ref([])
const selectedMaterials = ref([])

// Моковые данные (цены изменены для проверки фильтра)
const productMockup = reactive([
    {
        id: 1,
        img: dress,
        material: ['denim'],
        size: ['xs', 's'],
        color: 'red',
        name: 'Платье',
        shortDesc: 'Элегентное платье на вечер',
        price: 3000, 
    },
    {
        id: 2,
        img: dress,
        material: ['wool'],
        size: ['m', 'l', 'xl'],
        color: 'black',
        name: 'Брюки',
        shortDesc: 'Элегентное платье на вечер',
        price: 6000,
    },
    {
        id: 3,
        img: dress,
        material: ['cotton'],
        size: ['l', 'xl'],
        color: 'blue',
        name: 'Юбка',
        shortDesc: 'Элегентное платье на вечер',
        price: 9000,
    },
])

const resetFiltets = () => {
    selectedPrice.value = { min: null, max: null }
    selectedColors.value = []
    selectedSizes.value = []
    selectedMaterials.value = []
}

// === МАГИЯ ФИЛЬТРАЦИИ ===
const filteredProducts = computed(() => {
    return productMockup.filter(product => {
        // 1. Проверка цены
        if (selectedPrice.value.min !== null && selectedPrice.value.min !== '') {
            if (product.price < selectedPrice.value.min) return false
        }
        if (selectedPrice.value.max !== null && selectedPrice.value.max !== '') {
            if (product.price > selectedPrice.value.max) return false
        }

        // 2. Проверка цвета (у товара цвет - строка)
        if (selectedColors.value.length > 0) {
            // Если выбранных цветов нет в цвете товара - скрываем
            if (!selectedColors.value.includes(product.color)) return false
        }

        // 3. Проверка размера (у товара размер - массив)
        if (selectedSizes.value.length > 0) {
            // Метод some проверяет: есть ли хотя бы один выбранный размер в массиве размеров товара
            const hasSize = selectedSizes.value.some(s => product.size.includes(s))
            if (!hasSize) return false
        }

        // 4. Проверка материала (у товара материал - массив)
        if (selectedMaterials.value.length > 0) {
            const hasMaterial = selectedMaterials.value.some(m => product.material.includes(m))
            if (!hasMaterial) return false
        }

        // Если товар прошел все проверки выше, оставляем его
        return true
    })
})
</script>

<style lang="scss" scoped>

@use './ProductsMain.scss' as *;

</style>