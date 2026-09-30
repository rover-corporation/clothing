<template>
  <svg width="200" height="54" viewBox="0 0 529 94" fill="none" xmlns="http://www.w3.org/2000/svg">
    <!-- Для синих элементов меняем цвет в зависимости от пропса -->
    <path d="M69.5 28.5H56H54.5V24.5L53 20L48.5 15.5L43 12.5L32.5 11.5L27.5 13.5L22 18L17.5 24L15.5 32V61.5L17.5 68.5L22 74L26.5 78L33.5 80.5H43L50 79.5L55 75V56H37.5V45H70.5V79.5L67 83.5L61.5 88L55 91L50 92H40H30.5L24 91L17.5 88L12 83.5L7.5 79.5L3.5 74L0.5 63.5V28.5L3.5 20L7.5 13.5L12 8L20.5 3L27.5 0.5H43L50 1.5L56 4.5L61.5 8L65 12.5L68 18L69.5 28.5Z" :fill="isWhite ? '#FFFFFF' : '#3E73EE'" stroke="white"/>
    <path d="M91.5 65V0.5H106.5V66L108.5 72L112.5 76L118.5 79.5H123.5H133L140 76L143 73L145.5 65V0.5H161.5V65L160 73L154 82.5L145.5 88.5L134 92.5H122L112.5 90.5L104 87L97.5 80.5L93 73L91.5 65Z" :fill="isWhite ? '#FFFFFF' : '#3E73EE'" stroke="white"/>
    <path d="M271.5 2.5H255.5L287.5 92.5H302L334 2.5H318L294.5 74L271.5 2.5Z" :fill="isWhite ? '#FFFFFF' : '#3E73EE'" stroke="white"/>
    <path d="M361.5 2.5H346.5V92.5H361.5V2.5Z" :fill="isWhite ? '#FFFFFF' : '#3E73EE'" stroke="white"/>
    <path d="M445 33H430.5L430 26L429 24L425.5 19L421 15.5L416.5 14.5H405L401 17L397.5 20L394 24.5L391 33V63.5L392.5 70L395 74.5L399 78.5L405 82H413L420 81.5L424 78.5L427 74.5L429.5 70L430.5 63.5H445V70.5L443 76.5L440.5 82.5L435.5 87L430 91L424 93.5H401L394 90.5L388 87L384 82L379.5 74.5L376.5 67.5V33L378 24.5L382 17L386.5 11.5L391 7.5L397.5 4L403 2.5H416.5H423L429 5L433.5 7.5L437.5 11.5L441.5 17L445 24.5V33Z" :fill="isWhite ? '#FFFFFF' : '#3E73EE'" stroke="white"/>
    <path d="M457.5 93V3.5H473V43H513V3.5H528V93H513V55.5H473V93H457.5Z" :fill="isWhite ? '#FFFFFF' : '#3E73EE'" stroke="white"/>
    <path d="M181.5 92.5V2.5H223L230 4.5L238 9L244 17L245.5 25.5L244 37L238 44.5L232 48.5L238 51.5L244 58.5L246.5 64.5V83L248 88L250.5 92.5H235L231 86V77V64.5L226.5 58.5L219 55.5H196.5V92.5H181.5Z" :fill="isWhite ? '#FFFFFF' : '#3E73EE'" stroke="white"/>
    <!-- Этот элемент уже белый, оставляем как есть -->
    <path d="M194.5 46V17.5H219.5L224.5 20L229.5 28L228 39.5L219.5 46H194.5Z" :fill="isWhite ? '#111827' : '#ffffff'" stroke="white"/>
  </svg>
</template>

<script setup>
defineProps({
  isWhite: {
    type: Boolean,
    default: false
  }
})
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