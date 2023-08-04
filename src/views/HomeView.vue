<script setup lang="ts">
import UserComponent from '@/components/UserComponent.vue'
import PageLayout from '@/layout/PageLayout.vue'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

const showForm = ref(false)
const url = ref({
  longUrl: '',
  shortUrl: '',
  customUrl: '',
  title: '',
  clicks: '',
  createdAt: '',
  updatedAt: '',
  isActive: false,
  id: ''
})
const error = ref('')
const userUrls = ref([] as Url[])
const token = localStorage.getItem('token') || ''
const showUserSettings = ref(false)

interface Url {
  id: string
  longUrl: string
  shortUrl: string
  customUrl: string
  title: string
  clicks: string
  createdAt: string
  updatedAt: string
  isActive: boolean
  qrcode: { image: string }
}

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

// control url active state
const controlUrlState = async (id: string, isActive: boolean) => {
  let url = isActive
    ? `https://shortify-rg0z.onrender.com/api/v1/url/${id}/deactivate`
    : `https://shortify-rg0z.onrender.com/api/v1/url/${id}/activate`
  const res = await fetch(url, {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  if (res.ok) {
    getUserUrls()
  }
}

const copyToClipboard = (e: Event) => {
  const el = e.target as HTMLInputElement
  el.select()
  document.execCommand('copy')
  alert('copied')
}

const deleteUrl = async (id: string) => {
  const res = await fetch(`https://shortify-rg0z.onrender.com/api/v1/url/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  if (res.ok) {
    getUserUrls()
  }
}

const editUrl = async (id: string, data: Url) => {
  showForm.value = true
  url.value = data
}

const shortenUrl = async (e: Event) => {
  e.preventDefault()
  if (url.value.longUrl === '') {
    return
  } else {
    const body =
      url.value.customUrl !== ''
        ? JSON.stringify({
            longUrl: url.value.longUrl,
            title: url.value.title,
            customName: url.value.customUrl
          })
        : JSON.stringify({
            longUrl: url.value.longUrl,
            title: url.value.title
          })

    if (url.value.id === '') {
      const res = await fetch('https://shortify-rg0z.onrender.com/api/v1/url/create-shortUrl', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: body
      })
      if (!res.ok) {
        error.value = 'Invalid Url'  
        return
      } else {
        showForm.value = false
        getUserUrls()
      }
    } else {
      const res = await fetch(`https://shortify-rg0z.onrender.com/api/v1/url/${url.value.id}`, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: body
      })
      if (res.ok) {
        getUserUrls()
      }
    }
    showForm.value = false
    url.value = {
      longUrl: '',
      shortUrl: '',
      customUrl: '',
      title: '',
      clicks: '',
      createdAt: '',
      updatedAt: '',
      isActive: false,
      id: ''
    }
  }
}
const addQrCode = async (id: string) => {
  const url = `https://shortify-rg0z.onrender.com/api/v1/url/${id}/qrcode`
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  if (res.ok) {
    getUserUrls()
  }
}
const deleteQrCode = async (id: string) => {
  const url = `https://shortify-rg0z.onrender.com/api/v1/url/${id}/qrcode`
  const res = await fetch(url, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  if (res.ok) {
    getUserUrls()
  }
}
const closeForm = () => {
  showForm.value = false
  url.value = {
    longUrl: '',
    shortUrl: '',
    customUrl: '',
    title: '',
    clicks: '',
    createdAt: '',
    updatedAt: '',
    isActive: false,
    id: ''
  }
}
const displayQrcodeinNewTab = (image: string) => {
  // display base64 qrcode in new tab
  const win = window.open()
  win?.document.write(`<img src="${image}" alt="QR Code" />`)
}

const gotoUrl = (url: string) => {
  window.open(url, '_blank')
  getUserUrls()
}

</script>
<template>
  <PageLayout>
    <template #header>
      <header
        class="flex p-3 pb-8 md:py-8 md:px-5 gap-2 items-center shadow-lg bg-slate-50 dark:bg-primary-black"
      >
        <h1 class="dark:text-primary-blue">Logo</h1>
        <button
          @click="showForm = !showForm"
          class="col-start-4 max-w-max ml-auto block rounded-3xl bg-primary-blue text-white p-2"
        >
          Create link
        </button>
        <!-- avatar image -->
        <button
          @click="showUserSettings = !showUserSettings"
          class="w-9 h-9 rounded-full bg-no-repeat bg-user-image bg-center bg-cover cursor-pointer"
        >
          <span class="sr-only">Show user setting</span>
        </button>
        <!-- user settings -->
        <UserComponent v-if="showUserSettings" />
      </header>
    </template>
    <template #main>
      <main>
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
              <button @click="closeForm">close</button>
            </div>
            <input
              type="text"
              v-model="url.title"
              placeholder="Enter the title here"
              class="rounded-2xl mb-4 w-full py-2 px-3 bg-slate-50 dark:bg-primary-grey"
            />
            <label>
              <span v-if="error" class="text-red-500">{{ error }}</span>
              <input
                type="url"
                v-model="url.longUrl"
                placeholder="Enter the link here"
                class="rounded-2xl mb-4 w-full py-2 px-3 bg-slate-50 dark:bg-primary-grey"
              />
            </label>

            <input
              type="text"
              v-model="url.customUrl"
              placeholder="Customize your link here (optional)"
              class="rounded-2xl mb-4 w-full py-2 px-3 bg-slate-50 dark:bg-primary-grey"
            />
            <input
              type="submit"
              value="Shorten Now"
              class="col-start-5 w-4/12 block mx-auto rounded-3xl bg-primary-blue text-white p-2"
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
                    <button
                      :class="
                        userUrl.isActive ? 'cursor-pointer' : ' text-slate-200 cursor-not-allowed'
                      "
                      @click="gotoUrl('https://shortify-rg0z.onrender.com/' + userUrl.shortUrl)"
                      :disabled="!userUrl.isActive"
                      >{{ userUrl.shortUrl }}
                      </button>
                    <button @click="copyToClipboard" class="cursor-pointer w-6 h-6">
                      <img src="/images/copy.svg" alt="copy" />
                    </button>
                  </td>
                  <td class="pr-9 py-4 pl-4 whitespace-nowrap">
                    <button
                      v-if="userUrl.qrcode === null"
                      @click="addQrCode(userUrl.id)"
                      class="cursor-pointer w-6 h-6"
                      title="create qrcode"
                    >
                      <img src="/images/icons8-plus.svg" alt="add" />
                    </button>
                    <div v-else class="flex items-center gap-4">
                      <!-- There are ways to work around this issue, such as converting the Base64 data into a Blob object and using that to navigate to the data  -->

                      <img
                        class="w-8 mx-auto"
                        :src="userUrl.qrcode.image"
                        alt="QR Code"
                        @click="displayQrcodeinNewTab(userUrl?.qrcode?.image)"
                      />

                      <button
                        title="delete qrcode"
                        @click="deleteQrCode(userUrl.id)"
                        class="cursor-pointer w-6 h-6 brightness-50 dark:brightness-110"
                      >
                        <img src="/images/arrow-delete.svg" alt="delete" />
                      </button>
                    </div>
                  </td>
                  <td class="whitespace-nowrap pr-9 py-4 pl-4">{{ userUrl.clicks }}</td>
                  <td
                    class="whitespace-nowrap pr-9 py-4 pl-4 flex items-center justify-center gap-2"
                    :class="userUrl.isActive ? 'text-green-acc' : 'text-brown-acc'"
                  >
                    {{ userUrl.isActive ? 'Active' : 'InActive' }}
                    <div
                      class="p-2 rounded-full w-8 h-8 flex brightness-50 dark:brightness-110"
                      :class="userUrl.isActive ? 'bg-lite-green' : 'bg-lite-brown'"
                      @click="controlUrlState(userUrl.id, userUrl.isActive)"
                    >
                      <img
                        :src="userUrl.isActive ? '/images/link.svg' : '/images/unlink.svg'"
                        alt="linkg"
                        class=""
                      />
                    </div>
                  </td>
                  <td class="whitespace-nowrap pr-9 py-4 pl-4">
                    {{ new Date(userUrl.createdAt).toLocaleDateString() }}
                  </td>
                  <td
                    class="whitespace-nowrap pr-9 py-4 pl-4 flex items-center justify-center gap-2 brightness-0 dark:brightness-110"
                  >
                    <button @click="editUrl(userUrl.id, userUrl)">
                      <img src="/images/arrow-right.svg" alt="edit" />
                    </button>
                    <button @click="deleteUrl(userUrl.id)">
                      <img src="/images/arrow-delete.svg" alt="delete" />
                    </button>
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
