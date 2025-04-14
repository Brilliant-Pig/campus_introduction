<template>
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
    <CircularGallery
      title="“医”梦安栖阁"
      :items="[
          { image: 'https://pic1.imgdb.cn/item/67fce3c888c538a9b5d0cd15.webp' },
          { image: 'https://pic1.imgdb.cn/item/67fce3c988c538a9b5d0cd17.webp' },
          { image: 'https://pic1.imgdb.cn/item/67fce3c988c538a9b5d0cd16.webp' },
      ]"
      :speed="0.25"
      :radius="350"
      :itemWidth="380"
      :itemHeight="250"
    />
    <CircularGallery
      title="米其林餐厅"
      :items="[
          { image: 'https://pic1.imgdb.cn/item/67fce50b88c538a9b5d0ce14.webp' },
          { image: 'https://pic1.imgdb.cn/item/67fce5fb88c538a9b5d0cea6.webp' },
          { image: 'https://pic1.imgdb.cn/item/67fce5fb88c538a9b5d0cea7.webp' },
          { image: 'https://pic1.imgdb.cn/item/67fce5fa88c538a9b5d0cea4.webp' },
      ]"
      :speed="0.25"
      :radius="350"
      :itemWidth="380"
      :itemHeight="250"
    />
    <CircularGallery
      title="美食应有尽有"
      :items="[
          { image: 'https://pic1.imgdb.cn/item/67fce63288c538a9b5d0cec9.jpg' },
          { image: 'https://pic1.imgdb.cn/item/67fce93b88c538a9b5d0d123.jpg' },
          { image: 'https://pic1.imgdb.cn/item/67fce95c88c538a9b5d0d142.jpg' },
          { image: 'https://pic1.imgdb.cn/item/67fce96c88c538a9b5d0d14d.jpg' },
          { image: 'https://pic1.imgdb.cn/item/67fce99d88c538a9b5d0d178.jpg' },
      ]"
      :speed="0.25"
      :radius="350"
      :itemWidth="380"
      :itemHeight="250"
    />
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
  </template>
  
  <script>
  import CircularGallery from '../components/photo.vue'
  
  export default {
    components: {
      CircularGallery
    }
  }
  </script>