<template>
  <section class="creation-process" id="process">
    <div class="container">
      <div class="process-header">
        <h2 class="section-heading">{{ heading }}</h2>
        <p class="section-subtitle">{{ subtitle }}</p>
      </div>

      <div class="process-steps">
        <div 
          v-for="(step, index) in steps" 
          :key="index" 
          class="process-step"
        >
          <div class="step-number">{{ index + 1 }}</div>
          <h3 class="step-title">{{ step.title }}</h3>
          <p class="step-description">{{ step.description }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { useCreationProcessStore } from '~/stores/creationProcessStore'

const store = useCreationProcessStore()
const { heading, subtitle, steps } = storeToRefs(store)
</script>

<style lang="scss" scoped>
@use './CreationProcess.scss' as *;
</style>