<template>
  <!-- Добавлен v-if="heading", чтобы секция не рендерилась пустой -->
  <section v-if="heading" class="creation-process" id="process">
    <div class="container">
      <div class="process-header">
        <h2 class="section-heading">{{ heading }}</h2>
        <p class="section-subtitle">{{ subtitle }}</p>
      </div>

      <div class="process-steps">
        <!-- В качестве ключа используем уникальный step.id, а index оставляем для цифр -->
        <div 
          v-for="(step, index) in steps" 
          :key="step.id" 
          class="process-step"
        >
          <!-- Вывод порядкового номера шага (1, 2, 3...) -->
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

// 🚨 ДОБАВЛЕНО: Загрузка данных на сервере (SSR)
const { data } = await useAsyncData('creation-process-data', async () => {
  return await store.loadProcessData()
})

// 🚨 ДОБАВЛЕНО: Синхронизация данных при переходе по страницам (клиентская гидратация)
if (data.value && !store.heading) {
  store.heading = data.value.heading
  store.subtitle = data.value.subtitle
  store.steps = data.value.steps
}
</script>

<style lang="scss" scoped>
@use './CreationProcess.scss' as *;
</style>