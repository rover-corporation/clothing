<template>
  <section class="hero-banner" id="about">
    <div class="container">
      <div class="hero-content">
        <h1 class="hero-title">{{ heroData.title }}</h1>
        <p class="hero-text">{{ heroData.text }}</p>
        
        <div class="hero-actions">
        <CtaButton
        v-for="(btn, index) in heroData.buttons"
        :key="index"
        :variant="btn.variant"
        @click="() => console.log('Клик по:', btn.label)"
        >
        {{ btn.label }}
        </CtaButton>
        </div>
      </div>

      <div class="hero-visual">
        <img 
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
import { useHeroStore } from '~/stores/mainBannerHero'

const heroStore = useHeroStore()
// ✅ Обязательно storeToRefs, чтобы данные оставались реактивными
const { heroData } = storeToRefs(heroStore)
</script>

<style lang="scss" scoped>
@use './HeroBanner.scss' as *;
</style>