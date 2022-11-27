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
    <div class="w-3/4 my-4 mx-auto rounded-2xl bg-slate-300 dark:bg-slate-700 h-fit border border-gray-500 p-2 shadow-md shadow-teal-700 dark:shadow-teal-300 hover:bg-slate-200 dark:hover:bg-slate-600">
        <h2 class="text-2xl text-teal-700 dark:text-teal-500 p-2 mb-2 border border-gray-500">
            <img
                v-if="imageSource != null"
                class="inline-block h-16 w-16 mr-4 p-1 bg-slate-100 rounded-full dark:bg-slate-500"
                :src="imageSource"
            >
            {{ title }}
        </h2>

        <p class="text-teal-700 dark:text-teal-300 p-6">
            <slot />
        </p>
    </div>
</template>