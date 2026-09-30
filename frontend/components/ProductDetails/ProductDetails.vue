<template>
  <div v-if="product" class="product-details">
    

    <div class="product-top-row">
        <div class="product-gallery">
      <div class="main-image-container zoomable" @click="openGallery">
        <!-- Кнопка "Назад" -->
        <button 
          v-if="product.images && product.images.length > 1"
          class="slider-nav prev" 
          @click.stop="prevImage"
          aria-label="Предыдущее фото"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M15 18l-6-6 6-6"/></svg>
        </button>

        <!-- Главное фото -->
        <transition name="fade" mode="out-in">
          <img 
            v-if="product.images && product.images.length > 0"
            :key="currentImageIndex"
            :src="product.images[currentImageIndex]" 
            :alt="`${product.title} - фото ${currentImageIndex + 1}`" 
            class="main-image"
          />
          <img 
            v-else 
            src="https://via.placeholder.com/600x800?text=Нет+фото" 
            class="main-image empty"
          />
        </transition>

        <!-- Кнопка "Вперед" -->
        <button 
          v-if="product.images && product.images.length > 1"
          class="slider-nav next" 
          @click.stop="nextImage"
          aria-label="Следующее фото"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M9 18l6-6-6-6"/></svg>
        </button>
      </div>

      <!-- Лента миниатюр -->
      <div v-if="product.images && product.images.length > 1" class="thumbnails-track">
        <button 
          v-for="(img, index) in product.images" 
          :key="index"
          class="thumbnail"
          :class="{ active: currentImageIndex === index }"
          @click="currentImageIndex = index"
          :aria-label="`Посмотреть фото ${index + 1}`"
        >
          <img :src="img" :alt="`Миниатюра ${index + 1}`" loading="lazy" />
        </button>
      </div>
    </div>

    <!-- === ПРАВАЯ КОЛОНКА: ИНФОРМАЦИЯ === -->
    <div class="product-info">
      <div class="info-header">
        <h1 class="title">{{ product.title }}</h1>
        <p class="article">Арт. {{ product.id }}</p>
      </div>
      
      <div class="price-block">
        <span class="price">{{ product.price.toLocaleString('ru-RU') }} ₽</span>
      </div>

      <div class="divider"></div>

      <!-- Характеристики (Цвет и Состав) -->
      <div class="attributes-block">
        <div v-if="product.color" class="attribute">
          <span class="attr-label">Цвет:</span>
          <span class="attr-value">{{ product.color }}</span>
        </div>
        <div v-if="product.materials && product.materials.length > 0" class="attribute">
          <span class="attr-label">Состав:</span>
          <span class="attr-value">{{ product.materials.join(', ') }}</span>
        </div>
      </div>

      <div class="description-block">
        <p>{{ product.description }}</p>
      </div>

      <!-- Кнопка добавления -->
      <div class="action-block">
        <button class="btn-primary" @click="isModalOpen = true">
          Заказать 
        </button>
      </div>
    </div>
    </div>
    <!-- === ЛЕВАЯ КОЛОНКА: ГАЛЕРЕЯ === -->
    

    <div v-if="product.detailedDescription" class="product-detailed-section">
      <div class="detailed-header">
        <h2>О товаре</h2>
      </div>
      
      <!-- v-html вставляет сгенерированный HTML из Markdown -->
      <div 
        class="detailed-content" 
        v-html="renderMarkdown(product.detailedDescription)"
      ></div>
    </div>

    <!-- === МОДАЛЬНОЕ ОКНО === -->
    <gModal :isOpen="isModalOpen" @close="closeModal">
      <template #header>
        <span class="modal-title" v-if="!isSuccess">Оформление заказа</span>
      </template>

      <!-- Шаг 1: Форма заказа -->
      <form v-if="!isSuccess" ref="orderFormRef" @submit.prevent="submitOrder" class="order-form">
        
        <div class="form-summary">
          <div class="summary-row">
            <span>Товар</span>
            <strong>{{ product.title }}</strong>
          </div>
          <div class="summary-row">
            <span>Итого</span>
            <strong>{{ product.price.toLocaleString('ru-RU') }} ₽</strong>
          </div>
        </div>

        <div class="inputs-group">
          <div class="_field" data-call="empty">
            <input type="text" v-model="formData.name" placeholder="Ваше имя" />
            <div class="_error-msg"></div>
          </div>

          <div class="_field" data-call="empty phone">
            <input type="tel" v-model="formData.phone" v-maska data-maska="+7-###-###-##-##" placeholder="+7-999-999-99-99" />
            <div class="_error-msg"></div>
          </div>
        </div>

        <div class="form-actions">
          <button type="submit" class="btn-primary full-width" :disabled="ordersStore.isSubmitting">
            {{ ordersStore.isSubmitting ? 'Обработка...' : 'Подтвердить заказ' }}
          </button>
        </div>
      </form>

      <!-- Шаг 2: Успех -->
      <div v-else class="success-message">
        <div class="success-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
            <polyline points="22 4 12 14.01 9 11.01"></polyline>
          </svg>
        </div>
        <h3>Спасибо за заказ</h3>
        <p>Ваш заказ успешно принят. Наш менеджер свяжется с вами по номеру <br><strong>{{ formData.phone }}</strong> для уточнения деталей доставки.</p>
        
        <button type="button" class="btn-outline mt-4" @click="closeModal">
          Продолжить покупки
        </button>
      </div>
    </gModal>

    <ClientOnly>

      <Teleport to="body">
        <transition name="fade">
          <div v-if="isGalleryOpen" class="lightbox-overlay" @click.self="closeGallery">
            
            <!-- Кнопка закрытия -->
            <button class="lightbox-close" @click="closeGallery" aria-label="Закрыть">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M18 6L6 18M6 6l12 12"/></svg>
            </button>
  
            <!-- Счетчик -->
            <div v-if="product.images.length > 1" class="lightbox-counter">
              {{ currentImageIndex + 1 }} / {{ product.images.length }}
            </div>
  
            <!-- Кнопка Назад -->
            <button v-if="product.images.length > 1" class="lightbox-nav prev" @click.stop="prevImage">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M15 18l-6-6 6-6"/></svg>
            </button>
  
            <!-- Сама картинка (Анимированная) -->
            <transition name="fade" mode="out-in">
              <img 
                :key="currentImageIndex" 
                :src="product.images[currentImageIndex]" 
                class="lightbox-img" 
                @click.stop
              />
            </transition>
  
            <!-- Кнопка Вперед -->
            <button v-if="product.images.length > 1" class="lightbox-nav next" @click.stop="nextImage">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M9 18l6-6-6-6"/></svg>
            </button>
  
          </div>
        </transition>
      </Teleport>
    </ClientOnly>

  </div>
</template>

<script setup>
import { ref, reactive, onMounted, onBeforeUnmount, watch } from 'vue'; 
import { vMaska } from 'maska/vue';
import gModal from '@/components/gModal/gModal.vue';
import { useOrdersStore } from '~/stores/orders/orderStore';
import { Validatorr } from '@/helpers/validator'; 
import markdownit from 'markdown-it';

const props = defineProps({
  product: { type: Object, required: true }
});

const md = markdownit({
  html: true,
  breaks: true
});

const renderMarkdown = (text) => {
  if (!text) return '';
  return md.render(text);
};

const currentImageIndex = ref(0)
const nextImage = () => {
  if (props.product.images?.length) {
    currentImageIndex.value = (currentImageIndex.value + 1) % props.product.images.length
  }
}
const prevImage = () => {
  if (props.product.images?.length) {
    currentImageIndex.value = currentImageIndex.value === 0 
      ? props.product.images.length - 1 
      : currentImageIndex.value - 1
  }
}

const isGalleryOpen = ref(false);

const openGallery = () => {
  if (props.product.images?.length > 0) {
    isGalleryOpen.value = true;
  }
};

const closeGallery = () => {
  isGalleryOpen.value = false;
};

// Блокировка скролла сайта при открытой галерее
watch(isGalleryOpen, (isOpen) => {
  if (isOpen) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = '';
  }
});

// Управление клавиатурой (только если галерея открыта)
const handleKeydown = (e) => {
  if (!isGalleryOpen.value) return;
  
  if (e.key === 'Escape') closeGallery();
  if (e.key === 'ArrowLeft') prevImage();
  if (e.key === 'ArrowRight') nextImage();
};

onMounted(() => window.addEventListener('keydown', handleKeydown));
onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleKeydown);
  document.body.style.overflow = ''; // На всякий случай возвращаем скролл
});

const ordersStore = useOrdersStore();
const isModalOpen = ref(false);
const isSuccess = ref(false);
const orderFormRef = ref(null);

const formData = reactive({
  name: '',
  phone: '',
});

const closeModal = () => {
  isModalOpen.value = false;
  setTimeout(() => {
    isSuccess.value = false;
    formData.name = '';
    formData.phone = '';
  }, 300);
};

const submitOrder = async () => {
  if (!orderFormRef.value) return;
  const validator = new Validatorr(orderFormRef.value);
  
  if (validator.validate()) {
    const orderPayload = {
      customerName: formData.name,
      customerPhone: formData.phone,
      productId: props.product.id,
      productTitle: props.product.title,
      price: props.product.price
    };
    
    try {
      await ordersStore.submitOrder(orderPayload);
      isSuccess.value = true; 
    } catch (error) {
      alert('Произошла ошибка при отправке. Пожалуйста, попробуйте позже.');
    }
  }
}
</script>

<style lang="scss" scoped>
@use './ProductDetails.scss' as *;
</style>