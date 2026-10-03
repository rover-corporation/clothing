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

const headerStore = useHeaderStore()

await useAsyncData('header-links-data', async () => {
  await headerStore.loadHeaderLinks()
  return true 
})



const isMenuOpen = ref(false)

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}
const closeMenuAfterLink = () =>
{
  isMenuOpen.value = false
}


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