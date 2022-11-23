<script setup>
import BaseInput from '@/components/BaseInput.vue'
import { useUser } from '@/composables/user'
import { useUsersStore } from '@/stores/users'
import router from '@/router'

const userComposable = useUser()
const usersStore = useUsersStore()

const register = () => {
    if (userComposable.doPasswordsMatch.value
        && userComposable.isUserCorrect.value
    ) {
        usersStore.registerUser(
            userComposable.username.value,
            userComposable.password.value
        )
        userComposable.resetUser()

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
            v-model="userComposable.username.value"
            type="text"
        >
            Username:
        </BaseInput>

        <BaseInput
            v-model="userComposable.password.value"
            type="password"
        >
            Password:
        </BaseInput>

        <BaseInput
            v-model="userComposable.confirmPassword.value"
            type="password"
        >
            Confirm password:
        </BaseInput>
        
        <button>
            Register
        </button>
    </form>
</template>