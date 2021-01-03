<template>
  <div class="examstep_3-page">
    <div class="step-btn-group">
      <van-button type="theme" plain class="btn" to="/examStep_2">上一步</van-button>
      <van-button v-if="status == 1" type="theme" class="btn" to="/examStep_4">下一步</van-button>
      <van-button v-else type="theme" class="btn" to="/examStep_3">缴费补考</van-button>
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
  .examstep_3-page {
    padding-top: 30px;

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