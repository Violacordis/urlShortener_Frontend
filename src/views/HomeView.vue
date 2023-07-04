<script setup lang="ts">
import PageLayout from '@/layout/PageLayout.vue'


</script>
<template>
  <PageLayout>
    <template #header>
        <header class="grid grid-col-5 p-3 md:py-8 md:px-5 gap-1 items-center bg-slate-50 dark:bg-primary-black ">
          <h1 class="dark:text-primary-blue">Logo</h1>
          <form
            class="mt-2 row-start-2 col-span-5 border-2 border-current rounded-3xl md:col-start-2 md:col-span-3 md:row-start-1 md:mt-0 bg-slate-50 dark:bg-primary-grey dark:border-dark-border dark:text-primary-lite">
            <input type="url" placeholder="Enter the link here" class="rounded-3xl outline-none w-8/12 p-2 bg-slate-50 dark:bg-primary-grey">
            <input type="submit" value="Shorten Now" class="col-start-5  w-4/12 rounded-3xl bg-primary-blue text-white p-2">
          </form>
          <nav class="col-start-5 justify-self-end dark:text-primary-pink">
            <ul class="flex items-center gap-2">
              <li>user</li>
              <li>logout</li>
            </ul>
          </nav>
        </header>
      </template>
      <template #main>
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
      <div class="overflow-x-scroll">
        <table class="table-auto w-full text-left">
          <thead class="min-w-full">
            <tr>
              <th scope="col" class="px-6 py-4 whitespace-nowrap">Original Link</th>
              <th scope="col" class="px-6 py-4 whitespace-nowrap">Short Link</th>
              <th scope="col" class="px-6 py-4 whitespace-nowrap">QR Code</th>
              <th scope="col" class="px-6 py-4 whitespace-nowrap">Clicks</th>
              <th scope="col" class="px-6 py-4 whitespace-nowrap">Status</th>
              <th scope="col" class="px-6 py-4 whitespace-nowrap">Date</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="whitespace-nowrap px-6 py-4">
                <a href="https://www.google.com">https://www.google.com</a>
              </td>
              <td class="whitespace-nowrap px-6 py-4">
                <a href="https://www.google.com">https://link/ppp</a>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <img class="w-8 mx-auto"
                  src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://link/ppp" alt="QR Code">
              </td>
              <td class="whitespace-nowrap px-6 py-4">0</td>
              <td class="whitespace-nowrap px-6 py-4">Active</td>
              <td class="whitespace-nowrap px-6 py-4">Oct-09-09</td>
            </tr>
          </tbody>
        </table>

      </div>

    </section>
  </main>

      </template>
  </PageLayout>




 </template>
