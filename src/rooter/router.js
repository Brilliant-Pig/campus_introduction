import { createRouter, createWebHistory } from 'vue-router';

const routes = [
    {
        path: '/',
        name: 'first',
        component: () => import('../pages/first.vue'),
        meta: {
        title: '首页',
        freeAuth: true
        }
    },
    {
        path: '/caidan',
        name: 'caidan',
        component: () => import('../pages/caidan.vue'),
        meta: {
        title: '菜单',
        freeAuth: true
        }
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;