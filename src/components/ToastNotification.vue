<script setup>
import { computed } from 'vue'

const props = defineProps({
    notification: {
        type: Object,
        required: true
    }
})

const emit = defineEmits(['close'])

const notificationColor = computed(() => {
    let textColor = '#f1f1f1'
    let backgroundColor = '#0077f0'
    let hoverColor = '#0000ff'

    switch (props.notification.type) {
        case 'success':
            textColor = '#101010'
            backgroundColor = '#00f000'
            hoverColor = '#00ff00'
            break

        case 'warning':
            textColor = '#a30000'
            backgroundColor = '#f0f000'
            hoverColor = '#ffff00'
            break

        case 'danger':
            textColor = '#f1f1f1'
            backgroundColor = '#f00000'
            hoverColor = '#ff0000'
            break
    }
    return {
        textColor,
        backgroundColor,
        hoverColor
    }
})
</script>

<template>
    <Teleport to="body">
        <div
            v-if="notification.open"
            class="modal"
        >
            <div @click="emit('close')">
                <h3>
                    {{ notification.title }}
                </h3>
                <p>
                    {{ notification.description }}
                </p>
            </div>
        </div>
    </Teleport>
</template>

<style scoped>
.modal {
    z-index: 999;
    position: fixed;
    top: 10%;
    left: 50%;
    margin-left: -15vw;
}


.modal div {
    padding: 20px;
    width: 30vw;
    background-color: v-bind('notificationColor.backgroundColor');
    color: v-bind('notificationColor.textColor');
    border-radius: 10px;
    box-shadow: 4px 6px 5px 4px #303030;
}

.modal > div:hover {
    cursor: pointer;
    background-color: v-bind('notificationColor.hoverColor');
}
</style>