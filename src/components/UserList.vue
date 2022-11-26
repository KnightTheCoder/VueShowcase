<script setup>
import { useUsersStore } from '@/stores/users'
import router from '@/router'

const usersStore = useUsersStore()
function gotoUser(id) {
    router.push({
        name: 'Users', params: { id: id }
    })
}
</script>

<template>
    <div v-if="usersStore.users.length > 0">
        <h3 class="text-center mb-2 text-2xl">
            Users
        </h3>

        <ul class="list-none flex flex-col items-center">
            <li
                v-for="user in usersStore.users"
                :key="user.id"
                class="list-none w-fit p-6 mb-5 bg-slate-300 border text-center text-black dark:text-slate-300 border-slate-900 dark:border-cyan-200 rounded-2xl cursor-pointer dark:bg-slate-700"
                @click="gotoUser(user.id)"
            >
                <p>Id: {{ user.id }}</p>
                <p>Username: {{ user.username }}</p>
                <p>Password: {{ user.password }}</p>
            </li>
        </ul>
    </div>

    <p v-else>
        No Users found
    </p>
</template>