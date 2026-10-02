<template>

   

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
import { useHeroStore } from '@/stores/mainBannerHero' 

const heroStore = useHeroStore()
const { heroData } = storeToRefs(heroStore)

await useAsyncData('hero-banner-data', async () => {
  await heroStore.loadHeroData();
  return true;
});


</script>

<style lang="scss" scoped>
@use './HeroBanner.scss' as *;
</style>