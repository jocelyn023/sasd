<template>
  <div class="examstep_2-page">
    <div class="circle-block">
      <van-circle v-model="currentRate" :rate="90" :speed="100" :stroke-width="60" size="105px" :text="text"
        layer-color="rgba(160,25,31,0.5)" color="#a0191f" />
    </div>
    <p>
      答对90题，答错10题，共计90分，成绩合格
    </p>
    <div class="step-btn-group">
      <van-button type="theme" plain class="btn" to="/examStep_1">上一步</van-button>
      <van-button v-if="status == 1" type="theme" class="btn" to="/examStep_3">下一步</van-button>
      <van-button v-else type="theme" class="btn" to="/examStep_3">重新答题</van-button>
    </div>
  </div>
</template>

<script>
  export default {

    data() {
      return {
        status: 1,
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
      padding: 100px 0 0;

      .btn {
        width: 165px;
        height: 48px;
        border-radius: 5px 5px 5px 5px;

        &.van-button--plain {
          color: #000;
          margin-right: 15px;
        }
      }
    }
  }
</style>