<script setup>
import { useRoute } from 'vue-router'
import { useLocalizationStore } from '@/stores/localization'

const route = useRoute()
const { getLocalWord } = useLocalizationStore()
</script>

<template>
    <div class="not-found m-10">
        <h1 class="text-center text-3xl mb-20 basis-1/2">
            404 | {{ getLocalWord('page_not_found') }}
        </h1>

        <p class="text-center basis-1/2">
            {{ getLocalWord('cannot_find_path') }}: '{{ route.fullPath }}'
        </p>
    </div>
</template>