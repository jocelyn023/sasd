<template>
  <div class="course-detail-page">
    <div class="course-video-block" @click="handleClickPlay(-1)">
      <p class="online-status green_bg">
        <span>{{courseInfo.teachingTypeValue}}</span>
      </p>

      <video :src="videoPath" ref="j_video" :poster="courseInfo.thumbnail" @pause="handlePause()"
        type="video/mp4"></video>
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
      <van-button
        v-if="!courseInfo.coursePurchaseInfo || (courseInfo.coursePurchaseInfo && courseInfo.coursePurchaseInfo.status=='PAYING') "
        type="theme" class="btn" @click="buyCourse">去购买</van-button>
      <van-button v-else-if="courseInfo.coursePurchaseInfo && courseInfo.coursePurchaseInfo.learnStatus=='LEARNING'"
        type="theme disabled" class="btn">参加考试</van-button>
      <van-button
        v-else-if="courseInfo.coursePurchaseInfo && courseInfo.coursePurchaseInfo.learnStatus=='LEARNED' && courseInfo.coursePurchaseInfo.status=='PAYED'"
        type="theme" class="btn" @click="toExam">参加考试</van-button>
      <van-button v-else-if="courseInfo.coursePurchaseInfo && courseInfo.coursePurchaseInfo.learnStatus=='FINISH'"
        type="theme" class="btn" to="/scoreList">查看成绩</van-button>
      <van-button v-else-if="courseInfo.coursePurchaseInfo
         && (courseInfo.coursePurchaseInfo.status!='PAYED' ||
          courseInfo.coursePurchaseInfo.status!='PAYING'|| 
          courseInfo.coursePurchaseInfo.status!='FINISH')" type="theme" class="btn" @click="getStep()">参加考试</van-button>
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
    setCookie
  } from '@/utils/utils'
  import {
    toExam
  } from "@/api/exam";
  import {
    Toast
  } from 'vant';
  import cardCourse from "@/components/cardCourse";
  import examMixin from "@/mixins/exam";
  export default {
    mixins: [examMixin],
    components: {
      cardCourse
    },
    data() {
      return {
        purchaseId: -1,
        activeVideoIndex: -1,
        active: 1,
        type: this.$route.query.type,
        videoPath: "",
        isPlay: false,
        isBuy: false,
        courseInfo: {
          // cityId: "110102"
          // cityNamePath: "北京,北京市,西城区"
          // courseHours: 30
          // courseLength: "30"
          // dancyLevel: "lv3"
          // dancyLevelValue: "三级"
          // dancyType: "Popping"
          // dancyTypeValue: "Popping"
          // endDate: "2022-01-22"
          // id: "1349729841098825729"
          // intro: null
          // name: "111"
          // price: 199
          // startDate: "2021-01-21"
          // teachingType: "ON"
          // teachingTypeValue: "线上"
          // thumbnail: "http://qiniu.csda.cn.com/picture/1610621367127.jpg"
        },
        courseCatalogList: [{
          // duration: "120"
          // id: "1352456149945257985"
          // ifTry: "1"
          // name: "breaking课程1"
          // orderNo: 1
          // thumbnail: "http://qiniu.csda.cn.com/picture/1611297816825.jpg"
          // tryDuration: "2"
          // vedioId: "1352456149848788993"
        }],
        curVideoItem: {},
        lastPlaySecond: 0
      };
    },
    mounted() {
      this.getCourseDetailInfo();
    },

    methods: {
      toExam() {
        console.log(1111)
        toExam({
          purchaseId: this.purchaseId
        }).then(res => {
          console.log(res);
          if (res.code == 200) {
            setCookie("purchaseId", this.purchaseId);
            this.getStep();
          }
        });
      },
      finishCatalog(curD, d) {
        if (this.isBuy) {
          let params = {
            id: this.curVideoItem.id,
            lastPlaySecond: curD
          }
          if (d == curD) {
            finishCatalog(params).then(res => {
              console.log(res)
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
        getVedioAddress({
          vedioId: id
        }).then(res => {
          if (res.code == 200) {
            this.videoPath = res.data;
            let video = this.$refs.j_video;
            video.src = res.data;
            setTimeout(() => {
              video.play();
              video.currentTime = this.lastPlaySecond ? this.lastPlaySecond : 0
              video.addEventListener("timeupdate", () => {
                var timeDisplay;
                var duration;
                timeDisplay = Math.floor(video.currentTime);
                duration = Math.floor(video.duration);
                this.pauseVideo(timeDisplay, 1)
              }, false);
              this.isPlay = true;
            }, 150);
          } else {
            console.log(res.returnMsg);
          }
        });
      },
      handlePause() {
        this.isPlay = false;
        let video = this.$refs.j_video;
        var timeDisplay;
        var duration;
        timeDisplay = Math.floor(video.currentTime);
        duration = Math.floor(video.duration);
        this.finishCatalog(timeDisplay, duration);
      },
      pauseVideo(timeDisplay, type) {
        if (!this.isBuy) {
          if (timeDisplay >= this.activeVideoIndex) {
            this.$refs.j_video.pause();
            this.isPlay = false;
            Toast("试看时间已到");
          } else {
            this.playVideo(type);
          }
        } else {
          this.playVideo(type);
        }
        //console.log(this.isPlay,timeDisplay,this.activeVideoIndex);
      },
      playVideo(type) {
        if (type != 1) {
          this.$refs.j_video.play();
          this.isPlay = true;
        }
      },
      handleClick(item) {
        if (item.ifTry == 1 || item.learnStatus == 'LEARNING') {
          this.handleClickPlay(item)
        }
      },

      handleClickPlay(item) {
        if (item == -1) {
          if (this.isPlay) {
            this.$refs.j_video.pause();
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
              this.pauseVideo(this.$refs.j_video.currentTime);
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
        this.$router.push({
          path: "/courseBuy",
          query: {
            id: this.$route.query.id
          }
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
          this.getCourseCatalogList();
        });
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