<template>
  <div class="new-detail">
  </div>
</template>

<script>
export default {
  components: {},

  data() {
    return {
      newsList: [{
        id: 1,
        link: '/studyList',
        imgs: ["https://img.yzcdn.cn/vant/cat.jpeg"],
        title: "这是一段1最多显示一行的文这是一段最多显示一行的文字，多余的内容会被省略",
        times: "2021-01-01",
        author: '云南合作单位'
      },{
        id: 2,
        link: '/studyList',
        imgs: ["https://img.yzcdn.cn/vant/cat.jpeg", "https://img.yzcdn.cn/vant/cat.jpeg", "https://img.yzcdn.cn/vant/cat.jpeg"],
        title: "这是一段1最多显示一行的文这是一段最多显示一行的文字，多余的内容会被省略",
        times: "2021-01-01",
        author: '云南合作单位'
      }]
    };
  },

  methods: {
    pushRouter(path) {
      this.$router.push(path)
    }
  }
};
</script>

<style lang="less" scoped>
  .buttons {
    margin: 0 auto 20px;
    width: 343px;
    height: 75px;
    background: #fff;
    border-radius: 5px;
    box-shadow: 0 0 5px 5px rgba(0, 0, 0, 0.1);

    .item {
      width: 50%;
      height: 100%;
      justify-content: center;
    }
    .item:first-child {
      border-right: 1px solid #c9c9c9;
    }
  }
  .container {
    padding: 0 16px;
  }
  .see-more {
    // width: 100%;
    height: 24px;
    line-height: 24px;
    text-align: right;
  }

  .notice-wrap {
    margin: 0 auto;
    width: 343px;
    box-shadow: 0 0 5px 5px rgba(0, 0, 0, 0.1);
    border-radius: 5px;

    .title {
      padding-top: 14px;
      padding-left: 10px;
      padding-right: 10px;
      height: 42px;
    }

    .item-new {
      padding-left: 10px;
      padding-right: 10px;
      padding-bottom: 9px;
      width: 100%;
      border-bottom: 1px solid #ececec;
    }
    .item-new:last-child{
      border: none;
    }
  }
</style>
