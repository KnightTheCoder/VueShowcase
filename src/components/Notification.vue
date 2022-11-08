<script setup>
import { ref } from 'vue';

const open = ref(true)
</script>

<template>
    <Teleport to="body">
        <div v-if="open" class="modal">
            <div>
                <h3>
                    <slot name="title" />
                    <button @click="open = false">X</button>
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

div button {
    display: inline-block;
    margin-left: 75%;
    background-color: red;
    border-radius: 4px;
}

div button:hover {
    background-color: #fa0;
    outline: 1px solid #f70;
}
</style>