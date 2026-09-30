<template>
    <section class="products">
        <div class="container">

            <div class="products-general">
                <h1>Каталог Одежды</h1>
                <p>Выберите одежду под ваш вкус</p>
            </div>

            <div class="products-catalog">

                <!-- 🔥 НОВОЕ: Кнопка вызова фильтров (только для мобилок) -->
                <div class="mobile-filter-trigger">
                    <button class="btn-open-filters" @click="openFilters">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M4 21v-7m0-4V3m8 18v-9m0-4V3m8 18v-5m0-4V3M1 14h6m2-6h6m2 8h6"/></svg>
                        Фильтры 
                        <span v-if="activeFiltersCount > 0" class="filter-badge">
                            {{ activeFiltersCount }}
                        </span>
                    </button>
                </div>

                <!-- 🔥 НОВОЕ: Затемнение фона при открытых фильтрах на мобилке -->
                <div 
                    class="filters-overlay" 
                    :class="{ 'is-active': isMobileFiltersOpen }"
                    @click="closeFilters"
                ></div>

                <!-- Блок фильтров (На ПК - сайдбар, на мобилке - шторка) -->
                <div class="products-filters" :class="{ 'is-open': isMobileFiltersOpen }">
                    
                    <!-- Шапка фильтров (только мобилка) -->
                    <div class="filters-mobile-header">
                        <h3>Фильтры</h3>
                        <button class="btn-close" @click="closeFilters" aria-label="Закрыть">&times;</button>
                    </div>

                    <div class="filters-scroll-area">
                        <CtaButton @click="resetFilters" class="reset-btn">
                            Сбросить фильтры
                        </CtaButton>
                                          
                        <PriceFilter v-model="selectedPrice" />
                        <ColorFilter v-model="selectedColors" />
                        <SizeFilter v-model="selectedSizes" />
                        <MaterialFilter v-model="selectedMaterials" />
                    </div>

                    <!-- Подвал фильтров (только мобилка) -->
                    <div class="filters-mobile-footer">
                        <button class="btn-apply" @click="closeFilters">
                            Показать ({{ filteredProducts.length }})
                        </button>
                    </div>
                </div>

                <!-- Список товаров и пагинация (Без изменений) -->
                <div class="product-list-wrapper">
                    <div class="product-list">
                        <template v-if="paginatedProducts.length > 0">
                            <div v-for="item in paginatedProducts" :key="item.id">
                                <NuxtLink :to="`/catalog/${item.documentId || item.id}`">
                                    <ProductCard :prod-obj="item"/>
                                </NuxtLink>
                            </div>
                        </template>
                        <div v-else class="empty-state">
                            <h3>Товары не найдены</h3>
                            <p>Попробуйте изменить условия фильтрации.</p>
                        </div>
                    </div>

                    <!-- Пагинация -->
                    <div v-if="totalPages > 1" class="pagination">
                        <button 
                            class="page-btn" 
                            :disabled="currentPage === 1"
                            @click="prevPage"
                        >
                            &larr; 
                        </button>

                        <div class="page-numbers">
                            <!-- Проходим по массиву умной пагинации -->
                            <template v-for="(item, index) in visiblePages" :key="index">
                                <!-- Если это многоточие -->
                                <span v-if="item === '...'" class="page-dots">...</span>
                                
                                <!-- Если это номер страницы -->
                                <button 
                                    v-else
                                    class="page-btn"
                                    :class="{ active: currentPage === item }"
                                    @click="setPage(item)"
                                >
                                    {{ item }}
                                </button>
                            </template>
                        </div>

                        <button 
                            class="page-btn" 
                            :disabled="currentPage === totalPages"
                            @click="nextPage"
                        >
                             &rarr;
                        </button>
                    </div>
                </div>

            </div>
            
        </div>
    </section>
</template>

<script setup>
import { ref, computed, watch } from 'vue' // Добавили watch
import { storeToRefs } from 'pinia'
import { useProductStore } from '~/stores/products/productsStore'

import CtaButton from '@/components/CtaButton/CtaButton.vue'
import ProductCard from '@/components/ProductCard/ProductCard.vue'
import PriceFilter from '@/components/PriceFilter/PriceFilter.vue'
import ColorFilter from '@/components/ColorFilter/ColorFilter.vue'
import SizeFilter from '@/components/SizeFilter/SizeFilter.vue'
import MaterialFilter from '@/components/MaterialFilter/MaterialFilter.vue'

import { onBeforeUnmount } from 'vue' // <-- добавьте в начало импортов

// === МАГИЯ МОБИЛЬНЫХ ФИЛЬТРОВ ===
const isMobileFiltersOpen = ref(false)

const openFilters = () => {
    isMobileFiltersOpen.value = true
    document.body.style.overflow = 'hidden' // Блокируем скролл сайта
}

const closeFilters = () => {
    isMobileFiltersOpen.value = false
    document.body.style.overflow = '' // Возвращаем скролл
}

// Защита: если ушли со страницы с открытыми фильтрами, разблокируем скролл
onBeforeUnmount(() => {
    document.body.style.overflow = ''
})

// Подсчет количества выбранных фильтров для бейджика
const activeFiltersCount = computed(() => {
    let count = 0
    if (selectedPrice.value.min || selectedPrice.value.max) count++
    count += selectedColors.value.length
    count += selectedSizes.value.length
    count += selectedMaterials.value.length
    return count
})

const productStore = useProductStore()
const { products } = storeToRefs(productStore)

const { data } = await useAsyncData('catalog-products', async () => {
  return await productStore.loadProducts()
})

if (data.value && productStore.products.length === 0) {
    productStore.products = data.value.products
}

const selectedPrice = ref({ min: null, max: null })
const selectedColors = ref([])
const selectedSizes = ref([])
const selectedMaterials = ref([])

const resetFilters = () => {
    selectedPrice.value = { min: null, max: null }
    selectedColors.value = []
    selectedSizes.value = []
    selectedMaterials.value = []
}

// === МАГИЯ ФИЛЬТРАЦИИ ===
const filteredProducts = computed(() => {
    return products.value.filter(product => {
        if (selectedPrice.value.min !== null && selectedPrice.value.min !== '') {
            if (product.price < selectedPrice.value.min) return false
        }
        if (selectedPrice.value.max !== null && selectedPrice.value.max !== '') {
            if (product.price > selectedPrice.value.max) return false
        }

        if (selectedColors.value.length > 0) {
            if (!selectedColors.value.includes(product.color)) return false
        }

        if (selectedSizes.value.length > 0) {
            const hasSize = selectedSizes.value.some(s => product.size.includes(s))
            if (!hasSize) return false
        }

        if (selectedMaterials.value.length > 0) {
            const hasMaterial = selectedMaterials.value.some(m => product.material.includes(m))
            if (!hasMaterial) return false
        }

        return true
    })
})

// 🔥 === МАГИЯ ПАГИНАЦИИ ===

const currentPage = ref(1)
const itemsPerPage = 9 // Количество товаров на странице

// Считаем общее количество страниц (округляем вверх)
const totalPages = computed(() => {
    return Math.ceil(filteredProducts.value.length / itemsPerPage)
})

const visiblePages = computed(() => {
    const total = totalPages.value;
    const current = currentPage.value;
    const delta = 1; // Сколько страниц показывать слева и справа от текущей

    // Если страниц 5 или меньше, показываем их все
    if (total <= 5) {
        return Array.from({ length: total }, (_, i) => i + 1);
    }

    const pages = [];
    const left = Math.max(2, current - delta);
    const right = Math.min(total - 1, current + delta);

    // Всегда добавляем первую страницу
    pages.push(1);

    // Добавляем левое многоточие, если между 1 и началом видимого блока есть разрыв
    if (left > 2) {
        pages.push('...');
    }

    // Добавляем страницы вокруг текущей
    for (let i = left; i <= right; i++) {
        pages.push(i);
    }

    // Добавляем правое многоточие, если между концом видимого блока и последней есть разрыв
    if (right < total - 1) {
        pages.push('...');
    }

    // Всегда добавляем последнюю страницу
    pages.push(total);

    return pages;
})

// Вырезаем только те товары, которые нужны для текущей страницы
const paginatedProducts = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage
    const end = start + itemsPerPage
    return filteredProducts.value.slice(start, end)
})

// Функции переключения страниц
const nextPage = () => {
    if (currentPage.value < totalPages.value) currentPage.value++
}
const prevPage = () => {
    if (currentPage.value > 1) currentPage.value--
}
const setPage = (page) => {
    currentPage.value = page
}

watch([selectedPrice, selectedColors, selectedSizes, selectedMaterials], () => {
    currentPage.value = 1
}, { deep: true })


</script>

<style lang="scss" scoped>
@use './ProductsMain.scss' as *;


</style>