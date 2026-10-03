<template>
    <section class="products">
        <div class="container">

            <div class="products-general">
                <h1>Каталог Одежды</h1>
                <p>Выберите одежду под ваш вкус</p>
            </div>

            <div class="products-catalog">

                <!-- Кнопка вызова фильтров (только для мобилок) -->
                <div class="mobile-filter-trigger">
                    <button class="btn-open-filters" @click="openFilters">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M4 21v-7m0-4V3m8 18v-9m0-4V3m8 18v-5m0-4V3M1 14h6m2-6h6m2 8h6"/></svg>
                        Фильтры 
                        <span v-if="activeFiltersCount > 0" class="filter-badge">
                            {{ activeFiltersCount }}
                        </span>
                    </button>
                </div>

                <!-- Затемнение фона при открытых фильтрах на мобилке -->
                <div 
                    class="filters-overlay" 
                    :class="{ 'is-active': isMobileFiltersOpen }"
                    @click="closeFilters"
                ></div>

                <!-- Блок фильтров -->
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
                        
                        <MaterialFilter 
                            v-model="selectedCategories" 
                            :available-materials="categories" 
                            title="Категории"
                        />
                        
                        <ColorFilter 
                            v-model="selectedColors" 
                            :available-colors="colors" 
                        />
                        
                        <!-- <SizeFilter 
                            v-model="selectedSizes" 
                            :available-sizes="sizes"
                        />
                        
                        <MaterialFilter 
                            v-model="selectedMaterials" 
                            :available-materials="materials" 
                            title="Материал"
                        /> -->
                        
                        <MaterialFilter 
                            v-model="selectedPatterns" 
                            :available-materials="patterns" 
                            title="Узоры"
                        />
                    </div>

                    <!-- Подвал фильтров (только мобилка) -->
                    <div class="filters-mobile-footer">
                        <button class="btn-apply" @click="closeFilters">
                            Показать ({{ filteredProducts.length }})
                        </button>
                    </div>
                </div>

                <!-- Список товаров и пагинация -->
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
                            <template v-for="(item, index) in visiblePages" :key="index">
                                <span v-if="item === '...'" class="page-dots">...</span>
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
import { ref, computed, watch, onBeforeUnmount } from 'vue'
import { storeToRefs } from 'pinia'
import { useProductStore } from '~/stores/products/productsStore'
import { useFiltersStore } from '~/stores/filters/filtersStore'

import CtaButton from '@/components/CtaButton/CtaButton.vue'
import ProductCard from '@/components/ProductCard/ProductCard.vue'
import PriceFilter from '@/components/PriceFilter/PriceFilter.vue'
import ColorFilter from '@/components/ColorFilter/ColorFilter.vue'
import SizeFilter from '@/components/SizeFilter/SizeFilter.vue'
import MaterialFilter from '@/components/MaterialFilter/MaterialFilter.vue'

// === МОБИЛЬНЫЕ ФИЛЬТРЫ ===
const isMobileFiltersOpen = ref(false)

const openFilters = () => {
    isMobileFiltersOpen.value = true
    document.body.style.overflow = 'hidden' 
}

const closeFilters = () => {
    isMobileFiltersOpen.value = false
    document.body.style.overflow = '' 
}

onBeforeUnmount(() => {
    document.body.style.overflow = ''
})


// === ЗАГРУЗКА ДАННЫХ И СТОРЫ ===
const productStore = useProductStore()
const { products } = storeToRefs(productStore)

const filtersStore = useFiltersStore();
const { colors, sizes, materials, categories, patterns } = storeToRefs(filtersStore);

// Загружаем товары
const { data: catalogData } = await useAsyncData('catalog-products', async () => {
  return await productStore.loadProducts()
})

if (catalogData.value && productStore.products.length === 0) {
    productStore.products = catalogData.value.products
}

// Загружаем фильтры
await useAsyncData('filters-data', async () => {
  await filtersStore.fetchFilters();
  return true; 
});


// === СОСТОЯНИЯ ФИЛЬТРОВ ===
const selectedPrice = ref({ min: null, max: null })
const selectedCategories = ref([])
const selectedColors = ref([])
const selectedSizes = ref([])
const selectedMaterials = ref([])
const selectedPatterns = ref([])

// 🔥 ИСПРАВЛЕНО: Теперь учитываем Категории и Узоры при подсчете бейджика
const activeFiltersCount = computed(() => {
    let count = 0
    if (selectedPrice.value.min || selectedPrice.value.max) count++
    count += selectedCategories.value.length
    count += selectedColors.value.length
    count += selectedSizes.value.length
    count += selectedMaterials.value.length
    count += selectedPatterns.value.length
    return count
})

// 🔥 ИСПРАВЛЕНО: Сброс Категорий и Узоров
const resetFilters = () => {
    selectedPrice.value = { min: null, max: null }
    selectedCategories.value = []
    selectedColors.value = []
    selectedSizes.value = []
    selectedMaterials.value = []
    selectedPatterns.value = []
}

// === ЛОГИКА ФИЛЬТРАЦИИ ===
// === МАГИЯ ФИЛЬТРАЦИИ ===
const filteredProducts = computed(() => {
    return products.value.filter(product => {
        // 1. Цена (тут всё просто, price - это число)
        if (selectedPrice.value.min !== null && selectedPrice.value.min !== '') {
            if (product.price < selectedPrice.value.min) return false;
        }
        if (selectedPrice.value.max !== null && selectedPrice.value.max !== '') {
            if (product.price > selectedPrice.value.max) return false;
        }

        // 2. Категории
        if (selectedCategories.value.length > 0) {
            // Берем массив объектов [{value: 'dresses'}, ...] и делаем плоский массив ['dresses', ...]
            const productCategories = (product.categories || []).map(item => item.value);
            // Проверяем, есть ли пересечения с выбранными фильтрами
            const hasMatch = selectedCategories.value.some(selected => productCategories.includes(selected));
            if (!hasMatch) return false;
        }

        // 3. Цвета
        if (selectedColors.value.length > 0) {
            const productColors = (product.colors || []).map(item => item.value);
            const hasMatch = selectedColors.value.some(selected => productColors.includes(selected));
            if (!hasMatch) return false;
        }

        // 4. Размеры
        if (selectedSizes.value.length > 0) {
            const productSizes = (product.sizes || []).map(item => item.value);
            const hasMatch = selectedSizes.value.some(selected => productSizes.includes(selected));
            if (!hasMatch) return false;
        }

        // 5. Материалы
        if (selectedMaterials.value.length > 0) {
            const productMaterials = (product.materials || []).map(item => item.value);
            const hasMatch = selectedMaterials.value.some(selected => productMaterials.includes(selected));
            if (!hasMatch) return false;
        }

        // 6. Узоры
        if (selectedPatterns.value.length > 0) {
            const productPatterns = (product.patterns || []).map(item => item.value);
            const hasMatch = selectedPatterns.value.some(selected => productPatterns.includes(selected));
            if (!hasMatch) return false;
        }

        return true; // Если товар прошел все фильтры, оставляем его
    })
})


// === ПАГИНАЦИЯ ===
const currentPage = ref(1)
const itemsPerPage = 9 

const totalPages = computed(() => {
    return Math.ceil(filteredProducts.value.length / itemsPerPage)
})

const visiblePages = computed(() => {
    const total = totalPages.value;
    const current = currentPage.value;
    const delta = 1; 

    if (total <= 5) return Array.from({ length: total }, (_, i) => i + 1);

    const pages = [];
    const left = Math.max(2, current - delta);
    const right = Math.min(total - 1, current + delta);

    pages.push(1);
    if (left > 2) pages.push('...');
    for (let i = left; i <= right; i++) pages.push(i);
    if (right < total - 1) pages.push('...');
    pages.push(total);

    return pages;
})

const paginatedProducts = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage
    const end = start + itemsPerPage
    return filteredProducts.value.slice(start, end)
})

const nextPage = () => {
    if (currentPage.value < totalPages.value) currentPage.value++
}
const prevPage = () => {
    if (currentPage.value > 1) currentPage.value--
}
const setPage = (page) => {
    currentPage.value = page
}

// 🔥 ИСПРАВЛЕНО: Добавлены новые фильтры в слежение (watch). 
// При клике на Категорию или Узор страница будет сбрасываться на первую
watch([
    selectedPrice, 
    selectedCategories, 
    selectedColors, 
    selectedSizes, 
    selectedMaterials, 
    selectedPatterns
], () => {
    currentPage.value = 1
}, { deep: true })

</script>

<style lang="scss" scoped>
@use './ProductsMain.scss' as *;
</style>