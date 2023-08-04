<script setup lang="ts">
import PageLayout from '@/layout/PageLayout.vue'
import ShowPassword from '@/components/ShowPassword.vue'
import { useRouter } from 'vue-router'
import { ref } from 'vue'

const email = ref('')
const password = ref('')
const error = ref('')
const success = ref(false)
const loading = ref(false)
const router = useRouter()

const login = async (e: Event) => {
  e.preventDefault()
  loading.value = true
  if (email.value === '' || password.value === '') {
    error.value = 'Please fill all the fields'
    loading.value = false
    return
  } else {
    //  send data to server
    const res = await fetch('https://shortify-rg0z.onrender.com/api/v1/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email.value,
        password: password.value
      })
    })
    const data = await res.json()
    if (!res.ok) {
      error.value = 'Invalid credentials'
        loading.value = false
      return
    } else {
      localStorage.setItem('token', data.data.access_token)
      localStorage.setItem('user', JSON.stringify(data.data.data.user))
      localStorage.setItem('loginTime', new Date().getTime().toString())
      success.value = true
      loading.value = false
      router.push('/link')
    }
  }
}
</script>
<template>
  <PageLayout>
    <template #header>
      <header
        class="flex items-center justify-between p-3 mb-4 md:py-4 shadow-2xl md:px-5 gap-1 bg-slate-50 dark:bg-primary-black"
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
          @submit="login"
          class="bg-slate-300 w-full px-3 py-6 rounded-xl dark:bg-gray-800 shadow max-w-xl mx-auto"
        >
          <p class="text-center text-2xl mb-10 font-medium dark:text-primary-lite">
            Login to your account
          </p>
          <input
            type="text"
            v-model="email"
            placeholder="Enter your email"
            class="block w-full mb-4 rounded-xl outline-none py-3 px-4 bg-slate-50 dark:bg-primary-grey dark:text-primary-lite"
          />
          <label class="relative">
            <input
              type="password"
              v-model="password"
              placeholder="Password"
              id="password"
              class="w-full mb-3 block rounded-xl outline-none px-4 py-3 bg-slate-50 dark:bg-primary-grey dark:text-primary-lite"
            />
            <ShowPassword />
          </label>

          <p class="text-right mb-8">
            <router-link to="/forgotpassword" class="text-primary-blue"
              >Forgot password?</router-link
            >
          </p>
          <input
            type="submit"
            :value="loading ? 'Logging in' : 'Login'"
            :disabled="loading"
            :class="
              loading
                ? 'bg-gray-500 p-2  rounded-3xl'
                : ' rounded-3xl bg-primary-blue text-white p-2 mb-3 '
            "
            class="block w-full rounded-3xl mb-3 cursor-pointer"
          />
          <p class="text-center mb-4 dark:text-primary-lite">
            Don't have an account?
            <router-link to="/signup" class="text-primary-blue">Sign up</router-link>
          </p>
        </form>
      </main>
    </template>
  </PageLayout>
</template>
