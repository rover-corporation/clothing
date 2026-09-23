<template>
    <Header/>
    <main>
        <slot/>
    </main>
    <Footer />
</template>

<script setup>
import Header from '~/components/Header/Header.vue';
import Footer from '~/components/Footer/Footer.vue';

</script>

<style lang="scss" scoped>


</style>