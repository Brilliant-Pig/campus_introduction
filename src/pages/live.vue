<template>
  <link rel='stylesheet' href='https://chinese-fonts-cdn.deno.dev/packages/mksjh/dist/MaokenAssortedSans/result.css' /> 
  <link rel='stylesheet' href='https://chinese-fonts-cdn.deno.dev/packages/maple-mono-cn/dist/MapleMono-CN-Medium/result.css' /> 
  <div style="position: relative; overflow: hidden; width: 100%; height: 100%;">
    <Ballpit :followCursor="true" />
  <div id="app">
<div class="my-scroll-bar">
  <h1 style="font-family:'MaokenAssortedSans'; font-weight:'400'; font-size: 80px; padding-bottom: 0%; margin-bottom: 0%;">校园生活</h1>
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
          <h2>知识与自然的和谐交响</h2>
          <p>湖面平静如镜，倒映着教学楼和周围的绿树，仿佛一幅生动的自然画卷。湖边的草地绿意盎然，几棵小树点缀其间，显得格外清新。这样的环境不仅为学生提供了一个学习和研究的理想场所，也是放松心情、享受自然的好去处。对于即将面临高考的同学们来说，广东医科大学不仅是一个学术殿堂，更是一个充满生机与活力的校园。在这里，你们可以在知识的海洋中遨游，同时也能在美丽的校园环境中找到心灵的宁静。无论是清晨的湖边晨读，还是傍晚的校园漫步，这里都能为你的大学生活增添无限色彩。</p>
        </div>
      </div>
      <div class="image-text-item">
        <div class="image_cont">
          <img
            src="https://pic1.imgdb.cn/item/67ff3cc888c538a9b5d2b1ad.jpg"
            alt="Image 2"
            class="animate-image"
          />
        </div>
        <div class="text_cont animate-text">
          <h2>华佗雕像——传承与创新的交汇</h2>
          <p>这座雕像不仅象征着中国古代医学的辉煌成就，也体现了广东医科大学对医学教育的重视和传承。雕像位于一栋教学楼前，教学楼上悬挂着“立志立德 求真求精”的标语，强调了学校对学生品德和学术追求的双重要求。</p>
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
          <h2>图书馆——知识的殿堂</h2>
          <p>图书馆不仅是一个藏书丰富的地方，更是学生和教师进行学术研究、知识交流的重要场所。在这里，你可以找到各种医学专业书籍、期刊和电子资源，为你的学术旅程提供坚实的支持。对于即将步入大学校园的高考学子们，广东医科大学图书馆将是你们未来学习和成长的重要伙伴。若你加入我们，你将与知识为伴，开启一段充满挑战和机遇的学术旅程。</p>
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
          <h2>广东医的窗景，是青春最好的滤镜</h2>
          <p>教学楼的落地窗前，阳光像被筛过的金粉，轻轻铺在走廊白色地砖上。窗外，榕树的枝叶正踮着脚往教室里张望，偶尔有几片叶子贴住玻璃，变成天然的生物课标本。</p>
        </div>
      </div>
    </section>
  </section>  
  <CircularGallery
    title="“医”梦安栖阁"
    :items="[
        { image: 'https://pic1.imgdb.cn/item/67ffc82588c538a9b5d4839e.jpg' },
        { image: 'https://pic1.imgdb.cn/item/67fce3c988c538a9b5d0cd17.webp' },
        { image: 'https://pic1.imgdb.cn/item/67ff402088c538a9b5d2baaf.png' },
        { image: 'https://pic1.imgdb.cn/item/67fce3c988c538a9b5d0cd16.webp' },
        { image: 'https://pic1.imgdb.cn/item/67ff401d88c538a9b5d2baa3.png' },
        { image: 'https://pic1.imgdb.cn/item/67ffc71e88c538a9b5d48339.png' },
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
            src="https://pic1.imgdb.cn/item/6800b2fc88c538a9b5d632e5.jpg"
            alt="Image 1"
            class="animate-image"
            style="width: 50% !important;"
          />
        </div>
        <div class="text_cont animate-text">
          <h2>"安栖阁"布局——多样化的住宿选择</h2>
          <p>广东医科大学为学生提供了多样化的住宿选择，包括四人间、六人间和八人间，以满足不同学生的需求。宿舍内部设计合理，空间利用充分，确保每位学生都有足够的私人空间和共享区域。部分宿舍还设有阳台和独立卫生间，为学生提供了便利的生活环境。</p>
        </div>
      </div>
      <div class="image-text-item">
        <div class="text_cont animate-text">
          <h2>"安栖阁"内饰</h2>
          <p>宿舍内部装饰现代简约，木质地板和宽敞的窗户让整个空间显得明亮而舒适。每位同学都有自己的储物柜，方便整理和存放个人物品。此外，宿舍还提供了必要的学习设施，如书桌和椅子，以及网络接口，支持你的学习和研究。在这里，你将与来自不同地方的同学共同生活，分享学习经验，建立深厚的友谊</p>
        </div>
        <div class="image_cont">
          <img
            src="https://pic1.imgdb.cn/item/6800b30a88c538a9b5d63332.jpg"
            alt="Image 2"
            class="animate-image"
          />
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
          <h2>活力小吃街——校园生活的精彩缩影</h2>
          <p>广东医科大学门口的小吃街是校园生活的一大亮点，这里汇聚了各种美食，是学生们课余时间放松和享受美食的好去处。这里摆满了各式各样的摊位，从传统的中式小吃到现代的创意美食，应有尽有。</p>
        </div>
      </div>
      <div class="image-text-item">
        <div class="text_cont animate-text">
          <h2>舌尖上的味蕾</h2>
          <p>广东医科大学食堂提供的美食远不止于此。从地道的中式菜肴到世界各地的风味小吃，从健康的轻食到满足的正餐，每一道菜都是精心制作，旨在满足不同学生的口味和需求。无论你是喜欢辣的、甜的、酸的还是咸的，这里总有一款适合你。</p>
        </div>
        <div class="image_cont">
          <img
            src="https://pic1.imgdb.cn/item/6800ab3e88c538a9b5d60cc4.jpg"
            alt="Image 2"
            class="animate-image"
          />
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
        { image: 'https://pic1.imgdb.cn/item/6800b30988c538a9b5d6332d.jpg' },
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
            src="https://pic1.imgdb.cn/item/67fce7b188c538a9b5d0cfe1.png"
            alt="Image 1"
            class="animate-image"
          />
        </div>
        <div class="text_cont animate-text">
          <h2>黄花岭的春日盛宴</h2>
          <p>位于广东医科大学松山湖校区旁的黄花岭，是一处充满生机与活力的自然景观。每当春季来临，漫山遍野的黄花如同金色的海洋，将整个山岭装点得如诗如画。这些黄花不仅美丽动人，还散发出淡淡的香气，吸引着蜜蜂和蝴蝶在花间翩翩起舞。即将加入广东医科大学的高考学子们，黄花岭的美景和乐趣，等待着你们去探索和发现。</p>
        </div>
      </div>
      <div class="image-text-item">
        <div class="text_cont animate-text">
          <h2>欧洲风情乐园</h2>
          <p>学校周边临近华为欧洲小镇，此地模仿了欧洲多个著名小镇的建筑风格，包括桥梁、教堂和城堡等，让人仿佛置身于欧洲。游客可以在这里漫步、拍照，享受异国风情，是体验欧洲文化与休闲放松的理想之地，说不定你偶然能结交到很多大佬哦！</p>
        </div>
        <div class="image_cont">
          <img
            src="https://pic1.imgdb.cn/item/67fce7db88c538a9b5d0cffa.png"
            alt="Image 2"
            class="animate-image"
          />
        </div>
      </div>
      <div class="image-text-item">
        <div class="image_cont">
          <img
            src="https://pic1.imgdb.cn/item/67fce87888c538a9b5d0d07c.png"
            alt="Image 3"
            class="animate-image"
          />
        </div>
        <div class="text_cont animate-text">
          <h2>交通枢纽，购物天堂</h2>
          <p>校园周边配套超豪华，万象汇购物中心近在咫尺，美食、娱乐、购物一站式搞定；加分天地商城更是学习用品的宝藏地，为你的大学生活添砖加瓦。丰富的教育资源、优越的地理位置、完善的校园设施，这里是你开启大学旅程的完美起点！高考招生进行中，快来加入我们吧！</p>
        </div>
      </div>
    </section>
  </section>
</div>
</div>
</div>
</template>

<script setup>
import Ballpit from '../components/Ballpit.vue';
import CircularGallery from '../components/photo.vue';
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
  setTimeout(resizeBody, 800);
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
width: 70%;
height: auto;
border-radius: 8px;
box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.text_cont {
color: rgb(0, 0, 0);
padding: 1rem;
}

.text_cont h2 {
font-size: 2.5rem;
margin-bottom: 0.5rem;
color: #333;
font-family:'MaokenAssortedSans';
font-weight:'300';
}

.text_cont p {
font-size: 1.4rem;
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