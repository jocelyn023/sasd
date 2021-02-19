<template>
  <div class="course-detail-page">
    <div class="course-video-block" @click="handleClickPlay(-1)">
      <p class="online-status green_bg">
        <span>{{courseInfo.teachingTypeValue}}</span>
      </p>
      <video ref="j_video" :poster="courseInfo.thumbnail" @play="handelPalyVideo" @pause="handlePause()"
        class="video-js"></video>
      <!-- <video ref="j_video" @play="handelPalyVideo" :poster="courseInfo.thumbnail"
        @pause="handlePause()" type="video/mp4"></video> -->
      <i v-if="!isPlay" class="icon_play" @click.stop="handleClickPlay(-1)"></i>
    </div>
    <div class="course-main-con">
      <p class="course-title">{{courseInfo.name}}</p>
      <p class="course-num">舞种: {{courseInfo.dancyTypeValue}} <span
          class="level">等级：{{courseInfo.dancyLevelValue}}</span></p>
      <p v-if="courseInfo.teachingType !='ON'" class="course-num">举办地区: {{courseInfo.cityNamePath}}</p>
      <p class="course-num">课程方式: {{courseInfo.teachingTypeValue}}课程</p>
      <p class="course-num">课程结束时间: {{courseInfo.endDate}}</p>
      <p class="course-num">共{{courseInfo.courseLength}}课时</p>
      <p class="course-price">￥{{courseInfo.price}}</p>
    </div>
    <div class="line5"></div>
    <div class="course-tab-block">
      <van-tabs v-model="active">
        <van-tab title="课程详情">
          <div class="tab-course-info">
            <div v-html="courseInfo.intro"></div>
          </div>
        </van-tab>
        <van-tab title="课程目录">
          <template v-for="(item, index) in courseCatalogList">
            <cardCourse @handleClick="handleClick" :key="index" :item="item"></cardCourse>
          </template>
        </van-tab>
      </van-tabs>
    </div>
    <div class="b-btn-box">
      <van-button v-if="status == 1" type="theme" class="btn" @click="buyCourse()">去购买</van-button>
      <van-button v-else-if="status == 2" type="theme disabled" class="btn">参加考试</van-button>
      <van-button v-else-if="status == 3" type="theme" class="btn" @click="toExam()">参加考试</van-button>
      <van-button v-else-if="status == 4" type="theme" class="btn" @click="viewScore()">查看成绩</van-button>
    </div>
  </div>
</template>

<script>
  import {
    getCourseDetailInfo,
    getCourseCatalogList,
    getVedioAddress,
    catalog,
    saveCatalog,
    finishCatalog
  } from "@/api/course";
  import {
    setCookie,
    getCookie
  } from '@/utils/utils'
  import {
    toExam
  } from "@/api/exam";
  import {
    Toast
  } from 'vant';
  import cardCourse from "@/components/cardCourse";
  import examMixin from "@/mixins/exam";
  import videojs from "video.js";
  export default {
    mixins: [examMixin],
    components: {
      cardCourse
    },
    data() {
      return {
        player: null,
        videoOptions: {
          autoplay: true, //自动播放
          controls: true, //用户可以与之交互的控件
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
        purchaseId: -1,
        activeVideoIndex: -1,
        active: 1,
        type: this.$route.query.type,
        videoPath: "",
        isPlay: false,
        isBuy: false,
        courseInfo: {},
        courseCatalogList: [],
        curVideoItem: {},
        lastPlaySecond: 0,
        status: 1, // 1 去购买 2 已购买/未学完 参加考试置灰 3参加考试 4 查看成绩
      };
    },
    mounted() {
      this.getCourseDetailInfo();
    },

    methods: {
      changeStatus() {
        let s = 1;
        if (this.$route.query.rePurchase == 1) {
          this.status = s;
          return;
        }

        let coursePInfo = this.courseInfo.coursePurchaseInfo;
        if (coursePInfo) {
          let buyStatus = coursePInfo.status;
          switch (buyStatus) {
            case "PAYING":
              s = 1
              break;
            case "PAYED":
              if (coursePInfo.learnStatus == "LEARNED") {
                s = 3
              } else {
                s = 2
              }
              break;
            case "PASS":
              s = 4
              break;
            case "EDIT_ADDR":
              s = 4
              break;
            case "EDIT_INFO":
              s = 4
              break;
            case "FINISH":
              s = 4
              break;
            default:
              s = 3
          }
        }
        this.status = s;
      },
      toExam(type) {
        toExam({
          purchaseId: this.purchaseId
        }).then(res => {
          setCookie("purchaseId", this.purchaseId);
          setCookie("__step", "", -1);
          this.getStep();
        });
      },
      viewScore() {
        setCookie("purchaseId", this.purchaseId);
        setCookie("__step", "", -1);
        this.getStep();
      },
      finishCatalog(curD, d) {
        if (this.isBuy) {
          let params = {
            id: this.curVideoItem.id,
            lastPlaySecond: curD
          }
          if (d == curD) {
            finishCatalog(params).then(res => {
              this.getCourseDetailInfo()
            })
          } else {
            saveCatalog(params).then(res => {
              this.getCourseDetailInfo()
            })
          }
        }
      },
      catalog(item) {
        if (this.isBuy) {
          catalog({
            purchaseId: this.purchaseId,
            courseCatalogId: item.id
          }).then(res => {
            this.curVideoItem = res.data;
          })
        }
      },
      getVedioAddress(id) {
        let _this = this;
        getVedioAddress({
          vedioId: id
        }).then(res => {
          if (res.code == 200) {
            this.videoPath = res.data;
            //let video = this.$refs.j_video;
            //video.src = res.data;

            if (_this.player) {
              _this.player.src(_this.videoPath);
              if (_this.curVideoItem.learnStatus != "LEARNED") {
                _this.player.currentTime(_this.lastPlaySecond ? _this.lastPlaySecond : 0)
              }
              _this.player.load();
              _this.player.play();
              _this.isPlay = true;
            } else {
              _this.player = _this.$video(
                _this.$refs.j_video,
                _this.videoOptions,
                function onPlayerReady() {
                  console.log("onPlayerReady", this);
                  this.src(_this.videoPath);
                  this.load();
                  this.play();
                  if (_this.curVideoItem.learnStatus != "LEARNED") {
                    this.currentTime(_this.lastPlaySecond ? _this.lastPlaySecond : 0)
                    _this.isPlay = true;
                  }
                  this.on('timeupdate', function () {
                    var timeDisplay;
                    var duration;
                    timeDisplay = Math.floor(this.currentTime());
                    duration = Math.floor(this.duration());
                    _this.pauseVideo(timeDisplay, 1)

                  })
                }
              );
            }

            // setTimeout(() => {
            //   if (_this.curVideoItem.learnStatus != "LEARNED") {
            //     video.currentTime = _this.lastPlaySecond ? _this.lastPlaySecond : 0
            //   }
            //   console.log("video:"+ video,"lastPlaySecond:"+_this.lastPlaySecond, _this.curVideoItem);
            //   video.play();
            //   video.addEventListener("timeupdate", () => {
            //     var timeDisplay;
            //     var duration;
            //     timeDisplay = Math.floor(video.currentTime);
            //     duration = Math.floor(video.duration);
            //     _this.pauseVideo(timeDisplay, 1)
            //   }, false);
            //   _this.isPlay = true;
            // }, 150);
          } else {
            console.log(res.returnMsg);
          }
        });
      },
      videoPlay() {

      },
      handlePause() {
        console.log("handlePause")
        this.isPlay = false;
        //let video = this.$refs.j_video;
        var timeDisplay;
        var duration;
        timeDisplay = Math.floor(this.player.currentTime());
        duration = Math.floor(this.player.duration());
        this.finishCatalog(timeDisplay, duration);
      },
      handelPalyVideo() {
        console.log("handelPalyVideo")
        if (!this.isBuy) {
          if (this.player.currentTime() >= this.activeVideoIndex) {
            this.player.pause();
            this.isPlay = false;
          }
        } else {
          this.isPlay = true;
          if (this.curVideoItem.learnStatus != "LEARNED") {
            this.player.currentTime(this.curVideoItem.lastPlaySecond);
          }

        }
      },
      pauseVideo(timeDisplay, type) {
        console.log("pauseVideo")
        if (!this.isBuy) {
          if (timeDisplay >= this.activeVideoIndex) {
            this.player.pause();
            this.isPlay = false;
            Toast("试看时间已到");
          } else {
            this.playVideo(type);
          }
        } else {
          this.playVideo(type);
        }
      },
      playVideo(type) {
        console.log("playVideo")
        if (type != 1) {
          this.player.play();
          this.isPlay = true;
        }
      },
      handleClick(item) {
        console.log("handleClick")
        if (item.ifTry == 1 || this.isBuy) {
          this.handleClickPlay(item)
        }
        // if ((!this.isBuy && item.ifTry == 1) || (this.isBuy && item.learnStatus != "LEARNED") ) {
        //   this.handleClickPlay(item)
        // }
      },

      handleClickPlay(item) {
        console.log("handleClickPlay")
        if (item == -1) {
          if (this.isPlay) {
            this.player.pause();
            this.isPlay = false;
          } else {
            if (this.activeVideoIndex == -1) {
              if (this.courseCatalogList.length > 0) {
                let list = this.courseCatalogList
                if (!this.isBuy) {
                  list = this.courseCatalogList.filter(item => {
                    return item.ifTry == 1
                  })
                }
                if (list[0]) {
                  this.catalog(list[0]);
                  this.lastPlaySecond = list[0].lastPlaySecond
                  this.getVedioAddress(list[0].vedioId);
                  this.activeVideoIndex = this.courseCatalogList[0].tryDuration;
                }
              }
            } else {
               console.log(this.player,"---------------")
              this.pauseVideo(this.player.currentTime());
            }
          }
        } else {
          this.catalog(item);
          this.lastPlaySecond = item.lastPlaySecond
          this.activeVideoIndex = item.tryDuration;
          this.getVedioAddress(item.vedioId);
        }
      },
      buyCourse() {
        let query = {
          id: this.$route.query.id
        }
        if (this.$route.query.rePurchase == 1) {
          query = {
            id: this.$route.query.id,
            rePurchase: 1
          }
        }
        this.$router.push({
          path: "/courseBuy",
          query: query
        });
      },
      getCourseCatalogList() {
        let params = {
          courseId: this.$route.query.id
        };

        getCourseCatalogList(params).then(res => {
          res.data.forEach(item => {
            item.isBuy = this.isBuy
          })
          this.courseCatalogList = res.data;
        });
      },
      getCourseDetailInfo() {
        let params = {
          courseId: this.$route.query.id
        };

        getCourseDetailInfo(params).then(res => {
          this.courseInfo = res.data;
          if (!this.courseInfo.coursePurchaseInfo || (this.courseInfo.coursePurchaseInfo && this.courseInfo
              .coursePurchaseInfo.status == 'PAYING')) {
            this.isBuy = false;
          } else {
            this.isBuy = true;
            this.purchaseId = this.courseInfo.coursePurchaseInfo.id;
          }
          this.changeStatus();
          this.getCourseCatalogList();
        });
      }
    }
  };
</script>

<style lang="less" scoped>
  .course-detail-page {
    padding-bottom: 92px;
    /deep/.vjs-big-play-button {
      display: none;
    }

    .course-video-block {
      position: relative;
      height: 178px;
      overflow: hidden;

      .online-status {
        color: #fff;
        position: absolute;
        top: 0;
        right: 0;
        margin: 0;

        &.red_bg {
          &:after {
            border-color: transparent transparent #a0191f;
          }
        }

        span {
          position: relative;
          z-index: 2;
          transform: rotate(45deg);
          display: block;
          padding-left: 27px;
          margin-right: -5px;
          font-size: 13px;
        }

        &:after {
          content: "";
          position: absolute;
          top: -38px;
          right: -38px;
          z-index: 1;
          transform: rotate(45deg);
          width: 0;
          height: 0;
          border: 37.5px solid;
          border-color: transparent transparent #31ad37;
        }

      }

      video {
        width: 100%;
        max-height: 100%;
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

      .level {
        display: inline-block;
        margin-left: 10px;
      }

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
        margin-top: 5px;
        font-size: 21px;
        color: #a0191f;
        line-height: 24px;
        padding-bottom: 12px;
      }
    }

    .card-course-wrap {
      &:last-child {
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

    /deep/.tab-course-info {
      padding: 0 16px;

      img {
        max-width: 100%;
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

        &.disabled {
          background: #959595;
          border-color: #959595;
        }
      }
    }
  }
</style>