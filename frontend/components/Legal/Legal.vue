<template>
  <section class="legal-page">
    <div class="container">
      <div class="legal-content">
        <h1 class="legal-title">{{ content.pageTitle }}</h1>
        <p class="legal-date">Последнее обновление: {{ content.lastUpdated }}</p>
        
        <div class="legal-sections">
          <div v-for="(section, index) in content.sections" :key="index" class="legal-section">
            <h2 class="section-title">{{ section.title }}</h2>
            <div class="section-text">
              <template v-if="Array.isArray(section.content)">
                <p v-for="(para, i) in section.content" :key="i">{{ para }}</p>
              </template>
              <template v-else>
                <p>{{ section.content }}</p>
              </template>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
defineProps({
  content: {
    type: Object,
    required: true,
    validator: (val) => val.pageTitle && val.sections
  }
})
</script>

<style lang="scss" scoped>
@use './Legal.scss' as *;
</style>