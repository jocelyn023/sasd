<template>
  <div class="examstep_3-page">
    <div>
      <h5 class="exam-requirements-title">请上传考试视频</h5>
      <p class="exam-requirements no-indent"><span>*</span>考评要求： </p>
      <p class="exam-requirements">1.横屏录制，无特效、无遮挡（带口罩的一律无成绩）</p>
      <p class="exam-requirements">2.五个片段，方向正确，不抢拍，不早进，完整。</p>
      <p class="exam-requirements">3.五个片段都是独立核算，（80分以上通过）。</p>
      <p class="exam-requirements">4.视频大小限制在30M</p>
    </div>
    <div v-for="n in 5" :key="n">
      <p>视频片段{{n}}：</p>
      <div class="video-upload-list">
        <div v-if="fileList[n-1]" class="video-box">
          <video :src="fileList[n-1].url" :poster="fileList[n-1].poster">
          </video>
          <i class="icon_play"></i>
        </div>
        <van-uploader v-else :after-read="afterRead">
        </van-uploader>
      </div>
    </div>
    <p v-if="status == 2" class="tc">
      <van-icon name="checked" color="#07c160" style="position: relative; top: 2px;" />
      提交成功, 请耐心等待老师评分！
    </p>
    <div class="step-btn-group">
      <van-button v-if="status != 2" type="theme" plain class="btn" to="/examStep_2">上一步</van-button>
      <van-button v-if="status == 1" type="theme" class="btn">上传视频</van-button>
      <van-button v-if="status == 2" type="theme" class="btn mr15 disabled">上一步</van-button>
      <van-button v-if="status == 2 " type="theme" class="btn disabled">下一步</van-button>
      <van-button v-if="status == 3" type="theme" class="btn" to="/examStep_4">下一步</van-button>
      <van-button v-if="status == 3" type="theme" class="btn" to="/examStep_3">缴费补考</van-button>
    </div>
  </div>
</template>

<script>
  export default {

    data() {
      return {
        status: 2, //1上传视频 2上传视频完成 3 审核中
        currentRate: 0,
        fileList: [{
          url: "",
          poster: "https://img.yzcdn.cn/vant/leaf.jpg"
        }]
      };
    },
    computed: {
      text() {
        return this.currentRate.toFixed(0) + '%';
      },
    },
    methods: {
      afterRead(file) {
        // 此时可以自行将文件上传至服务器
        console.log(file);
      },
    }
  };
</script>

<style lang="less" scoped>
  .examstep_3-page {
    padding: 0 15px 40px;
    .tc{
      text-align: center;
    }
    .exam-requirements-title {
      margin: 0;
      padding-bottom: 15px;
      font-size: 14px;
      color: #353434;
      text-align: center;
    }

    .exam-requirements {
      margin: 0;
      font-size: 12px;
      font-weight: 400;
      text-align: left;
      color: #999999;
      line-height: 18px;
      padding-left: 65px;

      &.no-indent {
        padding-left: 0;

        span {
          color: #a0191f;
        }
      }
    }

    .video-upload-list {
      padding-left: 67px;

      .video-box {
        position: relative;
        width: 91px;
        height: 74px;
      }

      .icon_play {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 23px;
        height: 23px;
        background: url("../../assets/icon_play.png") no-repeat;
        background-size: 100% 100%;
      }

      img,
      video {
        width: 91px;
        height: 74px;
      }
    }

    .step-btn-group {
      text-align: center;
      padding: 40px 0 0;

      .btn {
        width: 165px;
        height: 48px;
        border-radius: 5px 5px 5px 5px;

        &.disabled {
          background: #959595;
          border-color: #959595;
        }

        &.mr15 {
          margin-right: 15px;
        }

        &.van-button--plain {
          color: #000;
          margin-right: 15px;
        }
      }
    }
  }
</style>