<script setup lang="ts">
import PageLayout from '@/layout/PageLayout.vue'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

const url = ref('')
const shortUrl = ref('')
const title = ref('')
const customUrl = ref('')
const showForm = ref(false)

interface Url {
  id: string
  longUrl: string
  shortUrl: string
  title: string
  clicks: string
  createdAt: string
  updatedAt: string
  isActive: boolean
}

const userUrls = ref([] as Url[])
const user = JSON.parse(localStorage.getItem('user') || '{}')
const token = user.access_token
const getUserUrls = async () => {
  const res = await fetch('https://shortify-rg0z.onrender.com/api/v1/url/all', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  const data = await res.json()
  userUrls.value = data.data
}
const router = useRouter()

onMounted(() => {
  getUserUrls()
})

const logout = () => {
  localStorage.clear()
  router.push({ name: 'login' })
}

// check if time of login is greater than 24hrs than logout user
const loginTime = JSON.parse(localStorage.getItem('loginTime') || '')
const currentTime = new Date().getTime()
if (currentTime - loginTime > 86400000) {
  logout()
}

const copyToClipboard = (e: Event) => {
  const el = e.target as HTMLInputElement
  el.select()
  document.execCommand('copy')
}

const deleteUrl = async (id: string) => {
  const res = await fetch(`https://shortify-rg0z.onrender.com/api/v1/links/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  if (res.ok) {
    getUserUrls()
  }
}

const editUrl = async (id: string) => {
  const res = await fetch(`https://shortify-rg0z.onrender.com/api/v1/links/${id}`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  if (res.ok) {
    getUserUrls()
  }
}

const shortenUrl = async (e: Event) => {
  e.preventDefault()
  if (url.value === '') {
    return
  } else {
    //  send data to server
    // if custom is empty change remove it from the body
    const res = await fetch('https://shortify-rg0z.onrender.com/api/v1/url/create-shortUrl', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body:
        customUrl.value !== ''
          ? JSON.stringify({
              longUrl: url.value,
              title: title.value,
              customName: customUrl.value
            })
          : JSON.stringify({
              longUrl: url.value,
              title: title.value
            })
    })
    const data = await res.json()
    if (!res.ok) {
      return
    } else {
      shortUrl.value = data.data.shortUrl
      url.value = ''
      showForm.value = false
    }
  }
}
</script>
<template v-if="user">
  <PageLayout>
    <template #header>
      <header
        class="flex p-3 pb-8 md:py-8 md:px-5 gap-2 items-center bg-slate-50 dark:bg-primary-black"
      >
        <h1 class="dark:text-primary-blue">Logo</h1>
        <button
          @click="showForm = !showForm"
          class="col-start-4 max-w-max ml-auto block rounded-3xl bg-primary-blue text-white p-2"
        >
          Create link
        </button>
        <nav class="col-start-5 row-span-1 justify-self-end dark:text-primary-pink">
          <ul class="flex items-center gap-2">
            <li>user</li>
            <li @click="logout">logout</li>
          </ul>
        </nav>
      </header>
    </template>
    <template #main>
      <main>
        <!-- <ul
          class="flex flex-wrap md:justify-center items-center gap-8 py-4 px-5 bg-slate-400 dark:bg-primary-grey dark:text-white"
        >
          <li class="flex items-center gap-1">
            <img src="/images/clock.svg" alt="clock" /> History
          </li>
          <li class="flex items-center gap-1">
            <img src="/images/chart-simple.svg" alt="chart" /> Statistics
          </li>
          <li class="flex items-center gap-1 whitespace-nowrap">
            <img src="/images/hand-pointer.svg" alt="a hand pointing" /> <span>Click Steam</span>
          </li>
          <li class="flex items-center gap-1">
            <img src="/images/cog.svg" alt="clock" /> Settings
          </li>
        </ul> -->

        <div
          v-if="showForm"
          class="fixed top-0 z-50 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center"
        >
          <form
            @submit="shortenUrl"
            class="mt-2 mb-8 rounded-xl max-w-3xl w-11/12 mx-auto px-4 py-4 md:mt-0 gap-2 bg-slate-300 dark:bg-primary-grey dark:border-dark-border dark:text-primary-lite"
          >
            <div class="flex justify-between mb-4">
              <p>Create</p>
              <button @click="showForm = !showForm">close</button>
            </div>
            <input
              type="text"
              v-model="title"
              placeholder="Enter the title here"
              class="rounded-3xl mb-4 w-full p-2 bg-slate-50 dark:bg-primary-grey"
            />
            <input
              type="url"
              v-model="url"
              placeholder="Enter the link here"
              class="rounded-3xl mb-4 w-full p-2 bg-slate-50 dark:bg-primary-grey"
            />
            <input
              type="text"
              v-model="customUrl"
              placeholder="Customize your link here (optional)"
              class="rounded-3xl mb-4 w-full p-2 bg-slate-50 dark:bg-primary-grey"
            />
            <input
              type="submit"
              value="Shorten Now"
              class="col-start-5 w-4/12 block mx-auto rounded-3xl bg-primary-blue text-white p-2"
            />
          </form>
        </div>

        <section class="max-w-5xl mx-auto">
          <!-- <div class="flex items-center justify-between dark:text-primary-lite px-6 my-8">
            <h2>History(143)</h2>
            <div class="flex items-center gap-2">
              <p class="flex items-center gap-2 border p-2 rounded-3xl font-medium cursor-pointer">
                <img src="/images/list-check.svg" alt="list check" />Bulk Edit
              </p>
              <p class="flex items-center gap-2  border p-2 rounded-3xl font-medium cursor-pointer">
                <img src="/images/filter.svg" alt="filter" />Filter
              </p>
            </div>
          </div> -->
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
                  <th scope="col" class="pr-9 py-4 pl-4 whitespace-nowrap">Actions</th>
                </tr>
              </thead>
              <tbody class="dark:text-primary-lite">
                <tr
                  v-for="userUrl in userUrls"
                  :key="userUrl.id"
                  class="bg-gray-200 dark:bg-lite-blue dark:backdrop-blur-2xl"
                >
                  <td class="pr-9 py-4 pl-4">
                    <a :href="userUrl.longUrl" target="_blank">{{ userUrl.longUrl }}</a>
                  </td>
                  <td
                    class="whitespace-nowrap pr-9 py-4 pl-4 flex items-center justify-center gap-2 brightness-0 dark:brightness-110"
                  >
                    <a
                      target="_blank"
                      :href="'https://shortify-rg0z.onrender.com/' + userUrl.shortUrl"
                      >{{ userUrl.shortUrl }}</a
                    >
                    <img src="/images/copy.svg" alt="copy" />
                  </td>
                  <td class="pr-9 py-4 pl-4 whitespace-nowrap">
                    <img
                      class="w-8 mx-auto"
                      src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://link/ppp"
                      alt="QR Code"
                    />
                  </td>
                  <td class="whitespace-nowrap pr-9 py-4 pl-4">{{ userUrl.clicks }}</td>
                  <td
                    class="whitespace-nowrap pr-9 py-4 pl-4 flex items-center justify-center gap-2"
                    :class="userUrl.isActive ? 'text-green-acc' : 'text-brown-acc'"
                  >
                    {{ userUrl.isActive ? 'Active' : 'Inactive' }}
                    <div
                      class="p-2 rounded-full w-8 h-8 flex brightness-50 dark:brightness-110"
                      :class="userUrl.isActive ? 'bg-lite-green' : 'bg-lite-brown'"
                    >
                      <img
                        :src="userUrl.isActive ? '/images/link.svg' : '/images/unlink.svg'"
                        alt="linkg"
                        class=""
                      />
                    </div>
                  </td>
                  <td class="whitespace-nowrap pr-9 py-4 pl-4">Oct-09-09</td>
                  <td
                    class="whitespace-nowrap pr-9 py-4 pl-4 flex items-center justify-center gap-2 brightness-0 dark:brightness-110"
                  >
                    <img src="/images/arrow-right.svg" alt="a hand pointing" />
                    <img src="/images/arrow-delete.svg" alt="a hand pointing" />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </template>
  </PageLayout>
</template>
