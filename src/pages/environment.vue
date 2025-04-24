<template>
<div class="environment-container">
    <div class="background"></div>
    <CircularGallery
      title="校园风景"
      :items="galleryItems"
      :speed="0.25"
      :radius="350"
      :itemWidth="380"
      :itemHeight="250"
    />
    <div class="button-container">
      <ShinyButton text="点击观看3D校园" @click="goTo3DCampus"/>
    </div>
    <div class="shiny-text-container">
        <ShinyText text="← 返回菜单" :jump-duration="0.9" :shine-speed="3" color="white" @click="handleAction"/>
    </div>
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
import CircularGallery from '../components/photo.vue'
import ShinyButton from '../components/button.vue'

export default {
  components: {
    CircularGallery,
    ShinyButton,
  },
  methods: {
    goTo3DCampus() {
      window.open('https://www.720yun.com/t/48vksb2qz2q?scene_id=86650782', '_blank');
    }

  },
  data() {
    return {
      galleryItems: [
        { image: 'https://life-photos.oss-cn-shenzhen.aliyuncs.com/SPRING.png' },
        { image: 'https://life-photos.oss-cn-shenzhen.aliyuncs.com/fupai.jpg' },
        { image: 'https://life-photos.oss-cn-shenzhen.aliyuncs.com/sunset1.jpg' },
        { image: 'https://life-photos.oss-cn-shenzhen.aliyuncs.com/sunshine.jpg' },
        { image: 'https://life-photos.oss-cn-shenzhen.aliyuncs.com/sunset3.jpg' },
        { image: 'https://life-photos.oss-cn-shenzhen.aliyuncs.com/happy.jpg' },
        { image: 'https://life-photos.oss-cn-shenzhen.aliyuncs.com/sunset2.jpg' },
        { image: 'https://life-photos.oss-cn-shenzhen.aliyuncs.com/blue-sky.jpg' },
      ]
    }
  }
}
</script>

<style scoped>
.environment-container {
  position: flex;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url('https://life-photos.oss-cn-shenzhen.aliyuncs.com/damen.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  z-index: -1;
  filter: brightness(0.8);
  opacity: 0.7;
}

.button-container {
  position: flex;
  z-index: 2;
  margin-top: 50px;
}

.shiny-text-container {
    position: fixed;
    left: 20px;
    top: 20px;
    z-index: 9999; /* 确保悬浮在最上层 */
    /* 可选动画衔接 */
    transition: all 0.3s ease; 
}
</style>