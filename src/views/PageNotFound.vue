<script setup>
import { useRoute } from 'vue-router'

const route = useRoute()
</script>

<template>
    <div class="not-found m-10">
        <h1 class="text-center text-3xl mb-20 basis-1/2">
            404 | Page not found!
        </h1>

        <p class="text-center basis-1/2">
            Cannot find path: '{{ route.fullPath }}'
        </p>
    </div>
</template>