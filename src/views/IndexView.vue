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

        <div>
          <article></article>
        </div>
      </main>
    </template>
  </PageLayout>
</template>
