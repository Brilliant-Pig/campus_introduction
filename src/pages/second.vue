<template>
    <HorizontalScroll></HorizontalScroll>
    <div class="shiny-text-container">
        <ShinyText text="← 返回菜单" :jump-duration="0.9" :shine-speed="3" color="white" @click="handleAction"/>
    </div>
</template>

<script setup>
import ShinyText from '../components/ShinyText.vue';
import { useRouter } from 'vue-router';
import HorizontalScroll from '../components/HorizontalScroll.vue';

const router = useRouter();
const handleAction = () => { 
    router.push({ path: '/caidan'});
};
</script>

<style>
.shiny-text-container {
    position: fixed;
    left: 20px;
    top: 20px;
    z-index: 9999; /* 确保悬浮在最上层 */
    /* 可选动画衔接 */
    transition: all 0.3s ease; 
}
</style>