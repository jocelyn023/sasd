<template>
  <div class="address-page">
    <div class="info-form-block">
      <h3>邮寄地址</h3>
      <div>
        <van-field v-model="userInfo.name" label="收件人姓名" placeholder="请输入" />
        <van-field v-model="userInfo.name" label="收件人电话" placeholder="请输入" />
        <van-field v-model="userInfo.name" rows="1" autosize label="收件人详细地址" placeholder="请输入" type="textarea" />
      </div>
    </div>
    <div class="b-btn-box">
      <van-button type="theme" class="btn">保存</van-button>
    </div>

  </div>
</template>

<script>
  export default {
    data() {
      return {
        userInfo: {
          name: ""
        }
      }
    },
    methods: {

    }
  };
</script>

<style lang="less" scoped>
  .address-page {
    padding: 7px 16px;

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

    .b-btn-box {
      text-align: center;
      padding-top: 60px;

      .btn {
        width: 244px;
        height: 41px;
        border-radius: 5px;
        font-size: 18px;
        font-weight: bold;
      }
    }
  }
</style>