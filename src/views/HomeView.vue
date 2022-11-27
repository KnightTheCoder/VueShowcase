<script setup>
import InformationArticle from '@/components/InformationArticle.vue'

// Must import router to use it first
// import router from '@/router'
// router.push('/users/1')
</script>

<template>
    <div class="home">
        <h1 class="text-center text-2xl">
            Vue Showcase by Kocsis Dominik Adrián
        </h1>

        <InformationArticle
            title="Purpose of Vue Showcase"
            image-source="/src/assets/images/vue_logo.png"
        >
            The purpose of Vue Showcase is to showcase what you can accomplish using Vue and it's ecosystem
            through examples and a fully working website
        </InformationArticle>

        <InformationArticle title="Vue">
            Vue (pronounced /vju:/, like view) is a JavaScript framework for building user interfaces.
            It builds on top of standard HTML, CSS, and JavaScript and provides a declarative and component-based programming model that helps you efficiently develop user interfaces,
            be they simple or complex.
        </InformationArticle>

        <InformationArticle title="Vue Router">
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

        <InformationArticle title="Pinia">
            Pinia is a store library for Vue, it allows you to share a state across components/pages.
            If you are familiar with the Composition API, you might be thinking you can already share a global state with a simple export const state = reactive({}).
            This is true for single page applications but exposes your application to security vulnerabilities if it is server side rendered. But even in small single page applications
        </InformationArticle>
    </div>
</template>