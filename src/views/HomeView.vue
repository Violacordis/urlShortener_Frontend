<script setup lang="ts">
import PageLayout from '@/layout/PageLayout.vue'
import { onMounted, ref } from 'vue'

const url = ref('')
const shortUrl = ref('')
const title = ref('')
interface Url {
  id: string
  longUrl: string
  shortUrl: string
  title: string
  clicks: string
  createdAt: string
  updatedAt: string
}
const userUrls = ref([] as Url[] )
 
const user = JSON.parse(localStorage.getItem('user') || '{}')
const token = user.access_token
const getUserUrls = async() =>{
  const res = await fetch('https://shortify-rg0z.onrender.com/api/v1/url/all',{
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  const data = await res.json()
  userUrls.value = data.data
  console.log(userUrls.value)
}

onMounted(() =>{
  getUserUrls()
})
console.log(userUrls.value)
const copyToClipboard = (e:Event) =>{
  const el = e.target as HTMLInputElement
  el.select()
  document.execCommand('copy')
}

const deleteUrl = async(id:string) =>{
  const res = await fetch(`https://shortify-rg0z.onrender.com/api/v1/links/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  if(res.ok){
    getUserUrls()
  }
}

const editUrl = async(id:string) =>{
  const res = await fetch(`https://shortify-rg0z.onrender.com/api/v1/links/${id}`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  if(res.ok){
    getUserUrls()
  }
}



const shortenUrl = async(e:Event) =>{
  e.preventDefault()
  if(url.value === ''){
    return
  }else{
    //  send data to server
    const res = await fetch('https://shortify-rg0z.onrender.com/api/v1/url/create-shortUrl', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
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
      console.log(data,shortUrl.value)
    }
  }

}

</script>
<template>
  <PageLayout>
    <template #header>
      <header
        class="grid grid-col-5 p-3 pb-8 md:py-8 md:px-5 gap-1 items-center bg-slate-50 dark:bg-primary-black"
      >
        <h1 class="dark:text-primary-blue">Logo</h1>
        <form
        @submit="shortenUrl"
          class="mt-2 row-start-2 col-span-5 border-2 border-current rounded-3xl md:col-start-2 p-1 md:col-span-3 md:row-start-1 md:mt-0 bg-slate-50 dark:bg-primary-grey dark:border-dark-border dark:text-primary-lite"
        >
          <input
            type="url"
            v-model="url"
            placeholder="Enter the link here"
            class="rounded-3xl outline-none w-8/12 p-2 bg-slate-50 dark:bg-primary-grey"
          />
            <input
            type="text"
            v-model="title"
            placeholder="Enter the title here"
            class="rounded-3xl outline-none w-8/12 p-2 bg-slate-50 dark:bg-primary-grey"
          />
          <input
            type="submit"
            value="Shorten Now"
            class="col-start-5 w-4/12 rounded-3xl bg-primary-blue text-white p-2"
          />
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
        <ul
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
        </ul>

        <section class="max-w-5xl mx-auto">
          <div class="flex items-center justify-between dark:text-primary-lite px-6 my-8">
            <h2>History(143)</h2>
            <div class="flex items-center gap-2">
              <p class="flex items-center gap-2 border p-2 rounded-3xl font-medium cursor-pointer">
                <img src="/images/list-check.svg" alt="list check" />Bulk Edit
              </p>
              <p class="flex items-center gap-2  border p-2 rounded-3xl font-medium cursor-pointer">
                <img src="/images/filter.svg" alt="filter" />Filter
              </p>
            </div>
          </div>
          <div class="overflow-x-auto pb-2">
            <table class="table-auto w-full text-left border-separate border-spacing-y-3">
              <thead class="min-w-full border-collapse  border-spacing-y-0">
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
              <tbody class="dark:text-primary-lite ">
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
                    <div class="bg-lite-green p-2 rounded-full w-8 h-8 flex brightness-50 dark:brightness-110">
                      <img src="/images/link.svg" alt="linkg" class="" />
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
                    class="whitespace-nowrap pr-9 py-4 pl-4 text-brown-acc flex items-center justify-center gap-2 "
                  >
                    Inactive
                    <div class="bg-lite-brown p-2 rounded-full w-8 h-8 flex">
                      <img src="/images/unlink.svg" alt="linkg" />
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
