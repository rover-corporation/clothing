<template>
  <Teleport to="body">
    <Transition name="modal-fade">
      <div v-if="isOpen" class="modal-overlay" @click.self="closeModal">
        <div class="modal-container">
          
          <button class="modal-close-btn" @click="closeModal" aria-label="Закрыть">
            &times;
          </button>

          <div v-if="$slots.header" class="modal-header">
            <slot name="header"></slot>
          </div>

          <div class="modal-body">
            <slot></slot>
          </div>

          <div v-if="$slots.footer" class="modal-footer">
            <slot name="footer"></slot>
          </div>

        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { onMounted, onUnmounted, watch } from 'vue'

const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true
  }
})

const emit = defineEmits(['close'])

const closeModal = () => {
  emit('close')
}

const handleEscape = (e) => {
  if (e.key === 'Escape' && props.isOpen) {
    closeModal()
  }
}

watch(() => props.isOpen, (newVal) => {
  if (newVal) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
})

onMounted(() => {
  document.addEventListener('keydown', handleEscape)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleEscape)
  document.body.style.overflow = ''
})
</script>

<style lang="scss" scoped>

@use './gModal.scss' as *;

</style>