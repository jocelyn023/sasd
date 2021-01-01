<template>
  <div class="index">
    <commonCover :info="info"></commonCover>
    <CommonFt :active="3"></CommonFt>
  </div>
</template>

<script>
import commonCover from '@/components/commonCover'
import CommonFt from '@/components/commonFt'
export default {
  components: { CommonFt,commonCover },

  data() {
    return {
      goods: {},
      info: {
        path: "https://img.yzcdn.cn/vant/cat.jpeg",
        desc: "这是一段1最多显示一行的文这是一段最多显示一行的文字，多余的内容会被省略",
        price: "132"
      }
    };
  },

  methods: {
    
  }
};
</script>

<style lang="less">
  .test {
    width: 750px;
    height: 750px;
    background: #333
  }
</style>
