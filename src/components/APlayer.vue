<template>
    <div id="Player">
        <link rel="stylesheet" href="APlayer.min.css">
    <div id="aplayer-container"></div>
    </div>
</template>

<script>
import 'aplayer/dist/APlayer.min.css';
import APlayer from 'aplayer';

export default {
    data(){
        return {
            player:null,
            audios: [
                {   name: 'Song1',
                    url: '/music/BGM.mp3',
                    // cover: ''
                },
            ]
        };
    },

    mounted() {
        this.player = new APlayer({
            fixed: true,
            container: document.getElementById('aplayer-container'),
            audio: this.audios,
            autoplay: true,
            preload: 'auto',
            muted: true,  // 静音状态下绕过限制
            volume: 0.5 
        });
    },

    beforeUnmount() {
        this.player.destroy(); // 组件销毁时移除播放器
    }
}

</script>

<style>

</style>