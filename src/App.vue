<script setup>
import { useUsersStore } from '@/stores/users'
import { computed, watch, reactive, onMounted } from 'vue'
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

function setDark(value) {
    isDark.value = value
}

watch(isDark, (value) => {
    darkModeStorage.set(value)
    setImages()
})

const colorImage = reactive({
    dark: '',
    light: '',
    system: '',
    current: ''
})

onMounted(() => {
    setImages()
})

function createSource(mode, color) {
    return `./src/assets/images/${mode}_mode_icon_${color}.png`
}

function setImages() {
    let color = isDark.value ? 'light' : 'dark'
    let mode = 'system'
    switch (darkModeStorage.get()) {
        case 'true':
            mode = 'dark'
            break
        case 'false':
            mode = 'light'
            break
    }

    colorImage.dark = createSource('dark', color)
    colorImage.light = createSource('light', color)
    colorImage.system = createSource('system', color)
    colorImage.current = createSource(mode, color)
}
</script>

<template>
    <div class="app h-screen bg-white text-black dark:bg-gray-800 dark:text-white">
        <nav>
            <div class="flex items-center p-3 bg-gray-300 dark:bg-gray-700">
                <button class="w-8 h-8 m-1 mr-4 rounded-full border border-slate-900 peer">
                    <img
                        :src="colorImage.current"
                    >
                </button>

                <div class="hidden absolute top-12 rounded-md bg-gray-200 dark:bg-gray-600 m-2 peer-focus:block hover:block">
                    <a
                        class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-500 cursor-pointer select-none rounded-md"
                        @click="setDark(true)"
                    >
                        <img
                            class="h-8 w-8 overflow-hidden inline-block"
                            :src="colorImage.dark"
                        >
                        Dark
                    </a>

                    <a
                        class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-500 cursor-pointer select-none rounded-md"
                        @click="setDark(false)"
                    >
                        <img
                            class="h-8 w-8 overflow-hidden inline-block"
                            :src="colorImage.light"
                        >
                        Light
                    </a>

                    <a
                        class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-500 cursor-pointer select-none rounded-md"
                        @click="setDark(null)"
                    >
                        <img
                            class="h-8 w-8 overflow-hidden inline-block"
                            :src="colorImage.system"
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