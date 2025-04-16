<template>
    <button
      ref="buttonRef"
      class="sj-button"
      :class="{ 'sj-animate': !disabled, 'sj-disabled': disabled }"
      :style="buttonStyles"
      @click="handleClick"
      :disabled="disabled"
    >
      {{ text }}
    </button>
  </template>
  
  <script setup>
  import { ref, computed, onMounted, watch } from 'vue'
  
  const props = defineProps({
    text: {
      type: String,
      default: 'Button'
    },
    jumpDuration: {
      type: Number,
      default: 0.6
    },
    shineSpeed: {
      type: Number,
      default: 5
    },
    disabled: {
      type: Boolean,
      default: false
    },
    color: {
      type: String,
      default: '#10b981'
    }
  })
  
  const buttonRef = ref(null)
  const styleInjected = ref(false)
  
  // 动态计算按钮样式
  const buttonStyles = computed(() => ({
    '--jump-duration': `${props.jumpDuration}s`,
    '--shine-speed': `${props.shineSpeed}s`,
    '--btn-color': props.color
  }))
  
  // 初始化全局样式
  const initGlobalStyles = () => {
    if (styleInjected.value) return
    
    const style = document.createElement('style')
    style.textContent = `
      @keyframes buttonJump {
        0% { transform: translateY(0) scale(1); }
        30% { transform: translateY(-15px) scale(0.9); }
        50% { transform: translateY(0) scale(1.1); }
        70% { transform: translateY(-8px) scale(1); }
        100% { transform: translateY(0) scale(1); }
      }
  
      @keyframes buttonShine {
        0% { background-position: 100% 50%; }
        100% { background-position: -100% 50%; }
      }
  
      .sj-button {
        position: relative;
        padding: 12px 24px;
        border: solid;
        border-radius: 8px;
        background: var(--btn-color);
        color: #a1eafb;
        font-size: 16px;
        cursor: pointer;
        overflow: hidden;
        background-image: linear-gradient(
          120deg,
          rgba(255,255,255,0) 40%,
          rgba(255,255,255,0.8) 50%,
          rgba(255,255,255,0) 60%
        );
        background-size: 200% 100%;
      }
  
      .sj-animate {
        animation: 
          buttonJump var(--jump-duration) ease-in-out,
          buttonShine var(--shine-speed) linear infinite;
      }
  
      .sj-disabled {
        opacity: 0.6;
        cursor: not-allowed;
        animation: none !important;
      }
    `
    document.head.appendChild(style)
    styleInjected.value = true
  }
  
  // 点击处理
  const handleClick = () => {
    if (props.disabled) return
    
    const button = buttonRef.value
    button.style.animation = 'none'
    requestAnimationFrame(() => {
      button.style.animation = `
        buttonJump ${props.jumpDuration}s ease-in-out,
        buttonShine ${props.shineSpeed}s linear infinite
      `
    })
  }
  
  // 监听参数变化
  watch(
    () => [props.jumpDuration, props.shineSpeed],
    () => {
      if (buttonRef.value && !props.disabled) {
        buttonRef.value.style.animationDuration = 
          `${props.jumpDuration}s, ${props.shineSpeed}s`
      }
    }
  )
  
  onMounted(initGlobalStyles)
  </script>
  