<template>
    <div class="title">
        <h5>火热专业</h5>
        <link rel='stylesheet' href='https://chinese-fonts-cdn.deno.dev/packages/maple-mono-cn/dist/MapleMono-CN-SemiBold/result.css' />
    <div class="container">
     <div class="text-container">
      <p>专业在全国排名第39位，档次为B++，是广东医科大学的核心专业之一‌1。该专业下设多个研究方向，包括生理学、生物化学与分子生物学、人体解剖与组织胚胎学等‌。</p>
      <link rel='stylesheet' href='https://chinese-fonts-cdn.deno.dev/packages/mksjh/dist/MaokenAssortedSans/result.css' /> 
     </div>
     <div class="image-container">
     <img src= https://pic1.imgdb.cn/item/67fc8bae88c538a9b5cfb252.jpg alt="Image" style="width: 300px; height: 500px;">
     </div>
    </div>

</div>
</template>
<script>
</script>
<style>
@import "https://chinese-fonts-cdn.deno.dev/packages/maple-mono-cn/dist/MapleMono-CN-SemiBold/result.css";
@import "https://chinese-fonts-cdn.deno.dev/packages/mksjh/dist/MaokenAssortedSans/result.css";

h5 {
    font-size: 90px;
    color: rgb(192, 14, 49);
  -webkit-box-reflect: below 0px linear-gradient(transparent, rgba(231, 10, 10, 0.2));
  font-family:'MaokenAssortedSans';
  font-weight:'700'
}
.container {
    display: flex;
    align-items: center;
    gap: 20px;
}
.text-container {
    flex: 1;
}
.image-container {
    flex: 0 0 auto;
}
.image-container img {
    max-width: 100%;
    height: auto;
}
p{
   font-family:'Maple Mono CN SemiBold';
   font-weight:'400';
    
}
</style>