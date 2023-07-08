<script setup lang="ts">
import { ref } from 'vue'

const darkMode = ref(false)

const toggleDarkMode = () => {
  if (darkMode.value) {
    darkMode.value = false
    document?.querySelector('html')?.classList.remove('dark')
  } else {
    darkMode.value = true
    document?.querySelector('html')?.classList.add('dark')
  }
}
</script>
<template>
  <div>
    <slot name="header"></slot>
    <div>
      <!-- make a toggle button for color theme -->
      <label class="cursor-pointer flex my-3 ml-auto max-w-max">
        <div class="relative inline-flex items-center cursor-pointer">
          <input type="checkbox" value="" class="sr-only peer" @click="toggleDarkMode" />
          <div
            class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"
          ></div>
        </div>
      </label>
      <slot name="main"></slot>
    </div>
  </div>
</template>
<style scoped>
.percent {
  right: 90%;
}
</style>
