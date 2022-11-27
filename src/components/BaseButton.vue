<script setup>
const emit = defineEmits(['click'])
</script>

<template>
    <button
        class="inline-block p-2 m-1 rounded-xl text-slate-900 dark:text-slate-300 bg-gray-200 hover:bg-gray-400 active:bg-gray-500 dark:bg-slate-800 dark:hover:bg-slate-500 dark:active:bg-slate-400"
        @click="emit('click')"
    >
        <slot />
    </button>
</template>