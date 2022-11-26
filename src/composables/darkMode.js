import { onMounted, ref, watch } from 'vue'

export function useDarkMode(value) {
    const isDark = ref(value)

    onMounted(() => {
        onChange(isDark.value)
    })

    watch(
        isDark,
        (value) => onChange(value)
    )

    function onChange(value) {
        if(isDark.value == null) {
            isDark.value = window.matchMedia('(prefers-color-scheme: dark)').matches
        } else if (value) {
            document.documentElement.classList.add('dark')
        } else {
            document.documentElement.classList.remove('dark')
        }
    }

    return isDark
}