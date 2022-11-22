import { reactive } from 'vue'
import { defineStore } from 'pinia'

export const useUsersStore = defineStore('user', () => {
    let id = 0
    const users = reactive([])
    const loggedIn = reactive({
        isLoggedIn: false,
        userId: -1
    })

    const registerUser = (username, password) => {
        users.push({
            id: id++,
            username,
            password
        })
    }

    const reset = () => {
        users.length = 0
    }

    const login = (username, password) => {
        const foundUsers = users
            .filter(
                u => u.username == username
                && u.password == password
            )

        if (foundUsers.length == 1) {
            loggedIn.isLoggedIn = true
            loggedIn.userId = foundUsers[0].id
            return foundUsers[0].id
        }
        return -1
    }

    const logout = () => {
        loggedIn.isLoggedIn = false
        loggedIn.userId = -1
    }

    return {
        users,
        loggedIn,
        registerUser,
        reset,
        login,
        logout
    }
})