<template>
    <div class="survey-container">
      <!-- 顶部动态标题 -->
      <div class="header" @mouseover="bounceTitle">
        <h1 class="animated-title" :class="{ 'bounce': isBouncing }">广东医科大学宣传问卷</h1>
        <p class="subtitle">✨ 你的选择将决定未来白大褂的款式 ✨</p>
      </div>
  
      <div class="survey-form">
        <transition name="fade" mode="out-in">
          <!-- 第一步：基本信息 -->
          <div v-if="currentStep === 1" class="survey-step">
            <h2><span class="emoji">👤</span> 基本信息</h2>
            
            <div class="form-group">
              <label>如果给你一个外号，你希望是？<span class="hint">（这将是你在我们系统的专属代号）</span></label>
              <input v-model="form.name" type="text" placeholder="例如：未来张主任、李一刀、王院士">
            </div>
            
            <div class="form-group">
              <label><span class="emoji">🎂</span> 年龄</label>
              <input v-model="form.age" 
                     type="number" 
                     min="16" 
                     max="25"
                     @input="checkAge"
                     placeholder="悄悄告诉我你多大啦">
              <p v-if="ageWarning" class="warning">⚠️ 同学你确定这个年龄能参加高考？(16-25岁)</p>
            </div>
            
            <div class="form-group">
              <label><span class="emoji">🚻</span> 性别</label>
              <div class="radio-group">
                <label v-for="option in genderOptions" :key="option.value">
                  <input type="radio" v-model="form.gender" :value="option.value">
                  {{ option.emoji }} {{ option.label }}
                </label>
              </div>
            </div>
          </div>
  
          <!-- 第二步：探校雷达 -->
          <div v-else-if="currentStep === 2" class="survey-step">
            <h2><span class="emoji">🏫</span> 探校雷达</h2>
            <div class="form-group">
              <label><span class="emoji">📡</span> 你是通过什么"秘密渠道"发现我们的？</label>
              <div class="checkbox-grid">
                <label v-for="channel in channels" :key="channel.value" class="channel-item">
                  <input type="checkbox" v-model="form.channels" :value="channel.value">
                  {{ channel.emoji }} {{ channel.label }}
                  <span v-if="channel.hot" class="hot-badge">热门</span>
                </label>
              </div>
            </div>
            
            <div class="form-group">
              <label><span class="emoji">❤️</span> 哪个专业让你心跳加速？</label>
              <div class="fun-fact-card">
              <p>💡 <b>你知道吗？</b>我校临床医学专业进入ESI全球排名前1%，图书馆拥有专属考研自习室！</p>
              <p>💡 <b>冷知识：</b>我校有实验室，专业的实验器材；还有本校自主搭建的满血AI大模型哦！</p>
            </div>
              <input 
                v-model="form.interest" 
                type="text" 
                placeholder="告诉我你的梦中情专业"
                @focus="showSuggestions = true"
              >
              <div class="suggestions" v-if="filteredMajors.length > 0 && showSuggestions">
                <div 
                  v-for="major in filteredMajors" 
                  :key="major.value"
                  @click="selectMajor(major)"
                  class="suggestion-item"
                >
                  <span class="major-emoji">{{ major.emoji }}</span>
                  <div>
                    <div class="major-name">{{ major.label }}</div>
                    <div class="major-desc">{{ major.desc }}</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div class="form-group">
              <label><span class="emoji">⭐</span> 看完我们学校宣传之后您对学校的整体印象评分</label>
              <div class="rating-container">
                <span 
                  v-for="star in 5" 
                  :key="star" 
                  @click="form.rating = star"
                  :class="{ 'active': star <= form.rating }"
                >★</span>
                <span class="rating-text">{{ ratingTexts[form.rating] }}</span>
              </div>
            </div>
          </div>
  
<!-- 第三步：问题收集 -->
<div v-else-if="currentStep === 3" class="survey-step">
  <h2><span class="emoji">❓</span> 你最想解锁我校哪个隐藏彩蛋？</h2>
  
  <!-- 预定义问题列表 -->
  <div class="question-examples">
    <p>点击下方问题快速添加：</p>
    <div class="example-buttons">
      <button 
        v-for="(example, index) in questionExamples" 
        :key="index"
        @click="addExampleQuestion(example)"
        :disabled="form.questions.length >= maxQuestions && !hasEmptyQuestion"
        class="example-btn"
      >
        {{ example }}
      </button>
    </div>
  </div>
  
  <!-- 问题输入区 -->
  <div class="questions-container">
    <div v-for="(question, index) in form.questions" :key="index" class="question-item">
      <label>问题 {{ index + 1 }}</label>
      <div class="question-input-group">
        <input
          v-model="question.text"
          type="text"
          :placeholder="'输入问题或从上方选择'"
        >
        <button
          v-if="index > 0"
          @click="removeQuestion(index)"
          class="remove-btn"
        >
          删除
        </button>
      </div>
    </div>
  </div>
  
  <button
    @click="addQuestion"
    class="add-question-btn"
    :disabled="form.questions.length >= maxQuestions"
  >
    <span>+</span> 添加新问题 ({{ form.questions.length }}/{{ maxQuestions }})
  </button>
</div>
  
<!-- 第四步：联系方式 -->
<div v-else-if="currentStep === 4" class="survey-step">
  <h2><span class="emoji">📞</span> 接头方式</h2>
  
  <div class="form-group">
    <label><span class="emoji">💬</span> 您希望我们通过什么方式联系您？</label>
    <div class="contact-methods">
      <label v-for="method in contactMethods" :key="method.value" class="method-card">
        <input 
          type="radio" 
          v-model="form.preferredContact" 
          :value="method.value"
          @change="resetContactFields(method.value)"
        >
        <div class="method-content">
          <span class="method-emoji">{{ method.emoji }}</span>
          <span class="method-name">{{ method.label }}</span>
        </div>
      </label>
    </div>
  </div>

  <!-- 动态显示对应的联系方式输入框 -->
  <div v-if="form.preferredContact">
    <div class="form-group" v-if="form.preferredContact === 'phone'">
      <label><span class="emoji">📱</span> 手机号码 <span class="hint">(用于联系获取奖品)</span></label>
      <input v-model="form.phone" type="tel" placeholder="请填写常用手机号">
    </div>
    
    <div class="form-group" v-if="form.preferredContact === 'email'">
      <label><span class="emoji">📧</span> 电子邮箱 <span class="hint">(用于联系获取奖品)</span></label>
      <input v-model="form.email" type="email" placeholder="请填写常用邮箱">
    </div>
    
    <div class="form-group" v-if="form.preferredContact === 'wechat'">
      <label><span class="emoji">💬</span> 微信 <span class="hint">(用于联系获取奖品)</span></label>
      <input v-model="form.wechat" type="text" placeholder="请填写正确微信号">
    </div>
    
    <div class="form-group" v-if="form.preferredContact === 'qq'">
      <label><span class="emoji">🐧</span> QQ <span class="hint">(用于联系获取奖品)</span></label>
      <input v-model="form.qq" type="text" placeholder="请填写正确QQ号">
    </div>
  </div>
</div>
  
          <!-- 完成页 -->
          <div v-else class="thank-you-step">
          <h2><span class="emoji">🎉</span> 感谢参与！</h2>
          
          <div class="result-card">
            <p>亲爱的<strong>{{ form.name || '未来的白衣天使' }}</strong>：</p>
            <p>您对<strong>{{ form.interest || '医学梦想' }}</strong>的医学梦想已记录！</p>
          </div>
          
          <div class="contact-info">
            <h3><span class="emoji">📢</span> 招生办公室联系方式：</h3>
            <div class="contact-details">
              <p><span class="icon">📞</span> 电话：086-0759-2388505</p>
              <p><span class="icon">📧</span> 邮箱：zsb@gdmu.edu.cn</p>
              <p><span class="icon">🏫</span> 地址：广东省东莞市松山湖科技产业园新城大道1号</p>
            </div>
          </div>
          
          <div class="next-steps">
            <h3><span class="emoji">👉</span> 接下来您可以：</h3>
            <ul>
              <li>关注官方微信公众号"广东医科大学招生办"</li>
              <li>关注招生办抖音：广东医科大学（获取更多校园有趣信息）</li>
              <li>也可以预约校园开放日参观哦！</li>
            </ul>
          </div>
          
          <button class="restart-btn" @click="resetForm">
            <span class="emoji">🔄</span> 再填一次（帮朋友）
          </button>
        </div>
      </transition>

      <div class="button-group">
        <button v-if="currentStep > 1 && currentStep <= totalSteps" @click="prevStep" class="btn prev-btn">
          <span class="emoji">👈</span> 上一步
        </button>
        <button 
          v-if="currentStep < totalSteps" 
          @click="nextStep" 
          class="btn next-btn"
          :disabled="!isStepValid"
        >
          下一步 <span class="emoji">👉</span>
        </button>
        <button 
          v-if="currentStep === totalSteps" 
          @click="submitForm" 
          class="btn submit-btn"
          :disabled="!isStepValid"
        >
          <span class="emoji">🚀</span> 提交问卷
        </button>
      </div>

      <div class="progress-container" v-if="currentStep <= totalSteps">
  <div class="progress-bar" :style="{ width: progressWidth }"></div>
  <div class="step-indicator">
    <span 
      v-for="step in steps" 
      :key="step.number" 
      :class="{ 'active': step.number <= currentStep }"
    >
      <span class="step-emoji">{{ step.emoji }}</span>
      {{ step.label }}
    </span>
  </div>
</div>
    </div>
    <div class="shiny-text-container">
        <ShinyText text="← 返回问题解答" :jump-duration="0.9" :shine-speed="3" color="white" @click="handleAction"/>
    </div>
  </div>
  </template>
  
<script setup>
import ShinyText from '../components/ShinyText.vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const handleAction = () => { 
    router.push({ path: '/last'});
};
</script>

  <script>
  export default {
    data() {
      return {
        currentStep: 1,
      totalSteps: 4,
      isBouncing: false,
      ageWarning: false,
      maxQuestions: 5,
      form: {
      name: '',
      age: '',
      gender: '',
      channels: [],
      interest: '',
      rating: 0,
      questions: [{ text: '' }],
      phone: '',
      email: '',
      qq: '',
      wechat: '',
      preferredContact: ''
        },
        steps: [
          { number: 1, label: '基本信息', emoji: '👤' },
          { number: 2, label: '探校雷达', emoji: '🏫' },
          { number: 3, label: '您的疑问', emoji: '❓' },
          { number: 4, label: '联系方式', emoji: '📞' }
        ],
        genderOptions: [
          { value: 'male', label: '男', emoji: '👦' },
          { value: 'female', label: '女', emoji: '👧' },
        ],
        channels: [
          { value: 'website', label: '学校官网', emoji: '🌐', hot: true },
          { value: 'social', label: '社交媒体', emoji: '📱', hot: true },
          { value: 'friend', label: '学长推荐', emoji: '👨‍🎓' },
          { value: 'teacher', label: '老师推荐', emoji: '👩‍🏫' },
          { value: 'expo', label: '招生宣讲会', emoji: '🎤' },
          { value: 'other', label: '其他渠道', emoji: '❓' }
        ],
        majors: [
          { value: 'clinical', label: '临床医学', desc: 'ESI全球前1%学科，培养临床医生', emoji: '💊' },
          { value: 'dentistry', label: '口腔医学', desc: '广东省特色专业，牙医的摇篮', emoji: '🦷' },
          { value: 'nursing', label: '护理学', desc: '国家级一流专业，白衣天使的起点', emoji: '👩‍⚕️' },
          { value: 'pharmacy', label: '药学', desc: '新药研发方向，医药行业急需人才', emoji: '🧪' },
          { value: 'biomedical', label: '生物医学工程', desc: '医工交叉，智能医疗设备研发', emoji: '🦾' },
          { value: 'forensic', label: '法医学', desc: '现实版《法医秦明》，真实案件教学', emoji: '🔍' }
        ],
        contactMethods: [
          { value: 'phone', label: '电话沟通', emoji: '📞' },
          { value: 'email', label: '电子邮件', emoji: '📧' },
          { value: 'wechat', label: '微信联系', emoji: '💬' },
          { value: 'qq', label: 'QQ咨询', emoji: '🐧' }
        ],
        questionExamples: [
          "学校的宿舍条件怎么样？有空调吗？",
          "临床医学专业的实习医院有哪些？",
          "学校有哪些奖学金可以申请？",
          "转专业政策是怎样的？",
          "校园内有学生创业支持吗？"
        ],
        ratingTexts: [
          "请选择评分",
          "不太了解",
          "一般般",
          "还不错",
          "很好",
          "非常向往"
        ]
      }
    },
    computed: {
      progressWidth() {
        return `${(this.currentStep / this.totalSteps) * 100}%`;
      },
      isStepValid() {
    switch(this.currentStep) {
      // ...其他步骤的验证
      case 4:
        // 根据选择的首选联系方式验证对应的字段
        if (!this.form.preferredContact) return false;
        
        switch(this.form.preferredContact) {
          case 'phone': return !!this.form.phone;
          case 'email': return !!this.form.email;
          case 'wechat': return !!this.form.wechat;
          case 'qq': return !!this.form.qq;
          default: return false;
        }
      default:
        return true;
    }
  },
      filteredMajors() {
        if (!this.form.interest) return this.majors;
        const searchTerm = this.form.interest.toLowerCase();
        return this.majors.filter(major => 
          major.label.toLowerCase().includes(searchTerm) || 
          major.desc.toLowerCase().includes(searchTerm)
        );
      },
      hasEmptyQuestion() {
      return this.form.questions.some(q => !q.text.trim());
    },
    },
    methods: {
      resetContactFields(selectedMethod) {
    // 当切换首选联系方式时，清空其他联系方式
    if (selectedMethod !== 'phone') this.form.phone = '';
    if (selectedMethod !== 'email') this.form.email = '';
    if (selectedMethod !== 'wechat') this.form.wechat = '';
    if (selectedMethod !== 'qq') this.form.qq = '';
  },
      bounceTitle() {
        this.isBouncing = true;
        setTimeout(() => this.isBouncing = false, 1000);
      },
      checkAge() {
        this.ageWarning = this.form.age < 16 || this.form.age > 25;
      },
      nextStep() {
        if (this.currentStep < this.totalSteps) {
          this.currentStep++;
        }
      },
      prevStep() {
        if (this.currentStep > 1) {
          this.currentStep--;
        }
      },
      async submitForm() {
    try {
        // 准备符合后端要求的数据结构
        const formData = {
            username: this.form.name,
            age: this.form.age,
            sex: this.form.gender,
            major: this.form.interest,
            questions: this.form.questions
                .filter(q => q.text.trim())
                .map(q => ({ text: q.text })),
            phone: this.form.phone,
            email: this.form.email,
            qq: this.form.qq,
            wechat: this.form.wechat
        };
        
        // 验证数据
        if (!formData.username) {
            throw new Error('请填写用户名');
        }
        
        const response = await fetch('http://127.0.0.1:33001/api/user/submitSurvey', {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(formData)
        });
        
        const result = await response.json();
        
        if (!response.ok) {
            throw new Error(result.message || '提交失败');
        }
        
        this.currentStep++; // 跳转到完成页
        ElNotification({
            title: '成功',
            message: '问卷提交成功',
            type: 'success',
            duration: 3000
        });
    } catch (error) {
        console.error('提交出错:', error);
        ElNotification({
            title: '错误',
            message: '提交失败: ' + error.message,
            type: 'error',
            duration: 3000
        });
    }
},
      resetForm() {
        this.currentStep = 1;
        this.form = {
          name: '',
          age: '',
          gender: '',
          channels: [],
          interest: '',
          rating: 0,
          questions: [{ text: '' }],
          phone: '',
          email: '',
          preferredContact: ''
        };
      },
      addQuestion() {
      if (this.form.questions.length < this.maxQuestions) {
        this.form.questions.push({ text: '' });
      } else {
        this.showAlert(`最多只能添加${this.maxQuestions}个问题`);
      }
    },
    removeQuestion(index) {
      this.form.questions.splice(index, 1);
    },
    
    // 显示提示
    showAlert(message) {
      alert(message);
      // 或者使用Element Plus的提示
      // ElNotification.warning({
      //   title: '提示',
      //   message: message,
      //   duration: 2000
      // });
    },
    
    addExampleQuestion(example) {
      if (this.form.questions.some(q => q.text === example)) {
      this.showAlert('该问题已添加');
      return;
    }
      
    const emptyQuestion = this.form.questions.find(q => !q.text.trim());
    if (emptyQuestion) {
      emptyQuestion.text = example;
    } 
    // 没有空白问题但还可添加
    else if (this.form.questions.length < this.maxQuestions) {
      this.form.questions.push({ text: example });
    }
    // 已达上限
    else {
      this.showAlert(`最多只能添加${this.maxQuestions}个问题`);
    }
  },
      selectMajor(major) {
        this.form.interest = major.label;
        this.showSuggestions = false;
      }
    }
  }
  </script>
  
  <style scoped>
  /* 基础样式 */
  .survey-container {
    max-width: 800px;
    margin: 0 auto;
    padding: 2rem;
    font-family: 'Microsoft YaHei', sans-serif;
    color: #333;
    background-color: #f9f9f9;
    border-radius: 15px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  }
  
  .header {
    text-align: center;
    margin-bottom: 2rem;
  }
  
  .animated-title {
    font-size: 2.2rem;
    color: #1a5276;
    margin-bottom: 0.5rem;
  }
  
  .bounce {
    animation: bounce 0.8s;
  }
  
  @keyframes bounce {
    0%, 20%, 50%, 80%, 100% {transform: translateY(0);}
    40% {transform: translateY(-20px);}
    60% {transform: translateY(-10px);}
  }
  
  .subtitle {
    font-size: 1.1rem;
    color: #7f8c8d;
  }
  
  .survey-form {
    background: white;
    padding: 2rem;
    border-radius: 10px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  }
  
  .survey-step, .thank-you-step {
    text-align: center;
    padding: 20px;
  }
  .thank-you-step + .progress-container {
  display: none;
    }
  
  h2 {
    color: #1a5276;
    margin-bottom: 1.5rem;
    padding-bottom: 0.5rem;
    border-bottom: 2px solid #eaeaea;
    display: flex;
    align-items: center;
    gap: 10px;
  }
  
  .form-group {
  transition: all 0.3s ease;
  overflow: hidden;
  margin-bottom: 1.5rem;
}

/* 如果想让输入框有淡入效果 */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
  
  label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: bold;
    color: #555;
  }
  
  input[type="text"],
  input[type="number"],
  input[type="tel"],
  input[type="email"],
  select, textarea {
    width: 100%;
    padding: 0.8rem;
    border: 1px solid #ddd;
    border-radius: 5px;
    font-size: 1rem;
    transition: border 0.3s;
  }
  
  input:focus, select:focus, textarea:focus {
    border-color: #3498db;
    outline: none;
    box-shadow: 0 0 5px rgba(52, 152, 219, 0.3);
  }
  
  .radio-group, .checkbox-group {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
  }
  
  .radio-group label, .checkbox-group label {
    display: flex;
    align-items: center;
    font-weight: normal;
    cursor: pointer;
  }
  
  .radio-group input, .checkbox-group input {
    margin-right: 0.5rem;
  }
  
  .rating-container {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  
  .rating-container span {
    font-size: 2rem;
    color: #ddd;
    cursor: pointer;
    transition: color 0.2s;
  }
  
  .rating-container span.active {
    color: #f1c40f;
  }
  
  .rating-text {
    font-size: 0.9rem;
    color: #7f8c8d;
  }
  
  .button-group {
    display: flex;
  justify-content: space-between;
  margin-top: 2rem;
  gap: 10px;
  }
  
  .btn {
    padding: 0.8rem 1.5rem;
    border: none;
    border-radius: 5px;
    font-size: 1rem;
    cursor: pointer;
    transition: all 0.3s;
    display: flex;
    align-items: center;
    gap: 5px;
  }
  
  .btn:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
  
  .prev-btn {
    background-color: #95a5a6;
    color: white;
  }
  
  .next-btn, .submit-btn {
    background-color: #3498db;
    color: white;
  }
  
  .restart-btn {
    background-color: #2ecc71;
    color: white;
    margin-top: 1.5rem;
  }
  
  .btn:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
  }
  
  .progress-container {
    margin-top: 2rem;
    position: relative;
  }
  
  .progress-bar {
    height: 6px;
    background-color: #3498db;
    border-radius: 3px;
    transition: width 0.5s ease;
  }
  
  .step-indicator {
    display: flex;
    justify-content: space-between;
    margin-top: 0.5rem;
  }
  
  .step-indicator span {
    padding: 5px 10px;
    border-radius: 15px;
    color: #777;
    display: flex;
    align-items: center;
    gap: 5px;
  }
  
  .step-indicator span.active {
    background-color: #3498db;
    color: white;
  }
  
  .contact-info {
    background-color: #f8f9fa;
  padding: 1.5rem;
  border-radius: 10px;
  margin: 1.5rem 0;
  text-align: left;
  }
  
  .contact-info p {
    margin: 0.5rem 0;
    color: #555;
    display: flex;
    align-items: center;
    gap: 5px;
  }
  .contact-details {
  margin-top: 1rem;
}

.contact-details p {
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 0.8rem 0;
}
  .emoji {
    font-size: 1.2em;
  }
  
  .hint {
    font-size: 0.8rem;
    color: #7f8c8d;
    font-weight: normal;
  }
  
  .warning {
    color: #e74c3c;
    font-size: 0.9rem;
    margin-top: 5px;
  }
  
  .fun-fact-card {
    background-color: #e3f2fd;
    padding: 1rem;
    border-radius: 8px;
    margin-bottom: 1.5rem;
    border-left: 4px solid #2196f3;
  }
  
  .checkbox-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
  }
  
  .channel-item {
    padding: 0.8rem;
    border: 1px solid #eee;
    border-radius: 8px;
    transition: all 0.3s;
    display: flex;
    align-items: center;
    gap: 8px;
  }
  
  .channel-item:hover {
    background-color: #f5f5f5;
  }
  
  .hot-badge {
    background-color: #e74c3c;
    color: white;
    font-size: 0.7rem;
    padding: 2px 6px;
    border-radius: 10px;
    margin-left: auto;
  }
  
  .suggestions {
    border: 1px solid #ddd;
    border-radius: 5px;
    margin-top: 5px;
    max-height: 200px;
    overflow-y: auto;
  }
  
  .suggestion-item {
    padding: 0.8rem;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 10px;
    transition: background-color 0.2s;
  }
  
  .suggestion-item:hover {
    background-color: #f0f8ff;
  }
  
  .major-emoji {
    font-size: 1.5rem;
  }
  
  .major-name {
    font-weight: bold;
  }
  
  .major-desc {
    font-size: 0.8rem;
    color: #7f8c8d;
  }
  
  .question-examples {
    background-color: #f5f5f5;
    padding: 1rem;
    border-radius: 8px;
    margin-bottom: 1rem;
  }
  
  .question-examples ul {
    padding-left: 1.5rem;
  }
  
  .question-examples li {
    margin-bottom: 0.5rem;
    cursor: pointer;
    transition: color 0.2s;
  }
  
  .question-examples li:hover {
    color: #3498db;
  }
  
  .questions-container {
    margin-bottom: 1rem;
  }
  
  .question-item {
    margin-bottom: 1rem;
  }
  
  .question-input-group {
    display: flex;
    gap: 10px;
  }
  
  .remove-btn {
    background-color: #e74c3c;
    color: white;
    border: none;
    border-radius: 5px;
    padding: 0 1rem;
    cursor: pointer;
    transition: background-color 0.2s;
  }
  
  .remove-btn:hover {
    background-color: #c0392b;
  }
  
  .add-question-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #2ecc71;
    color: white;
    border: none;
    border-radius: 5px;
    padding: 0.8rem;
    cursor: pointer;
    transition: background-color 0.2s;
    gap: 5px;
  }
  
  .add-question-btn:hover {
    background-color: #27ae60;
  }
  
  .contact-methods {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
  }
  
  .method-card {
    border: 1px solid #eee;
    border-radius: 8px;
    padding: 1rem;
    cursor: pointer;
    transition: all 0.3s;
  }
  
  .method-card:hover {
    border-color: #3498db;
  }
  
  .method-content {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  
  .method-emoji {
    font-size: 1.5rem;
  }
  
  .method-name {
    font-weight: bold;
  }
  
  .result-card {
    background-color: #e8f5e9;
    padding: 1rem;
    border-radius: 8px;
    margin: 1rem 0;
  }
  
  .next-steps {
    background-color: #e3f2fd;
    padding: 1rem;
    border-radius: 8px;
    margin: 1rem 0;
  }
  
  .next-steps ul {
    padding-left: 1.5rem;
  }
  
  .icon {
    margin-right: 8px;
  }
  
  .highlight {
    color: #1a5276;
    font-weight: bold;
  }
  
  /* 动画效果 */
  .fade-enter-active, .fade-leave-active {
    transition: opacity 0.5s, transform 0.5s;
  }
  .fade-enter-from {
    opacity: 0;
    transform: translateX(20px);
  }
  .fade-leave-to {
    opacity: 0;
    transform: translateX(-20px);
  }
  
  /* 响应式设计 */
  @media (max-width: 768px) {
    .survey-container {
      padding: 1rem;
    }
    
    .survey-form {
      padding: 1rem;
    }
    
    .checkbox-grid, .contact-methods {
      grid-template-columns: 1fr;
    }
    
    .button-group {
      flex-direction: column;
      gap: 10px;
    }
    
    .btn {
      width: 100%;
    }
  }
  .question-examples li {
  cursor: pointer;
  padding: 8px;
  border-radius: 4px;
  transition: all 0.3s;
}

.question-examples li:hover {
  background-color: #f0f7ff;
}

.question-examples li.disabled {
  color: #ccc;
  cursor: not-allowed;
}

.add-question-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
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