<!-- 跳转官网过渡页面（注：现已发现跳转至本页面后回到菜单会使得菜单文字样式改变的BUG） -->
<template>
    <transition name="fade">
        <div>
            <link rel='stylesheet' href='https://chinese-fonts-cdn.netlify.app/packages/mksjh/dist/MaokenAssortedSans/result.css' /> 
            <p class="jump">正在跳转至广东医科大学相关官方网站...</p>
            <a ref="externalLink" href="https://www.gdmu.edu.cn/xxgk/xg_xx_xh.htm" style="display: none" target="_blank"></a>
        </div>
    </transition>
    <div class="shiny-text-container">
        <ShinyText text="← 返回菜单" :jump-duration="0.9" :shine-speed="3" color="" @click="handleAction"/>
    </div>
</template>

<script setup>
import ShinyText from '../components/ShinyText.vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const handleAction = () => { 
    router.push({ path: '/caidan'});
};
</script>

<script>
export default {
    mounted() {
        setTimeout(() => {
            this.$refs.externalLink.click(); // 自动触发点击
        }, 2000);
    }
}
</script>


<style>
@import "https://chinese-fonts-cdn.netlify.app/packages/mksjh/dist/MaokenAssortedSans/result.css";

.jump {
margin-top:45vh;
margin-bottom: 0px;
font-size: 80px; 
text-align: center;
font-family:'MaokenAssortedSans';
font-weight:'400';
color: transparent;
background-image: linear-gradient(120deg, #84fab0 0%, #62bbe8 100%);
background-clip: text;
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;
}

.shiny-text-container {
position: fixed;
left: 20px;
top: 20px;
z-index: 9999; /* 确保悬浮在最上层 */
/* 可选动画衔接 */
transition: all 0.3s ease; 
}

/* ===== 移动端适配 ===== */
@media (max-width: 768px) {
.jump {
margin-top: 35vh !important; /* 降低位置 */
font-size: 2.5rem !important; /* 80px → 40px */
line-height: 1.4;
padding: 0 20px;
word-break: break-word; /* 允许长文本换行 */
}
}
</style>