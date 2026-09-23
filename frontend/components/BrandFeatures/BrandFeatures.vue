<template>
  <section class="features-grid" id="about">
    <div class="container">
      <div class="features-header">
        <h2 class="section-heading">{{ heading }}</h2>
        <p class="section-subtitle">{{ subtitle }}</p>
      </div>
      
      <div class="features-container">
        <div 
          v-for="(item, index) in features" 
          :key="index" 
          class="feature-card"
        >
          <img 
            :src="item.image" 
            :alt="item.title" 
            class="feature-image" 
            loading="lazy"
          >
          <h3 class="feature-title">{{ item.title }}</h3>
          <p class="feature-description">{{ item.description }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { useBrandFeaturesStore } from '~/stores/brandFeaturesStore'

const store = useBrandFeaturesStore()
const { heading, subtitle, features } = storeToRefs(store)
</script>



<style lang="scss" scoped>
@use './BrandFeatures.scss' as *;
</style>