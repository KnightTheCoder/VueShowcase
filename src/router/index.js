import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'Home',
            component: () => import('@/views/HomeView.vue')
        },
        {
            path: '/register',
            name: 'Register',
            component: () => import('@/views/RegisterView.vue')
        },
        {
            path: '/login',
            name: 'Login',
            component: () => import('@/views/LoginView.vue')
        },
        {
            path: '/users/:id?',
            name: 'Users',
            component: () => import('@/views/UserView.vue')
        },
        {
            path: '/:pathMatch(.*)*',
            name: 'Page not found',
            component: () => import('@/views/PageNotFound.vue')
        }
    ]
})

export default router