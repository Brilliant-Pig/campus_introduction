<template>
  <div>
    <div class="center-box">
      <div class="question-container">
        <h1 class="title" style="font-family:'MaokenAssortedSans'">Question：</h1>
        <link rel='stylesheet' href='https://chinese-fonts-cdn.deno.dev/packages/mksjh/dist/MaokenAssortedSans/result.css' /> 
        <el-input v-model="input" class="question-input" placeholder="" readonly />
      </div>
      <div class="answer-container">
        <h2 class="answer-title" style="font-family:'MaokenAssortedSans'">Answer：</h2>
        <el-input v-model="answer" type="textarea" :rows="15" class="answer-input" placeholder="请输入回答"/>
      </div>
      <div class="button-group">
        <el-button type="primary" class="view-button" @click="fetchQuestions">
          查看问题
        </el-button>
        <el-button type="success" class="submit-button" @click="submitAnswer" :disabled="!input || !answer">
          提交答案
        </el-button>
      </div>
    </div>
    
    <el-drawer 
      v-model="drawer" 
      :with-header="false"
      :modal="true"
      :modal-append-to-body="true"
      :append-to-body="true"
      direction="rtl"
      size="30%">
      <div class="drawer-content">
        <h2 style="font-size: 50px; margin-bottom: 20px;">问题列表</h2>
        <div 
          v-for="(question, index) in questions" 
          :key="index" 
          class="question-item"
          @click="selectQuestion(question)">
          {{ question }}
        </div>
      </div>
    </el-drawer>
  </div>
  <img 
    src="../assets/hua.png" 
    class="corner-image"
    alt="装饰图案" >
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { ElMessage } from 'element-plus'

const input = ref('')
const answer = ref('') 
const drawer = ref(false)
const questions = ref([])

// 从后端获取未回答问题列表
const fetchQuestions = async () => {
  try {
    const response = await axios.get('http://127.0.0.1:33001/api/user/getUnansweredQuestions')
    questions.value = response.data.data
    if (questions.value.length === 0) {
      ElMessage.info('当前没有未回答的问题')
    } else {
      drawer.value = true
    }
  } catch (error) {
    console.error('获取问题列表失败:', error)
    ElMessage.error('获取问题列表失败')
  }
}

// 选择问题并填充到输入框
const selectQuestion = (question) => {
input.value = question
answer.value = '' // 清空之前的答案
drawer.value = false
}

// 提交答案到后端
const submitAnswer = async () => {
  try {
    await axios.post('http://127.0.0.1:33001/api/user/submitAnswer', {
      question: input.value,
      answer: answer.value
    })
    ElMessage.success('答案提交成功')
    // 提交成功后清空输入并刷新问题列表
    input.value = ''
    answer.value = ''
    await fetchQuestions()
  } catch (error) {
    console.error('提交答案失败:', error)
    ElMessage.error(error.response?.data?.message || '提交答案失败')
  }
}
</script>

<style>
/* 保持原有样式不变，只添加新样式 */
.button-group {
display: flex;
justify-content: center;
gap: 20px;
margin-top: 20px;
}

.submit-button {
margin-left: 0;
}

/* 其他保持原有样式不变 */
body {
margin: 0;
padding: 0;
background: linear-gradient(to bottom, #f5fbff 0%, #d0e8ff 50%, #a8d4ff 100%);
min-height: 100vh;
}

.center-box {
position: fixed;
top: 50%;
left: 50%;
transform: translate(-50%, -50%);
width: 600px;
height: auto;
border: 2px solid #fff;
background-color: #fff;
padding: 20px;
box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
z-index: 1000;
border-radius: 12px;
background-color: rgba(255, 255, 255, 0.9);
font-family:'MaokenAssortedSans';
}

.question-container {
display: flex;
align-items: center;
margin-bottom: 20px;
}

.title {
font-size: 45px;
margin: 0;
padding: 0;
white-space: nowrap;
min-width: 150px;
}

.question-input {
width: 450px;
height: 42px;
margin-left: 10px;
}

.answer-container {
margin-bottom: 20px;
}

.answer-title {
font-size: 45px;
margin: 0 0 10px 0;
padding: 0;
white-space: nowrap;
text-align: left;
}

.answer-input {
width: 100%;
margin-left: 0;
}

.view-button {
margin-left: 0;
}

.drawer-content {
padding: 20px;
font-family: 'MaokenAssortedSans', 'Maple Mono CN Medium', sans-serif;
}

.question-item {
padding: 12px 15px;
margin-bottom: 8px;
background: #f5f7fa;
border-radius: 4px;
cursor: pointer;
transition: background 0.3s;
}

.question-item:hover {
background: #e4e7ed;
}

.corner-image {
position: fixed;
left: 0px;
bottom:0px;
width: 500px;
height: auto;
opacity: 0.9;
z-index: 100;
transition: all 0.3s;
}

.corner-image:hover {
opacity: 1;
transform: scale(1.1);
}

@import"https://chinese-fonts-cdn.deno.dev/packages/mksjh/dist/MaokenAssortedSans/result.css"
</style>