<template>
    <ProductsMain/>
</template>
<script setup>

import ProductsMain from '@/components/ProductsMain/ProductsMain.vue';
import { useHead } from 'nuxt/app';



useHead({
  title: 'Gurvich - Каталог',
  meta: [
    {name: 'description', content: 'Ознакомьтесь с нашей коллекцией '}
  ]
})



definePageMeta({
layout: 'lay'
})


</script>

<style lang="scss" scoped>


</style>