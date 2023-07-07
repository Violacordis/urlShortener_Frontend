<script setup lang="ts">
import PageLayout from '@/layout/PageLayout.vue'
import { useRouter } from 'vue-router';
import { ref } from 'vue'

const email = ref('')
const password = ref('')
const error = ref('')
const success = ref(false)
const loading = ref(false)
const router = useRouter()

const login = async(e:Event) =>{
  e.preventDefault()
if(email.value === '' || password.value === ''){
  error.value = 'Please fill all the fields'
  return
}else{
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
    return
  } else {
    success.value = true
    loading.value = false
    localStorage.setItem('user',JSON.stringify(data.data))
    router.push('/link')
  }
}



}

</script>
<template>
  <PageLayout>
    <template #header>
      <header
        class="grid grid-col-5 p-3 mb-4 md:py-4 shadow-2xl md:px-5 gap-1 items-center bg-slate-50 dark:bg-primary-black"
      >
        <h1 class="dark:text-primary-blue font-bold">
          <router-link to="/">
          Logo
        </router-link>
        </h1>
      </header>
    </template>
    <template #main>
      <main class="px-2 mt-12 ">       
        <!-- login form -->
       
          <form 
          @submit="login"
          class="bg-slate-300 w-full px-3 py-6 rounded-xl dark:bg-gray-800 shadow max-w-xl mx-auto">
            <p class="text-center text-2xl mb-10 font-medium dark:text-primary-lite">Login to your account</p>
            <input
              type="text"
              v-model="email"
              placeholder="Enter your email"
              class="block w-full mb-4 rounded-xl outline-none py-3 px-4 bg-slate-50 dark:bg-primary-grey dark:text-primary-lite"
            />
            <input
              type="password"
              v-model="password"
              placeholder="Password"
              class="w-full mb-3 block rounded-xl outline-none px-4 py-3 bg-slate-50 dark:bg-primary-grey dark:text-primary-lite"
            />
             <p class="text-right mb-8">
                <router-link to="/forgot-password" class="text-primary-blue">Forgot password?</router-link>
            </p>
            <input
              type="submit"
              value="Login"
              class="block w-full rounded-3xl bg-primary-blue text-white p-2 mb-3 cursor-pointer"
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
