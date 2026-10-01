// stores/singleProductStore.js
import { defineStore } from "pinia";
import { ref } from "vue";
import { useSingleProductApi } from "~/api/products/singleProduct";

export const useSingleProductStore = defineStore('singleProductStore', () => {
    const product = ref(null);
    const isLoading = ref(false);
    const error = ref(null);

    const loadProduct = async (id) => {
        // 🔥 ИСПРАВЛЕНИЕ 1: Сверяем с documentId, так как в URL мы передаем его!
        if (product.value && (product.value.documentId === id || String(product.value.id) === String(id))) {
            return { product: product.value };
        }

        isLoading.value = true;
        error.value = null;
        product.value = null; 

        try {
            const response = await useSingleProductApi(id);

            if (response && response.data) {
                const config = useRuntimeConfig();
                const baseUrl = config.public.strapi.url;
                
                const attr = response.data.attributes || response.data;

                // 🔥 ИСПРАВЛЕНИЕ 2: Пуленепробиваемый сбор галереи (для Strapi v5 и v4)
                let galleryUrls = [];
                if (Array.isArray(attr.images)) {
                    // Strapi v5
                    galleryUrls = attr.images.map(img => `${baseUrl}${img.url}`);
                } else if (attr.images && attr.images.data) {
                    // Strapi v4
                    galleryUrls = attr.images.data.map(imgObj => {
                        const img = imgObj.attributes || imgObj;
                        return `${baseUrl}${img.url}`;
                    });
                }

                // (Старый блок с одиночной attr.img удален, он больше не нужен)

                // Мапим данные из Strapi под формат компонента ProductDetails
                product.value = {
                    id: response.data.id,
                    documentId: response.data.documentId || attr.documentId,
                    title: attr.name,             
                    description: attr.shortDesc,  
                    detailedDescription: attr.detailedDescription || null,
                    price: attr.price,
                    
                    // 🔥 ИСПРАВЛЕНИЕ 3: Назвали images, во множественном числе!
                    images: galleryUrls,
                    categories: attr.categories ? attr.categories.map(c => c.label) : [],
                    colors: attr.colors ? attr.colors.map(c =>c.label) : [],
                    sizes: attr.sizes ? attr.sizes.map(s => s.label) : [],
                    materials: attr.materials ? attr.materials.map(m => m.label) : [],
                    patterns: attr.patterns ? attr.patterns.map(p =>p.label) : []
                };
            }

            return { product: product.value };

        } catch (e) {
            console.error(`Ошибка загрузки товара ${id}:`, e);
            error.value = e.message || 'Товар не найден';
        } finally {
            isLoading.value = false;
        }
    };

    return { product, isLoading, error, loadProduct };
});