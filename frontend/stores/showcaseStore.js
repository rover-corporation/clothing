import { defineStore } from "pinia";
import { ref } from "vue";


import dress1 from '@/assets/images/dress-evening.webp'
import dress2 from '@/assets/images/dress-casual.webp'
import dress3 from '@/assets/images/dress-summer.webp'

export const useShowcaseStore = defineStore('showcaseStore', () => {
    const heading = ref("Коллекции сезона");
    const subtitle = ref("Платья, которые становятся частью вашей истории");
    
    
    const items = ref([
        {
            title: "Вечерняя элегантность",
            description: "Платья из струящегося шёлка для особых случаев. Идеальный крой, который подчёркивает силуэт.",
            image: dress1,
            badge: "NEW",
            features: ["Шёлк", "Ручная работа", "Италия"]
        },
        {
            title: "Городской комфорт",
            description: "Универсальные платья на каждый день. Натуральные ткани, свободный крой, никаких компромиссов.",
            image: dress2,
            badge: "HIT",
            features: ["Хлопок", "Унисекс", "Эко"]
        },
        {
            title: "Лёгкость лета",
            description: "Воздушные платья из льна для тёплых дней. Дышащие ткани и минималистичный дизайн.",
            image: dress3,
            badge: "SALE",
            features: ["Лён", "Лёгкость", "Универсальность"]
        }
    ]);



    return { heading, subtitle,  items };
});