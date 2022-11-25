import { onMounted, ref, watch } from 'vue'

export function useDarkMode(value) {
    const isDark = ref(value)

    onMounted(() => {
        if (isDark.value == null) {
            isDark.value = window.matchMedia('(prefers-color-scheme: dark)').matches
        }

        onChange(isDark.value)
    })

    watch(
        isDark,
        (value) => onChange(value)
    )

    function onChange(value) {
        if (value) {
            document.documentElement.classList.add('dark')
        } else {
            document.documentElement.classList.remove('dark')
        }
    }

    return isDark
}