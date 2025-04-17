<template>
</template>

<script setup>
import {  onMounted, ref } from 'vue';

let scrollbox
const resizeBody = () => {
  scrollbox = document.getElementsByClassName("my-scroll-bar")[0];
  // 同时设置html和body高度
  document.documentElement.style.height = 
  document.body.style.height = `${scrollbox.offsetHeight}px`;
};
const scroll = ()=>{
    scrollbox.style.transform = `translateY(${-scrollY}px)`
}
onMounted(()=>{
    resizeBody()
    window.addEventListener('load',resizeBody)
    .addEventListener('resize',resizeBody)
    window.addEventListener('scroll',scroll)
})
</script>

<template>
    <div class="my-scroll-bar">
        <RouterView />
    </div>
</template>

<style>
.my-scroll-bar{
    overflow: hidden;
    transition: transform 2.4s cubic-bezier(0.1, 0.79, 0.11, 0.82);
}
#app{
    position: fixed;
    top: 0;
}
</style>