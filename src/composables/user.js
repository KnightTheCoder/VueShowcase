import { computed, ref } from 'vue'

export function useUser() {
    const username = ref('')
    const password = ref('')
    const confirmPassword = ref('')

    const doPasswordsMatch = computed(() => {
        return password.value == confirmPassword.value
    })
    
    const isUserCorrect = computed(() => {
        return username.value != ''
            && password.value != ''
            && password.value.length >= 6
            && doPasswordsMatch.value
    })

    const resetUser = () => {
        username.value = ''
        password.value = ''
        confirmPassword.value = ''
    }

    return {
        username,
        password,
        confirmPassword,
        resetUser,
        doPasswordsMatch,
        isUserCorrect
    }
}