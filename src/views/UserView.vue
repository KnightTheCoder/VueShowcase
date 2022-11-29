<script setup>
import UserList from '@/components/UserList.vue'
import BaseInput from '@/components/BaseInput.vue'
import BaseButton from '@/components/BaseButton.vue'
import ToastNotification from '@/components/ToastNotification.vue'
import { computed, onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useTitle } from '@/composables/title'
import { useUser } from '@/composables/user'
import { useNotification } from '@/composables/notification'
import { useUsersStore } from '@/stores/users'
import { useLocalizationStore } from '@/stores/localization'

const route = useRoute()
const title = useTitle('Vue Showcase')
const { getLocalWord } = useLocalizationStore()

const { notification, setNotification, closeNotification } = useNotification()
const usersStore = useUsersStore()

const { username, email, password, isUserCorrect, isEmpty } = useUser()
const user = computed(
    () => {
        const foundUsers = usersStore.users.filter(u => u.id == route.params.id)
        return foundUsers.length == 0 ? { id: -1 } : foundUsers[0]
    }
)

const userExists = computed(() => route.params.id && user.value.id > -1)
const userDoesntExist = computed(() => route.params.id != '')

function usernameChange() {
    if (userExists.value) {
        title.value = user.value.username
        username.value = user.value.username
        email.value = user.value.email
        password.value = user.value.password
    } else {
        title.value = 'Users'
    }
}

onMounted(() => {
    usernameChange()
})

watch(
    () => user.value.username,
    () => {
        usernameChange()
    }
)

const isBeingEdited = ref(false)

function toggleEdit() {
    isBeingEdited.value = !isBeingEdited.value
}

function saveChanges() {
    if (isUserCorrect.value) {
        user.value.username = username.value
        user.value.email = email.value
        user.value.password = password.value

        setNotification(
            getLocalWord('success_save'),
            getLocalWord('success_save_desc'),
            'success'
        )
    } else if(isEmpty.value) {
        setNotification(
            getLocalWord('failed_save'),
            getLocalWord('failed_save_empty'),
            'danger'
        )
    } else {
        setNotification(
            getLocalWord('failed_save'),
            getLocalWord('failed_save_desc'),
            'danger'
        )
    }
}

function resetUser() {
    username.value = user.value.username
    email.value = user.value.email
    password.value = user.value.password
}
</script>

<template>
    <div class="user">
        <div
            v-if="userExists"
            class="border border-blue-500 dark:border-sky-500 rounded-lg mt-8 p-4 w-1/2 mx-auto bg-gray-300 dark:bg-gray-700 shadow-lg shadow-blue-500 dark:shadow-sky-500"
        >
            <div class="text-center">
                <h1 class="text-center text-3xl mb-6">
                    {{ getLocalWord('welcome') }} {{ user.username }}
                </h1>
                <div class="my-4 p-4 text-lg">
                    <p>{{ getLocalWord('id') }}: {{ user.id }}</p>
                    <p>{{ getLocalWord('username') }}: {{ user.username }}</p>
                    <p>{{ getLocalWord('email') }}: {{ user.email }}</p>
                    <p>{{ getLocalWord('password') }}: {{ user.password }}</p>
                </div>
                <BaseButton
                    class="px-6"
                    @click="toggleEdit"
                >
                    {{ getLocalWord('edit') }}
                </BaseButton>
            </div>

            <div
                v-if="isBeingEdited"
                class="m-4 mx-auto w-fit"
                @keydown.enter="saveChanges"
            >
                <BaseInput
                    v-model="username"
                    type="text"
                >
                    {{ getLocalWord('username') }}
                </BaseInput>
                <BaseInput
                    v-model="email"
                    type="email"
                >
                    {{ getLocalWord('email') }}
                </BaseInput>
                <BaseInput
                    v-model="password"
                    type="password"
                >
                    {{ getLocalWord('password') }}
                </BaseInput>
            
                <BaseButton @click="saveChanges">
                    {{ getLocalWord('save_changes') }}
                </BaseButton>
                <BaseButton
                    class="ml-9 px-4"
                    @click="resetUser"
                >
                    {{ getLocalWord('reset') }}
                </BaseButton>
            </div>

            <ToastNotification
                :notification="notification"
                @close="closeNotification"
            />
        </div>

        <p
            v-else-if="userDoesntExist"
            class="text-center"
        >
            {{ getLocalWord('user_doesnt_exist') }}
        </p>

        <UserList v-else />
    </div>
</template>