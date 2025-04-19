<template>
  <div class="content-wrapper">
    <h1 class="main-title" style="color: brown;">火热专业</h1>
    <div class="video-intro-section">
      <div class="video-container">
        <video controls class="intro-video" poster="">
          <source src="../assets/12345.mp4" type="video/mp4">
          
        </video>
      </div>
      <div class="intro-text">
        <h3>广东医科大学，欢迎同学们加入，一起创造美好青春！</h3>
        <p style="color: #2c10e6;font-size: 75px;">招生代码10571</p>
      </div>
    </div>
    <link rel='stylesheet' href='https://chinese-fonts-cdn.deno.dev/packages/mksjh/dist/MaokenAssortedSans/result.css' />
    
  
    <div class="majors-grid">
      <!-- Clinical Medicine -->
      <div class="major-card" v-for="(major, index) in majors" :key="index">
        <div class="image-container" :class="{ 'right-image': index % 2 === 0 }">
          <img :src="major.image" :alt="major.name" class="major-image" />
        </div>
        <div class="content-container">
          <h2 class="major-title">{{ major.name }}</h2>
          <ul class="features-list">
            <li v-for="(feature, i) in major.features" :key="i">
              <i :class="featureIcons[i % featureIcons.length]"></i> {{ feature }}
            </li>
          </ul>
          <div class="action-buttons">
            <el-button 
              type="primary" 
              @click="openDrawer(major.key)"
              icon="el-icon-data-line"
              class="score-button"
            >历三年分数线！
            </el-button>
            <el-button 
              plain 
              icon="el-icon-info" 
              class="detail-button"
              @click="openDetailDrawer(major.key)"
            >专业详情介绍!
            </el-button>
          </div>
        </div>
      </div>
      
      <!-- Joint Degree Special Card -->
      <div class="joint-degree-card">
        <div class="joint-image-container">
          <img src="https://pic1.imgdb.cn/item/6802705f88c538a9b5dc2e77.jpg.jpg" alt="联合学士学位" />
        </div>
        <div class="joint-content">
          <h2>No.5 联合学士学位</h2>
          <p>联合培养的3个项目、5个专业，都是两校的"王牌专业"强强联合。以药学专业为例，广东医科大学药学专业是广东省重点专业和一流专业，是药学一级学科硕士学位授权点。药学学科2021年晋升为广东省高水平大学重点建设学科，药理学与毒理学为ESI全球排名前1%学科。</p>
        </div>
      </div>
    </div>
    
    <div class="more-majors-link">
      <a href=https://zs.gdmu.edu.cn/index.htm>如需了解其他专业，可点击查询</a>
    </div>

    <!-- 分数线抽屉 -->
    <el-drawer
      v-model="drawerVisible"
      :title="drawerTitle"
      direction="rtl"
      size="50%"
      class="score-drawer"
    >
      <div class="score-content">
        <h3>{{ currentMajor }}</h3>
        <el-table :data="scoreData" border style="width: 100%">
          <el-table-column prop="year" label="年份" />
          <el-table-column prop="maxScore" label="最高分" />
          <el-table-column prop="minScore" label="最低分" />
          <el-table-column prop="rank" label="排名" />
        </el-table>
        <div class="score-notes">
          <p>* 数据仅供参考，具体以当年招生简章为准 *</p>
        </div>
      </div>
    </el-drawer>

    <!-- 专业详情抽屉 -->
    <el-drawer
      v-model="detailDrawerVisible"
      :title="detailDrawerTitle"
      direction="rtl"
      size="50%"
      class="detail-drawer"
    >
      <div class="detail-content">
        <h3>{{ currentMajor }}</h3>
        <div v-html="majorDetails[currentMajorKey]"></div>
      </div>
    </el-drawer>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger)

// Data
const majors = ref([
  {
    key: 'clinical',
    name: 'No.1 临床医学',
    image: 'https://pic1.imgdb.cn/item/6800f61088c538a9b5d74196.jpg',
    features: [
      '博士学位授权一级学科',
      '硕士学位授权一级学科',
      '硕士专业学位授权点',
      '临床医学学科进入全球ESI排名前3‰',
      '国家级一流本科专业建设点',
      '全国高等学校特色专业建设点',
      '广东省高校重点专业'
    ]
  },
  {
    key: 'lab',
    name: 'No.2 医学检验技术',
    image: 'https://pic1.imgdb.cn/item/6800fd2288c538a9b5d75bcd.jpg',
    features: [
      '国家级一流本科专业建设点',
      '全国高校特色专业建设点',
      '广东省高校名牌专业',
      '临床医学（含临床检验诊断学）博士学位授权点',
      '医学技术硕士学位授权点',
      '临床检验诊断学硕士学位授权点'
    ]
  },
  {
    key: 'third',
    name: 'No.3 卫生检验与检疫',
    image: 'https://pic1.imgdb.cn/item/6800fed988c538a9b5d764d4.jpg',
    features: [
      '国家级一流本科专业建设点',
      '广东省卫生检验与检疫实验教学示范中心',
      '东莞市卫生检验与检疫重点实验室',
      '省级卫生检验学课程教研室'
    ]
  },
  {
    key: 'forth',
    name: 'No.4 预防医学',
    image: 'https://pic1.imgdb.cn/item/6800ff9f88c538a9b5d768e6.jpg',
    features: [
      '国家级一流本科专业建设点',
      '公共卫生与预防医学为一级学科硕士学位授权点',
      '广东省高水平大学重点建设学科',
      '广东省优势重点学科',
      '公共卫生专业硕士学位授权点',
      '公共卫生学院入选广东省高水平公共卫生学院培育建设单位'
    ]
  }
])

const featureIcons = [
  'el-icon-medal',
  'el-icon-trophy',
  'el-icon-star',
  'el-icon-flag',
  'el-icon-school',
  'el-icon-location'
]

// 分数线抽屉逻辑
const drawerVisible = ref(false)
const drawerTitle = ref('历年三分数线')
const currentMajor = ref('')
const scoreData = ref([])

const majorScores = {
  clinical: {
    name: 'No.1 临床医学',
    data: [
      { year: '2022', maxScore: '590', minScore: '575', rank: '42850' },
      { year: '2023', maxScore: '602', minScore: '580', rank: '42730' },
      { year: '2024', maxScore: '595', minScore: '571', rank: '45901' }
    ]
  },
  lab: {
    name: 'No.2 医学检验技术',
    data: [
      { year: '2022', maxScore: '560', minScore: '556', rank: '63781' },
      { year: '2023', maxScore: '567', minScore: '538', rank: '88912' },
      { year: '2024', maxScore: '557', minScore: '531', rank: '96897' }
    ]
  },
  third: {
    name: 'No.3 卫生检验与检疫',
    data: [
      { year: '2022', maxScore: '555', minScore: '532', rank: '94712' },
      { year: '2023', maxScore: '552', minScore: '520', rank: '113064' },
      { year: '2024', maxScore: '546', minScore: '520', rank: '114506' },
    ]
  },
  forth: {
    name: 'No.4 预防医学',
    data: [
      { year: '2022', maxScore: '565', minScore: '539', rank: '85138' },
      { year: '2023', maxScore: '566', minScore: '535', rank: '93720' },
      { year: '2024', maxScore: '555', minScore: '514', rank: '123283' }
    ]
  }
}

const openDrawer = (majorKey) => {
  currentMajor.value = majorScores[majorKey].name
  scoreData.value = majorScores[majorKey].data
  drawerVisible.value = true
}

// 专业详情抽屉逻辑
const detailDrawerVisible = ref(false)
const detailDrawerTitle = ref('专业详情')
const currentMajorKey = ref('')

const majorDetails = {
  clinical: `
    <div class="major-detail-section">
      <h4>专业简介</h4>
      <p>临床医学专业是我校历史最悠久、实力最雄厚的专业之一，培养具备扎实医学理论基础和临床实践能力的医学人才。</p>
    </div>
    <div class="major-detail-section">
      <h4>培养目标</h4>
      <ul>
        <li>掌握基础医学和临床医学的基本理论、基本知识</li>
        <li>具备临床各科常见病、多发病的诊治能力</li>
        <li>掌握急、难、重症的初步处理能力</li>
        <li>熟悉国家卫生工作方针、政策和法规</li>
        <li>掌握医学文献检索、资料调查的基本方法</li>
      </ul>
    </div>
    <div class="major-detail-section">
      <h4>主要课程</h4>
      <p>人体解剖学、生理学、病理学、药理学、诊断学、内科学、外科学、妇产科学、儿科学、传染病学、神经病学、精神病学、眼科学、耳鼻咽喉科学、皮肤性病学等</p>
    </div>
    <div class="major-detail-section">
      <h4>就业方向</h4>
      <p>各级医院、医疗卫生机构、医学科研单位从事医疗、预防、科研等工作</p>
    </div>
  `,
  lab: `
    <div class="major-detail-section">
      <h4>专业简介</h4>
      <p>医学检验技术专业培养能在医疗卫生机构、科研单位从事医学检验及医学类实验室工作的医学高级专门人才。</p>
    </div>
    <div class="major-detail-section">
      <h4>培养目标</h4>
      <ul>
        <li>掌握基础医学和临床医学的基本知识</li>
        <li>掌握医学检验的基本理论和实验操作技能</li>
        <li>了解常用检验仪器的基本构造和性能</li>
        <li>具有数理统计和计算机应用的基本能力</li>
        <li>熟悉国家卫生工作及临床实验室管理有关的方针、政策和法规</li>
      </ul>
    </div>
    <div class="major-detail-section">
      <h4>主要课程</h4>
      <p>分析化学、生物化学、医学统计学、临床检验基础、临床血液学检验、临床微生物学检验、临床免疫学检验、临床生物化学检验、实验室管理学、检验仪器学等</p>
    </div>
    <div class="major-detail-section">
      <h4>就业方向</h4>
      <p>各级医院检验科、疾病预防控制中心、血站、第三方检验机构、医学研究机构等</p>
    </div>
  `,
  third: `
    <div class="major-detail-section">
      <h4>专业简介</h4>
      <p>卫生检验与检疫专业培养具备预防医学、卫生检验检疫学基础理论知识和实际工作能力的高级专门人才。</p>
    </div>
    <div class="major-detail-section">
      <h4>培养目标</h4>
      <ul>
        <li>掌握预防医学和卫生检验与检疫的基本理论和知识</li>
        <li>掌握对卫生相关样品进行检验检疫的基本能力</li>
        <li>熟悉国家卫生工作方针、政策和法规</li>
        <li>掌握文献检索、资料调查的基本方法</li>
      </ul>
    </div>
    <div class="major-detail-section">
      <h4>主要课程</h4>
      <p>分析化学、仪器分析、卫生微生物学、食品理化检验、水质理化检验、空气理化检验、生物材料检验、病毒学检验、免疫学检验、卫生毒理学等</p>
    </div>
    <div class="major-detail-section">
      <h4>就业方向</h4>
      <p>疾病预防控制中心、卫生监督所、海关检验检疫局、食品卫生监测机构、环境监测机构等</p>
    </div>
  `,
  forth: `
    <div class="major-detail-section">
      <h4>专业简介</h4>
      <p>预防医学专业培养具备预防医学基本理论知识和卫生检测技术的高级医学专门人才。</p>
    </div>
    <div class="major-detail-section">
      <h4>培养目标</h4>
      <ul>
        <li>掌握基础医学和临床医学的基本理论、基本知识</li>
        <li>掌握预防医学的基本理论知识和防疫工作的基本能力</li>
        <li>掌握对人群劳动、生活、学习环境和食品进行卫生监督的基本能力</li>
        <li>熟悉国家卫生工作方针、政策和法规</li>
      </ul>
    </div>
    <div class="major-detail-section">
      <h4>主要课程</h4>
      <p>流行病学、卫生统计学、环境卫生学、劳动卫生学、营养与食品卫生学、儿童少年卫生学、卫生毒理学、卫生化学、社会医学等</p>
    </div>
    <div class="major-detail-section">
      <h4>就业方向</h4>
      <p>疾病预防控制中心、卫生监督所、社区卫生服务中心、健康教育机构、卫生行政部门等</p>
    </div>
  `
}

const openDetailDrawer = (majorKey) => {
  currentMajorKey.value = majorKey
  currentMajor.value = majorScores[majorKey].name
  detailDrawerVisible.value = true
}

// Animation logic
const initAnimations = () => {
  gsap.utils.toArray('.major-card').forEach((card, index) => {
    gsap.from(card, {
      x: index % 2 === 0 ? -100 : 100,
      opacity: 0,
      duration: 0.8,
      ease: "power2.out",
      scrollTrigger: {
        trigger: card,
        start: "top 75%",
        toggleActions: "play none none none"
      }
    })
  })
  
  gsap.from('.joint-degree-card', {
    y: 50,
    opacity: 0,
    duration: 1,
    scrollTrigger: {
      trigger: '.joint-degree-card',
      start: "top 80%",
      toggleActions: "play none none none"
    }
  })
}

onMounted(() => {
  initAnimations()
})
</script>

<style>
/* 全局样式 */
body {
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  margin: 0;
  min-height: 100vh;
  font-family: 'MaokenAssortedSans', 'Maple Mono CN Medium', sans-serif;
  padding: 20px;
}

.content-wrapper {
  max-width: 1200px;
  margin: 0 auto;
}

/* 卡片样式 */
.major-card,
.joint-degree-card {
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(5px);
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  gap: 2rem;
  margin-bottom: 3rem;
  transition: transform 0.3s ease;
}

.major-card:hover {
  transform: translateY(-5px);
}

.image-container {
  padding: 1rem;
}

.right-image {
  order: 2;
}

.major-image {
  width: 100%;
  height: auto;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.major-image:hover {
  transform: scale(1.03);
}

.content-container {
  padding: 1.5rem;
}

.major-title {
  font-size: 2.8rem;
  margin-bottom: 1.5rem;
  color: #1a3e72;
  font-weight: 400;
}

.features-list {
  list-style: none;
  padding: 0;
  margin-bottom: 2rem;
}

.features-list li {
  font-size: 1.3rem;
  margin-bottom: 0.8rem;
  display: flex;
  align-items: center;
  color: #333;
}

.features-list i {
  margin-right: 0.5rem;
  color: #1a3e72;
  font-size: 1.2rem;
}

.action-buttons {
  display: flex;
  gap: 1rem;
  justify-content: center;
}

/* 联合学位卡片样式 */
.joint-degree-card {
  margin-top: 2rem;
}

.joint-image-container img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.joint-content {
  padding: 2rem;
}

.joint-content h2 {
  font-size: 2.8rem;
  color: #1a3e72;
  margin-bottom: 1.5rem;
}

.joint-content p {
  font-size: 1.3rem;
  line-height: 1.6;
  color: #333;
}

/* 更多专业链接 */
.more-majors-link {
  text-align: center;
  margin-top: 3rem;
}

.more-majors-link a {
  font-size: 1.4rem;
  color: #1a3e72;
  text-decoration: none;
  transition: color 0.3s;
  font-weight: 500;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  background: rgba(255, 255, 255, 0.5);
}

.more-majors-link a:hover {
  color: #0d2b57;
  text-decoration: underline;
}

/* 标题样式 */
.main-title {
  font-size: 4.5rem;
  text-align: center;
  margin-bottom: 3rem;
  color: #1a3e72;
  font-weight: 400;
  text-shadow: 1px 1px 3px rgba(255, 255, 255, 0.8);
}

/* 抽屉样式 */
.score-drawer,
.detail-drawer {
  font-family: 'MaokenAssortedSans', 'Maple Mono CN Medium', sans-serif;
}

.score-drawer :deep(.el-drawer__header),
.detail-drawer :deep(.el-drawer__header) {
  margin-bottom: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #eee;
  color: #1a3e72;
  font-size: 1.5rem;
}

.score-content,
.detail-content {
  padding: 1.5rem;
}

.score-content h3,
.detail-content h3 {
  font-size: 2.2rem;
  text-align: center;
  margin-bottom: 2rem;
  color: #1a3e72;
}

.score-notes {
  margin-top: 2rem;
  text-align: center;
  color: #888;
  font-size: 0.9rem;
}

.major-detail-section {
  margin-bottom: 2rem;
}

.major-detail-section h4 {
  font-size: 1.8rem;
  color: #1a3e72;
  margin-bottom: 1rem;
  border-bottom: 1px solid #eee;
  padding-bottom: 0.5rem;
}

.major-detail-section p,
.major-detail-section ul {
  font-size: 1.2rem;
  line-height: 1.6;
  color: #555;
}

.major-detail-section ul {
  padding-left: 1.5rem;
}

.major-detail-section li {
  margin-bottom: 0.5rem;
}

/* 按钮样式 */
.el-button {
  font-size: 1.1rem;
  padding: 12px 20px;
}

.score-button {
  background-color: #1a3e72;
  border-color: #1a3e72;
}

.score-button:hover {
  background-color: #0d2b57;
  border-color: #0d2b57;
}

.detail-button {
  color: #1a3e72;
  border-color: #1a3e72;
}

.detail-button:hover {
  color: #0d2b57;
  border-color: #0d2b57;
  background-color: rgba(255, 255, 255, 0.2);
}

/* 响应式设计 */
@media (max-width: 768px) {
  body {
    padding: 10px;
  }
  
  .main-title {
    font-size: 3rem;
  }
  
  .major-card,
  .joint-degree-card {
    grid-template-columns: 1fr;
  }
  
  .right-image {
    order: initial;
  }
  
  .major-title,
  .joint-content h2 {
    font-size: 2rem;
  }
  
  .joint-content p,
  .features-list li {
    font-size: 1rem;
  }
  
  .action-buttons {
    flex-direction: column;
  }
  
  .major-detail-section h4 {
    font-size: 1.5rem;
  }
  
  .major-detail-section p,
  .major-detail-section ul {
    font-size: 1rem;
  }
  
  .score-drawer,
  .detail-drawer {
    width: 90% !important;
  }
}
.video-intro-section {
  display: flex;
  gap: 2rem;
  margin-bottom: 3rem;
  align-items: center;
}

.video-container {
  flex: 1;
  min-width: 50%;
}

.intro-video {
  width: 100%;
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.intro-text {
  flex: 1;
  padding: 0 1rem;
}

.intro-text h3 {
  font-size: 2rem;
  color: #1a3e72;
  margin-bottom: 1rem;
}

.intro-text p {
  font-size: 1.1rem;
  line-height: 1.6;
  color: #333;
}

/* 响应式调整 */
@media (max-width: 768px) {
  .video-intro-section {
    flex-direction: column;
  }
  
  .video-container,
  .intro-text {
    width: 100%;
  }
  
  .intro-text h3 {
    font-size: 1.5rem;
  }
  
  .intro-text p {
    font-size: 1rem;
  }
}
@import "https://chinese-fonts-cdn.deno.dev/packages/mksjh/dist/MaokenAssortedSans/result.css";
@import "https://chinese-fonts-cdn.deno.dev/packages/maple-mono-cn/dist/MapleMono-CN-Medium/result.css";
</style>