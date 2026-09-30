<template>
  <header class="main-header">
    <div class="container">
      <nav class="nav-container">
        <div class="logo-wrapper">
          <NuxtLink to="/" class="logo-link">
            <Logo/>
          </NuxtLink>
        </div>

        <div class="nav-menu" :class="{ 'nav-menu--active': isMenuOpen }">
          <!-- 1. Добавлено обращение к headerStore.headerLinks -->
          <!-- 2. Добавлен обязательный параметр :key="item.id" -->
          <NuxtLink 
            v-for="item in headerStore.headerLinks" 
            :key="item.id"
            :to="item.path" 
            @click="closeMenuAfterLink"
            class="nav-item"
          >
            {{ item.name }}
          </NuxtLink>
        </div>

        <div
          class="burger-toggle"
          :class="{ 'burger-toggle--active': isMenuOpen }"
          @click="toggleMenu"
        >
          <span class="burger-line"></span>
          <span class="burger-line"></span>
          <span class="burger-line"></span>
        </div>
      </nav>
    </div>
  </header>
</template>

<script setup>
import Logo from '~/assets/svg/Logo.vue';
import { useHeaderStore } from '~/stores/headerStore';
// ref и watch можно не импортировать руками, Nuxt делает это автоматически (Auto-imports)
// но если импортировали — ничего страшного, это не ошибка

const headerStore = useHeaderStore()

// Вызываем загрузку данных перед рендерингом (SSR)
await useAsyncData('header-links-data', async () => {
  await headerStore.loadHeaderLinks()
  return true 
})



// Логика бургер-меню
const isMenuOpen = ref(false)

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}
const closeMenuAfterLink = () =>
{
  isMenuOpen.value = false
}


// Блокировка скролла при открытом меню
watch(isMenuOpen, (isOpen) => {
  if (isOpen) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = '';
  }
})
</script>

<style lang="scss" scoped>
@use "./Header.scss" as *;
</style>