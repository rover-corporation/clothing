import { defineStore } from "pinia";
import { ref } from "vue";
import { useFaqApi } from "~/api/faq";

export const useFaqStore = defineStore('faqStore', () => {
    const heading = ref("");
    const intro = ref("");
    const image = ref("");
    const faqItems = ref([]);

    const isLoading = ref(false);
    const error = ref(null);

    const loadFaqData = async () => {
        if (heading.value) {
            return {
                heading: heading.value,
                intro: intro.value,
                image: image.value,
                faqItems: faqItems.value
            };
        }

        isLoading.value = true;
        error.value = null;

        try {
            const response = await useFaqApi();

            if (response && response.data) {
                const data = response.data.attributes || response.data;
                const config = useRuntimeConfig();
                const baseUrl = config.public.strapi.url;

                heading.value = data.heading;
                intro.value = data.intro;

                if (data.image) {
                    const imgObj = data.image.data?.attributes || data.image;
                    image.value = `${baseUrl}${imgObj.url}`;
                }

                if (data.faqItems) {
                    faqItems.value = data.faqItems.map((item) => ({
                        id: item.id,
                        question: item.question,
                        answer: item.answer
                    }));
                }
            }

            return {
                heading: heading.value,
                intro: intro.value,
                image: image.value,
                faqItems: faqItems.value
            };

        } catch (e) {
            console.error('Ошибка в сторе FAQ:', e);
            error.value = e.message || 'Ошибка загрузки';
        } finally {
            isLoading.value = false;
        }
    };

    return { heading, intro, image, faqItems, isLoading, error, loadFaqData };
});