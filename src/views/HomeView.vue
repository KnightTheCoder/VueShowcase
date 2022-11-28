<script setup>
import InformationArticle from '@/components/InformationArticle.vue'
import { useLocalizationStore } from '@/stores/localization'

const { getLocalWord } = useLocalizationStore()

// Must import router to use it first
// import { useRouter } from 'vue-router'
// const router = useRouter()
// router.push('/users/1')
</script>

<template>
    <div class="home">
        <h1 class="text-center my-8 text-4xl">
            {{ getLocalWord('title') }}
            <p class="mt-4 underline text-lg">
                {{ getLocalWord('created_by') }} Kocsis Dominik Adrián
            </p>
        </h1>

        <InformationArticle
            title="Purpose of Vue Showcase"
            image-source="/src/assets/images/vue_logo.png"
        >
            {{ getLocalWord('purpose') }}
        </InformationArticle>

        <h1 class="text-3xl text-center mt-14 mb-6">
            {{ getLocalWord('services_used') }}
        </h1>

        <InformationArticle title="Vue - Frontend Framework">
            Vue (pronounced /vju:/, like view) is a JavaScript framework for building user interfaces.
            It builds on top of standard HTML, CSS, and JavaScript and provides a declarative and component-based programming model that helps you efficiently develop user interfaces,
            be they simple or complex.
        </InformationArticle>

        <InformationArticle title="Vue Router - Routing">
            Vue Router is the official router for Vue.js. It deeply integrates with Vue.js core to make building Single Page Applications with Vue.js a breeze. Features include: <br>
            <br>

            <ul class="ml-10 list-disc">
                <li>Nested routes mapping</li>
                <li>Dynamic Routing</li>
                <li>Modular, component-based router configuration</li>
                <li>Route params, query, wildcards</li>
                <li>View transition effects powered by Vue.js' transition system</li>
                <li>Fine-grained navigation control</li>
                <li>Links with automatic active CSS classes</li>
                <li>HTML5 history mode or hash mode</li>
                <li>Customizable Scroll Behavior</li>
                <li>Proper encoding for URLs</li>
            </ul>
        </InformationArticle>

        <InformationArticle title="Pinia - State Management">
            Pinia is a store library for Vue, it allows you to share a state across components/pages.
            If you are familiar with the Composition API, you might be thinking you can already share a global state with a simple export const state = reactive({}).
            This is true for single page applications but exposes your application to security vulnerabilities if it is server side rendered. But even in small single page applications
        </InformationArticle>

        <InformationArticle title="Tailwind - CSS Framework">
            A utility-first CSS framework packed with classes like flex, pt-4, text-center and rotate-90 that can be composed to build any design, directly in your markup. <br>
            Utility classes help you work within the constraints of a system instead of littering your stylesheets with arbitrary values.
            They make it easy to be consistent with color choices, spacing, typography, shadows, and everything else that makes up a well-engineered design system.
            Learn more, utility-first fundamentals
        </InformationArticle>
    </div>
</template>