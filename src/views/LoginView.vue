<script setup>
import UserList from '@/components/UserList.vue'
import BaseInput from '@/components/BaseInput.vue'
import BaseButton from '@/components/BaseButton.vue'
import ToastNotification from '@/components/ToastNotification.vue'
import { useUser } from '@/composables/user'
import { useNotification } from '@/composables/notification'
import { useUsersStore } from '@/stores/users'
import { useLocalizationStore } from '@/stores/localization'
import router from '@/router'

const { getLocalWord } = useLocalizationStore()
const { username, password, resetUser } = useUser()
const { notification, setNotification, closeNotification } = useNotification()
const usersStore = useUsersStore()

const login = () => {
    const userId = usersStore.login(
        username.value,
        password.value
    )

    if (userId > -1) {
        resetUser()
        setNotification(
            'Successfull login',
            'You successfully logged in',
            'success'
        )

        setTimeout(() => {
            router.push({
                name: 'Users',
                params: { id: userId }
            })
        }, 300)
    } else {
        setNotification(
            'Failed to log in',
            'Incorrect username or password',
            'danger'
        )
    }
}
</script>

<template>
    <div class="register">
        <h1 class="text-center text-3xl mb-4">
            {{ getLocalWord('login') }}
        </h1>

        <form
            class="flex flex-col items-center"
            @submit.prevent="login"
        >
            <BaseInput
                v-model="username"
                type="text"
            >
                {{ getLocalWord('username') }}
            </BaseInput>
            <BaseInput
                v-model="password"
                type="password"
            >
                {{ getLocalWord('password') }}
            </BaseInput>

            <BaseButton>
                {{ getLocalWord('login') }}
            </BaseButton>

            <UserList />

            <ToastNotification
                :notification="notification"
                @close="closeNotification"
            />
        </form>
    </div>
</template>