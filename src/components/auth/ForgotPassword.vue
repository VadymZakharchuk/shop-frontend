<template>
  <div class="forgot-password">
    <div class="forgot-password__header">
      <img
        class="forgot-password__header-logo"
        src="/img/logo.jpg"
        alt="Your Company"
      >
      <h2 class="forgot-password__header-text">
        {{ t('title') }}
      </h2>
    </div>
    <div class="text-sm my-4 mx-auto">
      <RouterLink
        to="/"
        class="forgot-password__form-password-forgot"
      >
        {{ t('toHomePage') }}
      </RouterLink>
    </div>
    <Form
      v-slot="{ errors, meta }"
      :validation-schema="schema"
      class="space-y-6"
      @submit="onSubmit"
    >
      <div>
        <div class="flex items-center justify-between">
          <label
            for="password"
            class="forgot-password__form-password-label"
          >{{ t('password') }}</label>
        </div>
        <div class="mt-2">
          <Field
            name="password"
            type="password"
            class="forgot-password__form-password-field"
            :class="{ 'is-invalid': errors.password }"
          />
          <div class="invalid-feedback">
            {{ errors.password }}
          </div>
        </div>
      </div>
      <div>
        <div class="flex items-center justify-between">
          <label
            for="passwordConfirmation"
            class="forgot-password__form-password-label"
          >{{ t('againPassword') }}</label>
        </div>
        <div class="mt-2">
          <Field
            name="passwordConfirmation"
            type="password"
            class="forgot-password__form-password-field"
            :class="{ 'is-invalid': errors.passwordConfirmation }"
          />
          <div class="invalid-feedback">
            {{ errors.passwordConfirmation }}
          </div>
        </div>
      </div>

      <div>
        <button
          type="submit"
          :disabled="!meta.valid"
          :class="{'bg-indigo-600': meta.valid, 'bg-gray-200': !meta.valid}"
          class="forgot-password__form__btn-submit"
        >
          Sign in
        </button>
      </div>
    </Form>
  </div>
</template>

<script setup>
import {Field, Form} from "vee-validate";
import { useI18n } from "vue-i18n";
import * as Yup from "yup";

const { t, locale } = useI18n({
  messages: {
    en: {
      title: "Password recovery",
      toHomePage: "To home page",
      password: "New password",
      againPassword: "New password again",
      requiredField: "This field is required",
      passwordMin: "Password must be at least 6 characters",
      passwordMatch: "Passwords must match"
    },
    uk: {
      title: "Password recovery",
      toHomePage: "На головну сторінку",
      password: "Новий пароль",
      againPassword: "Новий пароль ще раз",
      requiredField: "Це поле обов'язкове",
      passwordMin: "Пароль повинен містити принаймні 6 символів",
      passwordMatch: "Паролі повинні бути однаковими"
    }
  }
});

const schema = Yup.object({
  password: Yup.string()
    .required(t('requiredField'))
    .min(6, t('passwordMin')),
  passwordConfirmation: Yup.string()
    .required(t('requiredField'))
    .min(6, t('passwordMin'))
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
});

const onSubmit = async (values) => {
  console.log(values);
};
</script>

<style scoped lang="scss">
.forgot-password {
  @apply flex min-h-full min-w-[25%] flex-col justify-center px-6 py-12 lg:px-8;

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
      @apply focus-visible:outline-indigo-600 mt-12;
    }
  }
}
.invalid-feedback{
  @apply text-red-500 text-sm/6;
  @apply mt-1;
}
</style>