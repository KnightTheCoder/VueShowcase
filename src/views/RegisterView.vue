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
            type="text"
            v-model="userComposable.username.value"
        >
            Username:
        </BaseInput>

        <BaseInput
            type="text"
            v-model="userComposable.password.value"
        >
            Password:
        </BaseInput>

        <BaseInput
            type="text"
            v-model="userComposable.confirmPassword.value"
        >
            Confirm password:
        </BaseInput>
        
        <button>
            Register
        </button>
    </form>
</template>