import { defineStore } from "pinia";
import { ref } from "vue";
// Укажите правильный путь к вашему API-файлу!
import { useProductsApi } from "~/api/products/products"; 

export const useProductStore = defineStore('productStore', () => {
    const products = ref([]); 
    const isLoading = ref(false);
    const error = ref(null);

    const loadProducts = async () => {
        if (products.value.length > 0) return { products: products.value };

        isLoading.value = true;
        error.value = null;

        try {
            const response = await useProductsApi();

            if (response && response.data) {
                const config = useRuntimeConfig();
                const baseUrl = config.public.strapi.url;

                // Универсальная функция для вытаскивания `value` из связей
                // Превращает объекты Strapi в плоский массив: ['xs', 's', 'm']
                const extractValues = (relation) => {
                    if (!relation) return [];
                    // Для Strapi v5 (где сразу массив)
                    if (Array.isArray(relation)) {
                        return relation.map(r => r);
                    }
                    // Для Strapi v4 (где есть .data)
                    if (relation.data && Array.isArray(relation.data)) {
                        return relation.data.map(r => (r.attributes || r));
                    }
                    return [];
                };
                
                // Мапим данные
                products.value = response.data.map(item => {
                    const attr = item.attributes || item;

                    // Достаем главную картинку (первую из галереи)
                    let imageUrl = '';
                    if (Array.isArray(attr.images) && attr.images.length > 0) {
                        imageUrl = `${baseUrl}${attr.images[0].url}`;
                    } else if (attr.images && attr.images.data && attr.images.data.length > 0) {
                        const firstImg = attr.images.data[0].attributes || attr.images.data[0];
                        imageUrl = `${baseUrl}${firstImg.url}`;
                    }

                    return {
                        id: item.id, 
                        documentId: item.documentId || attr.documentId,
                        name: attr.name,
                        shortDesc: attr.shortDesc,
                        price: attr.price,
                        img: imageUrl, // Для карточки нужна только 1 картинка
                        
                        // 🔥 Прогоняем все связи через наш парсер
                        categories: extractValues(attr.categories),
                        colors: extractValues(attr.colors),
                        sizes: extractValues(attr.sizes),
                        materials: extractValues(attr.materials),
                        patterns: extractValues(attr.patterns)
                    };
                });
            }

                console.log(products.value[products.value.length - 1])

            return { products: products.value };

        } catch (e) {
            console.error('Ошибка загрузки товаров:', e);
            error.value = e.message || 'Ошибка загрузки товаров';
        } finally {
            isLoading.value = false;
        }
    };

    return { products, isLoading, error, loadProducts };
});