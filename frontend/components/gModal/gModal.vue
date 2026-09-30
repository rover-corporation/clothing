<template>
  <!-- Teleport переносит HTML модалки прямо в конец тега <body> -->
  <Teleport to="body">
    <Transition name="modal-fade">
      <!-- @click.self позволяет закрыть модалку по клику на затемненный фон (overlay) -->
      <div v-if="isOpen" class="modal-overlay" @click.self="closeModal">
        <div class="modal-container">
          
          <!-- Кнопка закрытия (крестик) -->
          <button class="modal-close-btn" @click="closeModal" aria-label="Закрыть">
            &times;
          </button>

          <!-- Слот для заголовка (рендерится только если в него что-то передали) -->
          <div v-if="$slots.header" class="modal-header">
            <slot name="header"></slot>
          </div>

          <!-- Основной контент (дефолтный слот) -->
          <div class="modal-body">
            <slot></slot>
          </div>

          <!-- Слот для футера (например, кнопок "Сохранить", "Отмена") -->
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

// Закрытие модалки по кнопке ESC
const handleEscape = (e) => {
  if (e.key === 'Escape' && props.isOpen) {
    closeModal()
  }
}

// Блокировка скролла страницы при открытой модалке
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
  document.body.style.overflow = '' // Очистка на случай уничтожения компонента
})
</script>

<style lang="scss" scoped>

@use './gModal.scss' as *;

</style>