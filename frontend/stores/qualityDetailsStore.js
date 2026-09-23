import { defineStore } from "pinia";
import { ref } from "vue";

// 🖼️ Атмосферное фото (ткани, лекала, процесс пошива). Заменишь на своё позже.
import craftImage from '@/assets/images/craftsmanship.webp'

export const useQualityDetailsStore = defineStore('qualityDetailsStore', () => {
    const heading = ref("Мастерство в каждой детали");
    const description = ref("Мы не просто шьём одежду. Мы создаём вещи, которые живут долго, сохраняют форму и радуют тактильными ощущениями.");
    
    const features = ref([
        "Премиальные ткани из Италии и Японии",
        "Ручная обработка каждого шва",
        "Экологичные красители и фурнитура",
        "Индивидуальная подгонка лекал"
    ]);

    const image = ref(craftImage);

    return { heading, description, features, image };
});