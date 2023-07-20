<script setup lang="ts">
import PageLayout from '@/layout/PageLayout.vue'
</script>
<template>
  <PageLayout>
    <template #header>
      <header
        class="grid grid-col-5 px-3 py-5 shadow-2xl gap-1 items-center bg-slate-50 dark:bg-primary-black"
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
      <main class="px-2">
        <div class="text-center max-w-2xl mx-auto mb-6">
          <h2 class="font-bold text-4xl mb-4 dark:text-primary-pink">
            Shorten Your Loooong Links :)
          </h2>
          <p class="mb-8 dark:text-primary-lite">
            Linkly is an efficient and easy-to-use URL shortening service that streamlines your
            online experience.
          </p>
        </div>
        <!-- list the benefits of shortening link -->
        <div >
          <h3 class="text-2xl text-center mb-5 font-bold dark:text-blue-600">Why us?</h3>
         
          <div class="grid gap-3 md:grid-cols-2 lg:grid-cols-3 lg:max-w-5xl lg:mx-auto">
            <article class="border rounded-xl border-slate-900 px-3 py-5 dark:border-blue-600">
              <h4 class="mb-3">
                <span class="text-2xl font-bold dark:text-blue-600">1. </span>
                <span class="text-2xl font-bold dark:text-primary-lite">Shorten</span>
              </h4>
              <p class="text-lg dark:text-primary-lite">
                Shorten your long links into short and memorable links with your own custom alias.
              </p>
            </article>
            <article class="border rounded-xl border-slate-900 px-3 py-5 dark:border-blue-600">
              <h4 class="mb-3">
                <span class="text-2xl font-bold dark:text-blue-600">2. </span>
                <span class="text-2xl font-bold dark:text-primary-lite">Share</span>
              </h4>
              <p class="text-lg dark:text-primary-lite">
                Share your customised links with your friends, family and colleagues.
              </p>
            </article>
            <article class="border rounded-xl border-slate-900 px-3 py-5 dark:border-blue-600">
              <h4 class="mb-3">
                <span class="text-2xl font-bold dark:text-blue-600">3. </span>
                <span class="text-2xl font-bold dark:text-primary-lite">Track</span>
              </h4>

              <p class="text-lg dark:text-primary-lite">
                Track your links and see how many clicks you get. You can also see where your clicks
                are coming from with our detailed statistics.
              </p>
            </article>
          </div>
        </div>
      </main>
    </template>
  </PageLayout>
</template>
