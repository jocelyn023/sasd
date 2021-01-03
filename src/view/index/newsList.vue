<template>
  <div class="news-list">
      <div class="item-new" v-for="item in newsList" :key="item.id" @click="pushRouter({path: '/newsDetails', query: {id: item.id}})">
        <cardNews :info="item"></cardNews>
      </div>
  </div>
</template>

<script>
import cardNews from '@/components/cardNews'

export default {
  components: { cardNews },

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
  .news-list {
    margin: 0 auto;
    width: 100%;
    // box-shadow: 0 0 5px 5px rgba(0, 0, 0, 0.1);
    // border-radius: 5px;

    .title {
      padding-top: 14px;
      padding-left: 10px;
      padding-right: 10px;
      height: 42px;
    }

    .item-new {
      padding-left: 26px;
      padding-right: 26px;
      padding-bottom: 9px;
      width: 100%;
      border-bottom: 1px solid #ececec;
    }
    .item-new:last-child{
      border: none;
    }
  }
</style>