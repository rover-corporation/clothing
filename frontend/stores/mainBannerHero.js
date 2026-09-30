// ~/stores/mainBannerHero.ts
import { defineStore } from "pinia";
import { ref } from "vue";

export const useHeroStore = defineStore('heroStore', () => {
  const heroData = ref({
    title: "",
    text: "",
    image: "",
    buttons: [],
  });

  const isLoading = ref(false);
  const error = ref(null);

  const loadHeroData = async () => {
    // Если данные уже есть, выходим
    if (heroData.value.title) return;

    isLoading.value = true;
    error.value = null;

    try {
      // ✅ ВАЖНО: useRuntimeConfig вызывается ЗДЕСЬ, внутри асинхронной функции, 
      // которая будет запущена из <script setup>. Это гарантирует наличие контекста Nuxt.
      const config = useRuntimeConfig();
      const baseUrl = config.public.strapi.url;
      
      // ✅ $fetch также вызывается здесь, в правильном контексте
      const response = await $fetch(`${baseUrl}/api/hero?populate=*`);

      if (response && response.data) {
        const data = response.data.attributes || response.data;
        
        // Безопасное получение URL картинки
        let imageUrl = '';
        if (data.image) {
          const imgObj = data.image.data?.attributes || data.image;
          imageUrl = imgObj.url.startsWith('http') 
            ? imgObj.url 
            : `${baseUrl}${imgObj.url}`;
        }

        // Универсальное получение кнопок (массив или { data: [...] })
        const rawButtons = data.buttons?.data || data.buttons || [];
        const mappedButtons = Array.isArray(rawButtons) 
          ? rawButtons.map((btn) => ({
              label: btn.label || '',
              to: btn.to || '#',
              variant: btn.variant || 'primary'
            }))
          : [];

        heroData.value = {
          title: data.title || "",
          text: data.text || "",
          image: imageUrl,
          buttons: mappedButtons
        };
      }
    } catch (e) {
      console.error('Ошибка в сторе Hero:', e);
      error.value = e.message || 'Ошибка при загрузке главного баннера';
    } finally {
      isLoading.value = false;
    }
  };

  return { 
    heroData, 
    isLoading, 
    error, 
    loadHeroData 
  };
});