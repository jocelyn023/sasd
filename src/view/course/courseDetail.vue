<template>
  <div class="course-detail-page">
    <div class="course-video-block">
      <video
        src="https://vd2.bdstatic.com/mda-kk4vqsmdxiiw40bz/sc/cae_h264_clips/1604584081/mda-kk4vqsmdxiiw40bz.mp4?auth_key=1609512380-0-0-27f2f7ebc3c767201fbcf07a45e80dab&bcevod_channel=searchbox_feed&pd=1&pt=3&abtest="
        poster="https://tukuimg.bdstatic.com/processed/5c40d2171b9dec12be32c3f13b9dac31.jpg@s_2,w_681,h_381,q_100,f_webp">
      </video>
      <i class="icon_play"></i>

    </div>
    <div class="course-main-con">
      <p class="course-title">popping精品学习</p>
      <p class="course-num">共50课时</p>
      <p class="course-price">￥300</p>
    </div>
    <div class="line5"></div>
    <div class="course-tab-block">
      <van-tabs v-model="active">
        <van-tab title="课程详情">课程详情</van-tab>
        <van-tab title="课程目录">
          <template v-for="(item, index) in courseList">
            <cardCourse :key="index" :item="item"></cardCourse>
          </template>
        </van-tab>
      </van-tabs>
    </div>
    <div class="b-btn-box">
      <van-button v-if="type == 1" type="theme" class="btn" @click="buyCourse">去购买</van-button>
      <van-button v-else-if="type == 2" type="theme" class="btn">立即学习</van-button>
      <van-button v-else-if="type == 3" type="theme disabled" class="btn">参加考试</van-button>
      <van-button v-else-if="type == 4" type="theme" class="btn">参加考试</van-button>
      <van-button v-else-if="type == 5" type="theme" class="btn">查看成绩</van-button>
    </div>

  </div>
</template>

<script>
import cardCourse from "@/components/cardCourse";
export default {
  components: {
    cardCourse
  },
  data() {
    return {
      active: 1,
      type: 1,
      courseList: [
        {
          id: 1,
          img: "https://img.yzcdn.cn/vant/cat.jpeg",
          duration: "12:12",
          title: "hipop",
          status: 0 
        },
        {
          id: 2,
          duration: "12:10",
          img: "https://img.yzcdn.cn/vant/cat.jpeg",
          title: "hipop",
          status: 1 
        },
        {
          id: 2,
          duration: "12:10",
          img: "https://img.yzcdn.cn/vant/cat.jpeg",
          title: "hipop",
          status: 2
          },
        {
          id: 2,
          duration: "12:10",
          img: "https://img.yzcdn.cn/vant/cat.jpeg",
          title: "hipop",
          status: 3
        }
      ]
    };
  },

  methods: {
    buyCourse(){
      this.$router.push({
        path:"/courseBuy",
        query: {
          id:  this.$route.query.id
        }
      })
    }
  }
};
</script>

<style lang="less" scoped>
.course-detail-page {
  padding-bottom: 92px;
  .course-video-block {
    position: relative;
    height: 178px;
    overflow: hidden;

    video {
      width: 100%;
    }

    .icon_play {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 56px;
      height: 56px;
      background: url("../../assets/icon_play.png") no-repeat;
      background-size: 100% 100%;
    }
  }

  .course-main-con {
    padding: 0 16px;

    p {
      margin: 0;
      padding: 0;
    }

    .course-title {
      padding-top: 15px;
      padding-bottom: 8px;
      line-height: 16px;
      font-size: 15px;
      font-weight: 400;
      text-align: left;
    }

    .course-num {
      font-size: 11px;
      color: #999999;
      line-height: 24px;
    }

    .course-price {
      margin-top: 16px;
      font-size: 21px;
      color: #a0191f;
      line-height: 24px;
      padding-bottom: 12px;
    }
  }
  .card-course-wrap{
    &:last-child{
      border-bottom: 0;
    }
  }

  .line5 {
    height: 5px;
    background: #f0f0f0;
  }

  /deep/.course-tab-block {
    .van-tabs__line {
      border-radius: 0;
      width: 30px;
      height: 6px;
      background: #a0191f;
    }
  }
  .b-btn-box {
    text-align: center;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: 88px;
    padding: 19px 0;
    background: #fff;
    box-shadow: 0 -4px 13px #ebedf0;
    .btn {
      width: 225px;
      height: 48px;
      background: #a0191f;
      border-radius: 7px;
      font-size: 16px;
      &.disabled{
        background: #959595;
        border-color: #959595;
      }
    }
  }
}
</style>