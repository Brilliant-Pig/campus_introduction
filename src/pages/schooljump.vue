<!-- 跳转官网过渡页面（注：现已发现跳转至本页面后回到菜单会使得菜单文字样式改变的BUG） -->
<template>
    <transition name="fade">
        <div>
            <link rel='stylesheet' href='https://chinese-fonts-cdn.deno.dev/packages/mksjh/dist/MaokenAssortedSans/result.css' /> 
            <p>正在跳转至广东医科大学相关官方网站...</p>
            <a ref="externalLink" href="https://www.gdmu.edu.cn/xxgk/xg_xx_xh.htm" style="display: none"></a>
        </div>
    </transition>
</template>

<script>
export default {
    mounted() {
        setTimeout(() => {
            this.$refs.externalLink.click(); // 自动触发点击
        }, 2000);
    }
}
</script>


<style>
@import "https://chinese-fonts-cdn.deno.dev/packages/maple-mono-cn/dist/MapleMono-CN-SemiBold/result.css";

p{
margin-top:45vh;
margin-bottom: 0px;
font-size: 80px; 
text-align: center;
font-family:'MaokenAssortedSans';
font-weight:'400';
color: transparent;
background-image: linear-gradient(120deg, #84fab0 0%, #62bbe8 100%);
background-clip: text;
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;
}
</style>