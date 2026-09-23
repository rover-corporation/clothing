<template>
  <footer class="main-footer">
    <div class="container">
      <div class="footer-content">
        <!-- Бренд -->
        <div class="footer-brand">
          <NuxtLink to="#home" class="footer-logo" aria-label="На главную">
            <Logo />
          </NuxtLink>
          <p class="footer-description">{{ brandDescription }}</p>
        </div>

        <!-- Ссылки -->
        <div class="footer-links">
          <div class="link-group">
            <h4 class="link-group-title">Навигация</h4>
            <NuxtLink 
              v-for="(link, index) in navLinks" 
              :key="index"
              :to="link.path" 
              class="footer-link"
            >
              {{ link.label }}
            </NuxtLink>
          </div>
          <div class="link-group">
            <h4 class="link-group-title">Документы</h4>
            <NuxtLink 
              v-for="(link, index) in legalLinks" 
              :key="index"
              :to="link.path" 
              class="footer-link"
            >
              {{ link.label }}
            </NuxtLink>
          </div>
        </div>
      </div>

      <!-- Нижняя часть -->
      <div class="footer-bottom">
        <div class="footer-bottom-inner">
          <p class="copyright">&copy; {{ currentYear }} Brand Clothing. {{ copyright }}</p>
          
          <!-- 🔥 Ссылка из стора -->
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
// 🔥 Достаем developer из стора
const { navLinks, legalLinks, brandDescription, copyright, developer } = storeToRefs(store)
</script>

<style lang="scss" scoped>
@use './Footer.scss' as *;

.footer-logo {
  display: inline-block;
  margin-bottom: 1rem;
  line-height: 0;
  color: #ffffff; /* Делает currentColor внутри SVG белым */
}
</style>