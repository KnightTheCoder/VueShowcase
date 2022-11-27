import { computed, ref } from 'vue'

export function useUser() {
    const username = ref('')
    const email = ref('')
    const password = ref('')
    const confirmPassword = ref('')

    const isEmpty = computed(() => {
        return username.value != ''
            && password.value != ''
            && email.value != ''
    })

    const doPasswordsMatch = computed(() => {
        return password.value == confirmPassword.value
    })

    const isPasswordFormatCorrect = computed(() => {
        return password.value.length >= 6
    })

    const isEmailFormatCorrect = computed(() => {
        return email.value.indexOf('@') > -1 && email.value.indexOf('.') > -1
    })
    
    const isUserCorrect = computed(() => {
        return isEmpty.value
            && isEmailFormatCorrect.value
            && isPasswordFormatCorrect.value
    })

    const resetUser = () => {
        username.value = ''
        password.value = ''
        email.value = ''
        confirmPassword.value = ''
    }

    return {
        username,
        email,
        password,
        confirmPassword,
        resetUser,
        isEmpty,
        isPasswordFormatCorrect,
        isEmailFormatCorrect,
        doPasswordsMatch,
        isUserCorrect
    }
}