<script setup>
import UserList from '@/components/UserList.vue'
import BaseInput from '@/components/BaseInput.vue'
import { computed, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useTitle } from '@/composables/title'
import { useUser } from '@/composables/user'
import { useUsersStore } from '@/stores/users'

const route = useRoute()
const title = useTitle('Vue Showcase')
const usersStore = useUsersStore()

const { username, email, password } = useUser()
const user = computed(
    () => {
        const foundUsers = usersStore.users.filter(u => u.id == route.params.id)
        return foundUsers.length == 0 ? { id: -1 } : foundUsers[0]
    }
)

const userExists = computed(() => route.params.id && user.value.id > -1)
const userDoesntExist = computed(() => route.params.id != '')

onMounted(() => {
    if (userExists.value) {
        title.value = user.value.username
        username.value = user.value.username
        email.value = user.value.email
        password.value = user.value.password
    } else {
        title.value = 'Users'
    }
})

const isBeingEdited = ref(false)

function toggleEdit() {
    isBeingEdited.value = !isBeingEdited.value
}

function saveChanges() {
    user.value.username = username.value
    user.value.email = email.value
    user.value.password = password.value
}
</script>

<template>
    <div class="user text-center">
        <div
            v-if="userExists"
            class="border border-sky-500 rounded-lg p-4 w-1/2 mx-auto bg-gray-300 dark:bg-gray-700"
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

            <button
                class="inline-block p-2 mt-1 mr-1 rounded text-slate-900 dark:text-slate-300 bg-gray-200 hover:bg-gray-400 active:bg-gray-500 dark:bg-slate-600 dark:hover:bg-slate-500 dark:active:bg-slate-400"
                @click="toggleEdit"
            >
                Edit
            </button>

            <div
                v-if="isBeingEdited"
                class="m-4"
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
                <button
                    class="inline-block p-2 mt-4 mr-1 rounded text-slate-900 dark:text-slate-300 bg-gray-200 hover:bg-gray-400 active:bg-gray-500 dark:bg-slate-600 dark:hover:bg-slate-500 dark:active:bg-slate-400"
                    @click="saveChanges"
                >
                    Save changes
                </button>
            </div>
        </div>

        <p v-else-if="userDoesntExist">
            User doesn't exist
        </p>

        <UserList v-else />
    </div>
</template>