<template>
  <div class="sign-in">
    <div class="sign-in__header">
      <img
        class="sign-in__header-logo"
        src="/img/logo.jpg"
        alt="Your Company"
      >
      <h2 class="sign-in__header-text">
        {{ t('title') }}
      </h2>
    </div>

    <div class="sign-in__form">
      <Form
        v-slot="{ errors, meta }"
        :validation-schema="schema"
        class="space-y-6"
        @submit="onSubmit"
      >
        <div>
          <label
            for="phone"
            class="sign-in__form-phone-label"
          >{{ t('phoneNo') }}</label>
          <div class="mt-2">
            <Field 
              name="phone" 
              type="text" 
              class="sign-in__form-phone-field"
              placeholder="Phone number"
              :class="{ 'is-invalid': errors.phone }"
            />
            <div class="invalid-feedback">
              {{ errors.phone }}
            </div>
          </div>
        </div>

        <div>
          <div class="flex items-center justify-between">
            <label
              for="password"
              class="sign-in__form-password-label"
            >{{ t('password') }}</label>
            <div class="text-sm">
              <RouterLink
                :to="forgotPassword"
                class="sign-in__form-password-forgot"
              >
                {{ t('forgot') }}
              </RouterLink>
            </div>
          </div>
          <div class="mt-2">
            <Field
              name="password"
              type="password"
              class="sign-in__form-password-field"
              :class="{ 'is-invalid': errors.password }"
            />
            <div class="invalid-feedback">
              {{ errors.password }}
            </div>
          </div>
        </div>

        <div>
          <button
            type="submit"
            :disabled="!meta.valid"
            :class="{'bg-indigo-600': meta.valid, 'bg-gray-200': !meta.valid}"
            class="sign-in__form__btn-submit"
          >
            Sign in
          </button>
        </div>
      </Form>

      <p class="sign-in__form__register">
        {{ t('noAccount') }}
        <a
          href="#"
          class="sign-in__form__register-btn"
        >{{ t('register') }}</a>
      </p>
    </div>
  </div>
</template>

<script setup>
import { Field, Form } from 'vee-validate'
import { useUserStore } from "@/store/user.js"
import * as Yup from 'yup';
import { useI18n } from "vue-i18n"
import Cookies from 'js-cookie'
import xorCrypt from 'xor-crypt'
import { login } from "@/services/users.service.js"
import { useRouter } from "vue-router"
import {computed} from "vue"

const userStore = useUserStore();
const router = useRouter();
const { t, locale } = useI18n({
  messages: {
    en: {
      title: "Sign in to your account",
      phoneNo: "Your phone No",
      password: "Password",
      forgot: "Forgot password?",
      noAccount: "Have no account?",
      register: "Register now",
      requiredField: "This field is required",
      noValidPhone: "Phone number is not valid",
      passwordMin: "Password must be at least 6 characters",
    },
    uk: {
      title: "Увійдіть у свій обліковий запис",
      phoneNo: "Ваш номер телефону (XXX) XXX-XX-XX",
      password: "Пароль",
      forgot: "Забули пароль?",
      noAccount: "Не маєте облікового запису?",
      register: "Зареєструйтесь зараз",
      requiredField: "Це поле обов'язкове",
      noValidPhone: "Не валідний номер телефону",
      passwordMin: "Пароль повинен містити принаймні 6 символів",
    }
  }
});

const phoneRegExp = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s./0-9]*$/g
const schema = Yup.object({
  phone: Yup.string().matches(phoneRegExp, t('noValidPhone')).required(t('requiredField')),
  password: Yup.string().required(t('requiredField')).min(6, t('passwordMin')),
});

const onSubmit = async (values) => {
  values.phone = '38' + values.phone.replace(/\D/g,'');
  values.password = xorCrypt(values.password,9);
  userStore.token = await login(values)
  Cookies.set('token', userStore.token)
  if (userStore.token) {
    await router.push(`/${locale.value}/cabinet`)
  }
}

const forgotPassword = computed(() => {
  return locale.value === 'en' ? '/forgot-password' : '/zabuv-parol'
})
</script>

<style lang="scss" scoped>
.sign-in {
  @apply flex min-h-full flex-col justify-center px-6 py-12 lg:px-8;
  
  &__header {
   @apply sm:mx-auto sm:w-full sm:max-w-sm;

    &-logo {
      @apply mx-auto h-[120px] w-auto;
    }
    &-text {
      @apply mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900;
    }
  }
  &__form {
    @apply mt-10 sm:mx-auto sm:w-full sm:max-w-sm;

    &-phone-label {
      @apply block text-sm/6 font-medium text-gray-900;
    }
    &-phone-field {
      @apply block w-full rounded-md bg-gray-100 px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1;
      @apply outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2;
      @apply focus:outline-indigo-600 sm:text-sm/6;
    }
    &-password-label {
      @apply block text-sm/6 font-medium text-gray-900;
    }
    &-password-forgot {
      @apply font-semibold text-indigo-600 hover:text-indigo-500;
    }
    &-password-field {
      @apply block w-full rounded-md bg-gray-100 px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1;
      @apply outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2;
      @apply focus:outline-indigo-600 sm:text-sm/6;
    }
    &__btn-submit {
      @apply flex w-full justify-center rounded-md px-3 py-1.5 text-sm/6 font-semibold text-white;
      @apply shadow-sm hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2;
      @apply focus-visible:outline-indigo-600;
    }
    &__register {
      @apply mt-10 text-center text-sm/6 text-gray-500;
      &-btn {
        @apply font-semibold text-indigo-600 hover:text-indigo-500;
      }
    }
  }
}
.invalid-feedback{
  @apply text-red-500 text-sm/6;
  @apply mt-1;
}
</style>