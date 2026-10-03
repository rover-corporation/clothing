import { defineStore } from "pinia";
import { ref } from "vue";
import { usePrivacyApi } from "~/api/privacy";

export const usePrivacyStore = defineStore('privacyStore', () => {
    const pageTitle = ref("");
    const lastUpdated = ref("");
    const content = ref(""); // Сюда прилетит весь текст в формате Markdown
    
    const isLoading = ref(false);
    const error = ref(null);

    const loadPolicyData = async () => {
        if (pageTitle.value) return { pageTitle: pageTitle.value }; // SSR защита

        isLoading.value = true;
        error.value = null;

        try {
            const response = await usePrivacyApi();

            if (response && response.data) {
                const attr = response.data.attributes || response.data;
                
                pageTitle.value = attr.pageTitle;
                lastUpdated.value = attr.lastUpdated;
                content.value = attr.content;
            }

            

            return { 
                pageTitle: pageTitle.value, 
                lastUpdated: lastUpdated.value, 
                content: content.value 
            };
            
        } catch (e) {
            console.error('Ошибка загрузки политики:', e);
            error.value = e.message || 'Ошибка загрузки данных';
        } finally {
            isLoading.value = false;
        }
    };

    return { pageTitle, lastUpdated, content, isLoading, error, loadPolicyData };
});