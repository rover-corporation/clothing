import { defineStore } from "pinia";
import { ref } from "vue";


import { useCollectionShowApi } from "~/api/collectionShow";

export const useShowcaseStore = defineStore('showcaseStore', () => {
    const heading = ref("");
    const subtitle = ref("");
    const items = ref([]);
    
    const isLoading = ref(false);
    const error = ref(null);

    const loadShowcaseData = async () => {
        if (heading.value) return { heading: heading.value, subtitle: subtitle.value, items: items.value };

        isLoading.value = true;
        error.value = null;

        try {
            const response = await useCollectionShowApi();

            if (response && response.data) {
                const data = response.data.attributes || response.data;
                const config = useRuntimeConfig();
                const baseUrl = config.public.strapi.url;
                
                heading.value = data.heading;
                subtitle.value = data.subtitle;

                if (data.items) {
                    items.value = data.items.map((item) => {
                        let imageUrl = '';
                        if (item.image) {
                            const imgObj = item.image.data?.attributes || item.image;
                            imageUrl = `${baseUrl}${imgObj.url}`;
                        }
                        const cleanFeatures = item.features ? item.features.map((f) => f.text) : [];

                        return {
                            id: item.id,
                            title: item.title,
                            description: item.description,
                            image: imageUrl,
                            badge: item.badge,
                            features: cleanFeatures
                        };
                    });
                }
            }

            return { heading: heading.value, subtitle: subtitle.value, items: items.value };

        } catch (e) {
            console.error('Ошибка showcase:', e);
            error.value = e.message;
        } finally {
            isLoading.value = false;
        }
    };

    return { heading, subtitle, items, isLoading, error, loadShowcaseData };
});