<template>
  <link rel='stylesheet' href='https://chinese-fonts-cdn.netlify.app/packages/maple-mono-cn/dist/MapleMono-CN-Medium/result.css' /> 
  <link rel='stylesheet' href='ttps://chinese-fonts-cdn.netlify.app/packages/mksjh/dist/MaokenAssortedSans/result.css' /> 
  <div class="gallery-container">
    <h2 class="gallery-title">{{ title }}</h2>
    <div 
      class="gallery-viewport"
      @mouseenter="pauseAnimation"
      @mouseleave="resumeAnimation"
    >
      <div class="gallery-orbit">
        <div 
          v-for="(item, index) in items" 
          :key="index"
          class="gallery-item"
          :style="getItemStyle(index)"
        >
          <img :src="item.image" :alt="item.title || 'Gallery image'">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, onBeforeUnmount } from 'vue'

export default {
  name: 'CircularGallery',
  props: {
    title: {
      type: String,
      default: '图片画廊'
    },
    items: {
      type: Array,
      required: true,
      default: () => [
        { image: '/image1.jpg', title: '图片1' },
        { image: '/image2.jpg', title: '图片2' }
      ]
    },
    speed: {
      type: Number,
      default: 0.3
    },
    radius: {
      type: Number,
      default: 400
    },
    itemWidth: {
      type: Number,
      default: 250
    },
    itemHeight: {
      type: Number,
      default: 400
    },
    pauseOnHover: {
      type: Boolean,
      default: true
    }
  },
  setup(props) {
    const rotationAngle = ref(0)
    const isPaused = ref(false)
    let animationFrame = null

    const getItemStyle = (index) => {
      const angle = (Math.PI * 2 / props.items.length) * index + rotationAngle.value
      const x = Math.sin(angle) * props.radius
      const z = Math.cos(angle) * props.radius
      
      return {
        transform: `translate3d(${x}px, 0, ${z}px)`,
        width: `${props.itemWidth}px`,
        height: `${props.itemHeight}px`,
        marginLeft: `-${props.itemWidth/2}px`,
        marginTop: `-${props.itemHeight/2}px`,
        zIndex: Math.floor(z) // 根据深度设置层级
      }
    }

    const startAnimation = () => {
      stopAnimation()
      const animate = () => {
        if (!isPaused.value) {
          rotationAngle.value -= props.speed * 0.01
          animationFrame = requestAnimationFrame(animate)
        }
      }
      animationFrame = requestAnimationFrame(animate)
    }

    const stopAnimation = () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame)
      }
    }

    const pauseAnimation = () => {
      if (props.pauseOnHover) {
        isPaused.value = true
      }
    }

    const resumeAnimation = () => {
      isPaused.value = false
      startAnimation()
    }

    onMounted(() => {
      startAnimation()
    })

    onBeforeUnmount(() => {
      stopAnimation()
    })

    return {
      rotationAngle,
      isPaused,
      getItemStyle,
      pauseAnimation,
      resumeAnimation
    }
  }
}
</script>

<style scoped>
.gallery-container {
  width: 100%;
  padding: 2rem 0;
  text-align: center;
  perspective: auto;
}

.gallery-title {
  font-size: 3.8rem;
  margin-bottom: 2rem;
  color: #333;
  font-family:'MaokenAssortedSans';
  font-weight:'400'

}

.gallery-viewport {
  position: relative;
  height: 280px;
  margin: 0 auto;
  overflow: visible;
  cursor: grab;
}

.gallery-viewport:active {
  cursor: grabbing;
}

.gallery-orbit {
  position: absolute;
  top: 50%;
  left: 50%;
  transform-style: preserve-3d;
  width: 0;
  height: 0;
}

.gallery-item {
  position: absolute;
  top: 50%;
  left: 50%;
  transform-style: preserve-3d;
  transition: transform 0.3s ease;
}

.gallery-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 8px;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
  transform: translateZ(0);
  backface-visibility: visible;
  transition: transform 0.3s ease;
}

.gallery-item:hover img {
  transform: translateZ(0) scale(1.05);
}

@media (max-width: 768px) {
  .gallery-viewport {
    height: 400px;
    perspective: 800px;
  }
  
  .gallery-item {
    --itemWidth: 200px;
    --itemHeight: 350px;
  }
}
@import "https://chinese-fonts-cdn.netlify.app/packages/maple-mono-cn/dist/MapleMono-CN-Medium/result.css";
@import "ttps://chinese-fonts-cdn.netlify.app/packages/mksjh/dist/MaokenAssortedSans/result.css"
</style>