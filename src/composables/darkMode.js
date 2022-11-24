import { ref, watch } from 'vue'

export function useDarkMode() {
    const isDark = ref(false)

    watch(isDark, (value) => {
        if (value) {
            document.documentElement.classList.add('dark')
        } else {
            document.documentElement.classList.remove('dark')
        }
    })

    return {
        isDark
    }
}