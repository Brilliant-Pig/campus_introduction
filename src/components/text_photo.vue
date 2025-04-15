<template>
    <div class="my-scroll-bar">
      <section id="content">
        <section class="image-text-grid container">
          <div 
            v-for="(item, index) in items" 
            :key="index" 
            class="image-text-item"
          >
            <div class="image_cont">
              <img :src="item.image" :alt="item.title">
            </div>
            <div class="text_cont">
              <h2>{{ item.title }}</h2>
              <p>{{ item.description }}</p>
            </div>
          </div>
        </section>
      </section>
    </div>
  </template>
    
    <script setup>
import { defineProps } from 'vue'
import { onMounted, onUnmounted } from "vue"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
    gsap.registerPlugin(ScrollTrigger);
    const props = defineProps({
  items: {
    type: Array,
    default: () => [
      {
        image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb',
        title: '默认标题1',
        description: '默认描述1'
      },
      {
        image: 'https://images.unsplash.com/photo-1569596082827-c5e8990496cb',
        title: '默认标题2',
        description: '默认描述2'
      }
    ]
  }
})
    let scrollbox;
    
    const resizeBody = () => {
        scrollbox = document.getElementsByClassName("my-scroll-bar")[0];
        document.body.style.height = `${scrollbox.offsetHeight}px`;
    };
    
    const scroll = () => {
        scrollbox.style.transform = `translateY(${-scrollY}px)`;
    };
    
    onMounted(() => {
        resizeBody();
        window.addEventListener("load", resizeBody);
        window.addEventListener("resize", resizeBody);
        window.addEventListener("scroll", scroll);
    });
    
    onUnmounted(() => {
        window.removeEventListener("load", resizeBody);
        window.removeEventListener("resize", resizeBody);
        window.removeEventListener("scroll", scroll);
    });
    </script>
    
    <style>
    .my-scroll-bar {
        overflow: hidden;
        transition: transform 2.4s cubic-bezier(0.1, 0.79, 0.11, 0.82);
    }
    
    * {
        box-sizing: border-box;
    }
    
    body {
        overscroll-behavior: none;
        margin: 0;
        padding: 0;
        overflow-x: hidden;
    }
    
    .container {
        max-width: auto;
        margin: 0 auto;
        padding: 1rem;
    }
    
    .image-text-grid {
        display: grid;
        gap: 2rem;
    }
    
    .image-text-item {
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-items: center;
    gap: 1rem;
    }

    /* 偶数项：图片在右，文字在左 */
    .image-text-item:nth-child(even) .image_cont {
    order: 2; /* 图片移到第二列 */
    }
    .image-text-item:nth-child(even) .text_cont {
    order: 1; /* 文字移到第一列 */
    }
    
    .image_cont img {
        width: 100%;
        height: auto;
        object-fit: cover;
    }
    
    .text_cont {
        color: rgb(0, 0, 0);
        text-align: left;
    }
    
    .text_cont h2 {
        font-size: 1.5rem;
        margin-bottom: 0.5rem;
    }
    
    .text_cont p {
        font-size: 1rem;
        line-height: 1.5;
    }
    </style>