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
            image: 'https://pic1.imgdb.cn/item/67fc95f188c538a9b5cfe470.png' },
          { title: '科研与教学成果', 
          text: '师资团队在衰老与抗衰老机制研究、血管衰老与动脉粥样硬化防治等前沿领域保持国内领先地位。典型代表熊兴东教授（基础医学院副院长）作为广东省扬帆计划高层次人才、南粤优秀教师，主持国家级/省部级科研项目12项，累计科研经费达1260万元，发表SCI论文36篇（其中JCR一区论文14篇），获省级科技进步奖3项。', 
          image: 'https://pic1.imgdb.cn/item/67fc977288c538a9b5cfea89.jpg' },
          { title: '科研平台建设', 
          text: '国家级平台（7个）：国家慢性病防治重点实验室粤港澳大湾区分子诊断联合创新中心国家级临床医学研究中心分中心等  省级平台（4个）：广东省医学分子诊断重点实验室广东省数智健康医疗工程技术研究中心粤西医联体临床大数据云服务协同创新中心广东省医学分子诊断协同创新发展中心  其他重点实验室：9个省级重点实验室/工程技术研究中心/新型研发机构30个市厅级重点实验室', 
          image: 'https://pic1.imgdb.cn/item/67fc953b88c538a9b5cfe0f3.jpg' }
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
  </style>
  

<!-- <template>
<section class="blank">
  <h1>教学资源</h1>
</section>

<section class="horizontal">
  <div class="pin-wrap">
    <div class="animation-wrap to-right">
      
      <div class="item">文本</div>
      <div class="item">文本</div>
      <div class="item">文本</div>
 
    </div>
  </div>
</section>
  </template>
  
<script setup>
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
const horizontalSections = gsap.utils.toArray('section.horizontal')

horizontalSections.forEach(function (sec, i) {	

var thisPinWrap = sec.querySelector('.pin-wrap');
var thisAnimWrap = thisPinWrap.querySelector('.animation-wrap');

var getToValue = () => -(thisAnimWrap.scrollWidth - window.innerWidth); 

gsap.fromTo(thisAnimWrap, { 
    x: () => thisAnimWrap.classList.contains('to-right') ? 0 : getToValue() 
  }, { 
    x: () => thisAnimWrap.classList.contains('to-right') ? getToValue() : 0, 
    ease: "none",
    scrollTrigger: {
      trigger: sec,		
      start: "top top",
      end: () => "+=" + (thisAnimWrap.scrollWidth - window.innerWidth),
      pin: thisPinWrap,
      invalidateOnRefresh: true,
      //anticipatePin: 1,
      scrub: true,
      //markers: true,
    }
  });

});	
  </script>
  
  <style scoped>
@import url('https://chinese-fonts-cdn.deno.dev/packages/maple-mono-cn/dist/MapleMono-CN-SemiBold/result.css');

html, body, section.horizontal {
  overflow-x: hidden;
}

body { 
  font-family: "Maple Mono CN SemiBold", sans-serif; 
  font-weight: 300;
  
  margin: 0;
  padding: 0;
}

h1 {
  margin: 0;
  padding: 50px 0 0 50px;
}

p {
  margin: 0;
  padding: 50px 0 50px 50px;
}

section {
  width: 100%;
  height: 100%;
  position: relative;
}


section:nth-of-type(odd) {
background-color: #f0f0f0;
}

section:nth-of-type(even) {
background-color: #ffffff;
}








section.horizontal {
  overflow-x: hidden;
}

section.horizontal .pin-wrap,
section.horizontal .animation-wrap {
    display: flex;
    position: relative;
    z-index: 1;  
    height: 100vh;
}


section.horizontal .item {
    position: relative;
    padding: 150px 80px;
    flex: 0 0 500px;
    height: calc(100vh - 300px);
    display: flex;
    align-items: center;
    line-height: 1.7;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    border-right: 1px solid rgba(0, 0, 0, 0.06);
    background-color: transparent;
}

section.horizontal .item:before {
    position: absolute;
    font-size: 100px;
    opacity: .13;
    font-weight: bold;    
    z-index: -1;
    -webkit-transform: translate(-30px, -50px);
    transform: translate(-30px, -50px);
    line-height: 1;
}




section.horizontal .animation-wrap.to-right {
    counter-reset: item;
    float: left;
}

section.horizontal .animation-wrap.to-left {
    counter-reset: item 11;
    float: right; 
}

section.horizontal .animation-wrap.to-right .item:before {
    counter-increment: item;
    content: counter(item);
}

section.horizontal .animation-wrap.to-left .item:before {
    counter-increment: item -1;
    content: counter(item);
}



section.horizontal .animation-wrap .item:nth-child(2n+2) {
    align-items: flex-start;
}

section.horizontal .animation-wrap .item:nth-child(4n+4) {
    align-items: flex-end;
}
  </style> -->