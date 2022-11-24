<script setup>
import { useUsersStore } from '@/stores/users'
import { computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useTitle } from '@/composables/title'
import { useLocalStorage } from '@/composables/localStorage'
import { useDarkMode } from '@/composables/darkMode'
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

const darkModeStore = useLocalStorage('dark-mode')
const isDark = useDarkMode(darkModeStore.data.value)

function toggleDark() {
    isDark.value = !isDark.value
}
</script>

<template>
    <div class="app h-screen bg-white text-black dark:bg-gray-800 dark:text-white">
        <nav>
            <div class="text-center p-3 bg-gray-300 dark:bg-gray-700">
                <button
                    class="flex flex-row items-center align-middle p-3 w-6 rounded border border-slate-900 bg-slate-100 hover:bg-slate-200 dark:bg-gray-900 dark:hover:bg-gray-800"
                    @click="toggleDark"
                />

                <RouterLink to="/">
                    Home
                </RouterLink>
                |
                <RouterLink to="/users">
                    Users
                </RouterLink>
                <template v-if="currentUser == null">
                    |
                    <RouterLink to="/register">
                        Register
                    </RouterLink>
                    |
                    <RouterLink to="/login">
                        Login
                    </RouterLink>
                </template>
            </div>
            
            <div
                v-if="currentUser != null"
                class="userProfile absolute top-1 right-1"
            >
                <span style="margin-right: 10px">
                    Welcome
                    <RouterLink :to="{ name: 'Users', params: { id: currentUser.id }}">
                        <span class="text-green-700 hover:text-green-500 dark:text-teal-500 dark:hover:text-teal-300">
                            {{ currentUser?.username }}
                        </span>
                    </RouterLink>
                </span>

                <button
                    class="inline-block p-1 mt-1 mr-1 rounded bg-gray-400 hover:bg-gray-200 dark:bg-gray-600 dark:hover:bg-gray-500"
                    @click="usersStore.logout"
                >
                    Logout
                </button>
            </div>
        </nav>

        <div class="mt-2">
            <RouterView />
        </div>
    </div>
</template>