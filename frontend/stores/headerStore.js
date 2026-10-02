import { defineStore } from "pinia";
import { ref } from "vue";
import { fetchHeaderApi } from "~/api/header"; 

export const useHeaderStore = defineStore('headerStore', () => {
    const headerLinks = ref([])
    const isLoading = ref(false)
    const error = ref(null)

    const loadHeaderLinks = async () => {
        if (headerLinks.value.length > 0) return;

        isLoading.value = true;
        error.value = null;

        try {
            const response = await fetchHeaderApi();

            if (response && response.data) {
                headerLinks.value = response.data.map((item) => ({
                    id: item.id,
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