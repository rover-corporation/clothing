import { defineStore } from "pinia";
import { ref } from "vue";

export const useFooterStore = defineStore('footerStore', () => {
    const navLinks = ref([
        { path: '#home', label: 'Главная' },
        { path: '#about', label: 'О бренде' },
        { path: '#collections', label: 'Коллекции' },
        { path: '#materials', label: 'Материалы' },
        { path: '#process', label: 'Процесс' },
        { path: '#faq', label: 'Вопросы' }
    ]);

    // 🔥 Обновленные ссылки на юридические страницы
    const legalLinks = ref([
        { path: '/privacy', label: 'Политика конфиденциальности' },
        { path: '/personal', label: 'Политика обработки персональных данных' }
    ]);

    const brandDescription = ref("Одежда, созданная с вниманием к деталям. Натуральные ткани, безупречный крой и философия осознанного стиля.");
    const copyright = ref("Все права защищены.");

    const developer = ref({
        name: "RoVer digital",
        url: "https://vk.ru/rover.vladikavkaz"
    });

    return { navLinks, legalLinks, brandDescription, copyright, developer };
});