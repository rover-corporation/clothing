import { defineStore } from "pinia";
import { ref } from "vue";
// Укажите ваш путь к функции запроса
import { useFaqApi } from "~/api/faq";

export const useFaqStore = defineStore('faqStore', () => {
    const heading = ref("");
    const intro = ref("");
    const image = ref("");
    const faqItems = ref([]);

    const isLoading = ref(false);
    const error = ref(null);

    const loadFaqData = async () => {
        // Если данные уже есть, не делаем запрос (для SSR)
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

                // 1. Формируем полный путь до картинки
                if (data.image) {
                    const imgObj = data.image.data?.attributes || data.image;
                    image.value = `${baseUrl}${imgObj.url}`;
                }

                // 2. Мапим вопросы-ответы
                if (data.faqItems) {
                    faqItems.value = data.faqItems.map((item) => ({
                        id: item.id,
                        question: item.question,
                        answer: item.answer
                    }));
                }
            }

            // Возвращаем данные для правильной гидратации Nuxt
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