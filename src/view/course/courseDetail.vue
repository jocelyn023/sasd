<template>
  <div class="course-detail-page">
    <div class="course-video-block" @click="playVideo(-1)">
      <video :src="videoPath" ref="j_video" :poster="courseInfo.thumbnail" type="video/mp4"></video>
      <i v-if="!isPlay" class="icon_play" @click.stop="playVideo(-1)"></i>
    </div>
    <div class="course-main-con">
      <p class="course-title">{{courseInfo.name}}</p>
      <p class="course-num">舞种: {{courseInfo.dancyTypeValue}} <span
          class="level">等级：{{courseInfo.dancyLevelValue}}</span></p>
      <p class="course-num">举办地区: {{courseInfo.cityNamePath}}</p>
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
            <cardCourse @handleClick="playVideo" :key="index" :item="item"></cardCourse>
          </template>
        </van-tab>
      </van-tabs>
    </div>
    <div class="b-btn-box">
      <van-button
        v-if="!courseInfo.coursePurchaseInfo || (courseInfo.coursePurchaseInfo && courseInfo.coursePurchaseInfo.status=='PAYING') "
        type="theme" class="btn" @click="buyCourse">去购买</van-button>
      <!-- <van-button v-else-if="courseInfo.coursePurchaseInfo && courseInfo.coursePurchaseInfo.learnStatus=='LEARNING'" type="theme" class="btn" to="/studyList">立即学习</van-button> -->
      <van-button v-else-if="courseInfo.coursePurchaseInfo && courseInfo.coursePurchaseInfo.learnStatus=='LEARNING'"
        type="theme disabled" class="btn">参加考试</van-button>
      <van-button
        v-else-if="courseInfo.coursePurchaseInfo && courseInfo.coursePurchaseInfo.learnStatus=='LEARNED' && courseInfo.coursePurchaseInfo.status=='PAYED'"
        type="theme" class="btn" @click="toExam">参加考试</van-button>
      <van-button v-else type="theme" class="btn" to="/scoreList">查看成绩</van-button>
    </div>
  </div>
</template>

<script>
import {
  getCourseDetailInfo,
  getCourseCatalogList,
  getVedioAddress
} from "@/api/course";
import { toExam } from "@/api/exam";
import cardCourse from "@/components/cardCourse";
import examMixin from "@/mixins/exam";
export default {
  mixins: [examMixin],
  components: {
    cardCourse
  },
  data() {
    return {
      activeVideoIndex: -1,
      active: 1,
      type: this.$route.query.type,
      videoPath: "",
      isPlay: false,
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
      courseCatalogList: [
        {
          // duration: "120"
          // id: "1352456149945257985"
          // ifTry: "1"
          // name: "breaking课程1"
          // orderNo: 1
          // thumbnail: "http://qiniu.csda.cn.com/picture/1611297816825.jpg"
          // tryDuration: "2"
          // vedioId: "1352456149848788993"
        }
      ]
    };
  },
  mounted() {
    this.getCourseDetailInfo();
  },

  methods: {
    toExam() {
      toExam({
        purchaseId: 1 //this.courseInfo.id
      }).then(res => {
        console.log(res);
        //if (res.code == 200) {
        this.purchaseId = 1;
        this.getStep();
        // }
      });
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
            this.isPlay = true;
          }, 150);
        } else {
          console.log(res.returnMsg);
        }
      });
    },
    pauseVideo() {
      this.isPlay = false;
    },
    playVideo(item) {
      if (item == -1) {
        if (this.isPlay) {
          this.$refs.j_video.pause();
          this.isPlay = false;
        } else {
          if (this.activeVideoIndex == -1) {
            if (this.courseCatalogList.length > 0) {
              this.getVedioAddress(this.courseCatalogList[0].vedioId);
              this.activeVideoIndex = this.courseCatalogList[0].vedioId;
            }
          } else {
            this.$refs.j_video.play();
            this.isPlay = true;
          }
        }
      } else {
        this.activeVideoIndex = item.vedioId;
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
        // TODO
        res.data.forEach(item => {
          item.learnStatus = "LEARNING";
          item.isPay =
            this.courseInfo.coursePurchaseInfo &&
            this.courseInfo.coursePurchaseInfo.status != "PAYING";
        });
        this.courseCatalogList = res.data;
      });
    },
    getCourseDetailInfo() {
      let params = {
        courseId: this.$route.query.id
      };

      getCourseDetailInfo(params).then(res => {
        this.courseInfo = res.data;
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