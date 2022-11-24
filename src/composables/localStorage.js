import { computed } from 'vue'

export function useLocalStorage(storeName = '') {
    const data = computed({
        get: () => localStorage.getItem(storeName),
        set: (value) => localStorage.setItem(storeName, value)
    })

    function deleteValue() {
        localStorage.removeItem(storeName)
    }

    return {
        data,
        deleteValue
    }
}