import { defineStore } from "pinia";
import { ref } from "vue";

export const useHeaderStore = defineStore('headerStore', () => {
    const headerLinks = ref ([
        { path: '#home', name: 'Главная' },
        { path: '#about', name: 'О бренде' },
        { path: '#collections', name: 'Коллекции' },
        { path: '#materials', name: 'Материалы' },
        { path: '#process', name: 'Процесс' },
        { path: '#faq', name: 'Вопросы' }
    ])
    return { headerLinks }
})