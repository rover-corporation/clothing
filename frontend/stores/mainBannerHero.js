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
    if (heroData.value.title) return;

    isLoading.value = true;
    error.value = null;

    try {
      const config = useRuntimeConfig();
      const baseUrl = config.public.strapi.url;
      
      const response = await $fetch(`${baseUrl}/api/hero?populate=*`);

      if (response && response.data) {
        const data = response.data.attributes || response.data;
        
        let imageUrl = '';
        if (data.image) {
          const imgObj = data.image.data?.attributes || data.image;
          imageUrl = imgObj.url.startsWith('http') 
            ? imgObj.url 
            : `${baseUrl}${imgObj.url}`;
        }

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