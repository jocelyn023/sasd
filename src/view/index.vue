<template>
  <div class="index" id="index">
    <swiper class="m-b-20" :bannerList="bannerList"></swiper>

    <div class="buttons flex">
      <router-link class="item flex" :to="{path: '/studyList'}">
        <van-image class="img-box m-r-20" fit="contain" :src="require('@/assets/icon_structure.png')"></van-image>
        <span class="f16 col-green-31ad37">学院介绍</span>
      </router-link>
      <router-link class="item flex" :to="{path: '/courseList'}">
        <van-image class="img-box m-r-20" fit="contain" :src="require('@/assets/icon_school_desc.png')"></van-image>
        <span class="f16 col-yellow-fb9833">课程</span>
      </router-link>
    </div>

    <van-tabs type="card" class="m-b-10" v-model="danceActive" @change="changeTab">
      <van-tab v-for="(item, index) in typeList" :key="index" :title="item"></van-tab>
    </van-tabs>
    
    <!-- 内容列表 -->
    <div class="container">
      <div class="see-more">
        <router-link class="col-theme" :to="'/courseList'">查看更多></router-link>
      </div>

      <div class="list">
        <template v-for="(item, index) in courseList">
          <div :key="index" @click="pushRouter({path: '/courseDetail', query: {id: item.id}})">
            <commonCover :info="item"></commonCover>
          </div>
        </template>
      </div>
    </div>
    
    <!-- 通知公告 -->
    <template v-if="noticeList && noticeList.length">
      <template v-for="(item, index) in noticeList">
        <div class="notice-wrap" :key="index">
          <div class="flex title">
            <span class="f16 font-bold">{{ item.typeName }}</span>
            <div class="see-more">
              <router-link class="col-theme" :to="{path: '/newsList', query: {navName: item.typeName, articleType: item.id}}">查看更多></router-link>
            </div>
          </div>

          <div class="item-new" v-for="item2 in item.articles" :key="item2.id" @click="pushRouter({path: '/newsDetails', query: {id: item2.id}})">
            <cardNews :info="item2"></cardNews>
          </div>
        </div>
      </template>
    </template>
    <CommonFt :active="0"></CommonFt>
  </div>
</template>

<script>
import { getBanner, getIndexNews, getIndexCourseList } from '@/api/index'
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
      bannerList: [],
      noticeList: [],
      danceActive: 0,
      danceType: 'POPPING',
      courseList: [],
      typeList: ['POPPING', 'BREKING', 'JAZZ', 'HIP-HOP', 'LOCKING', 'POPPING2']
    };
  },
  created () {
    this.getBanner()
    this.getIndexNews()
    this.getIndexCourseList()
  },
  methods: {
    pushRouter(path) {
      this.$router.push(path)
    },
    changeTab(val) {
      this.danceType = this.typeList[val]
      this.getIndexCourseList ()
    },
    getIndexCourseList () {
      getIndexCourseList({'danceType': this.danceType}).then(res => {
        this.courseList = res.data;
      })
    },
    getBanner () {
      getBanner({ 'position': "index" }).then(res => {
        this.bannerList = res.data;
      })
    },
    getIndexNews () {
      getIndexNews().then(res => {
        this.noticeList = res.data;
      })
    }
  }
};
</script>

<style lang="less" scoped>
  .col-yellow-fb9833 {
    color: #fb9833
  }
  .col-green-31ad37 {
    color: #31ad37
  }
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

    .img-box {
      width: 37px;
      height: 37px;
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
    margin: 0 auto 20px;
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
