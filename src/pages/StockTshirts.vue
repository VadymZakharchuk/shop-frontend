<template>
  <div class="shirts-page">
    <h1 class="shirts-page__title">
      <span>{{ t('title') }}</span>
    </h1>
    <div class="shirts-page__wrap">
      <div class="shirts-page__filters">
        <RadioList
          field="text"
          :items="sex"
          :checked="selectedSex"
          :legend="t('title1')"
          @checked="handleSizeChanges"
        />
        <SelectList
          :items="sizes"
          field="text"
          @selected="handleSelection"
        />

        <SelectList
          :items="availableColors"
          field="name"
          :legend="t('colors')"
          @selected="handleSelection"
        />
      </div>
      <div class="shirts-page__list">
        <div
          v-for="item in products"
          :key="`tshirt-${item.id}`"
        >
          <ProductCard :product="item" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { getProducts } from "@/services/products.service.js";
import { getSizes } from "@/services/sizes.service.js";
import { useI18n } from "vue-i18n";
import {computed, ref} from "vue";
import ProductCard from "@/components/ui/ProductCard.vue";
import SelectList from "@/components/ui/SelectList.vue";
import RadioList from "@/components/ui/RadioList.vue";
import {imageUrl} from "@/utils/imageUrl.js";


const products = ref([])
const sizes = ref([])

const { locale, t } = useI18n({
  messages: {
    en: {
      title: "T-Shirts",
      title1: "Sizes for",
      man: "Men",
      woman: "Women",
      colors: "Colors"
    },
    uk: {
      title: "Футболки",
      title1: "Розміри для",
      man: "Чоловіків",
      woman: "Жінок",
      colors: "Кольори"
    }
  }
});

const sex = [{
    id: "w",
    text: t('woman')
  },
  {
    id: "m",
    text: t('man')
  }]
const selectedSex = ref(sex[0].text)

const availableColors = computed(() => {
  if (products.value.length === 0) return []
  return products.value.map(item => {
    return {
      id: item.colors.id,
      name: locale.value === 'uk' ? item.colors.name_uk : item.colors.name_en,
      image: imageUrl(item.colors.image)
    }
  })
})
const handleSizeChanges = async (value) => {
  selectedSex.value = value
  const id = sex.find(s => s.text === value).id
  sizes.value = await getSizes({ params: { sex: id }});
}
const handleSelection = async (data) => {
  const sizes = data.map(item => { return { int: item.split('')[0] } })
  const p = sizes.map(item => Object.values(item))
  if (p.length === 0) products.value = await getProducts(locale.value,{ categoryId: 2 });
  else products.value = await getProducts(locale.value,{ categoryId: 2, size: p.join(',') });
}
const fetchData = async () => {
  products.value = await getProducts(locale.value,{ categoryId: 2 });
  sizes.value = await getSizes({ params: { sex: sex[0].id }});
};
fetchData()
</script>

<style scoped lang="scss">
.shirts-page {
  @apply font-sans;
  &__title {
    @apply py-16 text-center mb-4;

    span {
      @apply text-3xl font-semibold text-cyan-800;
      @apply pb-8 border-b-2 border-gray-300;
    }
  }
  &__wrap {
    @apply flex flex-row justify-start items-start;
  }
  &__filters {
    @apply w-1/4 text-cyan-700;
  }
  &__list {
    @apply w-3/4;
    @apply flex flex-wrap flex-row gap-4;
  }
}
</style>