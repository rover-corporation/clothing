import { defineStore } from 'pinia'
import { ref } from 'vue'
import { usePrivacyApi } from '~/api/privacy'

export const usePrivacyStore = defineStore('privacyStore', () => {
    const content = ref({
        pageTitle: "",
        lastUpdated: "",
        sections: []
    })
    
    const isLoading = ref(false)
    const error = ref(null)

    const formatDate = (dateString) => {
        if (!dateString) return ""
        const date = new Date(dateString)
        const options = { day: 'numeric', month: 'long', year: 'numeric' }
        return date.toLocaleDateString('ru-RU', options) + ' г.'
    }

    const fetchPrivacyPolicy = async () => {
        if (content.value.pageTitle) return

        isLoading.value = true
        error.value = null

        try {
            const response = await usePrivacyApi()
            
            const data = response.data?.attributes || response.data

            if (data) {
                content.value = {
                    pageTitle: data.pageTitle || 'Политика конфиденциальности',
                    lastUpdated: formatDate(data.lastUpdated),
                    sections: (data.sections || []).map(sec => ({
                        title: sec.title,
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