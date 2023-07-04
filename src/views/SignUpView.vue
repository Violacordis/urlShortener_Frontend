<script setup lang="ts">
import PageLayout from '@/layout/PageLayout.vue'
</script>
<template>
  <PageLayout>
    <template #header>
      <header
        class="grid grid-col-5 p-3 mb-4 md:py-4 shadow-2xl md:px-5 gap-1 items-center bg-slate-50 dark:bg-primary-black"
      >
        <h1 class="dark:text-primary-blue">Logo</h1>
      </header>
    </template>
    <template #main>
      <main class="px-2 mt-12 ">       
        <!-- login form -->
       
          <form class="bg-slate-300 w-full px-3 py-6 rounded-xl dark:bg-gray-800 shadow max-w-xl mx-auto">
            <p class="text-center text-2xl mb-10 font-medium dark:text-primary-lite">Create a new Account</p>
            <input
              type="text"
              placeholder="Username"
              class="block w-full mb-4 rounded-xl outline-none py-3 px-4 bg-slate-50 dark:bg-primary-grey dark:text-primary-lite"
            />
            <input
              type="password"
              placeholder="Password"
              class="w-full mb-3 block rounded-xl outline-none px-4 py-3 bg-slate-50 dark:bg-primary-grey dark:text-primary-lite"
            />
            <input
              type="submit"
              value="Sign up"
              class="block w-full rounded-3xl bg-primary-blue text-white p-2 mb-3 cursor-pointer"
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
