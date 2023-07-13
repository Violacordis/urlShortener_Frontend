<script setup lang="ts">
import UserComponent from '@/components/UserComponent.vue'
import PageLayout from '@/layout/PageLayout.vue'
import { ref } from 'vue'

const showForm = ref(false)
const showUserForm = ref(false)
const showUserSettings = ref(false)
const password = ref({
  currentPassword: '',
  newPassword: ''
})
const userName = ref('')
const token = localStorage.getItem('token') || ''
const user = ref( JSON.parse(localStorage.getItem('user') || '{}'))

const changePassword = async (e: Event) => {
  e.preventDefault()
  console.log(password.value)
  const res = await fetch('https://shortify-rg0z.onrender.com/api/v1/auth/change-password', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({
      currentPassword: password.value.currentPassword,
      newPassword: password.value.newPassword
    })
  })
  if (res.ok) {
    showForm.value = !showForm.value
    alert('Password changed successfully')
  } else {
    alert('Invalid credentials')
  }
}
const changeUsername = async (e: Event) => {
  e.preventDefault()
  const id = user.value.id

  const res = await fetch('https://shortify-rg0z.onrender.com/api/v1/users/' + id, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({
      userName: userName.value
    })
  })
  const data = await res.json()
  if (res.ok) {
    userName.value = ''
    alert('Username changed successfully')
    user.value = data.data
    localStorage.setItem('user', JSON.stringify(data.data))
    showUserForm.value = !showUserForm.value

  } else {
    alert('Invalid credentials')
  }
}
</script>
<template>
  <PageLayout>
    <template #header>
      <header
        class="flex p-3 pb-8 md:py-8 md:px-5 gap-2 items-center shadow-lg bg-slate-50 dark:bg-primary-black"
      >
        <h1 class="dark:text-primary-blue">Logo</h1>
        <router-link to="/link" class="font-medium max-w-max ml-auto rounded-3xl text-primary-blue">
          home
        </router-link>
        <!-- avatar image -->
        <button
          @click="showUserSettings = !showUserSettings"
          class="w-9 h-9 rounded-full bg-no-repeat bg-user-image bg-center bg-cover cursor-pointer"
        >
          <span class="sr-only">Show user setting</span>
        </button>
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
            @submit="changePassword"
            class="mt-2 mb-8 rounded-xl max-w-3xl w-11/12 mx-auto px-4 py-4 md:mt-0 gap-2 bg-slate-300 dark:bg-primary-grey dark:border-dark-border dark:text-primary-lite"
          >
            <div class="flex justify-between mb-4">
              <p>Change Password</p>
              <button @click="showForm = !showForm">close</button>
            </div>
            <input
              type="password"
              v-model="password.currentPassword"
              placeholder="Enter your current password"
              class="rounded-3xl mb-4 w-full p-2 bg-slate-50 dark:bg-primary-grey"
            />
            <input
              type="password"
              v-model="password.newPassword"
              placeholder="Enter your new password"
              class="rounded-3xl mb-4 w-full p-2 bg-slate-50 dark:bg-primary-grey"
            />
            <input
              type="submit"
              value="change password"
              class="col-start-5 block mx-auto rounded-3xl bg-primary-blue text-white p-2"
            />
          </form>
        </div>

        <section class="max-w-5xl mx-auto px-3">
          <div class="flex justify-between items-center mb-4">
            <h1 class="text-2xl font-bold dark:text-primary-lite">User Settings</h1>
            <button @click="showForm = !showForm" class="text-primary-blue">Change Password</button>
          </div>
          <div class="flex flex-col gap-4">
            <div class="flex flex-col gap-2">
              <p class="text-xl font-bold dark:text-primary-lite">User Info</p>
              <div class="flex justify-between items-center">
                <p class="dark:text-primary-lite">Username: {{ user?.userName }}</p>
                <button @click="showUserForm = !showUserForm" class="text-primary-blue">
                  Change Username
                </button>
                <!-- edit username -->
                <div
                  v-if="showUserForm"
                  class="fixed top-0 z-50 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center"
                >
                  <form
                    @submit="changeUsername"
                    class="mt-2 mb-8 rounded-xl max-w-3xl w-11/12 mx-auto px-4 py-4 md:mt-0 gap-2 bg-slate-300 dark:bg-primary-grey dark:border-dark-border dark:text-primary-lite"
                  >
                    <div class="flex justify-between mb-4">
                      <p>Change Username</p>
                      <button @click="showUserForm = !showUserForm">close</button>
                    </div>
                    <input
                      type="text"
                      v-model="userName"
                      placeholder="Enter your new password"
                      class="rounded-3xl mb-4 w-full p-2 bg-slate-50 dark:bg-primary-grey"
                    />
                    <input
                      type="submit"
                      value="change username"
                      class="block mx-auto rounded-3xl bg-primary-blue text-white p-2"
                    />
                  </form>
                </div>
              </div>

              <p class="dark:text-primary-lite">Email: {{ user?.email }}</p>
           
              <p class="dark:text-primary-lite">
                Account created: {{ new Date(user?.createdAt).toLocaleDateString() }}
              </p>
            </div>
          </div>
        </section>
      </main>
    </template>
  </PageLayout>
</template>
