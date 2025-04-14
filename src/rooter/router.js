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
    {
        path: '/environment',
        name: 'Environment',
        component: () => import('../pages/environment.vue'),
        meta: {
        title: '校园环境',
        freeAuth: true
        }
    },
    {
        path: '/live',
        name: 'Live',
        component: () => import('../pages/live.vue'),
        meta: {
        title: '校园生活',
        freeAuth: true
        }
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;