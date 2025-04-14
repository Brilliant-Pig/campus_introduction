<template>
  <h1>校园生活</h1>
    <CircularGallery
      title="涨“芝士”区"
      :items="[
          { image: 'https://www.gdmu.edu.cn/images/banner/bn02.jpg' },
          { image: 'https://www.gdmu.edu.cn/images/banner/bn03.jpg' },
      ]"
      :speed="0.25"
      :radius="350"
      :itemWidth="380"
      :itemHeight="250"
    />
    <CircularGallery
      title="涨“芝士”区"
      :items="[
          { image: 'https://www.gdmu.edu.cn/images/banner/bn02.jpg' },
          { image: 'https://www.gdmu.edu.cn/images/banner/bn03.jpg' },
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