import { defineStore } from "pinia";
import { ref } from "vue";
import bannerImage from '@/assets/images/banner.webp'

export const useHeroStore = defineStore('heroStore', () => {
    const heroData = ref({
        title: "Вне времени. Вне суеты.",
        text: "Одежда, в которой нет лишнего: только качество, силуэт и спокойная элегантность.",
        image: bannerImage,
        
        // 🔥 ДОБАВЛЯЕМ ЭТО:
        buttons: [
            { label: "Смотреть коллекцию", to: "#studios", variant: "primary" },
            { label: "Смотреть лукбук", to: "#pricing", variant: "secondary" }
        ]
    });

    return { heroData };
});