<script setup>
import UserList from '@/components/UserList.vue'
import BaseInput from '@/components/BaseInput.vue'
import { useUser } from '@/composables/user'
import { useNotification } from '@/composables/notification'
import { useUsersStore } from '@/stores/users'
import router from '@/router'
import ToastNotification from '@/components/ToastNotification.vue'

const { username, password, resetUser } = useUser()
const { notification, setNotification, closeNotification } = useNotification()
const usersStore = useUsersStore()

const login = () => {
    const userId = usersStore.login(
        username.value,
        password.value
    )

    if (userId > -1) {
        resetUser()
        setNotification(
            'Successfull login',
            'You successfully logged in',
            'success'
        )

        setTimeout(() => {
            router.push({
                name: 'Users',
                params: { id: userId }
            })
        }, 300)
    } else {
        setNotification(
            'Failed to log in',
            'Username or password is incorrect',
            'danger'
        )
    }
}
</script>

<template>
    <h1>Login</h1>

    <form @submit.prevent="login">
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

        <button>
            Login
        </button>

        <hr>

        <UserList />

        <ToastNotification
            :notification="notification"
            @close="closeNotification"
        />
    </form>
</template>