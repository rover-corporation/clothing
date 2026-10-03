<template>
  <section v-if="heading" class="faq-section" id="faq">
    <div class="container">
      <div class="faq-content">
        <div class="faq-text">
          <h2 class="section-heading">{{ heading }}</h2>
          <p class="faq-intro">{{ intro }}</p>

          <div class="faq-items">
            <div 
              v-for="item in faqItems" 
              :key="item.id" 
              class="faq-item"
            >
              <button 
                class="faq-question" 
                :class="{ active: openId === item.id }"
                @click="toggleQuestion(item.id)"
              >
                <span>{{ item.question }}</span>
                
                <svg class="faq-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
                  <path d="M12 5v14M5 12h14" />
                </svg>
              </button>
              
              <div 
                class="faq-answer" 
                :class="{ open: openId === item.id }"
              >
                <p>{{ item.answer }}</p>
              </div>
            </div>
          </div>

          <NuxtLink to="/#materials">
            <CtaButton  variant="primary">
              Узнать больше о материалах
            </CtaButton>
          </NuxtLink>

          
        </div>

        <div class="faq-visual">
          <img 
            v-if="image"
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

const { data } = await useAsyncData('faq-data', async () => {
  return await store.loadFaqData()
})

if (data.value && !store.heading) {
  store.heading = data.value.heading;
  store.intro = data.value.intro;
  store.faqItems = data.value.faqItems;
  store.image = data.value.image;

  
}

const openId = ref(null)

const toggleQuestion = (id) => {
  openId.value = openId.value === id ? null : id
}
</script>

<style lang="scss" scoped>
@use './FaqSection.scss' as *;
</style>