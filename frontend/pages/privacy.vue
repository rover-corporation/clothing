<template>
  <Legal :content="content" />
</template>

<script setup>
import Legal from '~/components/Legal/Legal.vue'
import { storeToRefs } from 'pinia'
import { usePrivacyStore } from '~/stores/privacyStore'
import { useHead } from 'nuxt/app'

const privacyStore = usePrivacyStore()

// Запрашиваем данные перед рендерингом
await useAsyncData('privacy-data', async () => {
  await privacyStore.fetchPrivacyPolicy()
  return true
})

console.log(privacyStore.content)


definePageMeta({
layout: 'lay'
})

const { content } = storeToRefs(usePrivacyStore())


useHead({
  title: 'Gurvich -  Политика конфиденциальности ',
  meta: [
    {name: 'description', content: 'Ознакомьтесь с нашей политикой конфиденциальности'}
  ]
})
</script>