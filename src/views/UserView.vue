<script setup>
import UserList from '@/components/UserList.vue'
import { computed } from 'vue'
import { useUsersStore } from '@/stores/users'
import { useRoute } from 'vue-router'

const route = useRoute()
const usersStore = useUsersStore()

const user = computed(
    () => {
        const foundUsers = usersStore.users.filter(u => u.id == route.params.id)
        return foundUsers.length == 0 ? { id: -1 } : foundUsers[0]
    }
)

const userExists = computed(() => route.params.id && user.value.id > -1)
const userDoesntExist = computed(() => route.params.id != '')
</script>

<template>
    <div class="user text-center">
        <div v-if="userExists">
            <h1 class="text-center">
                Welcome {{ user.username }}!
            </h1>
            <p>Id: {{ user.id }}</p>
            <p>Username: {{ user.username }}</p>
            <p>Password: {{ user.password }}</p>
        </div>

        <p v-else-if="userDoesntExist">
            User doesn't exist
        </p>

        <UserList v-else />
    </div>
</template>