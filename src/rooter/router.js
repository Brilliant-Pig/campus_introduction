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
        path: '/second',
        name: 'second',
        component: () => import('../pages/second.vue'),
        meta: {
        title: '师资',
        freeAuth: true
        }
    },
    {
        path: '/third',
        name: 'third',
        component: () => import('../pages/third.vue'),
        meta: {
        title: '火热专业',
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