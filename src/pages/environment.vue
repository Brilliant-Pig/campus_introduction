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
        { image: 'https://pic1.imgdb.cn/item/67f8e7ab88c538a9b5caffd7.png' },
        { image: 'https://pic1.imgdb.cn/item/67f8e8ba88c538a9b5cb027b.png' },
        { image: 'https://pic1.imgdb.cn/item/67f8e96e88c538a9b5cb04be.png' },
        { image: 'https://pic1.imgdb.cn/item/67f8e98988c538a9b5cb0516.png' },
        { image: 'https://pic1.imgdb.cn/item/67f8e98a88c538a9b5cb051f.png' },
        { image: 'https://pic1.imgdb.cn/item/67f8e8ba88c538a9b5cb027d.png' },
        { image: 'https://pic1.imgdb.cn/item/67f8e98988c538a9b5cb0514.png' },
        { image: 'https://pic1.imgdb.cn/item/67fce0dc88c538a9b5d0cbc8.jpg' },
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
  background-image: url('https://www.gdmu.edu.cn/images/banner/bn04.png');
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