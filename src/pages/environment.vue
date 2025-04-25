<template>
<div class="environment-container">
    <div class="background"></div>
    <CircularGallery
        title="校园风景"
        :items="galleryItems"
        :speed="isMobile ? 0.1 : 0.25"         
        :radius="isMobile ? 150 : 350"         
        :itemWidth="isMobile ? 220 : 380"      
        :itemHeight="isMobile ? 140 : 250"
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
import { ref, onMounted, onBeforeUnmount } from 'vue'


const router = useRouter();
const handleAction = () => { 
    router.push({ path: '/caidan'});
};

const isMobile = ref(false)

const checkMobile = () => {
    isMobile.value = window.innerWidth <= 768
}

// 初始化检查
onMounted(() => {
    checkMobile()
    window.addEventListener('resize', checkMobile)
})

// 清除监听
onBeforeUnmount(() => {
    window.removeEventListener('resize', checkMobile)
})
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

@media (max-width: 768px) {
  .circular-gallery {
    padding: 20px 0;
  }
  .gallery-title {
    font-size: 1.5rem !important;
  }
}
</style>