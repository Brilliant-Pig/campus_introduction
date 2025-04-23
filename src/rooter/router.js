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
    {
        path: '/manager',
        name: 'Manager',
        component: () => import('../pages/manager.vue'),
        meta: {
        title: '管理人员',
        freeAuth: true
        }
    },
    {
        path: '/schooljump',
        name: 'schooljump',
        component: () => import('../pages/schooljump.vue'),
        meta: {
        title: '跳转到校徽官网',
        freeAuth: true
        }
    },
    {
        path: '/question',
        name: 'question',
        component: () => import('../pages/question.vue'),
        meta: {
        title: '常见问题',
        freeAuth: true
        }
    },
    {
        path: '/last',
        name: 'last',
        component: () => import('../pages/last.vue'),
        meta: {
        title: '问题回答',
        freeAuth: true
        }
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;