<template>
  <!-- v-if предотвращает рендер пустой секции, если данные еще не прилетели -->

   

  <section v-if="heroData.title" class="hero-banner" id="about">
    <div class="container">
      <div class="hero-content">
        <h1 class="hero-title">{{ heroData.title }}</h1>
        <p class="hero-text">{{ heroData.text }}</p>
        
        <div class="hero-actions">
          <NuxtLink v-for="(btn, index) in heroData.buttons" :key="index" :to="btn.to">
            <CtaButton
              
              
              :variant="btn.variant"
              @click="() => console.log('Клик по:', btn.label)"
            >
              {{ btn.label }}
            </CtaButton>
          </NuxtLink>
          
        </div>
      </div>

      <div class="hero-visual">
        <!-- Убедитесь, что image содержит данные перед рендером img -->
        <img 
          v-if="heroData.image"
          :src="heroData.image" 
          alt="Hero Banner" 
          class="hero-image" 
          loading="lazy"
        />
      </div>
    </div>
  </section>
</template>

<script setup>
import { storeToRefs } from 'pinia'
// Укажите правильный путь к вашему стору
import { useHeroStore } from '@/stores/mainBannerHero' 

const heroStore = useHeroStore()
// storeToRefs позволяет использовать heroData напрямую в <template>
const { heroData } = storeToRefs(heroStore)

// Обязательный вызов для Nuxt 3 (SSR-загрузка данных перед отрисовкой HTML)
await useAsyncData('hero-banner-data', async () => {
  await heroStore.loadHeroData();
  return true;
});

console.log(heroData.value)
</script>

<style lang="scss" scoped>
@use './HeroBanner.scss' as *;
</style>