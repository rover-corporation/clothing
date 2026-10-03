<template>
  <section class="quality-section" id="materials">
    <div class="container">
      <div class="quality-content">
        <div class="quality-text">
          <h2 class="section-heading section-heading-light">{{ heading }}</h2>
          <p class="quality-description">{{ description }}</p>
          
          <ul class="quality-list">
            <li 
              v-for="(feature, index) in features" 
              :key="index" 
              class="quality-item"
            >
              {{ feature }}
            </li>
          </ul>

          <NuxtLink to="/#process">
            <CtaButton variant="primary">
              Подробнее о процессе
            </CtaButton>
          </NuxtLink >
          
        </div>

        <div class="quality-visual">
          <img 
            :src="image" 
            alt="Процесс создания одежды" 
            class="quality-image" 
            loading="lazy"
          >
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { useQualityDetailsStore } from '~/stores/qualityDetailsStore'

const store = useQualityDetailsStore()
const { heading, description, features, image } = storeToRefs(store)

const { data } = await useAsyncData('quality-details-data', async () => {
  return await store.loadQualityDetails()
})

if (data.value && !store.heading) {
  store.heading = data.value.heading;
  store.description = data.value.description;
  store.features = data.value.features;

  store.image = data.value.image;
}
</script>

<style lang="scss" scoped>
@use './QualityDetails.scss' as *;
</style>