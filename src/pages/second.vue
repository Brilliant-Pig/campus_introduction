<template>
  <div class="background-container">
  <div class="first">
    <link rel='stylesheet' href='https://chinese-fonts-cdn.deno.dev/packages/maple-mono-cn/dist/MapleMono-CN-SemiBold/result.css' />
    <p v-html="boldNumbers(message1)"></p >
    <p v-html="boldNumbers(message2)"></p >
    <p v-html="boldNumbers(message3)"></p >
    <p v-html="boldNumbers(message4)"></p >
    <p v-html="boldNumbers(message5)"></p >
    <p v-html="boldNumbers(message6)"></p > 
    <p v-html="boldNumbers(message7)"></p >
    <p v-html="boldNumbers(message8)"></p >
    <p v-html="boldNumbers(message9)"></p >
    <p v-html="boldNumbers(message10)"></p >
    <p v-html="boldNumbers(message11)"></p >
    <p v-html="boldNumbers(message12)"></p >
    <p v-html="boldNumbers(message13)"></p >
    <p v-html="boldNumbers(message14)"></p >
    <p v-html="boldNumbers(message15)"></p >
    <p v-html="boldNumbers(message16)"></p >
    <link rel='stylesheet' href='https://chinese-fonts-cdn.deno.dev/packages/mksjh/dist/MaokenAssortedSans/result.css' /> 
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
        message1: '教师规模与结构:',
        message2: '广东医科大学共有教职工1910人，其中专任教师1411人，包括博士生手价29人和硕士生导师日9人，这一规蝶行广平省内画群太学中处于顿先地位，为导秩的教学和科研提供了坚实的人才基础',
        message3: '高层次人才包括：',
        message4:'‌享受国务院政府特殊津贴专家‌15人',
        message5:'‌全国模范教师、优秀教师、师德先进个人‌等荣誉称号获得者10人',
        message6:'广东省高层次人才：特聘教授、特聘研究员、特聘讲师等各类人才共计‌50人',
        message7:'千百十人才培养工程”省级培养对象‌14人',
        message8:'“扬帆计划”高层次人才‌16 人',
        message9:'科研与教学成果‌',
        message10:'师资队伍在科研和教学方面取得了显著成就：',
        message11:'熊兴东教授‌作为基础医学院副院长，是广东省扬帆计划高层次人才和南粤优秀教师，主持多项国家级和省级科研项目，累计科研经费达1260万元，发表SCI论文36篇，并获得多项荣誉称号。',
        message12:'学校教师团队在衰老与抗衰老、血管衰老与动脉粥样硬化等领域的研究处于国内领先水平',
        message13:'科研机构:',
        message14:'国家级科研平台7个：国家慢性病防治重点实验室，粤港澳大湾区分子诊断中心等',
        message15:'省级科研平台‌4个:广东省粤西地区医联体临床医疗大数据云服务协同创新工程技术研究中心,广东省医学分子诊断协同创新发展中‌心,广东省医学分子诊断重点实验室,广东省数智健康医疗工程技术研究中心‌',
        message16:'多个实验室:包括广东省重点实验室、工程技术研究中心和新型研发机构共9个，市厅级重点实验室30个‌‌',
    };
  },
  methods: {
    boldNumbers(text) {
      // 使用正则表达式匹配所有数字，并用<strong>标签包裹
      return text.replace(/\d+/g, '<strong>$&</strong>');
    }
  }
};
</script>

<style >
@import "https://chinese-fonts-cdn.deno.dev/packages/maple-mono-cn/dist/MapleMono-CN-SemiBold/result.css";
@import "https://chinese-fonts-cdn.deno.dev/packages/mksjh/dist/MaokenAssortedSans/result.css";

p{
  font-size: 30px; 
  text-align: left;
  font-family:'Maple Mono CN SemiBold';
  font-weight:'400'
}


h5{
  font-size: 100px;
  text-align: center;
  transform: skew(0deg, 16deg);
  font-family:'MaokenAssortedSans';
  font-weight:'500'
}


.background-container {
  background: url('../assets/微信图片_20250412010538.jpg') no-repeat center center;
  background-size: cover;
  min-height: 100vh; 
  padding: 20px;
}

strong {
  color: #ff5722; 
}
</style>
