import { createRouter, createWebHistory } from 'vue-router';

const routes = [
    {
        path: '/first',
        name: 'first',
        component: () => import('../pages/first.vue'),
        meta: {
        title: '首页',
        freeAuth: true
        }
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes
});
