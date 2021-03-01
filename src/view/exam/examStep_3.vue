<template>
  <div class="examstep_3-page" v-if="examInfo.purchaseId">
    <template v-if="status != 5">
      <template v-if="examInfo.teachingType == 'ON'">
        <div>
          <h5 class="exam-requirements-title">请上传考试视频</h5>
          <p class="exam-requirements no-indent"><span>*</span>考评要求： </p>
          <template v-if="examInfo.dancyLevel == 'lv4'">
            <p class="exam-requirements">1.横屏录制，无特效、无遮挡（带口罩的一律无成绩）</p>
            <p class="exam-requirements">2.五个片段，方向正确，不抢拍，不早进，完整。</p>
            <p class="exam-requirements">3.五个片段都是独立核算，（80分以上通过）。</p>
            <p class="exam-requirements">4.视频大小限制在30M</p>
            <div v-for="(v,index) in videoObj.lv4" :key="index">
              <p>{{v.text}}：</p>
              <div class="video-upload-list">
                <div v-if="examInfo[v.key]" class="video-box" @click="playVideo(index,examInfo[v.key],'lv4')">
                  <video :poster="examInfo[v.key]+'?vframe/jpg/offset/5'" :id="'J_video_'+index" :src="examInfo[v.key]" class="video-js"></video>
                  <!-- <video  :src="examInfo[v.key]" :ref="'J_video_'+index"></video> -->
                  <i v-if="!v.isPlay" class="icon_play" @pause="pauseVideo(index,'lv4')"></i>
                </div>
                <upload v-if="examInfo.status != 'OVER_EXAM'" @success="url=>getVideoPath(url,v.key)"></upload>
              </div>
            </div>
          </template>
          <template v-else>
            <p class="exam-requirements"> 1.ROUTINE(完成度/片段错误（或失误）/乐感）</p>
            <p class="exam-requirements">2.SOLO时长不低于60秒(元素展示（含元素变化）/ 技巧/乐感或者变形2-3个）</p>
            <p class="exam-requirements"> 3.教学讲解时长3分钟内（正确示范、节拍清晰、互 动、气氛）</p>
            <p class="exam-requirements"> 4.视频大小限制在30M</p>
            <div v-for="(v,index) in videoObj.other" :key="index">
              <p>{{v.text}}：</p>
              <div class="video-upload-list">
                <div v-if="examInfo[v.key]" class="video-box" @click="playVideo(index,examInfo[v.key],'other')">
                  <!-- <video :src="examInfo[v.key]" :ref="'J_video_'+index" @pause="pauseVideo(index,'other')"></video> -->
                  <video :poster="examInfo[v.key]+'?vframe/jpg/offset/5'" :id="'J_video_'+index" :src="examInfo[v.key]" class="video-js"></video>
                  <i v-if="!v.isPlay" class="icon_play"></i>
                </div>
                <upload v-if="examInfo.status != 'OVER_EXAM'" @success="url=>getVideoPath(url,v.key)"></upload>
              </div>
            </div>
          </template>
        </div>

        <p v-if="examInfo.status == 'OVER_EXAM'" class="tc">
          <van-icon name="checked" color="#07c160" style="position: relative; top: 2px;" />
          提交成功, 请耐心等待老师评分！
        </p>
      </template>
      <template v-else>
        <div class="exam-in-review">
          <div>
            <img src="../../assets/exam/icon_success.png" />
          </div>
          <p>视频提交审核中, 请耐心等待老师评分！</p>
        </div>
      </template>

      <div v-if="examInfo.status == 'PASS' || examInfo.status == 'NO_PASS'" class="result-table-block">
        <p v-if="examInfo.status == 'PASS'">视频成绩合格，具体得分如下：</p>
        <p v-else>视频成绩不合格，具体得分如下：</p>
        <div class="table-box col-3-table flex txt-c">
          <div class="item w50">文化理论（20分）</div>
          <div class="item">{{examInfo.writtenExamScore}}分</div>
          <div class="item green-color">合格</div>
          <template v-if="examInfo.dancyLevel == 'lv4'">
            <template v-for="(v,index) in videoObj.lv4">
              <div :key="index+'score'" class="item w50">{{v.text}}</div>
              <div :key="index+'score'" class="item">{{examInfo[v.key+'Score']}}分</div>
              <div v-if="examInfo[v.key+'Status'] == 1" :key="index+'score'" class="item green-color">合格</div>
              <div v-else :key="index+'score'" class="item red-color">不合格</div>
            </template>
          </template>
          <template v-else>
            <template v-for="(v,index) in videoObj.other">
              <div :key="index+'score1'" class="item w50">{{v.text}}（{{v.score}}） {{examInfo['vedioStatus'+v.key]}}
              </div>
              <div :key="index+'scor12'" class="item">{{examInfo['vedioScore'+ v.sKey]}}分</div>
              <div v-if="examInfo['vedioStatus'+v.sKey] == 1" :key="index+'score'" class="item green-color">合格</div>
              <div v-else :key="index+'scor13'" class="item red-color">不合格</div>
            </template>
          </template>
          <div class="item w50">总得分</div>
          <div class="item">{{examInfo.vedioScoreTotal}}分</div>
          <div class="item green-color" v-if="examInfo.finalStatus == 1">合格</div>
          <div class="item red-color" v-else>不合格</div>

          <div class="item w50">最终结果</div>
          <div class="item">{{examInfo.finalScore}}分</div>
          <div class="item green-color" v-if="examInfo.finalStatus == 1">合格</div>
          <div class="item red-color" v-else>不合格</div>
        </div>
      </div>
    </template>
    <template v-else>
      <div class="certificate-block">
        <h4 class="tc">加持证书说明</h4>
        <p>现参加CSDA考核，考核通过取得csda教练员证书后， 可以加持证书，四级证书可以加儿青会证书，三级证书以上可加北体大证书与儿青会证书 </p>
        <div class="certificate-select">
          <p>选择加持其他证书：</p>
          <van-field name="checkboxGroup">
            <template #input>
              <van-checkbox-group v-model="checkboxGroup">
                <van-checkbox v-if="examInfo.dancyLevel == 'lv3'" name="ifBtd" shape="square">北体大证书 <span
                    class="red-color">+300</span>元</van-checkbox>
                <van-checkbox name="ifEqh" shape="square">儿青会证书 <span class="red-color"> +120</span>元</van-checkbox>
              </van-checkbox-group>
            </template>
          </van-field>
        </div>
      </div>
    </template>
    <div class="step-btn-group">
      <template v-if="status == 5">
        <van-button v-if="status == 5" type="theme" plain class="btn mr15" @click="changeCertificate(1)">不换证,下一步
        </van-button>
        <van-button v-if="status == 5" type="theme" class="btn" @click="changeCertificate(2)">缴费换证</van-button>
      </template>
      <template v-else-if="examInfo.status == 'OVER_EXAM'">
        <van-button type="theme" class="btn mr15 disabled">上一步</van-button>
        <van-button type="theme" class="btn disabled">下一步</van-button>
      </template>
      <template v-else-if="examInfo.status == 'PASS'">
        <van-button type="theme" plain class="btn" @click="nextStep(2)">上一步</van-button>
        <van-button type="theme" class="btn" @click="status = 5">下一步</van-button>
      </template>
      <template v-else-if="examInfo.status == 'NO_PASS'">
        <van-button type="theme" plain class="btn" @click="backCourse">返回课程</van-button>
        <van-button v-if="examInfo.mkExamStatus == 1" type="theme" class="btn" @click="makeUpFree">免费补考</van-button>
        <van-button v-else-if="examInfo.mkExamStatus == 2" type="theme" class="btn" @click="makeUpPay">缴费补考</van-button>
        <van-button v-else-if="examInfo.mkExamStatus == 3" type="theme" class="btn" @click="rePurchase">重新报名该课程
        </van-button>
      </template>
      <template v-else>
        <van-button type="theme" plain class="btn" @click="nextStep(2)">上一步</van-button>
        <van-button type="theme" class="btn" @click="saveVideo">上传视频</van-button>
      </template>
    </div>
  </div>
</template>

<script>
  import examMixin from "@/mixins/exam";
  import upload from "@/components/uploadVideo";
  import {
    Toast
  } from 'vant';
  import {
    saveVideo,
    changeNoSave,
    changeSave,
    makeUpFree,
    getCourseMakeupExamOrder,
    getCertificateAddPayOrder
  } from '@/api/exam'
  import {
    wxPay
  } from '@/api/common'
  export default {
    mixins: [examMixin],
    components: {
      upload
    },

    data() {
      return {
        //dancyLevel lv4 
        //teachingType： NO 线上 UNDER线下
        // OVER_EXAM 审核中
        checkboxGroup: [],
        scoreType: 1,
        offLine: false, //线下
        status: 1, //1上传视频 2审核中 3不合格4合格5加持证书
        currentRate: 0,
        videoObj: {
          lv4: [{
            key: "vedio1",
            text: "视频片段1"
          }, {
            key: "vedio2",
            text: "视频片段2"
          }, {
            key: "vedio3",
            text: "视频片段3"
          }, {
            key: "vedio4",
            text: "视频片段4"
          }, {
            key: "vedio5",
            text: "视频片段5"
          }],
          other: [{
            key: "vedioJx",
            text: "ROUTINE",
            sKey: "Jx",
            score: "20分"
          }, {
            key: "vedioSolo",
            text: "SOLO",
            sKey: "Solo",
            score: "20分"
          }, {
            key: "vedioRontiue",
            text: "教学讲解",
            sKey: "Rontiue",
            score: "20分"
          }]
        },
        player: null,
        videoOptions: {
          preload: "metadata",
          autoplay: false, //自动播放
          controls: false, //用户可以与之交互的控件
          loop: false, //视频一结束就重新开始
          muted: false, //默认情况下将使所有音频静音
          aspectRatio: "16:9", //显示比率
          fullscreen: {
            options: {
              navigationUI: "hide"
            }
          },
          sources: []
        },
      };
    },
    created() {
      this.getExamInfo(1);
      this.videoObj.lv4.forEach(item => {
        item.isPlay = false
      })
      this.videoObj.other.forEach(item => {
        item.isPlay = false
      })
    },
    methods: {
      initPlayer() {

      },
      playVideo(index, src, key) {
        let _this = this;
        this.$nextTick(() => {
          if (this.videoObj[key][index].isPlay) {
            this.videoObj[key][index].isPlay = false
            _this.player.pause()

          } else {
            this.videoObj[key].forEach((item, vIndex) => {
              if (vIndex == index) {
                item.isPlay = true
                _this.player = _this.$video(
                  "J_video_" + index,
                  _this.videoOptions,
                  function onPlayerReady() {
                    console.log("onPlayerReady", this);
                    this.src(src);
                    this.load();
                    this.play();
                  }
                );
              } else {
                item.isPlay = false
                _this.player.pause()
              }
            });
          }
          this.$forceUpdate()
        })
      },
      pauseVideo(index, key) {
        this.videoObj[key][index].isPlay = false
        this.player.pause()
        this.$forceUpdate()
      },
      saveVideo() {
        let params = {};
        if (this.examInfo.dancyLevel == 'lv4') {
          params = {
            id: this.examInfo.id,
            vedio1: this.examInfo.vedio1,
            vedio2: this.examInfo.vedio2,
            vedio3: this.examInfo.vedio3,
            vedio4: this.examInfo.vedio4,
            vedio5: this.examInfo.vedio5,
          }
        } else {
          params = {
            id: this.examInfo.id,
            vedioJx: this.examInfo.vedioJx,
            vedioSolo: this.examInfo.vedioSolo,
            vedioRontiue: this.examInfo.vedioRontiue,
          }
        }
        let required = true;
        for (let key in params) {
          if (!params[key]) {
            required = false
          }
        }
        if (required) {
          saveVideo(params).then(res => {
            console.log("上传视频")
            this.examInfo.status = 'OVER_EXAM'
          })
        } else {
          Toast('请上传全部视频');
        }
      },
      getVideoPath(url, key) {
        this.examInfo[key] = url
        console.log(url, key)
      },
      makeUpFree() {
        makeUpFree({
          purchaseId: this.purchaseId
        }).then(res => {
          this.getExamInfo();
        })
      },

      makeUpPay() {
        //TODO 缴费补考
        let _this = this
        getCourseMakeupExamOrder(this.purchaseId).then(res => {
          if (res.code == 200) {
            this.payId = res.data
          }
        }).then(() => {
          wxPay(_this.payId).then(ret => {
            let data = ret.data
            let params = {
              appId: data.appId,
              timeStamp: data
                .timeStamp,
              nonceStr: data.nonceStr,
              package: data.packageValue,
              signType: data.signType,
              paySign: data.paySign
            }
            _this.wxPayFn(params, 1)
          })
        })
      },
      wxPayFn(params, type) {
        let _this = this
        WeixinJSBridge.invoke('getBrandWCPayRequest', params, function (res) {
          if (res.err_msg == "get_brand_wcpay_request:ok") {
            if (type == 2) {
              _this.nextStep(4);
            } else {
              _this.getExamInfo();
            }
          }
        })
      },
      getCertificateAddPayOrder() {
        let _this = this
        getCertificateAddPayOrder(this.purchaseId).then(res => {
          if (res.code == 200) {
            this.payId = res.data
          }
        }).then(() => {
          wxPay(_this.payId).then(ret => {
            let data = ret.data
            let params = {
              appId: data.appId,
              timeStamp: data
                .timeStamp,
              nonceStr: data.nonceStr,
              package: data.packageValue,
              signType: data.signType,
              paySign: data.paySign
            }
            _this.wxPayFn(params, 2)
          })
        })
      },
      changeCertificate(type) {
        //1 不换 2 换
        let params = {
          id: this.examInfo.id,
          ifChange: 0 // 0:不换证,1：换证
        }
        if (type == 1) {
          params.ifChange = 0;
          changeNoSave(params).then(res => {
            this.nextStep(4)
          })
        } else {
          if (this.checkboxGroup.length > 0) {
            params.ifChange = 1;
            this.checkboxGroup.forEach(key => {
              params[key] = 1;
            })
            changeSave(params).then(res => {
              this.getCertificateAddPayOrder(2);
            })
          } else {
            Toast('请选择要加持的证书');
          }
        }
      },
      backCourse() {
        this.$router.push({
          path: "/courseDetail",
          query: {
            id: this.examInfo.courseId,
          }
        })
      },
      rePurchase() {
        this.$router.push({
          path: "/courseDetail",
          query: {
            id: this.examInfo.courseId,
            rePurchase: 1
          }
        })
      }
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
        width: 131.5px;
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
        width: 131.5px;
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
          background-color: #fff;
        }
      }
    }
  }
</style>