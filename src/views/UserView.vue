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

const route = useRoute()
const title = useTitle('Vue Showcase')
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
            'Successfully saved',
            'Changes have been saved',
            'success'
        )
    } else if(isEmpty.value) {
        setNotification(
            'Failed to save',
            'Fields are empty',
            'danger'
        )
    } else {
        setNotification(
            'Failed to save',
            'Fields are incorrect',
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
    <div class="user text-center">
        <div
            v-if="userExists"
            class="border border-blue-500 dark:border-sky-500 rounded-lg mt-8 p-4 w-1/2 mx-auto bg-gray-300 dark:bg-gray-700 shadow-lg shadow-blue-500 dark:shadow-sky-500"
        >
            <h1 class="text-center text-3xl mb-6">
                Welcome {{ user.username }}!
            </h1>
            <div class="my-4 p-4 text-lg">
                <p>Id: {{ user.id }}</p>
                <p>Username: {{ user.username }}</p>
                <p>Email: {{ user.email }}</p>
                <p>Password: {{ user.password }}</p>
            </div>

            <BaseButton @click="toggleEdit">
                Edit
            </BaseButton>

            <div
                v-if="isBeingEdited"
                class="m-4"
                @keydown.enter="saveChanges"
            >
                <BaseInput
                    v-model="username"
                    type="text"
                >
                    Username
                </BaseInput>

                <BaseInput
                    v-model="email"
                    type="email"
                >
                    Email
                </BaseInput>

                <BaseInput
                    v-model="password"
                    type="password"
                >
                    Password
                </BaseInput>
                
                <BaseButton @click="saveChanges">
                    Save changes
                </BaseButton>

                <BaseButton @click="resetUser">
                    Reset
                </BaseButton>
            </div>

            <ToastNotification
                :notification="notification"
                @close="closeNotification"
            />
        </div>

        <p v-else-if="userDoesntExist">
            User doesn't exist
        </p>

        <UserList v-else />
    </div>
</template>