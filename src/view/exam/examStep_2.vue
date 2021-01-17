<template>
  <div class="examstep_2-page">
    <template v-if="status == 1 || status == 2">
      <div class="exam_icon"></div>
      <p>
        课程考核分为：笔试部分和视频部分，共两部分。 现去进行笔试考试。
      </p>
      <a v-if="status == 1" class="exam-link-btn" href="javascript:;">去笔试</a>
      <a v-else class="exam-link-btn" href="javascript:;">完成笔试</a>
    </template>
    <template v-else>
      <div class="circle-block">
        <van-circle v-model="currentRate" :rate="90" :speed="100" :stroke-width="60" size="105px" :text="text"
          layer-color="rgba(160,25,31,0.5)" color="#a0191f" />
      </div>
      <p>
        答对90题，答错10题，共计90分，成绩合格
      </p>
    </template>

    <div class="step-btn-group">
      <van-button type="theme" plain class="btn" to="/examStep_1">上一步</van-button>
      <van-button v-if="status == 1" type="theme" class="btn disabled">下一步</van-button>
      <van-button v-else-if="status == 2" type="theme" class="btn">查看笔试成绩</van-button>
      <van-button v-else-if="status == 3" type="theme" class="btn">重新答题</van-button>
      <!-- <van-button v-else-if="status == 3" type="theme" class="btn">缴费补考</van-button> -->
      <van-button v-else-if="status == 4" type="theme" class="btn" to="/examStep_3">下一步</van-button>
    </div>
  </div>
</template>

<script>
  export default {

    data() {
      return {
        status: 4, // 1去考试 2考试完成 3 考试不合格 4考试合格
        currentRate: 0
      };
    },
    computed: {
      text() {
        return this.currentRate.toFixed(0) + '%';
      },
    },
    methods: {

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