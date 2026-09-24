<template>
  <Legal :content="content" />
</template>

<script setup>
import Legal from '~/components/Legal/Legal.vue'
import { storeToRefs } from 'pinia'
import { usePersonalStore } from '~/stores/personalStore'


definePageMeta({
layout: 'lay'
})

const { content } = storeToRefs(usePersonalStore())
</script>