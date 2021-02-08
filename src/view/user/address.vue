<template>
  <div class="address-page">
    <van-form @submit="saveMyPostAddress">
      <div class="info-form-block">
        <h3>邮寄地址</h3>
        <div>
          <van-field v-model="addressInfo.recevier" label="收件人姓名" :rules="[{ required: true, message: '请填写收件人姓名' }]"
            placeholder="请输入" />
          <van-field v-model="addressInfo.tel" name="pattern" label="收件人电话" type="tel"
            :rules="[{ pattern, required: true, message: '请填写收件人电话' }]" placeholder="请输入" />
          <van-field v-model="addressInfo.address" rows="1" autosize label="收件人详细地址"
            :rules="[{ required: true, message: '请填写收件人详细地址' }]" placeholder="请输入" type="textarea" />
        </div>
      </div>
      <div class="b-btn-box">
        <van-button type="theme" class="btn" native-type="submit">保存</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
  import {
    getMyPostAddress,
    saveMyPostAddress
  } from '@/api/user'
  import {Toast} from 'vant'
  
  export default {
    data() {
      return {
        pattern: /^1[3|4|5|8|7][0-9]\d{8}$/,
        addressList: [],
        addressInfo: {
          name: ""
        },
        addressInfo: {
          "recevier": "",
          "tel": "",
          "address": "",
          // "postCode": "1000000"
        },
      }
    },
    mounted() {
      this.getMyPostAddress()
    },
    methods: {
      getMyPostAddress() {
        getMyPostAddress({}).then(res => {
          this.addressList = res.data
          if (res.data) {
            this.addressInfo = res.data
          }
        })
      },
      saveMyPostAddress(values) {
        let params = this.addressInfo;
        saveMyPostAddress(params).then(res => {
          Toast('保存成功！')
          this.getMyPostAddress();
        })
      }
    }
  };
</script>

<style lang="less" scoped>
  .address-page {
    padding: 7px 16px;

    /deep/.van-field__error-message {
      text-align: right;
    }

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