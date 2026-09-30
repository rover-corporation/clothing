<template>
  <section class="studio-showcase" id="collections">
    <div class="container">
      
      <!-- Состояние загрузки -->
      <div v-if="store.isLoading" class="showcase-loading">
        <div class="loader"></div>
        Загрузка коллекции...
      </div>

      <!-- Состояние ошибки -->
      <div v-else-if="store.error" class="showcase-error">
        Ошибка: {{ store.error }}
      </div>

      <!-- Основной контент -->
      <div v-else-if="items.length > 0" class="showcase-content">
        
        <!-- Элегантный заголовок секции -->
        <header class="showcase-header">
          <h2 class="section-heading">{{ heading }}</h2>
          <p class="section-subtitle">{{ subtitle }}</p>
        </header>
        
        <div class="slider-wrapper">
          <!-- Сетка теперь снаружи анимации -->
          <div class="gallery-layout">
            
            <!-- Левая часть: Изображение -->
            <div class="slide-visual">
              <!-- Анимируем только картинку -->
              <transition name="slider-fade" mode="out-in">
                <img 
                  :key="currentIndex"
                  :src="currentItem.image" 
                  :alt="currentItem.title" 
                  class="gallery-image" 
                  loading="lazy"
                >
              </transition>
            </div>
            
            <!-- Правая часть: Контент -->
            <div class="slide-info">
              
              <!-- Анимируем только текст -->
              <transition name="slider-fade" mode="out-in">
                <div :key="currentIndex" class="info-content">
                  <span v-if="currentItem.badge" class="studio-badge">
                    {{ currentItem.badge }}
                  </span>
                  
                  <h3 class="slide-title">{{ currentItem.title }}</h3>
                  <p class="slide-description">{{ currentItem.description }}</p>
                  
                  <div class="studio-features-list">
                    <span 
                      v-for="(feature, i) in currentItem.features" 
                      :key="i"
                      class="studio-feature"
                    >
                      {{ feature }}
                    </span>
                  </div>
                </div>
              </transition>

              <!-- 🔥 Контролы теперь ВНЕ transition! Они не будут исчезать -->
              <div class="slider-controls">
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
                
                <div class="gallery-arrows">
                  <button class="arrow-btn" @click="prevSlide" aria-label="Предыдущий слайд">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                      <path d="M15 19l-7-7 7-7" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                  </button>
                  <button class="arrow-btn" @click="nextSlide" aria-label="Следующий слайд">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                      <path d="M9 5l7 7-7 7" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                  </button>
                </div>
              </div>

            </div>
          </div>
        </div>

      </div>

      <!-- Если данных нет вообще -->
      <div v-else class="showcase-empty">
        Коллекция пока пуста.
      </div>

    </div>
  </section>
</template>

<script setup>
// Твой оригинальный JS код остается ТУТ без изменений
import { storeToRefs } from 'pinia'
import { useShowcaseStore } from '~/stores/showcaseStore'
import { onMounted, onBeforeUnmount, ref, computed } from 'vue'

const store = useShowcaseStore()
const { heading, subtitle, items } = storeToRefs(store)

const currentIndex = ref(0)
const currentItem = computed(() => items.value[currentIndex.value] || {})

const nextSlide = () => {
  if (items.value.length === 0) return
  currentIndex.value = (currentIndex.value + 1) % items.value.length
}

const prevSlide = () => {
  if (items.value.length === 0) return
  currentIndex.value = currentIndex.value === 0 
    ? items.value.length - 1 
    : currentIndex.value - 1
}

const onKey = (e) => {
  if (e.key === 'ArrowLeft') prevSlide()
  if (e.key === 'ArrowRight') nextSlide()
}

onMounted(() => window.addEventListener('keydown', onKey))
onBeforeUnmount(() => window.removeEventListener('keydown', onKey))

await useAsyncData('collection-showcase-data', async () => {
  await store.loadShowcaseData()
})
</script>
<style lang="scss" scoped>
@use './CollectionShowcase.scss' as *;

/* Базовые стили для состояний, если их нет в вашем SCSS */
.showcase-loading, .showcase-error, .showcase-empty {
  padding: 100px 20px;
  text-align: center;
  font-size: 18px;
  color: #666;
}
.showcase-error {
  color: #ef4444;
}
</style>