<template>
  <div class="index" id="index">
    <swiper class="m-b-20" :bannerList="bannerList"></swiper>
    <div class="tab"></div>
    <van-tabs type="card" class="m-b-10">
      <van-tab v-for="(item, index) in typeList" :key="index" :title="item"></van-tab>
    </van-tabs>
    <!-- 内容列表 -->
    <div class="container">
      <div class="see-more">
        <router-link class="col-theme" :to="'/studyList'">查看更多></router-link>
      </div>

      <div class="list">
        <template v-for="(item, index) in list">
          <commonCover :info="item" :key="index"></commonCover>
        </template>
      </div>
    </div>
    
    <!-- <commonCover :info="info"></commonCover> -->
    <CommonFt :active="0"></CommonFt>
  </div>
</template>

<script>
import swiper from '@/components/swiper'
import commonCover from '@/components/commonCover'
import CommonFt from '@/components/commonFt'

export default {
  components: {
    swiper,
    commonCover,
    CommonFt
  },

  data() {
    return {
      bannerList: [{
        id: 1,
        img: 'https://img.yzcdn.cn/vant/cat.jpeg',
        title: '标题',
        link: '/', //跳转地址
      }, {
        id: 2,
        img: 'https://img.yzcdn.cn/vant/cat.jpeg',
        title: '标题',
        link: '/', //跳转地址
      }],
      typeList: ['POPPING', 'BREKING', 'JAZZ', 'HIP-HOP', 'LOCKING', 'POPPING2'],
      list: [{
        id: 1,
        path: "https://img.yzcdn.cn/vant/cat.jpeg",
        desc: "这是一段1最多显示一行的文这是一段最多显示一行的文字，多余的内容会被省略",
        price: "132"
      },{
        id: 2,
        path: "https://img.yzcdn.cn/vant/cat.jpeg",
        desc: "这是一段1最多显示一行的文这是一段最多显示一行的文字，多余的内容会被省略",
        price: "132"
      }]
    };
  },

  methods: {
    
  }
};
</script>

<style lang="less" scoped>
  .container {
    padding: 0 16px;
  }
  .see-more {
    width: 100%;
    height: 24px;
    line-height: 24px;
    text-align: right;
  }
</style>
<style lang="less">
  #index {
    .van-tabs--card>.van-tabs__wrap {
      height: auto;
    }
    .van-tabs__nav--card {
      padding-left: 0;
      margin-left: 0;
      margin-right: 0;
      height: 45px;
      border: none;
      
      .van-tab {
        color: #333;
        border-right: 0;
        box-shadow: inset 0px 0 1px 1px rgba(0, 0, 0, 0.1)
      }

      .van-tab.van-tab--active {
        // box-shadow: none;
        color: #fff;
        background-color: #a0191f;
      }
    }
  }
</style>
