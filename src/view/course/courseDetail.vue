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
        <van-tab title="课程目录">课程目录</van-tab>
      </van-tabs>
    </div>

  </div>
</template>

<script>
  export default {
    data() {
      return {
        active: 0,
      };
    },

    methods: {
      onSearch(val) {
        console.log(val);
      },
      onCancel() {
        console.log("取消");
      }
    }
  };
</script>

<style lang="less" scoped>
  .course-detail-page {
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
  }
</style>