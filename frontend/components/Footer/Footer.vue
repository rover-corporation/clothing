<template>
  <footer v-if="brandDescription" class="main-footer">
    <div class="container">
      <div class="footer-content">
        <div class="footer-brand">
          <NuxtLink to="/" class="footer-logo" aria-label="На главную">
            <Logo is-white="true" />
          </NuxtLink>
          <p class="footer-description">{{ brandDescription }}</p>

          <div class="footer-contacts">
            <div 
              class="footer-contactItem" 
              v-for="item in contactLinks" 
              :key="item.id"
            >
              <a :href="item.path">{{ item.label }}</a>
            </div>
          </div>
        </div>

        <div class="footer-links">
          <div class="link-group">
            <h4 class="link-group-title">Навигация</h4>
            <NuxtLink 
              v-for="link in navLinks" 
              :key="link.id"
              :to="link.path" 
              class="footer-link"
            >
              {{ link.label }}
            </NuxtLink>
          </div>
          <div class="link-group">
            <h4 class="link-group-title">Документы</h4>
            <NuxtLink 
              v-for="link in legalLinks" 
              :key="link.id"
              :to="link.path" 
              class="footer-link"
            >
              {{ link.label }}
            </NuxtLink>
          </div>
        </div>
      </div>

      <div class="footer-bottom">
        <div class="footer-bottom-inner">
          <p class="copyright">&copy; {{ currentYear }} Brand Clothing. {{ copyright }}</p>
          
          <a 
            :href="developer.url" 
            target="_blank" 
            rel="noopener noreferrer" 
            class="rover-credit"
          >
            Разработано в <span class="rover-name">{{ developer.name }}</span>
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { useFooterStore } from '~/stores/footerStore'
import Logo from '~/assets/svg/Logo.vue';

const currentYear = new Date().getFullYear()

const store = useFooterStore()
const { navLinks, legalLinks, brandDescription, copyright, developer, contactLinks } = storeToRefs(store)

const { data } = await useAsyncData('footer-data', async () => {
  return await store.loadFooterData()
})

if (data.value && !store.brandDescription) {
  store.brandDescription = data.value.brandDescription;
  store.copyright = data.value.copyright;
  store.developer = data.value.developer;
  
  store.navLinks = data.value.navLinks;
  store.contactLinks = data.value.contactLinks;
  store.legalLinks = data.value.legalLinks;
}
</script>

<style lang="scss" scoped>
@use './Footer.scss' as *;

.footer-logo {
  display: inline-block;
  margin-bottom: 1rem;
  line-height: 0;
  color: #ffffff;
}
</style>