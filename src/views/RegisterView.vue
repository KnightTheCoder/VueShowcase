<script setup>
import BaseInput from '@/components/BaseInput.vue'
import { useUser } from '@/composables/user'
import { useUsersStore } from '@/stores/users'
import router from '@/router'

const { isUserCorrect, username, password, confirmPassword, resetUser } = useUser()
const usersStore = useUsersStore()

const register = () => {
    if (isUserCorrect.value) {
        usersStore.registerUser(
            username.value,
            password.value
        )
        resetUser()

        router.push({
            name: 'Login'
        })
    }
}
</script>

<template>
    <h1>Register</h1>

    <form @submit.prevent="register">
        <BaseInput
            v-model="username"
            type="text"
        >
            Username:
        </BaseInput>

        <BaseInput
            v-model="password"
            type="password"
        >
            Password:
        </BaseInput>

        <BaseInput
            v-model="confirmPassword"
            type="password"
        >
            Confirm password:
        </BaseInput>
        
        <button>
            Register
        </button>
    </form>
</template>