<script setup>
defineProps({
    notification: {
        type: Object,
        required: true
    }
})

const emit = defineEmits(['close'])
</script>

<template>
    <Teleport to="body">
        <div
            v-if="notification.open"
            class="z-50 fixed bottom-4 w-screen"
        >
            <div
                class="mx-auto p-8 h-fit w-fit rounded-md shadow-lg shadow-black hover:cursor-pointer bg-gray-300 hover:bg-gray-200 dark:bg-slate-600 dark:hover:bg-slate-500 text-sky-700 dark:text-sky-400"
                :class="{ 'info': notification.type == 'info', 'success': notification.type == 'success', 'warning': notification.type == 'warning', 'danger': notification.type == 'danger' }"
                @click="emit('close')"
            >
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
.info {
    @apply text-sky-700 dark:text-sky-500;
}

.success {
    @apply text-green-700 dark:text-green-500;
}

.warning {
    @apply text-orange-700 dark:text-orange-400;
}

.danger {
    @apply text-red-700 dark:text-red-500;
}
</style>