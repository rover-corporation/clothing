<template>
  <Legal :content="content" />
</template>

<script setup>
import Legal from '~/components/Legal/Legal.vue'
import { storeToRefs } from 'pinia'
import { usePersonalStore } from '~/stores/personalStore'
import { useHead } from 'nuxt/app'

const personalStore = usePersonalStore()

await useAsyncData('personal-data', async () => {
  await personalStore.fetchPersonal()
  return true
})


definePageMeta({
layout: 'lay'
})


const { content } = storeToRefs(personalStore)


useHead({
  title: 'Gurvich -  Политика обработки персональных данных',
  meta: [
    {name: 'description', content: 'Ознакомьтесь с нашей политикой обработкти персональных данных'}
  ]
})
</script>