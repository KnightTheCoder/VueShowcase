<script setup>
import UserList from '@/components/UserList.vue'
import BaseInput from '@/components/BaseInput.vue'
import { useUser } from '@/composables/user'
import { useUsersStore } from '@/stores/users'
import router from '@/router'

const { username, password, resetUser } = useUser()
const usersStore = useUsersStore()
const login = () => {
    console.log(username.value)
    const userId = usersStore.login(
        username.value,
        password.value
    )

    console.log(userId)
    if (userId > -1) {
        resetUser()
        router.push({
            name: 'Users',
            params: { id: userId }
        })
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
    </form>
</template>