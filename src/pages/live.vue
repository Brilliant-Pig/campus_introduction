<template>
<div class="my-scroll-bar">
  <h1>校园生活</h1>
  <CircularGallery
    title="涨“芝士”区"
    :items="[
        { image: 'https://www.gdmu.edu.cn/images/banner/bn02.jpg' },
        { image: 'https://www.gdmu.edu.cn/images/banner/bn03.jpg' },
        { image: 'https://pic1.imgdb.cn/item/67fce2a188c538a9b5d0cc9c.webp' },
        { image: 'https://pic1.imgdb.cn/item/67fce30988c538a9b5d0ccc3.webp' },
        { image: 'https://pic1.imgdb.cn/item/67fce30988c538a9b5d0ccc2.webp' },
        { image: 'https://pic1.imgdb.cn/item/67fc977288c538a9b5cfea89.jpg' },
    ]"
    :speed="0.25"
    :radius="350"
    :itemWidth="380"
    :itemHeight="250"
  />
  <section id="content">
    <section class="image-text-grid container">
      <div class="image-text-item">
        <div class="image_cont">
          <img
            src="https://pic1.imgdb.cn/item/67ff3cb988c538a9b5d2b180.jpg"
            alt="Image 1"
            class="animate-image"
          />
        </div>
        <div class="text_cont animate-text">
          <h2>标题 1</h2>
          <p>这是第一张图片的描述文字。</p>
        </div>
      </div>
      <div class="image-text-item">
        <div class="text_cont animate-text">
          <h2>标题 2</h2>
          <p>这是第二张图片的描述文字。</p>
        </div>
        <div class="image_cont">
          <img
            src="https://pic1.imgdb.cn/item/67ff3cc888c538a9b5d2b1ad.jpg"
            alt="Image 2"
            class="animate-image"
          />
        </div>
      </div>
      <div class="image-text-item">
        <div class="image_cont">
          <img
            src="https://pic1.imgdb.cn/item/67ff3cdc88c538a9b5d2b1eb.jpg"
            alt="Image 3"
            class="animate-image"
          />
        </div>
        <div class="text_cont animate-text">
          <h2>标题 3</h2>
          <p>这是第三张图片的描述文字。</p>
        </div>
      </div>
      <div class="image-text-item">
        <div class="image_cont">
          <img
            src="https://pic1.imgdb.cn/item/67ff3db688c538a9b5d2b4b4.jpg"
            alt="Image 4"
            class="animate-image"
          />
        </div>
        <div class="text_cont animate-text">
          <h2>标题 4</h2>
          <p>这是第三张图片的描述文字。</p>
        </div>
      </div>
      <div class="image-text-item">
        <div class="image_cont">
          <img
            src="https://pic1.imgdb.cn/item/67ff3ccf88c538a9b5d2b1be.jpg"
            alt="Image 5"
            class="animate-image"
          />
        </div>
        <div class="text_cont animate-text">
          <h2>标题 5</h2>
          <p>这是第三张图片的描述文字。</p>
        </div>
      </div>
    </section>
  </section>  
  <CircularGallery
    title="“医”梦安栖阁"
    :items="[
        { image: 'https://pic1.imgdb.cn/item/67fce3c888c538a9b5d0cd15.webp' },
        { image: 'https://pic1.imgdb.cn/item/67fce3c988c538a9b5d0cd17.webp' },
        { image: 'https://pic1.imgdb.cn/item/67ff402088c538a9b5d2baaf.png' },
        { image: 'https://pic1.imgdb.cn/item/67fce3c988c538a9b5d0cd16.webp' },
        { image: 'https://pic1.imgdb.cn/item/67ff401d88c538a9b5d2baa3.png' },
    ]"
    :speed="0.25"
    :radius="350"
    :itemWidth="380"
    :itemHeight="250"
  />
  <section id="content">
    <section class="image-text-grid container">
      <div class="image-text-item">
        <div class="image_cont">
          <img
            src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?crop=entropy&cs=srgb&fm=jpg&ixid=MnwxNDU4OXwwfDF8cmFuZG9tfHx8fHx8fHx8MTY0NDMzNTU3OA&ixlib=rb-1.2.1&q=85&w=600"
            alt="Image 1"
            class="animate-image"
          />
        </div>
        <div class="text_cont animate-text">
          <h2>标题 1</h2>
          <p>这是第一张图片的描述文字。</p>
        </div>
      </div>
      <div class="image-text-item">
        <div class="text_cont animate-text">
          <h2>标题 2</h2>
          <p>这是第二张图片的描述文字。</p>
        </div>
        <div class="image_cont">
          <img
            src="https://pic1.imgdb.cn/item/67fce50b88c538a9b5d0ce13.webp"
            alt="Image 2"
            class="animate-image"
          />
        </div>
      </div>
      <div class="image-text-item">
        <div class="image_cont">
          <img
            src="https://pic1.imgdb.cn/item/67fce50b88c538a9b5d0ce12.webp"
            alt="Image 3"
            class="animate-image"
          />
        </div>
        <div class="text_cont animate-text">
          <h2>标题 3</h2>
          <p>这是第三张图片的描述文字。</p>
        </div>
      </div>
    </section>
  </section>
  <CircularGallery
    title="米其林餐厅"
    :items="[
        { image: 'https://pic1.imgdb.cn/item/67fce50b88c538a9b5d0ce14.webp' },
        { image: 'https://pic1.imgdb.cn/item/67fce5fb88c538a9b5d0cea6.webp' },
        { image: 'https://pic1.imgdb.cn/item/67fce5fb88c538a9b5d0cea7.webp' },
        { image: 'https://pic1.imgdb.cn/item/67fce5fb88c538a9b5d0cea5.webp' },
        { image: 'https://pic1.imgdb.cn/item/67fce5fa88c538a9b5d0cea4.webp' },
    ]"
    :speed="0.25"
    :radius="350"
    :itemWidth="380"
    :itemHeight="250"
  />
  <section id="content">
    <section class="image-text-grid container">
      <div class="image-text-item">
        <div class="image_cont">
          <img
            src="https://pic1.imgdb.cn/item/67ff407288c538a9b5d2bb69.png"
            alt="Image 1"
            class="animate-image"
          />
        </div>
        <div class="text_cont animate-text">
          <h2>标题 1</h2>
          <p>这是第一张图片的描述文字。</p>
        </div>
      </div>
      <div class="image-text-item">
        <div class="text_cont animate-text">
          <h2>标题 2</h2>
          <p>这是第二张图片的描述文字。</p>
        </div>
        <div class="image_cont">
          <img
            src="https://pic1.imgdb.cn/item/67ff3f9a88c538a9b5d2b9c1.png"
            alt="Image 2"
            class="animate-image"
          />
        </div>
      </div>
      <div class="image-text-item">
        <div class="image_cont">
          <img
            src="https://pic1.imgdb.cn/item/67ff407288c538a9b5d2bb69.png"
            alt="Image 3"
            class="animate-image"
          />
        </div>
        <div class="text_cont animate-text">
          <h2>标题 3</h2>
          <p>这是第三张图片的描述文字。</p>
        </div>
      </div>
    </section>
  </section>
  <CircularGallery
    title="地铁+公交，城市任你转"
    :items="[
        { image: 'https://pic1.imgdb.cn/item/67fce19f88c538a9b5d0cc23.jpg' },
        { image: 'https://pic1.imgdb.cn/item/67fce75f88c538a9b5d0cf9e.png' },
        { image: 'https://pic1.imgdb.cn/item/67fce78e88c538a9b5d0cfbf.png' },
        { image: 'https://pic1.imgdb.cn/item/67fce7b188c538a9b5d0cfe1.png' },
        { image: 'https://pic1.imgdb.cn/item/67fce7db88c538a9b5d0cffa.png' },
        { image: 'https://pic1.imgdb.cn/item/67fce84a88c538a9b5d0d05a.jpg' },
        { image: 'https://pic1.imgdb.cn/item/67fce87888c538a9b5d0d07c.png' },
    ]"
    :speed="0.25"
    :radius="350"
    :itemWidth="380"
    :itemHeight="250"
  />
  <section id="content">
    <section class="image-text-grid container">
      <div class="image-text-item">
        <div class="image_cont">
          <img
            src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?crop=entropy&cs=srgb&fm=jpg&ixid=MnwxNDU4OXwwfDF8cmFuZG9tfHx8fHx8fHx8MTY0NDMzNTU3OA&ixlib=rb-1.2.1&q=85&w=600"
            alt="Image 1"
            class="animate-image"
          />
        </div>
        <div class="text_cont animate-text">
          <h2>标题 1</h2>
          <p>这是第一张图片的描述文字。</p>
        </div>
      </div>
      <div class="image-text-item">
        <div class="text_cont animate-text">
          <h2>标题 2</h2>
          <p>这是第二张图片的描述文字。</p>
        </div>
        <div class="image_cont">
          <img
            src="https://images.unsplash.com/photo-1569596082827-c5e8990496cb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxNDU4OXwwfDF8cmFuZG9tfHx8fHx8fHx8MTY0NDMzNDg3NQ&ixlib=rb-1.2.1&q=80&w=500"
            alt="Image 2"
            class="animate-image"
          />
        </div>
      </div>
      <div class="image-text-item">
        <div class="image_cont">
          <img
            src="https://images.unsplash.com/photo-1523712999610-f77fbcfc3843?crop=entropy&cs=srgb&fm=jpg&ixid=MnwxNDU4OXwwfDF8cmFuZG9tfHx8fHx8fHx8MTY0NDMzNTU3OA&ixlib=rb-1.2.1&q=85&w=600"
            alt="Image 3"
            class="animate-image"
          />
        </div>
        <div class="text_cont animate-text">
          <h2>标题 3</h2>
          <p>这是第三张图片的描述文字。</p>
        </div>
      </div>
    </section>
  </section>
</div>
</template>

<script setup>
import CircularGallery from '../components/photo.vue';
import { onMounted, onUnmounted } from "vue";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

let scrollbox;const resizeBody = () => {
  scrollbox = document.getElementsByClassName("my-scroll-bar")[0];
  document.body.style.height = `${scrollbox.offsetHeight}px`;
};

const scroll = () => {
  scrollbox.style.transform = `translateY(${-scrollY}px)`;
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
        start: "top 50%",
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
  window.addEventListener("load", resizeBody);
  window.addEventListener("resize", resizeBody);
  window.addEventListener("scroll", scroll);

  // 等待图片加载完成后初始化动画
  await waitForImages();
  initAnimations();
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
overflow: hidden;
transition: transform 2.4s cubic-bezier(0.1, 0.79, 0.11, 0.82);
margin-bottom: 0;
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
overflow: hidden; /* 防止动画溢出 */
}

.image-text-item:nth-child(even) .image_cont {
order: 2;
}
.image-text-item:nth-child(even) .text_cont {
order: 1;
}

.image_cont img {
width: 100%;
height: auto;
object-fit: cover;
border-radius: 8px;
box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.text_cont {
color: rgb(0, 0, 0);
text-align: left;
padding: 1rem;
}

.text_cont h2 {
font-size: 1.5rem;
margin-bottom: 0.5rem;
color: #333;
}

.text_cont p {
font-size: 1rem;
line-height: 1.5;
color: #666;
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
</style>