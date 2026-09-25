import { defineStore } from "pinia";
import { ref } from "vue";

export const useHeaderStore = defineStore('headerStore', () => {
    const headerLinks = ref ([
        { path: '/', name: 'Главная' },
        { path: '/catalog', name: 'Каталог' },
        { path: '/#about', name: 'О бренде' },
        { path: '/#materials', name: 'Материалы' },
        { path: '/#process', name: 'Процесс' },
        { path: '/#faq', name: 'Вопросы' }
    ])
    return { headerLinks }
})