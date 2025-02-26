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
          @checked="handleSexChanges"
        />
        <SelectList
          :items="sizes"
          field="text"
          @selected="handleSizeSelection"
        />

        <SelectList
          :items="availableColors"
          field="name"
          image="image"
          :legend="t('colors')"
          @selected="handleColorSelection"
        />

        <ToggleUi
          :legend="t('newOnly')"
          @checked="handleIsNewOnly"
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
import { computed, reactive, ref, watch} from "vue";
import ProductCard from "@/components/ui/ProductCard.vue";
import SelectList from "@/components/ui/SelectList.vue";
import RadioList from "@/components/ui/RadioList.vue";
import {imageUrl} from "@/utils/imageUrl.js";
import ToggleUi from "@/components/ui/ToggleUi.vue";


const products = ref([])
const sizes = ref([])
const onlyNew = ref(true)
const reqParams = reactive({
  categoryId: 2
})

const { locale, t } = useI18n({
  messages: {
    en: {
      title: "T-Shirts",
      title1: "Sizes for",
      man: "Men",
      woman: "Women",
      colors: "Colors",
      newOnly: "New"
    },
    uk: {
      title: "Футболки",
      title1: "Розміри для",
      man: "Чоловіків",
      woman: "Жінок",
      colors: "Кольори",
      newOnly: "Тільки новинки"
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
  const colorSet = []
  products.value.forEach(item => {
    if (colorSet.find(color => color.id === item.colors.id)) return
    colorSet.push({
      id: item.colors.id,
      name: locale.value === 'uk' ? item.colors.name_uk : item.colors.name_en,
      image: imageUrl(item.colors.image)
    })
  })
  return colorSet
})
const handleSexChanges = async (value) => {
  selectedSex.value = value
  const id = sex.find(s => s.text === value).id
  sizes.value = await getSizes({ params: { sex: id }});
}
const handleSizeSelection = async (data) => {
  const sizes = data.map(item => { return { int: item.split('')[0] } })
  const p = sizes.map(item => Object.values(item))
  if (p.length) reqParams.size = p.join(',')
  else delete reqParams.size
}
const handleIsNewOnly = async (value) => {
  onlyNew.value = value
  if (value) reqParams.is_new = true
  else delete reqParams.is_new
}

const handleColorSelection = async (data) => {
  const res = []
  if (data.length) {
    data.forEach(item => {
      const color = availableColors.value.find(color => color.name === item).id
      if (color) res.push(color)
    })
    reqParams.colorId = res.join(',')
  }
  else {
    delete reqParams.colorId
  }
}

watch(
  () => reqParams,
  async (reqParams) => {
    const params = {...reqParams}
    products.value = await getProducts(locale.value, params)
  },
  { deep: true }
)

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