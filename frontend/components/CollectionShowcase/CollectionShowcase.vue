<template>
  <section class="studio-showcase" id="collections">
    <div class="container">
      <div class="showcase-content">
        <h2 class="section-heading">{{ heading }}</h2>
        <p class="section-subtitle">{{ subtitle }}</p>
        
        <!-- Слайдер -->
        <div class="studio-gallery">
          <transition name="fade" mode="out-in">
            <div 
              :key="currentIndex"
              class="gallery-slide"
            >
              <img 
                :src="items[currentIndex].image" 
                :alt="items[currentIndex].title" 
                class="gallery-image" 
                loading="lazy"
              >
              <div class="gallery-info">
                <span v-if="items[currentIndex].badge" class="studio-badge">
                  {{ items[currentIndex].badge }}
                </span>
                <h3>{{ items[currentIndex].title }}</h3>
                <p>{{ items[currentIndex].description }}</p>
                
                <div class="studio-features-list">
                  <span 
                    v-for="(feature, i) in items[currentIndex].features" 
                    :key="i"
                    class="studio-feature"
                  >
                    {{ feature }}
                  </span>
                </div>
                
                <div class="studio-card-actions">
                  <CtaButton  variant="primary">
                    Смотреть коллекцию
                  </CtaButton>
                  <CtaButton  variant="secondary">
                    Подробнее
                  </CtaButton>
                </div>
              </div>
            </div>
          </transition>
        </div>
        
        <!-- Контролы слайдера -->
        <div class="gallery-controls">
          <button 
            class="gallery-prev" 
            @click="prevSlide"
            aria-label="Предыдущий слайд"
          >
            ← Назад
          </button>
          <button 
            class="gallery-next" 
            @click="nextSlide"
            aria-label="Следующий слайд"
          >
            Вперёд →
          </button>
        </div>
        
        <!-- Индикаторы слайдов -->
        <div class="gallery-dots">
          <button
            v-for="(item, index) in items"
            :key="index"
            class="gallery-dot"
            :class="{ active: index === currentIndex }"
            @click="currentIndex = index"
            :aria-label="`Перейти к слайду ${index + 1}`"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { useShowcaseStore } from '~/stores/showcaseStore'
import { onMounted, onBeforeUnmount, ref } from 'vue'

const currentIndex = ref(0);

const store = useShowcaseStore()
const { heading, subtitle, items } = storeToRefs(store)

const onKey = (e) => {
  if (e.key === 'ArrowLeft') prevSlide()
  if (e.key === 'ArrowRight') nextSlide()
}
onMounted(() => window.addEventListener('keydown', onKey))
onBeforeUnmount(() => window.removeEventListener('keydown', onKey))

    const nextSlide = () => {
        currentIndex.value = (currentIndex.value + 1) % items.value.length;
    };
    
    const prevSlide = () => {
        currentIndex.value = currentIndex.value === 0 
            ? items.value.length - 1 
            : currentIndex.value - 1;
    };

</script>

<style lang="scss" scoped>
@use './CollectionShowcase.scss' as *;
</style>