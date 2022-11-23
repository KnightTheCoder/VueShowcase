import { reactive } from 'vue'

export function useNotification() {
    let notification = reactive({
        open: false,
        title: 'Title',
        description: 'Description',
        type: 'info'
    })

    function setNotification(title, description, type = 'info') {
        notification.open = true
        notification.title = title
        notification.description = description
        notification.type = type
    }

    function closeNotification() {
        notification.open = false
    }

    function resetNotification() {
        setNotification(
            'Title',
            'Description'
        )
    }

    return {
        notification,
        setNotification,
        closeNotification,
        resetNotification
    }
}