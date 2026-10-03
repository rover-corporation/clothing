import { defineStore } from "pinia";
import { ref } from "vue";
import { useQualityDetailsApi } from "~/api/qualityDetails";

export const useQualityDetailsStore = defineStore('qualityDetailsStore', () => {
    const heading = ref("");
    const description = ref("");
    const features = ref([]);
    const image = ref("");

    const isLoading = ref(false);
    const error = ref(null);

    const loadQualityDetails = async () => {
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
            const response = await useQualityDetailsApi();

            if (response && response.data) {
                const data = response.data.attributes || response.data;
                const config = useRuntimeConfig();
                const baseUrl = config.public.strapi.url;

                heading.value = data.heading;
                description.value = data.description;

                if (data.image) {
                    const imgObj = data.image.data?.attributes || data.image;
                    image.value = `${baseUrl}${imgObj.url}`;
                }

                if (data.features) {
                    features.value = data.features.map((f) => f.text);
                }
            }

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