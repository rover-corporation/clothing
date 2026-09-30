// stores/productStore.js
import { defineStore } from "pinia";
import { ref } from "vue";
import { useProductsApi } from "~/api/products/products"; 

export const useProductStore = defineStore('productStore', () => {
    const products = ref([]); // Массив всех товаров
    const isLoading = ref(false);
    const error = ref(null);

    const loadProducts = async () => {
        // Если товары уже загружены, не делаем запрос повторно
        if (products.value.length > 0) return { products: products.value };

        isLoading.value = true;
        error.value = null;

        try {
            const response = await useProductsApi();

            if (response && response.data) {
                const config = useRuntimeConfig();
                const baseUrl = config.public.strapi.url;
                
                // Мапим массив из Strapi в структуру вашего productMockup
                products.value = response.data.map(item => {
                    // Поддержка Strapi v4 и v5
                    const attr = item.attributes || item;

                    // Достаем картинку
                    let imageUrl = '';
                    if (Array.isArray(attr.images) && attr.images.length > 0) {
                        imageUrl = `${baseUrl}${attr.images[0].url}`;
                    } 
                    // 2. На всякий случай оставляем формат Strapi v4 (images.data)
                    else if (attr.images && attr.images.data && attr.images.data.length > 0) {
                        const firstImg = attr.images.data[0].attributes || attr.images.data[0];
                        imageUrl = `${baseUrl}${firstImg.url}`;
                    }

                    // Превращаем компонент Tag [{value: 'xs'}, {value: 's'}] в массив ['xs', 's']
                    const cleanSizes = attr.sizes ? attr.sizes.map(s => s.value) : [];
                    const cleanMaterials = attr.materials ? attr.materials.map(m => m.value) : [];

                    return {
                        id: item.id, // ID товара
                        documentId: item.documentId,
                        img: imageUrl,
                        material: cleanMaterials,
                        size: cleanSizes,
                        color: attr.color,
                        name: attr.name,
                        shortDesc: attr.shortDesc,
                        price: attr.price
                    };
                });
            }

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