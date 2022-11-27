<script setup>
defineProps({
    title: {
        type: String,
        required: true
    },
    imageSource: {
        type: String,
        required: false,
        default: null
    }
})
</script>

<template>
    <div class="w-1/2 mt-4 mx-auto bg-slate-300 dark:bg-slate-700 h-fit border border-gray-500 p-2 shadow-md shadow-teal-700 dark:shadow-teal-300 hover:bg-slate-200 dark:hover:bg-slate-600">
        <h2 class="text-2xl text-teal-700 dark:text-teal-500 p-2 mb-2 border border-gray-500">
            <img
                v-if="imageSource != null"
                class="inline-block h-20 w-20 bg-slate-100 rounded-full dark:bg-slate-300 p-2"
                :src="imageSource"
            >
            {{ title }}
        </h2>

        <p class="text-cyan-900 dark:text-cyan-300 p-6">
            <slot />
        </p>
    </div>
</template>