<template>
  <div class="zong">
    <div class="shiny-text-container">
        <ShinyText text="← 返回菜单" :jump-duration="0.9" :shine-speed="3" color="white" @click="Action"/>
      </div>
      <div class="shiny-container">
        <ShinyText text="若还有疑问，请点击" :jump-duration="0.9" :shine-speed="3" color="white" @click="nextAction"/>
      </div>
    <div class="faq-container">
      <h1 style="font-family:'MaokenAssortedSans'">问题解答</h1>
      <p style="font-family:'MaokenAssortedSans'; font-size: 50px">可点击问题查看解答</p>
      <link rel='stylesheet' href='https://chinese-fonts-cdn.deno.dev/packages/mksjh/dist/MaokenAssortedSans/result.css' />
      
      <div 
        v-for="(item, index) in faqItems" 
        :key="index" 
        class="qa-item"
      >
        <div 
          class="question" 
          @click="toggleAnswer(index)"
        >
          {{ item.question }}
          <span class="toggle-icon">{{ item.isOpen ? '−' : '+' }}</span>
        </div>
        
        <div 
          class="answer" 
          v-show="item.isOpen"
        >
          <p>{{ item.answer }}</p>
        </div>
      </div>
    </div>
  </div>
  </template>
  
  <script>
  import ShinyText from '../components/ShinyText.vue';
  export default {
    name: 'FAQComponent',
    components: {
      ShinyText,
    },
    data() {
      return {
        faqItems: [
          {
            question: "什么是Vue.js？",
            answer: "Vue.js是一个渐进式JavaScript框架，用于构建用户界面。它专注于视图层，易于与其他库或现有项目集成。",
            isOpen: false
          },
          {
            question: "Vue的主要特点是什么？",
            answer: "Vue的主要特点包括：响应式数据绑定、组件系统、虚拟DOM、指令系统、轻量级、易于学习和集成。",
            isOpen: false
          },
          {
            question: "如何安装Vue？",
            answer: "可以通过CDN引入，使用npm安装（npm install vue），或者使用Vue CLI创建项目（vue create project-name）。",
            isOpen: false
          }
        ]
      }
    },
    methods: {
      toggleAnswer(index) {
        this.faqItems[index].isOpen = !this.faqItems[index].isOpen;
      },
      handleAction() { 
        this.$router.push({ name: 'caidan' })
      },
      nextAction() { 
        this.$router.push({ name: 'question' })
      },
    }
  }
  </script>
  
  <style >
.zong {
  margin: 0;
  padding: 0;
  background: linear-gradient(to bottom, #f5fbff 0%, #d0e8ff 50%, #a8d4ff 100%);
  min-height: 100vh;
  }
  .faq-container {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
    font-family: 'Arial', sans-serif;
  }
  
  h1 {
    color: #4a93dc;
    text-align: center;
    margin-bottom: 30px;
    font-size: 80px;
  }
  
  .qa-item {
    margin-bottom: auto;
    border: 1px solid #eaeaea;
    border-radius: 5px;
    overflow: hidden;
  }
  
  .question {
    padding: 15px;
    background-color: #f8f9fa;
    font-weight: bold;
    color: #2980b9;
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-family:'MaokenAssortedSans';
    font-size: 30px;
  }
  
  .question:hover {
    background-color: #e9ecef;
  }
  
  .toggle-icon {
    font-size: 1.2em;
  }
  
  .answer {
    padding: 15px;
    background-color: #fff;
    border-top: 1px solid #eaeaea;
    font-family:'MaokenAssortedSans';
    font-size: 25px;
  }
  
  .answer p {
    margin: 0;
    line-height: 1.6;
  }
  .shiny-text-container {
    position: fixed;
    left: 20px;
    top: 20px;
    z-index: 9999; /* 确保悬浮在最上层 */
    /* 可选动画衔接 */
    transition: all 0.3s ease; 
}
.shiny-container {
    position: fixed;
    right: 50px;
    bottom: 30px;
    z-index: 9999; /* 确保悬浮在最上层 */
    /* 可选动画衔接 */
    transition: all 0.3s ease; 
}
@import"https://chinese-fonts-cdn.deno.dev/packages/mksjh/dist/MaokenAssortedSans/result.css"
  </style>