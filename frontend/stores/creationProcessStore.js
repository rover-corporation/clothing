import { defineStore } from "pinia";
import { ref } from "vue";

export const useCreationProcessStore = defineStore('creationProcessStore', () => {
    const heading = ref("Как рождается коллекция");
    const subtitle = ref("От идеи до готового образа: наш подход к созданию одежды");
    
    const steps = ref([
        {
            title: "Идея и эскиз",
            description: "Начинаем с вдохновения и ручной отрисовки лекал. Каждая линия продумана до миллиметра."
        },
        {
            title: "Подбор тканей",
            description: "Работаем только с проверенными поставщиками. Натуральный шёлк, лён и хлопок премиум-класса."
        },
        {
            title: "Ручной пошив",
            description: "Мастера вручную обрабатывают каждый шов. Строгий контроль качества на каждом этапе."
        },
        {
            title: "Финальный образ",
            description: "Готовые вещи проходят примерку, утюжку и попадают в лукбук. Одежда, созданная для жизни."
        }
    ]);

    return { heading, subtitle, steps };
});