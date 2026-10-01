// stores/privacyStore.js
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { usePrivacyApi } from '~/api/privacy'

export const usePrivacyStore = defineStore('privacyStore', () => {
    // Оставляем дефолтные значения (или пустые), чтобы страница не была пустой до загрузки
    const content = ref({
        pageTitle: "",
        lastUpdated: "",
        sections: []
    })
    
    const isLoading = ref(false)
    const error = ref(null)

    // Вспомогательная функция для форматирования даты в "24 сентября 2026 г."
    const formatDate = (dateString) => {
        if (!dateString) return ""
        const date = new Date(dateString)
        const options = { day: 'numeric', month: 'long', year: 'numeric' }
        return date.toLocaleDateString('ru-RU', options) + ' г.'
    }

    const fetchPrivacyPolicy = async () => {
        // Если данные уже загружены, не делаем запрос повторно
        if (content.value.pageTitle) return

        isLoading.value = true
        error.value = null

        try {
            const response = await usePrivacyApi()
            
            // Strapi возвращает { data: { ... } }, достаем нужную часть
            // Поддержка как Strapi v4 (attributes), так и v5 (плоская структура)
            const data = response.data?.attributes || response.data

            if (data) {
                content.value = {
                    pageTitle: data.pageTitle || 'Политика конфиденциальности',
                    lastUpdated: formatDate(data.lastUpdated),
                    // Маппим секции
                    sections: (data.sections || []).map(sec => ({
                        title: sec.title,
                        // Strapi отдает long text как одну строку. 
                        // Мы разбиваем ее по переносу строки (Enter), убираем пустые и получаем массив строк!
                        content: sec.content 
                            ? sec.content.split('\n').map(p => p.trim()).filter(p => p.length > 0)
                            : []
                    }))
                }
            }
        } catch (err) {
            console.error('Ошибка при загрузке Политики Конфиденциальности:', err)
            error.value = err
        } finally {
            isLoading.value = false
        }
    }

    return { 
        content, 
        isLoading, 
        error, 
        fetchPrivacyPolicy 
    }
})