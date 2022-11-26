<script setup>
import { useUsersStore } from '@/stores/users'
import { computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useTitle } from '@/composables/title'
import { useLocalStorage } from '@/composables/localStorage'
import { useDarkMode } from '@/composables/darkMode'
import router from '@/router'

const route = useRoute()
const title = useTitle('Vue Showcase')

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

const darkModeStorage = useLocalStorage('dark-mode')
const isDark = useDarkMode(darkModeStorage.get() == 'true')
const isDarkOpen = ref(false)

function toggleDark() {
    isDarkOpen.value = !isDarkOpen.value
}

function setDark(value) {
    isDark.value = value
}

watch(isDark, (value) => {
    darkModeStorage.set(value)
})

// const colorImage = reactive({
//     dark: {
//         light: () => import('@/assets/images/dark_mode_icon_light'),
//         dark: () => import('@/assets/images/dark_mode_icon_dark')
//     },
//     light: {
//         light: () => import('@/assets/images/light_mode_icon_light'),
//         dark: () => import('@/assets/images/light_mode_icon_dark')
//     },
//     system: {
//         light: () => import('@/assets/images/system_mode_icon_light'),
//         dark: () => import('@/assets/images/system_mode_icon_dark')
//     }
// })
</script>

<template>
    <div class="app h-screen bg-white text-black dark:bg-gray-800 dark:text-white">
        <nav>
            <div class="flex items-center p-3 bg-gray-300 dark:bg-gray-700">
                <button
                    class="p-4 m-1 mr-4 w-6 rounded-full border border-slate-900"
                    @click="toggleDark"
                />

                <div
                    v-if="isDarkOpen"
                    class="absolute top-12 left-0 rounded-md bg-gray-200 dark:bg-gray-600 m-2"
                >
                    <a
                        class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-500 cursor-pointer select-none"
                        @click="setDark(true)"
                    >
                        <img
                            v-if="isDark"
                            class="h-8 w-8 overflow-hidden inline-block"
                            src="@/assets/images/dark_mode_icon_light.png"
                        >

                        <img
                            v-if="!isDark"
                            class="h-8 w-8 overflow-hidden inline-block"
                            src="@/assets/images/dark_mode_icon_dark.png"
                        >
                        Dark
                    </a>

                    <a
                        class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-500 cursor-pointer select-none"
                        @click="setDark(false)"
                    >
                        <img
                            v-if="isDark"
                            class="h-8 w-8 overflow-hidden inline-block"
                            src="@/assets/images/light_mode_icon_light.png"
                        >

                        <img
                            v-if="!isDark"
                            class="h-8 w-8 overflow-hidden inline-block"
                            src="@/assets/images/light_mode_icon_dark.png"
                        >
                        Light
                    </a>

                    <a
                        class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-500 cursor-pointer select-none"
                        @click="setDark(null)"
                    >
                        <img
                            v-if="isDark"
                            class="h-8 w-8 overflow-hidden inline-block"
                            src="@/assets/images/system_mode_icon_light.png"
                        >

                        <img
                            v-if="!isDark"
                            class="h-8 w-8 overflow-hidden inline-block"
                            src="@/assets/images/system_mode_icon_dark.png"
                        >
                        System
                    </a>
                </div>
                
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
                class="absolute top-2 right-1"
            >
                <span class="mr-2">
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