<template>
  <div class="examstep_4-page">
    <div class="info-form-block">
      <h3>邮寄地址</h3>
      <div v-if="status== 1">
        <van-field v-model="userInfo.name" label="收件人姓名" placeholder="请输入" />
        <van-field v-model="userInfo.name" label="收件人电话" placeholder="请输入" />
        <van-field v-model="userInfo.name" rows="1" autosize label="收件人详细地址" placeholder="请输入" type="textarea" />
      </div>
      <div v-else>
        <van-field v-model="userInfo.name" label="收件人姓名" placeholder="请输入" readonly />
        <van-field v-model="userInfo.name" label="收件人电话" placeholder="请输入" readonly />
        <van-field v-model="userInfo.name" rows="1" autosize label="收件人详细地址" placeholder="请输入" type="textarea"
          readonly />
      </div>
    </div>

    <div class="info-form-block" v-if="status != 1">
      <h3>邮寄信息</h3>
      <div>
        <van-field v-if="status == 2" label="邮寄编码" placeholder="等待邮寄中..." readonly />
        <van-field v-else label="邮寄编码" placeholder="0123455788999" readonly />
      </div>
    </div>


    <div class="step-btn-group" :class="status != 1 ?'pt40':''">
      <van-button v-if="status == 1" type="theme" class="btn">完成</van-button>
      <van-button v-else type="theme" class="btn">返回课程</van-button>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        status: 1,
        userInfo: {}
      };
    },
    methods: {

    }
  };
</script>

<style lang="less" scoped>
  .examstep_4-page {
    padding: 20px 16px;

    .info-form-block {
      width: 100%;
      background: #ffffff;
      border-radius: 6px;
      box-shadow: 0 1px 10px 4px #ebebeb;
      margin-bottom: 15px;
      margin-top: 15px;
      padding: 18px 12px;

      /deep/.van-field__label {
        width: 106px;
      }

      h3 {
        font-size: 16px;
        font-weight: normal;
        margin: 0;
        padding-bottom: 4px;
      }

      /deep/.van-cell {
        padding: 5px 0;
      }

      /deep/.van-field__label {
        color: #333;
      }

      /deep/.van-field__control {
        text-align: right;
      }
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

      &.pt40 {
        padding-top: 40px;
      }

      .btn {
        width: 165px;
        height: 48px;
        border-radius: 5px 5px 5px 5px;
      }
    }
  }
</style>