<script setup>
const emit = defineEmits(['click'])

const props = defineProps({
    image: {
        type: String,
        required: false,
        default: null
    },
    parameter: {
        type: String,
        required: false,
        default: null
    }
})


function onClicked() {
    emit('click', props.parameter)
}
</script>

<template>
    <a
        class="block px-4 py-2 bg-gray-200 dark:bg-slate-600 hover:bg-gray-100 dark:hover:bg-slate-500 cursor-pointer select-none rounded-md border border-gray-400 dark:border-gray-800 active:bg-gray-300 dark:active:bg-slate-400"
        @click="onClicked"
    >
        <img
            v-if="image"
            class="h-8 w-8 overflow-hidden inline-block"
            :src="image"
        >
        <slot />
    </a>
</template>