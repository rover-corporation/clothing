import { defineStore } from "pinia";
import { ref } from "vue";
// Импорт вашей функции запроса
import { useBrandFeatureApi } from "~/api/brandFeatures"; 

export const useBrandFeaturesStore = defineStore('brandFeaturesStore', () => {
    // Изначально пустые значения
    const heading = ref("");
    const subtitle = ref("");
    const features = ref([]);

    const isLoading = ref(false);
    const error = ref(null);

    const loadBrandFeatures = async () => {
        // Если уже загружено, не делаем запрос повторно, а просто возвращаем данные (для SSR)
        if (heading.value) return { heading: heading.value, subtitle: subtitle.value, features: features.value };

        isLoading.value = true;
        error.value = null;

        try {
            const response = await useBrandFeatureApi(); // функция с $fetch и правильным populate

            if (response && response.data) {
                const data = response.data.attributes || response.data;
                const config = useRuntimeConfig();
                const baseUrl = config.public.strapi.url;
                
                heading.value = data.heading;
                subtitle.value = data.subtitle;

                // Мапим массив фич
                if (data.FeatureCard) {
                    features.value = data.FeatureCard.map((item) => {
                        let imageUrl = '';
                        if (item.image) {
                            const imgObj = item.image.data?.attributes || item.image;
                            imageUrl = `${baseUrl}${imgObj.url}`;
                        }

                        return {
                            id: item.id,
                            title: item.title,
                            description: item.description,
                            image: imageUrl
                        };
                    });
                }
            }

            // Обязательно возвращаем для SSR (гидратации)
            return {
                heading: heading.value,
                subtitle: subtitle.value,
                features: features.value
            };

        } catch (e) {
            console.error('Ошибка в сторе BrandFeatures:', e);
            error.value = e.message || 'Ошибка загрузки';
        } finally {
            isLoading.value = false;
        }
    };

    return { heading, subtitle, features, isLoading, error, loadBrandFeatures };
});