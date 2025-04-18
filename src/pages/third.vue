<template>
  <div>
    <link rel='stylesheet' href='https://chinese-fonts-cdn.deno.dev/packages/mksjh/dist/MaokenAssortedSans/result.css' /> 
    <link rel='stylesheet' href='https://chinese-fonts-cdn.deno.dev/packages/maple-mono-cn/dist/MapleMono-CN-Medium/result.css' /> 
    <div id="app">
  <div class="my-scroll-bar">
    <h1 style="font-family:'MaokenAssortedSans'; font-weight:'400'; font-size: 80px; padding-bottom: 0%; margin-bottom: 5%;">火热专业</h1>
    <section id="content">
      <section class="image-text-grid container">
        <div class="image-text-item">
          <div class="image_cont">
            <img
              src="https://pic1.imgdb.cn/item/6800f61088c538a9b5d74196.jpg"
              alt="Image 1"
              class="animate-image"
            />
          </div>
          <div class="text_cont animate-text">
            <h2>No.1临床医学</h2>
            <p>博士学位授权一级学科<br>硕士学位授权一级学科<br>硕士专业学位授权点<br>临床医学学科进入全球ESI排名前3‰<br>国家级一流本科专业建设点<br>全国高等学校特色专业建设点<br>广东省高校重点专业</p>
            

            
          </div>
        </div>
        <div class="image-text-item">
          <div class="image_cont">
            <img
              src="https://pic1.imgdb.cn/item/6800fd2288c538a9b5d75bcd.jpg"
              alt="Image 2"
              class="animate-image"
            />
          </div>
          <div class="text_cont animate-text">
            <h2>No.2医学检验技术</h2>
            <p>国家级一流本科专业建设点<br>全国高校特色专业建设点<br>广东省高校名牌专业<br>临床医学（含临床检验诊断学）博士学位授权点<br>医学技术硕士学位授权点<br>临床检验诊断学硕士学位授权点</p>
          </div>
        </div>
        <div class="image-text-item">
          <div class="image_cont">
            <img
              src="https://pic1.imgdb.cn/item/6800fed988c538a9b5d764d4.jpg"
              alt="Image 3"
              class="animate-image"
            />
          </div>
          <div class="text_cont animate-text">
            <h2>No.3预防检验与检疫</h2>
            <p>国家级一流本科专业建设点<br>广东省卫生检验与检疫<br>实验教学示范中心<br>东莞市卫生检验与检疫重点实验室<br>省级卫生检验学课程教研室</p>
          </div>
        </div>
        <div class="image-text-item">
          <div class="image_cont">
            <img
              src="https://pic1.imgdb.cn/item/6800ff9f88c538a9b5d768e6.jpg"
              alt="Image 4"
              class="animate-image"
            />
          </div>
          <div class="text_cont animate-text">
            <h2>No.4预防医学</h2>
            <p>国家级一流本科专业建设点<br>公共卫生与预防医学为一级学科硕士学位授权点<br>广东省高水平大学重点建设学科<br>广东省优势重点学科<br>公共卫生专业硕士学位授权点<br>公共卫生学院入选广东省高水平公共卫生学院培育建设单位</p>
          </div>
        </div>
      </section>
    </section>
     
    <section id="content">
      <section class="image-text-grid container">
        <div class="image-text-item">
          <div class="image_cont">
            <img
              src="https://pic1.imgdb.cn/item/680101c188c538a9b5d77493.jpg"
              alt="Image 1"
              class="animate-image"
              style="width: 100% !important;"
            />
          </div>
          <div class="text_cont animate-text">
            <h2>"No.5联合学士学位</h2>
            <p>联合培养的3个项目、5个专业，都是两校的“王牌专业”强强联合。以药学专业为例，广东医科大学药学专业是广东省重点专业和一流专业，是药学一级学科硕士学位授权点。药学学科2021年晋升为广东省高水平大学重点建设学科，药理学与毒理学为ESI全球排名前1%学科。</p>
          </div>
        </div>
      </section>
    </section>
    <div>
        <a href="https://zs.gdmu.edu.cn/bkzn/zsjh.htm" style="font-size: 2.0rem; color: #6c6c6c ; font-family:'Maple Mono CN Medium';font-weight:'400';">如需了解其他专业，可点击查询</a>
    </div>
    </div>
    </div>
    </div>
  </template>
  
  <script setup>
  import { onMounted, onUnmounted } from "vue";
  import gsap from "gsap";
  import { ScrollTrigger } from "gsap/ScrollTrigger";
  gsap.registerPlugin(ScrollTrigger);
  
  let scrollbox;
  const resizeBody = () => {
    scrollbox = document.querySelector(".my-scroll-bar");
    if (scrollbox) {
      const contentHeight = scrollbox.scrollHeight; // 获取内容的实际高度
      document.body.style.height = `${contentHeight}px`; // 设置 body 的高度
    }
  };
  
  const scroll = () => {
    const scrollY = window.scrollY; // 获取滚动距离
    if (scrollbox) {
      scrollbox.style.transform = `translateY(${-scrollY}px)`; // 模拟滚动
    }
  };
  
  const initAnimations = () => {
    gsap.utils.toArray('.animate-image').forEach((image, i) => {
      gsap.from(image, {
        x: i % 2 === 0 ? -100 : 100, // 偶数项从左，奇数项从右
        opacity: 0,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: image,
          start: "top 75%",
          toggleActions: "play none none none",
          markers: false // 调试时可以设为 true 显示触发点
        }
      });
    });
  
    // 文字从右侧滑入
    gsap.utils.toArray('.animate-text').forEach((text, i) => {
      gsap.from(text, {
        x: i % 2 === 0 ? 100 : -100, // 与图片相反方向
        opacity: 0,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: text,
          start: "top 80%",
          toggleActions: "play none none none",
          markers: false
        }
      });
    });
  };
  
  // 等待图片加载完成
  const waitForImages = () => {
    const images = document.querySelectorAll(".animate-image");
    let loadedCount = 0;
  
    return new Promise((resolve) => {
      images.forEach((img) => {
        if (img.complete) {
          loadedCount++;
        } else {
          img.onload = () => {
            loadedCount++;
            if (loadedCount === images.length) {
              resolve();
            }
          };
          img.onerror = () => {
            loadedCount++;
            if (loadedCount === images.length) {
              resolve();
            }
          };
        }
      });
  
      // 如果所有图片都已经加载完成
      if (loadedCount === images.length) {
        resolve();
      }
    });
  };
  
  onMounted(async () => {
    resizeBody();
    window.addEventListener("resize", resizeBody);
    window.addEventListener("scroll", scroll);
  
    // 等待图片加载完成后初始化动画
    await waitForImages();
    initAnimations();
    setTimeout(resizeBody, 100);
  });
  
  onUnmounted(() => {
    document.querySelectorAll('img').forEach(img => {
      const temp = new Image();
      temp.src = img.src;
    });
    window.removeEventListener("load", resizeBody);
    window.removeEventListener("resize", resizeBody);
    window.removeEventListener("scroll", scroll);
  
    // 清除所有 ScrollTrigger 实例
    ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
  });
  </script>
  
  <style>
  .my-scroll-bar {
    overflow: auto;
    transition: transform 2.4s cubic-bezier(0.1, 0.79, 0.11, 0.82);
    margin-bottom: 0;
  }
  #app{
    position: fixed;
    top: 0;
    width: 100%;
    height: 100vh;
  
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
  gap: 0.5rem;
  overflow: hidden; /* 防止动画溢出 */
  }
  
  .image-text-item:nth-child(even) .image_cont {
  order: 2;
  }
  .image-text-item:nth-child(even) .text_cont {
  order: 1;
  }
  
  .image_cont {
    padding: 0 !important;
    margin: 0 !important;
    width: 100%; /* 确保容器宽度填满 */
  }
  .image_cont img {
  width: 85%;
  height: auto;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  
  .text_cont {
  color: rgb(0, 0, 0);
  padding: 1rem;
  }
  
  .text_cont h2 {
  font-size: 3.5rem;
  margin-bottom: 0.5rem;
  color: #333;
  font-family:'MaokenAssortedSans';
  font-weight:'300';
  }
  
  .text_cont p {
  font-size: 1.8rem;
  line-height: 1.5;
  color: #666;
  font-family:'Maple Mono CN Medium';
  font-weight:'400';
  }
  
  /* 响应式设计 */
  @media (max-width: 768px) {
  .image-text-item {
    grid-template-columns: 1fr;
  }
  
  .image-text-item:nth-child(even) .image_cont,
  .image-text-item:nth-child(even) .text_cont {
    order: initial;
  }
  }
  
  @import "https://chinese-fonts-cdn.deno.dev/packages/mksjh/dist/MaokenAssortedSans/result.css";
  @import "https://chinese-fonts-cdn.deno.dev/packages/maple-mono-cn/dist/MapleMono-CN-Medium/result.css";
  
  </style>