<template>
  <div class="examstep_4-page">
    <van-form @submit="saveAddress" v-if="examInfo.purchaseId">
      <div class="info-form-block">
        <h3>邮寄地址</h3>
        <div v-if="examInfo.status == 'EDIT_INFO'">
          <van-field v-model="examInfo.recevier" label="收件人姓名" placeholder="请输入" readonly />
          <van-field v-model="examInfo.tel" label="收件人电话" placeholder="请输入" readonly />
          <van-field v-model="examInfo.address" rows="1" autosize label="收件人详细地址" placeholder="请输入" type="textarea"
            readonly />
        </div>
        <div v-if="examInfo.status == 'EDIT_ADDR'">
          <van-field v-model="examInfo.recevier" :rules="[{ required: true, message: '请输入收件人姓名' }]" label="收件人姓名" placeholder="请输入" />
          <van-field v-model="examInfo.tel" :rules="[{ required: true, message: '请输入收件人电话' }]" label="收件人电话" placeholder="请输入" />
          <van-field v-model="examInfo.address" :rules="[{ required: true, message: '请输入收件人详细地址' }]" rows="1" autosize label="收件人详细地址" placeholder="请输入" type="textarea" />
        </div>
      </div>
      <div class="info-form-block" v-if="examInfo.status == 'EDIT_INFO'">
        <h3>邮寄信息</h3>
        <div>
          <van-field v-if="examInfo.status == 'EDIT_INFO'"  label="邮寄编码" placeholder="等待邮寄中..." readonly />
          <van-field v-else label="邮寄编码" placeholder="" v-model="examInfo.postCode" readonly />
        </div>
      </div>
      <div class="step-btn-group" :class="examInfo.status == 'EDIT_INFO' ?'pt40':''">
        <van-button v-if="examInfo.status == 'EDIT_INFO'" type="theme" class="btn">返回课程</van-button>
        <van-button v-else native-type="submit" type="theme" class="btn">完成</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
  import examMixin from "@/mixins/exam";
  import {
    saveAddress
  } from '@/api/exam'
  export default {
    mixins: [examMixin],
    data() {
      return {
        userInfo: {}
      };
    },
    created() {
      this.getExamInfo();
    },
    methods: {
      saveAddress() {
        let params = {
          id: this.purchaseId,
          recevier: this.examInfo.recevier,
          tel: this.examInfo.tel,
          address: this.examInfo.address
        }
        saveAddress(params).then(res => {
          this.examInfo.status = 'EDIT_INFO'
        })
      }
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