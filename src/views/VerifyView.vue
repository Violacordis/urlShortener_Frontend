<script setup lang="ts">
import PageLayout from '@/layout/PageLayout.vue'
import router from '@/router'

import { ref } from 'vue'

const otp = ref('')
const email = ref('')
const error = ref('')
const success = ref(false)
const loading = ref(false)
const otpResent = ref(false)

//otp count down
let countDown = ref('10:00')
const mins = ref(10)
let sec = ref(60)


const countDownTimer = setInterval(() => {
  if (mins.value >= 1) {
    sec.value--
    if (sec.value === 0 && mins.value !== 0) {
      mins.value--
      sec.value = 60
    }
    let minute = mins.value < 10 ? '0' + mins.value : mins.value
    let second = sec.value < 10 ? '0' + sec.value : sec.value
    countDown.value = minute + ':' + second
  } else {
    mins.value = 0
    sec.value = 0
    countDown.value = '00:00'
    clearInterval(countDownTimer)
  }
}, 1000)

const verifyEmail = async (e: Event) => {
  e.preventDefault()
  error.value = ''
  loading.value = true

  if (otp.value === '' && email.value === '') {
    error.value = 'Please fill all the fields'
    loading.value = false
    return
  } else {
    //  send data to server
  
    const res = await fetch('https://shortify-rg0z.onrender.com/api/v1/auth/verify-email/' + email.value, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        token: otp.value
      })
    })
    if (!res.ok) {
      error.value = 'Invalid OTP'
      loading.value = false
      return
    } else {
      success.value = true
      loading.value = false
      error.value = ''
      otp.value = ''
      router.push('/login')
    }
  }
}
const resend = (e: Event) => {
  e.preventDefault()

  if (email.value === '') {
    error.value = 'Invalid user create new account'
    return
  } else {
    fetch('https://shortify-rg0z.onrender.com/api/v1/auth/new-token/' + email.value, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((data) => {
      // check if data responsr is email is verified or invalid
      if (data.statusText === "It's either this email is already verified or invalid") {
        error.value = 'Email already verified or invalid'
        return
      } else if (data.statusText === 'Invalid token') {
        error.value = 'Resend or type the correct otp'
        return
      } else {
        error.value = ''
        countDown.value = '10:00'
        mins.value = 10
        sec.value = 60
        otpResent.value = true
      }
    })
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
        <nav class="col-start-5 justify-self-end dark:text-primary-pink">
          <ul class="flex items-center gap-2">
            <li class="px-4 py-2 rounded-3xl bg-primary-grey border border-dark-border text-white">
              <router-link to="/login" class="text-white">Login</router-link>
            </li>
            <li class="px-4 py-2 rounded-3xl bg-primary-blue">
              <router-link to="/signup" class="text-white">Register Now</router-link>
            </li>
          </ul>
        </nav>
      </header>
    </template>
    <template #main>
      <main class="px-2 mt-12">
        <!-- verify form -->

        <form
          @submit="verifyEmail"
          class="bg-slate-300 w-full px-3 py-6 rounded-xl dark:bg-gray-800 shadow max-w-xl mx-auto"
        >
          <p class="text-center text-2xl mb-2 font-medium dark:text-primary-lite">Verification</p>
          <p class="text-center text-xl mb-10 dark:text-primary-lite">
            Enter the otp sent via email
          </p>
          <p v-if="error" class="text-center text-red-500 mb-2 font-medium dark:text-primary-lite">
            {{ error }}
          </p>
           <input
            type="email"
            placeholder="Enter email"
            v-model="email"
            class="block w-full mb-4 rounded-xl outline-none py-3 px-4 bg-slate-50 dark:bg-primary-grey dark:text-primary-lite"
          />
          <input
            type="text"
            placeholder="OTP"
            v-model="otp"
            class="block w-full mb-4 rounded-xl outline-none py-3 px-4 bg-slate-50 dark:bg-primary-grey dark:text-primary-lite"
          />
          <input
            type="submit"
            :disabled="loading"
            value="Verify"
            :class="
              loading
                ? 'bg-gray-500 cursor-not-allowed block w-full rounded-3xl  text-white p-2 mb-3'
                : 'bg-primary-blue block w-full rounded-3xl  text-white p-2 mb-3 cursor-pointer'
            "
          />
          <p class="text-center mb-4 dark:text-primary-lite">
            Didn't receive the verification otp?
            <button @click="resend">
              <span class="text-primary-blue">Resend again</span>
            </button>
          </p>
           <div v-if="otpResent" class="flex items-center justify-between mb-2">
          <p  class="text-center text-xl font-medium dark:text-primary-lite">
            Otp has been sent again
          </p>
          <!-- show 10mins count down -->
          <p class="text-center text-xl font-medium  ju justify-end dark:text-primary-lite">
            Resend in {{ countDown }}
          </p>
        </div>
        </form>  
      </main>
    </template>
  </PageLayout>
</template>
