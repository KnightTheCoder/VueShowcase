<script setup>
import { computed } from 'vue'

const emit = defineEmits(['update:modelValue'])

const props = defineProps({
    modelValue: {
        type: [String],
        required: true,
    },
})

const value = computed({
    get() {
        return props.modelValue
    },
    set(value) {
        emit('update:modelValue', value)
    },
})
</script>

<template>
    <div>
        <label class="text-black dark:text-white">
            <slot />
        </label>

        <input
            v-bind="$attrs"
            v-model="value"
            class="inline-block p-2 m-2 rounded bg-gray-300 text-black focus:bg-gray-100 dark:bg-gray-700 dark:text-white dark:focus:bg-gray-500"
        >
    </div>
</template>
