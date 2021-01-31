<template>
  <div class="examstep_2-page" v-if="examInfo.purchaseId">
    <template v-if="!examInfo.writtenExamScore">
      <div class="exam_icon"></div>
      <p>
        课程考核分为：笔试部分和视频部分，共两部分。 现去进行笔试考试。
      </p>
      <a v-if="status == 1" class="exam-link-btn" :url="wExamPath">去笔试</a>
      <a v-else class="exam-link-btn" href="javascript:;" @click="saveWritten">完成笔试</a>
    </template>
    <template v-else>
      <div class="circle-block">
        <van-circle v-model="currentRate" :rate="examInfo.writtenExamScore" :speed="100" :stroke-width="60" size="105px"
          :text="text" layer-color="rgba(160,25,31,0.5)" color="#a0191f" />
      </div>
      <p>
        答对90题，答错10题，共计{{examInfo.writtenExamScore}}分，成绩{{examInfo.writtenExamStatus=="pass" ? "合格": "不合格"}}
      </p>
    </template>
    <div class="step-btn-group">
      <van-button type="theme" plain class="btn mr15" @click="nextStep(1)">上一步</van-button>
      <van-button v-if="status == 2" type="theme" class="btn" @click="saveWritten">查看笔试成绩</van-button>
      <van-button v-else-if="!examInfo.writtenExamScore" type="theme" class="btn disabled">下一步</van-button>
      <template v-else>
        <van-button v-if="examInfo.writtenExamStatus=='pass'" type="theme" class="btn" @click="nextStep(3)">下一步</van-button>
        <van-button v-else type="theme" :url="wExamPath" class="btn"> 重新答题 </van-button>
      </template>
    </div>
  </div>
</template>

<script>
  import examMixin from "@/mixins/exam";
  import {
    saveWritten
  } from '@/api/exam'
  export default {
    mixins: [examMixin],

    data() {
      return {
        wExamPath: "https://jinshuju.net/f/WaXIoy",
        status: 1, // 1去考试 2考试完成 3成绩
        currentRate: 0
      };
    },
    computed: {
      text() {
        return this.currentRate.toFixed(0) + '分';
      },
    },
    created() {
      this.getExamInfo();
    },
    methods: {
      saveWritten() {
        let score = 80
        let wStatus = 1
        let params = {
          id: this.purchaseId,
          writtenExamScore: score,
          writtenExamStatus: wStatus //1:合格，0不合格,
        }
        saveWritten(params).then(res => {
          this.status = 3
          this.examInfo.writtenExamScore = score
          this.examInfo.writtenExamStatus = wStatus == 1 ? "pass" : "nopass"
        })
      }
    }
  };
</script>

<style lang="less" scoped>
  .examstep_2-page {
    padding-top: 30px;
    text-align: center;

    .exam_icon {
      width: 75px;
      height: 84px;
      margin: 0 auto;
      background: url("../../assets/exam/icon_exam.png") 0 0 no-repeat;
      background-size: 100% 100%;
    }

    .exam-link-btn {
      display: inline-block;
      font-size: 24px;
      font-weight: bold;
      text-decoration: underline;
      text-align: center;
      color: #a0191f;
      line-height: 26px;
      padding-top: 20px;
    }

    .circle-block {
      text-align: center;
    }

    p {
      padding: 20px 58px;
      font-size: 12px;
      text-align: center;
      color: #040000;
      line-height: 1.5;
      margin: 0;
    }

    .step-btn-group {
      text-align: center;
      padding: 76px 0 0;

      .btn {
        width: 165px;
        height: 48px;
        border-radius: 5px 5px 5px 5px;

        &.disabled {
          background: #959595;
          border-color: #959595;
        }

        &.van-button--plain {
          color: #000;
          margin-right: 15px;
        }
      }
    }
  }
</style>