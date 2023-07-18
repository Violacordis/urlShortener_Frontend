<script setup lang="ts">
import PageLayout from '@/layout/PageLayout.vue'
import { useRouter } from 'vue-router'
// signup function

import { ref } from 'vue'

const email = ref('')

const error = ref('')
const success = ref(false)
const loading = ref(false)
const router = useRouter()
const forgotPassword = async (e: Event) => {
  e.preventDefault()
  if (!email.value) {
    error.value = 'Please enter your email'
    return
  } else {
    const res = await fetch('https://shortify-rg0z.onrender.com/api/v1/auth/forgot-password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email.value
      })
    })
    if (!res.ok) {
      error.value = 'Invalid credentials'
      loading.value = false
      return
    } else {
      success.value = true
      loading.value = false
      router.push('/resetpassword')
    }
  }
}
</script>
<template>
  <PageLayout>
    <template #header>
      <header
        class="flex justify-between p-3 mb-4 md:py-4 shadow-2xl md:px-5 gap-1 items-center bg-slate-50 dark:bg-primary-black"
      >
        <h1 class="dark:text-primary-blue font-bold">
          <router-link to="/"> Logo </router-link>
        </h1>
        <router-link to="/verify" class="text-primary-blue font-bold">Verify email</router-link>
      </header>
    </template>
    <template #main>
      <main class="px-2 mt-12">
        <!-- login form -->

        <form
          @submit="forgotPassword"
          class="bg-slate-300 w-full px-3 py-6 rounded-xl dark:bg-gray-800 shadow max-w-xl mx-auto"
        >
          <p class="text-center text-2xl mb-10 font-medium dark:text-primary-lite">
            Forgot Password
          </p>
          <input
            type="email"
            placeholder="Email"
            v-model="email"
            class="block w-full mb-4 rounded-xl outline-none py-3 px-4 bg-slate-50 dark:bg-primary-grey dark:text-primary-lite"
          />
          <input
            type="submit"
            value="Submit"
            :disabled="loading"
            :class="
              loading
                ? 'bg-gray-500 p-2 mb-3  block w-full rounded-3xl'
                : ' block w-full rounded-3xl bg-primary-blue text-white p-2 mb-3 cursor-pointer'
            "
          />
          <p class="text-center mb-4 dark:text-primary-lite">
            You already have an account?
            <router-link to="/login" class="text-primary-blue">Log in</router-link>
          </p>
        </form>
      </main>
    </template>
  </PageLayout>
</template>
