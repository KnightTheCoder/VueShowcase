<script setup>
import BaseInput from '@/components/BaseInput.vue'
import BaseButton from '@/components/BaseButton.vue'
import ToastNotification from '@/components/ToastNotification.vue'
import { useUser } from '@/composables/user'
import { useNotification } from '@/composables/notification'
import { useUsersStore } from '@/stores/users'
import { useLocalizationStore } from '@/stores/localization'
import router from '@/router'

const { getLocalWord } = useLocalizationStore()
const { isUserCorrect, doPasswordsMatch, username, password, email, confirmPassword, resetUser, isEmpty } = useUser()
const { notification, setNotification, closeNotification } = useNotification()
const usersStore = useUsersStore()

const register = () => {
    if (isUserCorrect.value && doPasswordsMatch.value) {
        usersStore.registerUser(
            username.value,
            email.value,
            password.value
        )
        resetUser()

        setNotification(
            getLocalWord('success_register'),
            getLocalWord('success_register_desc'),
            'success'
        )
        setTimeout(() => {
            router.push({
                name: 'Login'
            })
        }, 300)

    } else if (isEmpty.value) {
        setNotification(
            getLocalWord('failed_register'),
            getLocalWord('failed_register_empty'),
            'danger'
        )
    } else {
        setNotification(
            getLocalWord('failed_register'),
            getLocalWord('failed_register_desc'),
            'danger'
        )
    }
}
</script>

<template>
    <div class="register">
        <h1 class="text-center text-3xl mb-4">
            {{ getLocalWord('register') }}
        </h1>

        <form
            class="flex flex-col items-center"
            @submit.prevent="register"
        >
            <BaseInput
                v-model="username"
                :required="true"
                type="text"
            >
                {{ getLocalWord('username') }}
            </BaseInput>

            <BaseInput
                v-model="email"
                :required="true"
                type="email"
            >
                {{ getLocalWord('email') }}
            </BaseInput>

            <BaseInput
                v-model="password"
                :required="true"
                type="password"
            >
                {{ getLocalWord('password') }}
            </BaseInput>

            <BaseInput
                v-model="confirmPassword"
                :required="true"
                type="password"
            >
                {{ getLocalWord('confirm_password') }}
            </BaseInput>

            <BaseButton>
                {{ getLocalWord('register') }}
            </BaseButton>

            <ToastNotification
                :notification="notification"
                @close="closeNotification"
            />
        </form>
    </div>
</template>