<template>
  <svg width="200" height="40" viewBox="0 0 200 40" xmlns="http://www.w3.org/2000/svg">
    <rect x="10" y="8" width="35" height="24" rx="4" fill="#2563eb" opacity="0.9"/>
    <circle cx="27" cy="20" r="6" fill="white" opacity="0.8"/>
    <text x="55" y="26" font-family="'Montserrat', sans-serif" font-size="18" font-weight="700" fill="currentColor">Brand</text>
    <text x="115" y="26" font-family="'Montserrat', sans-serif" font-size="18" font-weight="400" fill="currentColor">Clothing</text>
  </svg>
</template>

<script setup>
</script>

<style lang="scss" scoped>
svg {
  display: block;
  transition: opacity 0.3s ease;
  &:hover {
    opacity: 0.8;
  }
}
</style>