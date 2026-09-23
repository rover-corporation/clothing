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
          <NuxtLink :to="item.path" class="nav-item" v-for="item in headerLinks">{{ item.name }}</NuxtLink>
          
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
    const {headerLinks} = headerStore
    console.log(headerLinks)

    const isMenuOpen = ref(false)

    const toggleMenu = () => {
    isMenuOpen.value = !isMenuOpen.value
    }
</script>

<style lang="scss" scoped>
    @use "./Header.scss" as *;
</style>