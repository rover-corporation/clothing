import { defineStore } from "pinia";
import { ref } from "vue";
import { useCreationProcessApi } from "~/api/creationProcess"; 

export const useCreationProcessStore = defineStore('creationProcessStore', () => {
    const heading = ref("");
    const subtitle = ref("");
    const steps = ref([]);

    const isLoading = ref(false);
    const error = ref(null);

    const loadProcessData = async () => {
        if (heading.value) {
            return { heading: heading.value, subtitle: subtitle.value, steps: steps.value };
        }

        isLoading.value = true;
        error.value = null;

        try {
            const response = await useCreationProcessApi();

            if (response && response.data) {
                const data = response.data.attributes || response.data;
                
                heading.value = data.heading;
                subtitle.value = data.subtitle;

                if (data.steps) {
                    steps.value = data.steps.map((step) => ({
                        id: step.id,
                        title: step.title,
                        description: step.description
                    }));
                }
            }

            return { heading: heading.value, subtitle: subtitle.value, steps: steps.value };

        } catch (e) {
            console.error('Ошибка CreationProcess:', e);
            error.value = e.message || 'Ошибка загрузки';
        } finally {
            isLoading.value = false;
        }
    };

    return { heading, subtitle, steps, isLoading, error, loadProcessData };
});