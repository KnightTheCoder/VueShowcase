<script setup>
import { useUsersStore } from '@/stores/users'
import { useLocalizationStore } from '@/stores/localization'

const usersStore = useUsersStore()
const { getLocalWord } = useLocalizationStore()
</script>

<template>
    <div v-if="usersStore.users.length > 0">
        <h3 class="text-center mb-2 text-2xl">
            {{ getLocalWord('users') }}
        </h3>

        <ul class="list-none flex flex-col items-center">
            <li
                v-for="user in usersStore.users"
                :key="user.id"
                class="list-none w-fit p-6 mb-5 bg-slate-300 border text-center text-black dark:text-slate-300 border-slate-900 dark:border-cyan-200 rounded-2xl dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600"
            >
                <p>Id: {{ user.id }}</p>
                <p>Username: {{ user.username }}</p>
                <p>Email: {{ user.email }}</p>
                <p>Password: {{ user.password }}</p>
            </li>
        </ul>
    </div>

    <p
        v-else
        class="text-center"
    >
        {{ getLocalWord('no_users_found') }}
    </p>
</template>