<script setup>
import ToastNotification from '@/components/ToastNotification.vue'
import { useUsersStore } from '@/stores/users'
import { computed, watch, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useTitle } from '@/composables/title'
import { useNotification } from '@/composables/notification'
import router from '@/router'

const route = useRoute()
const title = useTitle()
const usersStore = useUsersStore()
const { notification, setNotification } = useNotification()

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

onMounted(() => {
    setNotification(
        'All set',
        'Notification has been set'
    )

    setTimeout(() => {
        setNotification(
            'New stuff',
            'Something has changed',
            'warning'
        )

        setTimeout(() => {
            setNotification(
                'Oops! more change',
                'The final change has happened',
                'danger'
            )
        }, 2000)
    }, 2000)
})
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

        <ToastNotification
            :notification="notification"
            @close="notification.open = false"
        />
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