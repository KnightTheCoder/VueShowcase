// import { computed } from 'vue'

export function useLocalStorage(storeName = '') {
    function get() {
        return localStorage.getItem(storeName)
    }

    function set(value) {
        localStorage.setItem(storeName, value)
    }

    function deleteData() {
        localStorage.removeItem(storeName)
    }

    return {
        get,
        set,
        deleteData
    }
}