<template>
  <button 
    class="shiny-button"
    :style="{ '--gradient-position': gradientPosition }"
    @click="$emit('click', $event)"
  >
    {{ text }}
  </button>
</template>

<script>
export default {
  name: 'ShinyButton',
  emits: ['click'],
  props: {
    text: {
      type: String,
      default: '点击按钮'
    }
  },
  data() {
    return {
      gradientPosition: '100%',
      animationInterval: null
    }
  },
  mounted() {
    this.startAnimation()
  },
  methods: {
    startAnimation() {
      let direction = -1
      let position = 100
      
      this.animationInterval = setInterval(() => {
        position += direction * 3
        
        if (position <= -100) {
          direction = 1
        } else if (position >= 100) {
          direction = -1
        }
        
        this.gradientPosition = `${position}%`
      }, 50)
    }
  },
  beforeUnmount() {
    if (this.animationInterval) {
      clearInterval(this.animationInterval)
    }
  }
}
</script>

<style scoped>
.shiny-button {
  padding: 12px 24px;
  font-size: 1rem;
  font-family: 'Maple Mono CN', sans-serif;
  font-weight: 700;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  color: white;
  background: linear-gradient(
    90deg,
    #0061ff,
    #00ff87 30%,
    #60efff 70%,
    #0061ff
  );
  background-size: 200%;
  position: relative;
  transition: all 0.3s ease;
  background-position-x: var(--gradient-position);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.shiny-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}

.shiny-button:active {
  transform: translateY(0);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
</style>

<style>
@import "https://chinese-fonts-cdn.deno.dev/packages/maple-mono-cn/dist/MapleMono-CN-Bold/result.css";
</style>