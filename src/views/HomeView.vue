<script setup lang="ts">


</script>
<template>
  <header class="grid grid-col-5 p-3 md:py-8 md:px-5 gap-1 items-center mb-4">
    <h1>Logo</h1>
    <form
      class="mt-2 row-start-2 col-span-5 border-2 border-current rounded-3xl md:col-start-2 md:col-span-3 md:row-start-1 md:mt-0">
      <input type="url" placeholder="Enter the link here" class="rounded-3xl w- w-8/12 p-2">
      <input type="submit" value="Shorten Now" class="col-start-5  w-4/12 rounded-3xl bg-primary-blue text-white p-2">
    </form>
    <nav class="col-start-5 justify-self-end">
      <ul class="flex items-center gap-2">
        <li>user</li>
        <li>logout</li>
      </ul>
    </nav>
  </header>
  <main>
    <ul class="flex items-center justify-center gap-5 py-4 px-5 bg-slate-700 text-white">
      <li>History</li>
      <li>Statistics</li>
      <li>Click Steam</li>
      <li>Settings</li>
    </ul>
    <section class="max-w-2xl w-11/12 mx-auto">
      <div class="flex items-center justify-between">
        <h2>History(143)</h2>
        <div class="flex items-center gap-2">
          <p>bulk edit</p>
          <p>Filter</p>
        </div>
      </div>
    </section>
  </main>
</template>
