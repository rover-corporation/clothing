<template>
  <Legal :content="content" />
</template>

<script setup>
import Legal from '~/components/Legal/Legal.vue'
import { storeToRefs } from 'pinia'
import { usePrivacyStore } from '~/stores/privacyStore'


definePageMeta({
layout: 'lay'
})

const { content } = storeToRefs(usePrivacyStore())
</script>