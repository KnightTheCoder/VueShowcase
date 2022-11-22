import { ref, watch } from "vue"

export function useTitle(name = '') {
    const title = ref(name)

    watch(title, (newValue) => {
        document.title = newValue
    })

    return title
}