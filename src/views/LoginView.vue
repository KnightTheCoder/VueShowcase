<script setup>
import UserList from '@/components/UserList.vue'
import BaseInput from '@/components/BaseInput.vue'
import { useUser } from '@/composables/user'
import { useUsersStore } from '@/stores/users'
import router from '@/router'

const userComposable = useUser()
const usersStore = useUsersStore()
const login = () => {
    const userId = usersStore.login(
        userComposable.username.value,
        userComposable.password.value
    )
    
    if (userId > -1) {
        userComposable.resetUser()
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

        <button>
            Login
        </button>

        <hr>

        <UserList />
    </form>
</template>