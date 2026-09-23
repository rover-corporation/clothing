import { defineStore } from "pinia";
import { ref } from "vue";

// 🖼️ Импортируем изображения из assets/
import timelessStyle from '@/assets/images/timeless-style.webp'
import versatile from '@/assets/images/versatile.webp'
import comfort from '@/assets/images/comfort.webp'

export const useBrandFeaturesStore = defineStore('brandFeaturesStore', () => {
    const heading = ref("Качество в каждой детали");
    const subtitle = ref("Почему наша одежда становится основой вашего гардероба");
    
    const features = ref([
        {
            title: "Вне времени",
            description: "Классические силуэты, которые не выходят из моды. Вещи, которые хочется носить сезон за сезоном.",
            image: timelessStyle  // ← используем импортированную переменную
        },
        {
            title: "Для особых вечеров",
            description: "Струящееся трикотажное платье с мягким силуэтом. Для моментов, когда хочется выглядеть достойно и чувствовать себя уверенно.",
            image: versatile
        },
        {
            title: "Комфорт в деталях",
            description: "Мягкие швы, продуманные лекала, приятные к телу ткани. Одежда, которую не хочется снимать.",
            image: comfort
        }
    ]);

    return { heading, subtitle, features };
});