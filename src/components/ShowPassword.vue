<script lang="ts" setup>

const handleVisiblity =()=>{
    const password = document.getElementById('password') as HTMLInputElement
    const showPassword = document.getElementById('showPassword')!
    if(password.type === 'password'){
        password.type = 'text'
        showPassword.classList.remove('bg-show-password')
        showPassword.classList.add('bg-hide-password')
    }else{
        password.type = 'password'
        showPassword.classList.remove('bg-hide-password')
        showPassword.classList.add('bg-show-password')
    }
}
</script>
<template>
    <!-- show password -->
<button @click="handleVisiblity" id="showPassword" class="bg-show-password cursor-pointer w-7 h-6 bg-no-repeat bg-center absolute right-2 top-3">

</button>
</template>