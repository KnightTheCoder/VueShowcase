<script setup>
import { useUsersStore } from '@/stores/users'
import { computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useTitle } from '@/composables/title'
import router from '@/router'

const route = useRoute()
const title = useTitle()
const usersStore = useUsersStore()

const currentUser = computed(() => {
    const foundUsers = usersStore.users.filter(u => u.id == usersStore.loggedIn.userId)
    if (foundUsers.length > 0) {
        return foundUsers[0]
    } else {
        return null
    }
})

watch(
    () => route.name,
    (toPathName) => title.value = toPathName
)

watch(
    () => currentUser.value,
    (newValue) => {
        if (newValue == null)
            router.push({
                name: 'Home'
            })
    }
)
</script>

<template>
    <div class="app">
        <nav>
            <div>
                <RouterLink to="/">
                    Home
                </RouterLink> |
                <RouterLink to="/users">
                    Users
                </RouterLink>
                <template v-if="currentUser == null">
                    |
                    <RouterLink to="/register">
                        Register
                    </RouterLink> |
                    <RouterLink to="/login">
                        Login
                    </RouterLink>
                </template>
            </div>
            
            <div
                v-if="currentUser != null"
                class="userProfile"
            >
                <span style="margin-right: 10px">
                    Welcome <RouterLink :to="{ name: 'Users', params: { id: currentUser.id }}">{{ currentUser?.username }}</RouterLink>
                </span>

                <button @click="usersStore.logout">
                    Logout
                </button>
            </div>
        </nav>

        <RouterView />
    </div>
</template>

<style scoped>
.app {
    text-align: center;
}

.userProfile {
    position: absolute;
    top: 4px;
    right: 4px;
}
</style>