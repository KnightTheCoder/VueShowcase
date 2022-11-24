import { computed } from 'vue'

export function useLocalStorage(storeName = '') {
    const value = computed({
        get: () => localStorage.getItem(storeName),
        set: (value) => localStorage.setItem(storeName, value)
    })

    function deleteValue() {
        localStorage.removeItem(storeName)
    }

    return {
        value,
        deleteValue
    }
}