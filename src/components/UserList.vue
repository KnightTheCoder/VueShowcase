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
        <h3 class="text-center">
            Users
        </h3>

        <ul class="list-none flex flex-col items-center">
            <li
                v-for="user in usersStore.users"
                :key="user.id"
                class="list-none bg-slate-500 w-fit p-3 mb-5 border-4 border-slate-900 cursor-pointer"
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

<!-- <style scoped>
li {
    color: whitesmoke;
    list-style-type: none;
    background-color: #666;
    width: fit-content;
    padding: 10px;
    margin: 0 auto;
    margin-bottom: 20px;
    border: 4px solid black;
    cursor: pointer;
}
</style> -->