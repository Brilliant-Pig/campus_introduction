<template>
    <div class="box">
      <div class="videoContainer">
    <video class="fullscreenVideo" id="bgVid" playsinline autoplay muted loop>
      <source src='../assets/background.mp4' type="video/mp4">
    </video>
      </div>
    </div>
</template>


<script>
export default {
  name: 'first',
  data() {
    return {
      isOpen: false,
    };
  },
  mounted() {
    this.isOpen = true;
    console.log('First page component mounted');
  	 // 播放音乐
    let oAudio = document.querySelector("#audio");
    oAudio.onended = function() {
      //播放完毕，重新循环播放
      oAudio.load();
      oAudio.play();
    };
    this.audioAutoPlay()},

  methods:{
    audioAutoPlay() {
      let audio = document.getElementById("audio");
      audio.play();
      document.removeEventListener("touchstart", this.audioAutoPlay);
    }
 }


}
</script>

<style scoped>
.color {
  background: #000000 !important;
  z-index: -50;
  width: 100px;
  height: 100px;
}
h1 {
  margin-top:0px;
}
.videoContainer {
position: fixed;
width: 100%;
height: 100%;
overflow: hidden;
z-index: -100;
}

.videoContainer:before {
content: "";
position: absolute;
width: 100%;
height: 100%;
display: block;
z-index: -1;
top: 0;
left: 0;
background: rgba(25,29,34,.65);
}

.fullscreenVideo {
width: 100%;
height: 100%;
object-fit: fill;
}
</style>

<style>

</style>