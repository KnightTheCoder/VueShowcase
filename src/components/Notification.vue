<script setup>
const props = defineProps({
    open: {
        type: Boolean,
        required: true
    }
})

const emit = defineEmits(['close'])
</script>

<template>
    <Teleport to="body">
        <div v-if="open" class="modal">
            <div @click="emit('close')">
                <h3>
                    <slot name="title" />
                </h3>
                <p>
                    <slot />
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
    background-color: #242424;
    color: whitesmoke;
    border-radius: 10px;
    box-shadow: 4px 6px 5px 4px #303030;
}

.modal > div:hover {
    cursor: pointer;
}
</style>