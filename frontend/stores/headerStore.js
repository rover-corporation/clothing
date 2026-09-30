import { defineStore } from "pinia";
import { ref } from "vue";
// Укажите правильный путь к вашему файлу с функцией запроса!
import { fetchHeaderApi } from "~/api/header"; 

export const useHeaderStore = defineStore('headerStore', () => {
    const headerLinks = ref([])
    const isLoading = ref(false)
    const error = ref(null)

    const loadHeaderLinks = async () => {
        // Если данные уже есть (закэшированы), не делаем запрос повторно
        if (headerLinks.value.length > 0) return;

        isLoading.value = true;
        error.value = null;

        try {
            // 1. Вызываем вашу функцию запроса
            const response = await fetchHeaderApi();

            // 2. Strapi возвращает массив внутри поля data
            // Проверяем, что данные пришли, и мапим их в удобный для нас формат
            if (response && response.data) {
                headerLinks.value = response.data.map((item) => ({
                    id: item.id,
                    // Обращаемся к attributes, так как это стандартный формат Strapi
                    path: item.linkPath, 
                    name: item.linkName
                }));
            }
        } catch (e) {
            console.error('Ошибка в сторе:', e);
            error.value = e.message || 'Произошла ошибка при загрузке меню';
        } finally {
            isLoading.value = false;
        }
    }

    return { 
        headerLinks, 
        isLoading, 
        error, 
        loadHeaderLinks 
    }
})