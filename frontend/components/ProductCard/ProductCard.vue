<template>
    <div class="prod">
        <div class="prod-img">
            <img :src="prodObj.img" alt="">
        </div>
        <h3 class="prod-title">
            {{ prodObj.name }}
        </h3>
        <div class="prod-price">
            {{ prodObj.price }}
        </div>
        <CtaButton>
            Связаться
        </CtaButton>
        
    </div>
</template>
<script setup>

import CtaButton from '@/components/CtaButton/CtaButton.vue';

const props = defineProps({
    prodObj:
    {
        type: Object,
        required: true,
        default: () => ({})
    },
})

</script>
<style lang="scss" scoped>

@use './ProductCard.scss'

</style>