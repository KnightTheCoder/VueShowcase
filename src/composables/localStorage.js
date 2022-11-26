// import { computed } from 'vue'

export function useLocalStorage(storeName = '') {
    function get() {
        return localStorage.getItem(storeName)
    }

    function set(value) {
        console.log(value, typeof value)
        if (value == null) {
            localStorage.removeItem(storeName)
        }
        localStorage.setItem(storeName, value)
    }

    return {
        get,
        set
    }
}