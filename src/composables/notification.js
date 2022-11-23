import { reactive } from 'vue'

export function useNotification() {
    let notification = reactive({
        open: false,
        title: 'Welcome',
        description: 'Welcome to the site',
        type: 'info'
    })

    function setNotification(title, description, type = 'info') {
        notification.open = true
        notification.title = title
        notification.description = description
        notification.type = type
    }

    function resetNotification() {
        notification.open = true
        notification.title = 'Title'
        notification.description = 'Description'
        notification.type = 'info'
    }

    return {
        notification,
        setNotification,
        resetNotification
    }
}