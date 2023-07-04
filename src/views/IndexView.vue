<script setup lang="ts">
import PageLayout from '@/layout/PageLayout.vue'
</script>
<template>
  <PageLayout>
    <template #header>
      <header
        class="grid grid-col-5 p-3 pb-8 md:py-8 md:px-5 gap-1 items-center bg-slate-50 dark:bg-primary-black"
      >
        <h1 class="dark:text-primary-blue">Logo</h1>

        <nav class="col-start-5 justify-self-end dark:text-primary-pink">
          <ul class="flex items-center gap-2">
            <li>login</li>
            <li>Sign up</li>
          </ul>
        </nav>
      </header>
    </template>
    <template #main>
      <main class="px-2">
        <div class="text-center max-w-2xl mx-auto mb-6">
          <h2 class="font-bold  text-4xl mb-4">Shorten Your Loooong Links :)</h2>
          <p class="mb-8">
            Linkly is an efficient and easy-to-use URL shortening service that streamlines your
            online experience.
          </p>
          <form
            class="border-2 border-current rounded-3xl bg-slate-50 dark:bg-primary-grey dark:border-dark-border dark:text-primary-lite"
          >
            <input
              type="url"
              placeholder="Enter the link here"
              class="rounded-3xl outline-none w-8/12 p-2 bg-slate-50 dark:bg-primary-grey"
            />
            <input
              type="submit"
              value="Shorten Now"
              class="col-start-5 w-4/12 rounded-3xl bg-primary-blue text-white p-2"
            />
          </form>
        </div>

        <section class="max-w-5xl mx-auto">
          <div class="overflow-x-auto pb-2">
            <table class="table-auto w-full text-left border-separate border-spacing-y-3">
              <thead class="min-w-full border-collapse border-spacing-y-0">
                <tr class="bg-gray-300 dark:bg-dark-hd dark:text-primary-lite border-spacing-y-0">
                  <th scope="col" class="pr-9 py-4 pl-4 whitespace-nowrap">Original Link</th>
                  <th scope="col" class="pr-9 py-4 pl-4 whitespace-nowrap">Short Link</th>
                  <th scope="col" class="pr-9 py-4 pl-4 whitespace-nowrap">QR Code</th>
                  <th scope="col" class="pr-9 py-4 pl-4 whitespace-nowrap">Clicks</th>
                  <th scope="col" class="pr-9 py-4 pl-4 whitespace-nowrap">Status</th>
                  <th scope="col" class="pr-9 py-4 pl-4 whitespace-nowrap">Date</th>
                </tr>
              </thead>
              <tbody class="dark:text-primary-lite">
                <tr class="bg-gray-200 dark:bg-lite-blue dark:backdrop-blur-2xl">
                  <td class="whitespace-nowrap pr-9 py-4 pl-4">
                    <a href="https://www.google.com">https://www.google.com</a>
                  </td>
                  <td
                    class="whitespace-nowrap pr-9 py-4 pl-4 flex items-center justify-center gap-2 brightness-0 dark:brightness-110"
                  >
                    <a href="https://www.google.com">https://link/ppp</a>
                    <img src="/images/copy.svg" alt="copy" />
                  </td>
                  <td class="pr-9 py-4 pl-4 whitespace-nowrap">
                    <img
                      class="w-8 mx-auto"
                      src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://link/ppp"
                      alt="QR Code"
                    />
                  </td>
                  <td class="whitespace-nowrap pr-9 py-4 pl-4">0</td>
                  <td
                    class="whitespace-nowrap pr-9 py-4 pl-4 text-green-acc flex items-center justify-center gap-2"
                  >
                    Active
                    <div
                      class="bg-lite-green p-2 rounded-full w-8 h-8 flex brightness-50 dark:brightness-110"
                    >
                      <img src="/images/link.svg" alt="linkg" class="" />
                    </div>
                  </td>
                  <td class="whitespace-nowrap pr-9 py-4 pl-4">Oct-09-09</td>
                </tr>
                <tr class="bg-gray-200 dark:bg-lite-blue dark:backdrop-blur-2xl">
                  <td class="whitespace-nowrap pr-9 py-4 pl-4">
                    <a href="https://www.google.com">https://www.google.com</a>
                  </td>
                  <td
                    class="whitespace-nowrap pr-9 py-4 pl-4 flex items-center justify-center gap-2 brightness-0 dark:brightness-110"
                  >
                    <a href="https://www.google.com">https://link/ppp</a>
                    <img src="/images/copy.svg" alt="copy" />
                  </td>
                  <td class="pr-9 py-4 pl-4 whitespace-nowrap">
                    <img
                      class="w-8 mx-auto"
                      src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://link/ppp"
                      alt="QR Code"
                    />
                  </td>
                  <td class="whitespace-nowrap pr-9 py-4 pl-4">0</td>
                  <td
                    class="whitespace-nowrap pr-9 py-4 pl-4 text-brown-acc flex items-center justify-center gap-2"
                  >
                    Inactive
                    <div class="bg-lite-brown p-2 rounded-full w-8 h-8 flex">
                      <img src="/images/unlink.svg" alt="linkg" />
                    </div>
                  </td>
                  <td class="whitespace-nowrap pr-9 py-4 pl-4">Oct-09-09</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </template>
  </PageLayout>
</template>
