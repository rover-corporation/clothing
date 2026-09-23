<template>
  <section class="faq-section" id="faq">
    <div class="container">
      <div class="faq-content">
        <div class="faq-text">
          <h2 class="section-heading">{{ heading }}</h2>
          <p class="faq-intro">{{ intro }}</p>

          <div class="faq-items">
            <div 
              v-for="(item, index) in faqItems" 
              :key="index" 
              class="faq-item"
            >
              <button 
                class="faq-question" 
                :class="{ active: openIndex === index }"
                @click="toggleQuestion(index)"
              >
                {{ item.question }}
              </button>
              
              <!-- Анимация теперь через CSS-класс .open -->
              <div 
                class="faq-answer" 
                :class="{ open: openIndex === index }"
              >
                <p>{{ item.answer }}</p>
              </div>
            </div>
          </div>

          <CtaButton to="#materials" variant="primary">
            Узнать больше о материалах
          </CtaButton>
        </div>

        <div class="faq-visual">
          <img 
            :src="image" 
            alt="Детали пошива одежды" 
            class="faq-image" 
            loading="lazy"
          >
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useFaqStore } from '~/stores/faqStore'

const store = useFaqStore()
const { heading, intro, image, faqItems } = storeToRefs(store)

// Состояние аккордеона
const openIndex = ref(null)

const toggleQuestion = (index) => {
  openIndex.value = openIndex.value === index ? null : index
}
</script>

<style lang="scss" scoped>
@use './FaqSection.scss' as *;
</style>