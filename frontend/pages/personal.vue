<template>
  <Legal :content="content" :title="pageTitle" :last-updated="lastUpdated" />
</template>

<script setup>
import Legal from '~/components/Legal/Legal.vue'
import { storeToRefs } from 'pinia'
import { usePersonalStore } from '~/stores/personalStore'
import { useHead } from 'nuxt/app'

const personalStore = usePersonalStore()

await useAsyncData('personal-data', async () => {
  await personalStore.loadPolicyData()
  return true
})


definePageMeta({
layout: 'lay'
})


const { content, pageTitle, lastUpdated } = storeToRefs(personalStore)
console.log(content.value, pageTitle.value, lastUpdated.value)


useHead({
  title: 'Gurvich -  Политика обработки персональных данных',
  meta: [
    {name: 'description', content: 'Ознакомьтесь с нашей политикой обработкти персональных данных'}
  ]
})
</script>