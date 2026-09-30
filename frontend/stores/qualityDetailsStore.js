import { defineStore } from "pinia";
import { ref } from "vue";
// Укажите правильный путь до вашего файла с функцией
import { useQualityDetailsApi } from "~/api/qualityDetails";

export const useQualityDetailsStore = defineStore('qualityDetailsStore', () => {
    // Начальные пустые значения
    const heading = ref("");
    const description = ref("");
    const features = ref([]); // Массив строк
    const image = ref("");

    const isLoading = ref(false);
    const error = ref(null);

    const loadQualityDetails = async () => {
        // Если данные уже были загружены, просто возвращаем их для SSR
        if (heading.value) {
            return {
                heading: heading.value,
                description: description.value,
                features: features.value,
                image: image.value
            };
        }

        isLoading.value = true;
        error.value = null;

        try {
            // Вызываем вашу функцию запроса
            const response = await useQualityDetailsApi();

            if (response && response.data) {
                // Универсальный хак для Strapi v4 и v5
                const data = response.data.attributes || response.data;
                const config = useRuntimeConfig();
                const baseUrl = config.public.strapi.url;

                // 1. Заполняем тексты
                heading.value = data.heading;
                description.value = data.description;

                // 2. Обрабатываем картинку
                if (data.image) {
                    const imgObj = data.image.data?.attributes || data.image;
                    image.value = `${baseUrl}${imgObj.url}`;
                }

                // 3. Превращаем компонент Strapi в массив строк
                // Из [{ id: 1, text: "Ткань" }] получаем ["Ткань"]
                if (data.features) {
                    features.value = data.features.map((f) => f.text);
                }
            }

            // Обязательно возвращаем стейт для правильной работы Nuxt SSR
            return {
                heading: heading.value,
                description: description.value,
                features: features.value,
                image: image.value
            };

        } catch (e) {
            console.error('Ошибка в сторе qualityDetailsStore:', e);
            error.value = e.message || 'Произошла ошибка при загрузке';
        } finally {
            isLoading.value = false;
        }
    };

    return { 
        heading, 
        description, 
        features, 
        image, 
        isLoading, 
        error, 
        loadQualityDetails 
    };
});