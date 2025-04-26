<template>
  <div class="zong">
    <div class="shiny-container">
      <ShinyText text="若还有疑问，请点击" :jump-duration="0.9" :shine-speed="3" color="white" @click="nextAction"/>
    </div>
    <div class="shiny-text-container">
        <ShinyText text="← 返回菜单" :jump-duration="0.9" :shine-speed="3" color="white" @click="handleAction"/>
    </div>
    <div class="faq-container">
      <h1 style="font-family:'MaokenAssortedSans'">问题解答</h1>
      <p style="font-family:'MaokenAssortedSans'; font-size: 50px; color: #333">可点击问题查看解答</p>
      <link rel='stylesheet' href='https://chinese-fonts-cdn.netlify.app/packages/mksjh/dist/MaokenAssortedSans/result.css' />
      
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
          <p>{{ item.answer || '暂无官方回答' }}</p>
        </div>
      </div>
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
import axios from 'axios';

export default {
  name: 'FAQComponent',
  data() {
    return {
      faqItems: [] // 初始为空数组，将从后端获取数据
    }
  },
  methods: {
    toggleAnswer(index) {
      this.faqItems[index].isOpen = !this.faqItems[index].isOpen;
    },
    nextAction() { 
      this.$router.push({ name: 'question' })
    },
    handleAction() { 
      this.$router.push({ name: 'caidan' })
    },
    async fetchAnsweredQuestions() {
      try {
        const response = await axios.get('http://10.5.21.234:33001/api/user/getAnsweredQuestions');
        if (response.data.code === 0) {
          this.faqItems = response.data.data.map(item => ({
            question: item.question,
            answer: item.answer,
            isOpen: false
          }));
        } else {
          console.error('获取问题列表失败:', response.data.message);
        }
      } catch (error) {
        console.error('获取问题列表出错:', error);
      }
    }
  },
  created() {
    this.fetchAnsweredQuestions();
  }
}
</script>

<style>
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
  color: #333;
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
.shiny-container {
  position: fixed;
  right: 50px;
  bottom: 30px;
  z-index: 9999; /* 确保悬浮在最上层 */
  transition: all 0.3s ease; 
}
.shiny-text-container {
    position: fixed;
    left: 20px;
    top: 20px;
    z-index: 9999; /* 确保悬浮在最上层 */
    transition: all 0.3s ease; 
}
@import "https://chinese-fonts-cdn.netlify.app/packages/mksjh/dist/MaokenAssortedSans/result.css";
</style>