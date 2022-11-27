<script setup>
import { useUsersStore } from '@/stores/users'
import { ref, computed, watch, reactive, onMounted, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useTitle } from '@/composables/title'
import { useLocalStorage } from '@/composables/localStorage'
import { useDarkMode } from '@/composables/darkMode'

const route = useRoute()
const router = useRouter()
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

const isOpen = ref(false)

function setOpen(value) {
    if (value == 'toggle') {
        isOpen.value = !isOpen.value
    } else {   
        isOpen.value = value
    }
}

const darkModeStorage = useLocalStorage('dark-mode')
const isDark = useDarkMode(darkModeStorage.get())

function setDark(value) {
    isDark.value = value
    if (value == 'system') {
        darkModeStorage.set(null)
    }
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

function handleEscape(e) {
    if (e.key == 'Esc' || e.key == 'Escape') {
        isOpen.value = false
    }
}

onMounted(() => {   
    document.addEventListener('keydown', handleEscape)

    setImages()
})

onUnmounted(() => {
    document.removeEventListener('keydown', handleEscape)
})

function createSource(mode, color) {
    return `/src/assets/images/${mode}_mode_icon_${color}.png`
}

function setImages() {
    let color = 'light'
    let mode = 'system'
    switch (darkModeStorage.get()) {
        case 'dark':
            mode = 'dark'
            color = 'light'
            break
        case 'light':
            mode = 'light'
            color = 'dark'
            break
    }
    
    colorImage.dark = createSource('dark', color)
    colorImage.light = createSource('light', color)
    colorImage.system = createSource('system', color)
    colorImage.current = createSource(mode, color)
}
</script>

<template>
    <div class="app">
        <nav>
            <div class="flex items-center p-2 bg-gray-300 dark:bg-slate-700">
                <button
                    class="relative z-10 w-10 h-10 m-1 mr-4 p-1 rounded-full border border-slate-900 bg-gray-300 dark:bg-gray-500 focus:border-2 hover:bg-gray-300 dark:hover:bg-slate-400 focus:border-sky-400 focus:bg-gray-300 dark:focus:bg-slate-400"
                    @click="setOpen('toggle')"
                >
                    <img
                        :src="colorImage.current"
                    >
                </button>

                <button
                    v-if="isOpen"
                    class="fixed inset-0 h-full w-full cursor-default"
                    tabindex="-1"
                    @click="setOpen(false)"
                />

                <div
                    v-if="isOpen"
                    class="absolute top-12 m-2 shadow-lg shadow-gray-700 dark:shadow-gray-800"
                >
                    <a
                        class="block px-4 py-2 bg-gray-200 dark:bg-slate-600 hover:bg-gray-100 dark:hover:bg-slate-500 cursor-pointer select-none rounded-md border border-gray-400 dark:border-gray-800 active:bg-gray-300 dark:active:bg-slate-400"
                        @click="setDark('dark')"
                    >
                        <img
                            class="h-8 w-8 overflow-hidden inline-block"
                            :src="colorImage.dark"
                        >
                        Dark
                    </a>

                    <a
                        class="block px-4 py-2 bg-gray-200 dark:bg-slate-600 hover:bg-gray-100 dark:hover:bg-slate-500 cursor-pointer select-none rounded-md border border-gray-400 dark:border-gray-800 active:bg-gray-300 dark:active:bg-slate-400"
                        @click="setDark('light')"
                    >
                        <img
                            class="h-8 w-8 overflow-hidden inline-block"
                            :src="colorImage.light"
                        >
                        Light
                    </a>

                    <a
                        class="block px-4 py-2 bg-gray-200 dark:bg-slate-600 hover:bg-gray-100 dark:hover:bg-slate-500 cursor-pointer select-none rounded-md border border-gray-400 dark:border-gray-800 active:bg-gray-300 dark:active:bg-slate-400"
                        @click="setDark('system')"
                    >
                        <img
                            class="h-8 w-8 overflow-hidden inline-block"
                            :src="colorImage.system"
                        >
                        System
                    </a>
                </div>
                
                <RouterLink
                    to="/"
                    class="flex flex-row items-center hover:text-slate-500 dark:hover:text-cyan-300 active:text-slate-700 dark:active:text-cyan-500"
                >
                    <img
                        class="w-8 h-8"
                        src="/src/assets/images/vue_logo.png"
                    >
                    Vue Showcase
                </RouterLink>
                |
                <RouterLink
                    to="/users"
                    class="hover:text-slate-500 dark:hover:text-cyan-300 active:text-slate-700 dark:active:text-cyan-500"
                >
                    Users
                </RouterLink>
                <template v-if="currentUser == null">
                    |
                    <RouterLink
                        to="/register"
                        class="hover:text-slate-500 dark:hover:text-cyan-300 active:text-slate-700 dark:active:text-cyan-500"
                    >
                        Register
                    </RouterLink>
                    |
                    <RouterLink
                        to="/login"
                        class="hover:text-slate-500 dark:hover:text-cyan-300 active:text-slate-700 dark:active:text-cyan-500"
                    >
                        Login
                    </RouterLink>
                </template>
                |
                <RouterLink
                    to="/erorr"
                    class="hover:text-slate-500 dark:hover:text-cyan-300 active:text-slate-700 dark:active:text-cyan-500"
                >
                    Error
                </RouterLink>
            </div>
            
            <div
                v-if="currentUser != null"
                class="absolute top-2 right-1"
            >
                <span class="mr-2">
                    Welcome
                    <RouterLink
                        :to="{ name: 'Users', params: { id: currentUser.id }}"
                        class="text-green-700 hover:text-green-500 dark:text-cyan-300 dark:hover:text-cyan-200"
                    >
                        {{ currentUser?.username }}
                    </RouterLink>
                </span>

                <button
                    class="inline-block p-2 mt-1 mr-1 rounded text-slate-900 dark:text-slate-300 bg-gray-200 hover:bg-gray-400 active:bg-gray-500 dark:bg-gray-600 dark:hover:bg-gray-500 dark:active:bg-gray-400"
                    @click="usersStore.logout"
                >
                    Logout
                </button>
            </div>
        </nav>

        <div class="m-4">
            <RouterView />
        </div>
    </div>
</template>