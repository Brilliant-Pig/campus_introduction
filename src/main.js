import { createApp } from 'vue';
import App from './App.vue';
import './style.css'
import router from './rooter/router';

const app = createApp(App);

// 存储原始 body 高度
const originalBodyHeight = document.body.style.height;

// 在每次路由跳转后还原 body 高度
router.afterEach(() => {
    document.body.style.height = originalBodyHeight;
});

app.use(router);
app.mount('#app');