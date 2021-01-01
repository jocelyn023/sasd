<template>
  <div class="index">
    <Swiper :bannerList="banner"></Swiper>
    <commonCover :info="info"></commonCover>
    <CommonFt :active="3"></CommonFt>

    <!-- 课程列表card -->
    <!-- <template v-for="(item, index) in courseList">
      <cardCourse :key="index" :item="item"></cardCourse>
    </template> -->

    <!-- 学习列表card -->
    <template v-for="(item, index) in studyList">
      <cardProgress :key="index" :item="item" @emitClick="handleClick"></cardProgress>
    </template>
  </div>
</template>

<script>
import commonCover from '@/components/commonCover'
import CommonFt from '@/components/commonFt'

import cardProgress from '@/components/cardProgress'
// import cardCourse from '@/components/cardCourse'
import Swiper from '@/components/swiper'
export default {
  components: {
    CommonFt,
    commonCover,
    // cardCourse,
    cardProgress,
    Swiper
  },

  data() {
    return {
      goods: {},
      //swiper图片
      banner: [{
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
      info: {
        path: "https://img.yzcdn.cn/vant/cat.jpeg",
        desc: "这是一段1最多显示一行的文这是一段最多显示一行的文字，多余的内容会被省略",
        price: "132"
      },
      courseList: [{
        id: 1,
        img: 'https://img.yzcdn.cn/vant/cat.jpeg',
        duration: '12:12',
        title: 'hipop',
        status: 0 //0不能试看， 1可以试看
      }, {
        id: 2,
        duration: '12:10',
        img: 'https://img.yzcdn.cn/vant/cat.jpeg',
        title: 'hipop',
        status: 1 //0不能试看， 1可以试看
      }],
      studyList: [{
        id: 1,
        img: 'https://img.yzcdn.cn/vant/cat.jpeg',
        title: 'popping精品学习课程学习呢再来几个字呢最多能多少',
        learned: 10,
        courseNum: 20,
        status: 0 //0学习中 1已结业
      }, {
        id: 2,
        img: 'https://img.yzcdn.cn/vant/cat.jpeg',
        title: 'popping精品学习课程学习呢2',
        learned: 20,
        courseNum: 20,
        status: 1 //0学习中 1已结业
      }]
    };
  },

  methods: {
    handleClick(val) {
      console.log(val)
    }
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
