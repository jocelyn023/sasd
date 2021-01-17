<template>
  <div class="examstep_3-page">
    <template v-if="status != 5">
      <template v-if="!offLine">
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
      </template>
      <template v-else>
        <div v-if="status == 2" class="exam-in-review">
          <div>
            <img src="../../assets/exam/icon_success.png" />
          </div>
          <p>视频提交审核中, 请耐心等待老师评分！</p>
        </div>
      </template>

      <div v-if="status == 3" class="result-table-block">
        <p>视频成绩合格，具体得分如下：</p>
        <!-- <p>视频成绩不合格，具体得分如下：</p> -->
        <div v-if="scoreType == 1" class="table-box flex txt-c">
          <div class="item">文化理论（20分）</div>
          <div class="item">10分</div>

          <div class="item">文化理论（20分）</div>
          <div class="item">10分</div>

          <div class="item">文化理论（20分）</div>
          <div class="item">10分</div>

          <div class="item">文化理论（20分）</div>
          <div class="item">10分</div>

          <div class="item">文化理论（20分）</div>
          <div class="item">10分</div>

          <div class="item">文化理论（20分）</div>
          <div class="item">10分</div>
        </div>
        <div v-if="scoreType == 2" class="table-box col-3-table flex txt-c">
          <div class="item w50">文化理论（20分）</div>
          <div class="item">10分</div>
          <div class="item green-color">合格</div>

          <div class="item w50">文化理论（20分）</div>
          <div class="item">10分</div>
          <div class="item green-color">合格</div>

          <div class="item w50">文化理论（20分）</div>
          <div class="item">10分</div>
          <div class="item green-color">合格</div>

          <div class="item w50">文化理论（20分）</div>
          <div class="item">10分</div>
          <div class="item green-color">合格</div>

          <div class="item w50">文化理论（20分）</div>
          <div class="item">10分</div>
          <div class="item green-color">合格</div>

          <div class="item w50">文化理论（20分）</div>
          <div class="item">10分</div>
          <div class="item red-color">不合格</div>
        </div>
      </div>
    </template>
    <template v-else>
      <div class="certificate-block">
        <h4 class="tc">加持证书说明</h4>
        <p>现参加CSDA考核，考核通过取得csda教练员证书后， 可以加持证书，四级证书可以加儿青会证书，三级证 书以上可加北体大证书与儿青会证书 </p>
        <div class="certificate-select">
          <p>选择加持其他证书：</p>
          <van-field name="checkboxGroup">
            <template #input>
              <van-checkbox-group v-model="checkboxGroup">
                <van-checkbox name="1" shape="square">北体大证书 <span class="red-color">+300</span>元</van-checkbox>
                <van-checkbox name="2" shape="square">儿青会证书 <span class="red-color"> +120</span>元</van-checkbox>
              </van-checkbox-group>
            </template>
          </van-field>
        </div>
      </div>

    </template>
    <div class="step-btn-group">
      <van-button v-if="status != 2 && status != 5" type="theme" plain class="btn" to="/examStep_2">上一步</van-button>
      <van-button v-if="status == 1" type="theme" class="btn">上传视频</van-button>
      <van-button v-if="status == 2" type="theme" class="btn mr15 disabled">上一步</van-button>
      <van-button v-if="status == 2 " type="theme" class="btn disabled">下一步</van-button>
      <van-button v-if="status == 3" type="theme" class="btn" to="/examStep_3">缴费补考</van-button>
      <!-- 免费补考 -->
      <!-- 重新报名该课程 -->
      <van-button v-if="status == 4" type="theme" class="btn" to="/examStep_4">下一步</van-button>
      <van-button v-if="status == 5" type="theme" plain class="btn mr15" to="/examStep_4">不换证,下一步</van-button>
      <van-button v-if="status == 5" type="theme" class="btn" to="/examStep_4">缴费换证</van-button>
    </div>
  </div>
</template>

<script>
  export default {

    data() {
      return {
        checkboxGroup: [],
        scoreType: 1,
        offLine: false, //线下
        status: 5, //1上传视频 2审核中3不合格4合格5加持证书
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

    .tc {
      text-align: center;
    }

    .certificate-block {
      h4 {
        font-size: 16px;
        color: #a0191f;
        line-height: 24px;
      }

      /deep/.van-checkbox__icon .van-icon {
        width: 20px;
        height: 20px;
        border: 0.02667rem solid rgba(160, 25, 31, 1);
        border-radius: 2px;
      }

      /deep/.van-checkbox__icon--checked .van-icon {
        background: rgba(160, 25, 31, 1);
      }

      /deep/ .van-checkbox__label {
        margin-left: 10px;
      }

      /deep/.van-checkbox {
        margin-bottom: 20px;
      }

      .certificate-select {
        margin-top: 30px;

      }

      .red-color {
        color: #a0191f;
      }
    }

    .result-table-block {
      p {
        font-size: 16px;
        margin: 16px 0;
      }

      .table-box {
        margin: 0 auto;
        width: 324px;
        border: 1px solid #000;
        border-bottom: none;
        flex-wrap: wrap;

        &.col-3-table {
          .item {
            width: 25%;
            height: 36px;
            line-height: 36px;
            border-bottom: 1px solid #000;
            border-right: 1px solid #000;
          }

          .w50 {
            width: 50%;
          }

          .item:nth-child(3n) {
            border-right: 0;
          }

          .green-color {
            color: #31ad37;
          }

          .red-color {
            color: #a0191f;
          }
        }

        .item {
          width: 50%;
          height: 36px;
          line-height: 36px;
          border-bottom: 1px solid #000;
        }

        .item:nth-child(odd) {
          border-right: 1px solid #000;
        }
      }
    }

    .exam-in-review {
      text-align: center;

      img {
        width: 99px;
        height: 99px;
        margin: 30px auto;
      }

      p {
        margin: 30px auto;
      }
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
        position: absolute;

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