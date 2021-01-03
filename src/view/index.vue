<template>
  <div class="index" id="index">
    <swiper class="m-b-20" :bannerList="bannerList"></swiper>

    <div class="buttons flex">
      <router-link class="item flex" :to="{path: '/studyList'}">
        <span class="f16 col-gray-3 m-r-20">学院介绍</span>
        <van-image width="37" height="37" fit="contain" :src="require('@/assets/icon_structure.png')"></van-image>
      </router-link>
      <router-link class="item flex" :to="{path: '/courseList'}">
        <span class="f16 col-gray-3 m-r-20">课程</span>
        <van-image width="37" height="37" fit="contain" :src="require('@/assets/icon_school_desc.png')"></van-image>
      </router-link>
    </div>

    <van-tabs type="card" class="m-b-10">
      <van-tab v-for="(item, index) in typeList" :key="index" :title="item"></van-tab>
    </van-tabs>
    <!-- 内容列表 -->
    <div class="container">
      <div class="see-more">
        <router-link class="col-theme" :to="'/courseList'">查看更多></router-link>
      </div>

      <div class="list">
        <template v-for="(item, index) in list">
          <div :key="index" @click="pushRouter({path: '/courseDetail', query: {id: item.id}})">
            <commonCover :info="item"></commonCover>
          </div>
        </template>
      </div>
    </div>

    <!-- 通知公告 -->
    <div class="notice-wrap">
      <div class="flex title">
        <span class="f16 font-bold">通知公告</span>
        <div class="see-more">
          <router-link class="col-theme" :to="'/newsList'">查看更多></router-link>
        </div>
      </div>

      <div class="item-new" v-for="item in newsList" :key="item.id" @click="pushRouter({path: '/newsDetails', query: {id: item.id}})">
        <cardNews :info="item"></cardNews>
      </div>
    </div>
    
    <!-- <commonCover :info="info"></commonCover> -->
    <CommonFt :active="0"></CommonFt>
  </div>
</template>

<script>
import swiper from '@/components/swiper'
import commonCover from '@/components/commonCover'
import cardNews from '@/components/cardNews'
import CommonFt from '@/components/commonFt'

export default {
  components: {
    swiper,
    cardNews,
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
      }],
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
