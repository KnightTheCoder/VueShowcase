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
        <h3>Users</h3>

        <ul>
            <li
                v-for="user in usersStore.users"
                :key="user.id"
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

<style scoped>
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
</style>