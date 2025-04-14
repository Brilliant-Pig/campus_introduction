<template>
    <CircularGallery
      title="校园生活"
      :items="[
          { image: 'https://www.gdmu.edu.cn/images/banner/bn02.jpg' },
  
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