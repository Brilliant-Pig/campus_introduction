<template>
    <div class="container">
      <section class="blank">
        <h1>教学资源</h1>
        <p>——以下将为您娓娓道来</p>
      </section>
      <section class="horizontal" ref="horizontalSection">
        <div class="pin-wrap">
          <div class="animation-wrap">
            <div v-for="(item, index) in items" :key="index" class="item">
              <div class="content">
                <h3>{{ item.title }}</h3>
                <p>{{ item.text }}</p>
              </div>
              <img :src="item.image" alt="示意图" class="item-image" v-if="item.image" />
            </div>
          </div>
        </div>
        <div class="mobile-hint-bottom">
            手机端上下滑动浏览~
        </div>
      </section>
    </div>
  </template>
  
  <script>
  import { gsap } from 'gsap'
  import { ScrollTrigger } from 'gsap/ScrollTrigger'
  
  export default {
    data() {
      return {
        items: [
          { title: '教师规模与结构', 
            text: '广东医科大学共有教职工1910人，其中专任教师1411人，包括博士生导师129人、硕士生导师519人。这一师资规模在广东省内同类医科院校中处于领先地位，为高质量的教学和科研工作提供了坚实的人才基础。   高层次人才构成：国家级人才：享受国务院政府特殊津贴专家15人；获全国模范教师、优秀教师、师德先进个人等荣誉称号者10人；   省级人才梯队：广东省特聘教授/研究员/讲师系列50人"千百十人才培养工程"省级培养对象14人"扬帆计划"高层次人才16人',
            image: 'https://introduction-video.oss-cn-shenzhen.aliyuncs.com/jieqing.png' },
          { title: '科研与教学成果', 
          text: '师资团队在衰老与抗衰老机制研究、血管衰老与动脉粥样硬化防治等前沿领域保持国内领先地位。典型代表熊兴东教授（基础医学院副院长）作为广东省扬帆计划高层次人才、南粤优秀教师，主持国家级/省部级科研项目12项，累计科研经费达1260万元，发表SCI论文36篇（其中JCR一区论文14篇），获省级科技进步奖3项。', 
          image: 'https://introduction-video.oss-cn-shenzhen.aliyuncs.com/shiyanshi.jpg' },
          { title: '科研平台建设', 
          text: '国家级平台（7个）：国家慢性病防治重点实验室粤港澳大湾区分子诊断联合创新中心国家级临床医学研究中心分中心等  省级平台（4个）：广东省医学分子诊断重点实验室广东省数智健康医疗工程技术研究中心粤西医联体临床大数据云服务协同创新中心广东省医学分子诊断协同创新发展中心  其他重点实验室：9个省级重点实验室/工程技术研究中心/新型研发机构30个市厅级重点实验室', 
          image: 'https://introduction-video.oss-cn-shenzhen.aliyuncs.com/shiyan.jpg' }
        ]
      }
    },
    mounted() {
      gsap.registerPlugin(ScrollTrigger)
      this.initHorizontalScroll()
    },
    methods: {
      initHorizontalScroll() {
        const section = this.$refs.horizontalSection
        const animWrap = section.querySelector('.animation-wrap')
        
        gsap.to(animWrap, {
          x: () => -(animWrap.scrollWidth - window.innerWidth),
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () => `+=${animWrap.scrollWidth - window.innerWidth}`,
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
            anticipatePin: 1
          }
        })
      }
    }
  }
  </script>
  
  <style scoped>
  .container {
    max-width: 100vw;
    overflow-x: hidden;
  }
  
  .horizontal {
    height: 100vh;
    background: #f8f9fa;
    overflow: hidden;
  }
  
  .pin-wrap {
    background-image: linear-gradient(120deg, #a6c0fe 0%, #f68084 100%);
    height: 100vh;
    display: flex;
    align-items: center;
  }
  
  .animation-wrap {
    display: flex;
    position: relative;
    padding: 0 5%;
    gap: 40px;
  }
  
  .item {
    flex: 0 0 600px;
    height: 70vh;
    /* display: flex; */
    background: white;
    border-radius: 15px;
    box-shadow: 0 10px 20px rgba(0,0,0,0.1);
    overflow: hidden;
    padding: 20px;
  }
  
  .content {
    flex: 1;
    padding: 30px;
  }
  
  .content p{
    text-align: left;
    font-size: 1rem;
    color: #34495e;
    line-height: 1.6;
  }

  h3 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
    color: #2c3e50;
  }
  
  .item-image {
    width: auto;
    height: 40%;
    object-fit: cover;
    border-radius: 10px;
  }
  
  .blank {
    padding: 50px 5%;
    background: white;
  }
  
  .blank h1 {
    font-size: 2.5rem;
    color: #34495e;
    margin-bottom: 1rem;
  }
  
  .blank p {
    font-size: 1rem;
    color: #7f8c8d;
    line-height: 1.6;
  }

/* 以下代码为移动端适配 */
@media (max-width: 768px) {
  .animation-wrap {
    gap: 100px;       /* 缩小卡片间距 */
    padding: 0 5px;  /* 减少左右内边距 */
  }

  .item {
    flex: 0 0 700px;  /* 移动端宽度缩小 */
    height: 80vh;     /* 移动端高度缩小 */
    padding: 20px;    /* 内边距缩小 */
  }

  .content {
    padding: 5px;    /* 内容区域内边距缩小 */
  }

  h3 {
    font-size: 1.5rem; /* 标题字体缩小 */
  }

  .item-image {
    height: 30%;      /* 图片高度缩小 */
  }
}

/* 超小屏幕（如 iPhone SE） */
@media (max-width: 480px) {
  .item {
    flex: 0 0 250px;  /* 更窄的卡片 */
    height: 45vh;     /* 更矮的卡片 */
  }

  h3 {
    font-size: 1rem;  /* 更小的标题 */
  }

  .content p {
    font-size: 0.9rem; /* 更小的正文 */
  }
}

/* 固定在底部的提示（仅移动端显示） */
.mobile-hint-bottom {
  display: none; /* 默认隐藏 */
  position: fixed;
  bottom: 10px; /* 更靠近底部 */
  left: 50%; /* 水平居中 */
  transform: translateX(-50%); /* 精确居中 */
  max-width: 200px; /* 限制最大宽度 */
  padding: 8px 16px; /* 更紧凑的内边距 */
  background: rgba(0, 0, 0, 0.7);
  color: white;
  font-size: 0.85rem; /* 稍小的字体 */
  text-align: center;
  border-radius: 12px; /* 更小的圆角 */
  z-index: 100;
  animation: pulse 2s infinite;
  white-space: nowrap; /* 防止文字换行 */
}

/* 仅在移动端显示 */
@media (max-width: 768px) {
  .mobile-hint-bottom {
    display: block;
  }
}

</style>