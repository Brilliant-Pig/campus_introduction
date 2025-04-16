<template>
    <div class="box">
        <div class="videoContainer">
            <video class="fullscreenVideo" id="bgVid" playsinline autoplay muted loop>
                <source src='../assets/Background.mp4' type="video/mp4">
            </video>
        </div>
        <!-- 垫一个盒子 -->
        <div id="dull"><p1>.</p1></div>
        <div id="title">
            <link rel='stylesheet' href='https://chinese-fonts-cdn.deno.dev/packages/maple-mono-cn/dist/MapleMono-CN-SemiBold/result.css' />
            <transition name="title-fade" appear @after-enter="handleAnimationEnd">
                <p v-html="boldNumbers(message1)"></p >
            </transition>
        </div>
        <div class="float-text1">∨</div>
        <div class="float-text2">∨</div>
        <ShinyText text="开始探索蔚蓝广东医!" :jump-duration="0.9" :shine-speed="3" color="" @click="handleAction"/>
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
    name: 'first',
    data() {
        return {
            isOpen: false,
            message1: '医 路 蔚 蓝',
            show: false
        };
    },

    mounted() {
        this.show = true
    },

    methods: {
    boldNumbers(text) {
      // 使用正则表达式匹配所有数字，并用<strong>标签包裹
        return text.replace(/\d+/g, '<strong>$&</strong>');
        }
    }
}
</script>

<style scoped>
@import "https://chinese-fonts-cdn.deno.dev/packages/maple-mono-cn/dist/MapleMono-CN-SemiBold/result.css";
@import "https://chinese-fonts-cdn.deno.dev/packages/mksjh/dist/MaokenAssortedSans/result.css";

.videoContainer {
position: fixed;
width: 100%;
height: 100%;
overflow: hidden;
z-index: -100;
}

.videoContainer:before {
content: "";
position: absolute;
width: 100%;
height: 100%;
display: block;
z-index: -1;
top: 0;
left: 0;
background: rgba(25,29,34,.65);
}

.fullscreenVideo {
width: 100%;
height: 100%;
object-fit: fill;
}

/* 以上为背景视频CSS */

.title-fade-enter-active {
transition: all 2s cubic-bezier(0.25, 0.46, 0.45, 0.94);
will-change: opacity, transform;
}

.title-fade-enter-from {
opacity: 0;
transform: translateY(20px) scale(0.95);
}

p{
margin-top:36vh;
font-size: 125px; 
text-align: center;
font-family:'MaokenAssortedSans';
font-weight:'400';
color: transparent;
background-image: linear-gradient(120deg, #89f7fe 0%, #66a6ff 100%);
background-clip: text;
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;
}

/* p ::after{
content: attr(医路蔚蓝);
position: absolute;
top: 2px;
left: 2px;
z-index: -1;
color: transparent;
text-shadow: 3px 3px 6px rgba(0,0,0,0.3);
background: inherit;
-webkit-background-clip: text;
background-clip: text;
} */
/* 原意是想加个阴影效果 */

#title {
margin-top:0px;
}

/* 以上为中央标题CSS */

.float-text1 {
margin-top: 22vh;
animation: float 1.5s ease-in-out infinite;
height:25px;
color:white;
font-size:37px;
text-align: center;
}

.float-text2 {
animation: float 1.5s ease-in-out infinite;
color:white;
font-size:32px;
text-align: center;
margin-bottom: 3vh;
}

@keyframes float {
0%, 100% { transform: translateY(0); }
50% { transform: translateY(-8px); }
}

.complex-float {
animation: 
    float 2s ease-in-out infinite,
    scale 2s ease-out infinite;
}

@keyframes scale {
0%, 100% { transform: scale(1); }
50% { transform: scale(1.05); }
}
/* 以上为浮动箭头CSS */
</style>

<style>

</style>