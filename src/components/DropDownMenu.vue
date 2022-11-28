<script setup>
import DropDownItem from '@/components/DropDownItem.vue'
import { ref, onMounted } from 'vue'

const emit = defineEmits(['click'])
defineProps({
    information: {
        type: Object,
        required: true,
    },
    buttonImage: {
        type: String,
        required: false,
        default: null
    }
})

const isOpen = ref(false)

function setOpen(value) {
    if (value == 'toggle') {
        isOpen.value = !isOpen.value
    } else {
        isOpen.value = value
    }
}

function handleEscape(e) {
    if (e.key == 'Esc' || e.key == 'Escape') {
        isOpen.value = false
    }
}

onMounted(() => {   
    document.addEventListener('keydown', handleEscape)
})

function onClicked(value) {
    emit('click', value)
}
</script>

<template>
    <button
        v-bind="$attrs"
        class="relative z-10 w-10 h-10 m-1 mr-4 p-1 rounded-full border border-slate-900 bg-gray-300 dark:bg-gray-500 focus:border-2 hover:bg-gray-300 dark:hover:bg-slate-400 focus:border-sky-400 focus:bg-gray-300 dark:focus:bg-slate-400"
        @click="setOpen('toggle')"
    >
        <img
            v-if="buttonImage"
            :src="buttonImage"
        >
    </button>

    <button
        v-if="isOpen"
        class="fixed inset-0 h-full w-full cursor-default"
        tabindex="-1"
        @click="setOpen(false)"
    />

    <div
        v-if="isOpen"
        class="absolute top-12 m-2 shadow-lg shadow-gray-700 dark:shadow-gray-800"
    >
        <DropDownItem
            v-for="{text, image, parameter} in information"
            :key="text"
            :image="image"
            :parameter="parameter"
            @click="onClicked"
        >
            {{ text }}
        </DropDownItem>
    </div>
</template>