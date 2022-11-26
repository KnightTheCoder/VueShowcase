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
        <label>
            <slot />
        </label>

        <input
            v-bind="$attrs"
            v-model="value"
            class="inline-block p-2 m-2 rounded-md bg-gray-300 focus:bg-gray-100 dark:bg-gray-700 dark:focus:bg-gray-600 border border-gray-700 dark:border-gray-500 focus:border-gray-400 dark:focus:border-slate-300 outline-none"
        >
    </div>
</template>
