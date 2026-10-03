import { defineStore } from "pinia";
import { ref } from "vue";
import { useFooterApi } from "~/api/footer";

export const useFooterStore = defineStore('footerStore', () => {
    const navLinks = ref([]);
    const contactLinks = ref([]);
    const legalLinks = ref([]);
    
    const brandDescription = ref("");
    const copyright = ref("");
    
    const developer = ref({ name: "", url: "" });

    const isLoading = ref(false);
    const error = ref(null);

    const loadFooterData = async () => {
        if (copyright.value) {
            return {
                navLinks: navLinks.value,
                contactLinks: contactLinks.value,
                legalLinks: legalLinks.value,
                brandDescription: brandDescription.value,
                copyright: copyright.value,
                developer: developer.value
            };
        }

        isLoading.value = true;
        error.value = null;

        try {
            const response = await useFooterApi();

            if (response && response.data) {
                const data = response.data.attributes || response.data;
                
                brandDescription.value = data.brandDescription;
                copyright.value = data.copyright;

                const mapLinks = (linksArray) => {
                    return linksArray ? linksArray.map((link) => ({
                        id: link.id,
                        label: link.label,
                        path: link.path
                    })) : [];
                };

                navLinks.value = mapLinks(data.navLinks);
                contactLinks.value = mapLinks(data.contactLinks);
                legalLinks.value = mapLinks(data.legalLinks);

                if (data.developer) {
                    developer.value = {
                        name: data.developer.name,
                        url: data.developer.url
                    };
                }
            }

            return {
                navLinks: navLinks.value,
                contactLinks: contactLinks.value,
                legalLinks: legalLinks.value,
                brandDescription: brandDescription.value,
                copyright: copyright.value,
                developer: developer.value
            };

        } catch (e) {
            console.error('Ошибка Footer:', e);
            error.value = e.message || 'Ошибка загрузки подвала';
        } finally {
            isLoading.value = false;
        }
    };

    return { 
        navLinks, 
        contactLinks, 
        legalLinks, 
        brandDescription, 
        copyright, 
        developer, 
        isLoading, 
        error, 
        loadFooterData 
    };
});