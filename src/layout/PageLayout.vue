<script setup lang="ts">
import { ref } from 'vue'

const darkMode = ref(false)

const toggleDarkMode = () => {
  //check if dark mode is true or false
  if (darkMode.value) {
    darkMode.value = false
    //remove dark mode in html
    document?.querySelector('html')?.classList.remove('dark')

    console.log('dark mode is false')
  } else {
    //if false, set dark mode to true
    darkMode.value = true
    //add dark mode in html
    document?.querySelector('html')?.classList.add('dark')
    console.log('dark mode is true')
  }
}
</script>
<template>
  <div>
    <slot name="header"></slot>
    <div class="">
      <slot name="main"></slot>
      <button @click="toggleDarkMode" class="cursor-pointer dark:text-white text-black">Click me</button>
    </div>
  </div>
</template>
