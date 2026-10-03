<template>
  <div class="legal-page container ">
    <!-- <div v-if="store.isLoading">Загрузка документа...</div>
    <div v-else-if="store.error">Ошибка: {{ store.error }}</div> -->
    
    <div  class="legal-content-wrapper">
      <h1 class="legal-title">{{ props.title }}</h1>
      <p class="legal-date">Последнее обновление: {{ props.lastUpdated }}</p>
      
      <!-- Парсим Markdown в HTML -->
      <div 
        class="markdown-body" 
        v-html="renderMarkdown(props.content)"
      ></div>
    </div>
  </div>
</template>

<script setup>
import markdownit from 'markdown-it';

const md = markdownit({ html: true, breaks: true });
const renderMarkdown = (text) => text ? md.render(text) : '';


const props = defineProps({
  content: {
    type: Object,
    required: true,
    validator: (val) => val.pageTitle && val.sections
  },
  title: {
    type: String,
    required: true,
  },
  lastUpdated: 
  {
    type: String,
    required: true
  }
})




// console.log(props.content)
</script>

<style lang="scss" scoped>
@use './Legal.scss' as *;


</style>