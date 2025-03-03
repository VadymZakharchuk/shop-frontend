<template>
  <div class="product-details">
    <div
      v-if="isReady"
      class="product-details__wrap"
    >
      <img
        class="product-details__image"
        :src="imageUrl(activeProduct.image)"
        :alt="activeProduct[`name_${locale}`]"
      >
      <div class="product-details__content">
        <h1 class="product-details__title">
          <span>{{ activeProduct[`name_${locale}`] }}</span>
        </h1>
        <p class="product-details__code">
          {{ t('code') }}: {{ activeProduct.code }}
        </p>
        <p class="product-details__offer">
          <span class="mr-8">{{ activeProduct.price }}</span>
          <span
            v-if="activeProduct.discount"
            class="text-gray-400 line-through"
          >
            {{ activeProduct.fullPrice }}
          </span>
          <span v-else> &nbsp; &nbsp; </span>
        </p>
        <div class="product-details__description">
          <span class="text-gray-400 my-2">{{ t('description') }}:</span>
          <div>{{ activeProduct[`description_${locale}`] }}</div>
        </div>
        <div class="product-details__views">
          <svg
            fill="currentColor"
            viewBox="0 0 32 32"
            stroke="currentColor"
          >
            <g stroke-width="0" />
            <g
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <g>
              <path d="M16.108 10.044c-3.313 0-6 2.687-6 6s2.687 6 6 6 6-2.686 6-6-2.686-6-6-6zM16.108 20.044c-2.206 0-4.046-1.838-4.046-4.044s1.794-4 4-4c2.206 0 4 1.794 4 4s-1.748 4.044-3.954 4.044zM31.99 15.768c-0.012-0.050-0.006-0.104-0.021-0.153-0.006-0.021-0.020-0.033-0.027-0.051-0.011-0.028-0.008-0.062-0.023-0.089-2.909-6.66-9.177-10.492-15.857-10.492s-13.074 3.826-15.984 10.486c-0.012 0.028-0.010 0.057-0.021 0.089-0.007 0.020-0.021 0.030-0.028 0.049-0.015 0.050-0.009 0.103-0.019 0.154-0.018 0.090-0.035 0.178-0.035 0.269s0.017 0.177 0.035 0.268c0.010 0.050 0.003 0.105 0.019 0.152 0.006 0.023 0.021 0.032 0.028 0.052 0.010 0.027 0.008 0.061 0.021 0.089 2.91 6.658 9.242 10.428 15.922 10.428s13.011-3.762 15.92-10.422c0.015-0.029 0.012-0.058 0.023-0.090 0.007-0.017 0.020-0.030 0.026-0.050 0.015-0.049 0.011-0.102 0.021-0.154 0.018-0.090 0.034-0.177 0.034-0.27 0-0.088-0.017-0.175-0.035-0.266zM16 25.019c-5.665 0-11.242-2.986-13.982-8.99 2.714-5.983 8.365-9.047 14.044-9.047 5.678 0 11.203 3.067 13.918 9.053-2.713 5.982-8.301 8.984-13.981 8.984z" />
            </g>
          </svg>
          <span class="ml-2">{{ activeProduct.views_count }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {computed, defineProps, ref} from 'vue';
import { useRoute } from 'vue-router';
import { useI18n } from "vue-i18n";
import { getProductAndAnalogs, increaseCounter} from "@/services/products.service.js";
import { imageUrl } from "@/utils/imageUrl.js";
import {toCurrencyString} from "@/utils/toCurrencyString.js";
import Cookies from "js-cookie";
import {jwtDecode} from "jwt-decode";

defineProps({
  categoryId: {
    type: Number,
    required: true,
  },
});
const route = useRoute()
const { locale, t } = useI18n({
  messages: {
    en: {
      name: "Name",
      description: "Description",
      price: "Price",
      views: "Views",
      code: "Code",
    },
    uk: {
      name: "Назва",
      description: "Опис",
      price: "Ціна",
      views: "Перегляди",
      code: "Код товару",
    },
  }
})

const isReady = ref(false)
const product = ref({})
const pIndex = ref(0)

const activeProduct = computed(() => isReady.value ? product.value[pIndex.value] : {})

const getProductData = async () => {
  product.value = await getProductAndAnalogs(locale.value, route.params.id)
  product.value.forEach(item => {
    item.fullPrice = toCurrencyString(+item.price + +item.discount, 1, locale.value)
    item.price = toCurrencyString(item.price, locale.value)
    return { ...item }
  })
  const token = Cookies.get('auth-token')
  const decoded = token ? jwtDecode(token) : undefined
  const isAdmin = decoded ? !!decoded.isAdmin : false
  await increaseCounter(route.params.id, isAdmin)
  isReady.value = true
};
getProductData()
</script>

<style scoped lang="scss">
.product-details {
  @apply w-full h-fit min-h-screen flex flex-col items-start justify-start;
  @apply text-black text-lg font-roboto pt-12 px-[116px];

  &__wrap {
    @apply flex flex-row items-start justify-start font-roboto;
  }
  &__title {
    @apply text-2xl text-black font-bold mb-4;
  }
  img {
    @apply w-[40%] h-auto object-cover mr-8 rounded-lg shadow-lg;
  }
  &__content {
    @apply w-[60%] h-auto pl-4 text-choice-normal font-normal;
    @apply flex flex-col items-start justify-start;
  }
  &__code {
    @apply text-gray-400 text-sm my-2;
  }
  &__offer {
    @apply text-lg text-black font-semibold my-2;
  }
  &__views {
    @apply flex flex-row justify-between items-center text-gray-400 text-sm my-2;

    svg {
      @apply w-6 h-auto;
    }
  }
}
</style>
