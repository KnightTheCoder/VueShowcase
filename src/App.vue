<script setup>
import DropDownMenu from './components/DropDownMenu.vue'
import BaseButton from '@/components/BaseButton.vue'
import { computed, watch, reactive, onMounted, toRefs } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useTitle } from '@/composables/title'
import { useLocalStorage } from '@/composables/localStorage'
import { useDarkMode } from '@/composables/darkMode'
import { useLocalizationStore } from './stores/localization'
import { useUsersStore } from '@/stores/users'

const { currentLanguage } = toRefs(useLocalizationStore())
const { getLocalWord } = useLocalizationStore()

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

onMounted(() => {
    setImages()
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

const darkBtnImage = computed(() => {
    return colorImage.current
})

const darkInformation = computed(() => {
    return [
        { text: getLocalWord('dark'), image: colorImage.dark, parameter: 'dark' },
        { text: getLocalWord('light'), image: colorImage.light, parameter : 'light' },
        { text: getLocalWord('system'), image: colorImage.system, parameter: 'system' },
    ]
})

const languageInformation = computed(() => {
    return [
        { text: 'EN', image: null, parameter: 'en' },
        { text: 'HU', image: null, parameter: 'hu' },
        { text: 'DE', image: null, parameter: 'de' },
        { text: 'ES', image: null, parameter: 'es' }
    ]
})

const selectedLanguage = computed(() => {
    return currentLanguage.value.toUpperCase()
})

function setLanguage(value) {
    currentLanguage.value = value
}
</script>

<template>
    <div class="app">
        <nav>
            <div class="flex items-center p-2 bg-gray-300 dark:bg-slate-700">
                <DropDownMenu
                    :button-image="darkBtnImage"
                    :information="darkInformation"
                    @click="setDark"
                />

                <DropDownMenu
                    class="left-16"
                    :information="languageInformation"
                    @click="setLanguage"
                >
                    {{ selectedLanguage }}
                </DropDownMenu>
                
                <RouterLink
                    to="/"
                    class="flex flex-row items-center hover:text-slate-500 dark:hover:text-cyan-300 active:text-slate-700 dark:active:text-cyan-500"
                >
                    <img
                        class="w-8 h-8"
                        src="/src/assets/images/vue_logo.png"
                    >
                    {{ getLocalWord('title') }}
                </RouterLink>
                |
                <RouterLink
                    to="/users"
                    class="hover:text-slate-500 dark:hover:text-cyan-300 active:text-slate-700 dark:active:text-cyan-500"
                >
                    {{ getLocalWord('users') }}
                </RouterLink>
                |
                <RouterLink
                    to="/erorr"
                    class="hover:text-slate-500 dark:hover:text-cyan-300 active:text-slate-700 dark:active:text-cyan-500"
                >
                    {{ getLocalWord('error') }}
                </RouterLink>
            </div>

            <div
                v-if="currentUser == null"
                class="absolute top-4 right-3"
            >
                <RouterLink
                    to="/register"
                    class="hover:text-slate-500 dark:hover:text-cyan-300 active:text-slate-700 dark:active:text-cyan-500"
                >
                    {{ getLocalWord('register') }}
                </RouterLink>
                |
                <RouterLink
                    to="/login"
                    class="hover:text-slate-500 dark:hover:text-cyan-300 active:text-slate-700 dark:active:text-cyan-500"
                >
                    {{ getLocalWord('login') }}
                </RouterLink>
            </div>
            
            <div
                v-if="currentUser != null"
                class="absolute top-2 right-1"
            >
                <span class="mr-2">
                    {{ getLocalWord('welcome') }}
                    <RouterLink
                        :to="{ name: 'Users', params: { id: currentUser.id }}"
                        class="text-green-700 hover:text-green-500 dark:text-cyan-300 dark:hover:text-cyan-200"
                    >
                        {{ currentUser?.username }}
                    </RouterLink>
                </span>

                <BaseButton @click="usersStore.logout">
                    {{ getLocalWord('logout') }}
                </BaseButton>
            </div>
        </nav>

        <div class="m-4">
            <RouterView />
        </div>
    </div>
</template>