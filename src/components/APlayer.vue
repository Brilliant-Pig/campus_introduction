<template>
    <div id="Player">
        <link rel="stylesheet" href="APlayer.min.css">
    <div id="aplayer-container"></div>
    </div>
</template>

<script>
import 'APlayer/dist/APlayer.min.css';
import APlayer from 'Aplayer';

export default {
    data(){
        return {
            player:null,
            audios: [
                { name: 'Song1', url: '../assets/网设BGM.mp3'},
            ]
        };
    },

    mounted() {
        this.player = new APlayer({
            fixed: true,
            container: document.getElementById('aplayer-container'),
            audio: this.audios
        });
    },

    beforeUnmount() {
        this.player.destroy(); // 组件销毁时移除播放器
    }
}

</script>

<style>

</style>