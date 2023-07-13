<script setup lang="ts">

import { useRouter } from 'vue-router'

const router = useRouter()
const logout = () => {
  localStorage.clear()
  router.push({ name: 'login' })
}
</script>
<template>

        <nav
          class="fixed right-1 top-14 z-50 py-4 bg-slate-300 shadow rounded-sm dark:text-primary-pink"
        >
          <ul class="flex px-2 flex-col">
            <li class="cursor-pointer">
                <router-link to="/user">user</router-link>
            </li>
            <li class="cursor-pointer" @click="logout">logout</li>
          </ul>
        </nav>
   </template>
