import { ref, watch } from 'vue'

export function useTitle(titleSuffix = '') {
    const title = ref('')

    watch(title, (newValue) => {
        document.title = `${newValue} - ${titleSuffix}`
    })

    return title
}