<template>
  <div>
    
    <HeroBanner />
    <BrandFeatures />
    <CollectionShowcase />
    <QualityDetails />
    <CreationProcess />
    <FaqSection />

    
  </div>
</template>

<script setup>




import HeroBanner from '~/components/Banner/HeroBanner.vue';
import BrandFeatures from '~/components/BrandFeatures/BrandFeatures.vue';
import CollectionShowcase from '~/components/CollectionShowcase/CollectionShowcase.vue'
import QualityDetails from '~/components/QualityDetails/QualityDetails.vue'
import CreationProcess from '~/components/CreationProcess/CreationProcess.vue'
import FaqSection from '~/components/FaqSection/FaqSection.vue'
import { useHead } from 'nuxt/app';

useHead({
  title: 'Gurvich - главная страница',
  meta: [
    {name: 'description', content: 'Погрузитесь в мир Gurvich Fashion'}
  ]
})


definePageMeta({
layout: 'lay'
})
</script>

<style lang="scss" scoped>

</style>