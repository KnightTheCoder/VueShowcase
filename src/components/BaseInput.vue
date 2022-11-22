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
        >
    </div>
</template>
