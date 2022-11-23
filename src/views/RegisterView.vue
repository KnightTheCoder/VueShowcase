<script setup>
import BaseInput from '@/components/BaseInput.vue'
import ToastNotification from '@/components/ToastNotification.vue'
import { useUser } from '@/composables/user'
import { useNotification } from '@/composables/notification'
import { useUsersStore } from '@/stores/users'
import router from '@/router'

const { isUserCorrect, doPasswordsMatch, username, password, confirmPassword, resetUser } = useUser()
const { notification, setNotification, closeNotification } = useNotification()
const usersStore = useUsersStore()

const register = () => {
    if (isUserCorrect.value) {
        usersStore.registerUser(
            username.value,
            password.value
        )
        resetUser()

        setNotification(
            'User registered',
            'User has successfully been registered',
            'success'
        )
        setTimeout(() => {
            router.push({
                name: 'Login'
            })
        }, 300)

    } else if (doPasswordsMatch) {
        setNotification(
            'Failed to register',
            'Fields are empty',
            'danger'
        )
    } else {
        setNotification(
            'Failed to register',
            'Passwords don\'t match',
            'danger'
        )
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

        <ToastNotification
            :notification="notification"
            @close="closeNotification"
        />
    </form>
</template>