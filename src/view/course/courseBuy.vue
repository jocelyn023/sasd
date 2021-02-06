<template>
  <div class="course-buy-page">
    <van-form @submit="handlePay">
      <div class="buy-user-info">
        <h3>基础信息填写</h3>
        <div>
          <van-field v-model="purchaseInfo.purchaserName" label="姓名" :rules="[{ required: true, message: '请填写姓名' }]"
            placeholder="请输入" />
          <van-field v-model="purchaseInfo.contractInfo" type="tel" name="pattern" label="联系方式"
            :rules="[{ pattern, required: true, message: '请填写联系方式' }]" placeholder="请输入" />
        </div>
      </div>
      <div class="buy-course-info">
        <h3>课程信息</h3>
        <commonCover :info="courseInfo"></commonCover>
      </div>
      <div class="b-buy-box">
        <p><span class="col-gray-9 f12">价格</span>￥{{courseInfo.price}}</p>
        <van-button type="theme" class="btn" native-type="submit">确认支付</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
  import {
    getCourseDetailInfo,
    getCoursePurchaseOrder,
    saveCoursePurchaseInfo
  } from '@/api/course'
  import {
    getMyPostAddress,
    saveMyPostAddress
  } from '@/api/user'
  import {
    getCookie,
    setCookie
  } from '@/utils/utils'
  import {
    wxPay
  } from '@/api/common'
  import commonCover from "@/components/commonCover";
  export default {
    components: {
      commonCover
    },
    data() {
      return {
        pattern: /^1[3|4|5|8|7][0-9]\d{8}$/,
        courseInfo: {},
        purchaseInfo: {
          "purchaserName": "",
          "contractInfo": "",
        },
        purchaseId: -1
      };
    },
    mounted() {
      //this.getMyPostAddress();
      this.getCourseDetailInfo();
    },
    methods: {
      async saveCoursePurchaseInfo() {
        let params = {
          "courseId": this.courseInfo.id,
          "purchaserName": this.purchaseInfo.purchaserName,
          "contractInfo": this.purchaseInfo.contractInfo,
        }
        if (getCookie("agentId")) {
          params.agentId = getCookie("agentId");
        }
        await saveCoursePurchaseInfo(params).then(res => {
          if (res.code == 200) {
            this.purchaseId = res.data
          }
        })
      },
      getMyPostAddress() {
        getMyPostAddress({}).then(res => {
          this.addressList = res.data
          if (res.data) {
            this.purchaseInfo = res.data
          }
        })
      },
      saveMyPostAddress(values) {
        let params = this.purchaseInfo;
        saveMyPostAddress(params).then(res => {
          this.getMyPostAddress();
        })
      },
      clearAgentNo() {
        if (getCookie("agentId")) {
          setCookie("agentId", "", -1)
        }
      },
      async handlePay(values) {
        await this.saveCoursePurchaseInfo();
        let _this = this;
        getCoursePurchaseOrder(this.purchaseId).then(res => {
          if (res.code == 200) {
            this.payId = res.data
          }
        }).then(() => {
          wxPay(_this.payId).then(ret => {
            alert(ret.code)
            let data = ret.data
            let params = {
              appId: data.appId,
              timeStamp: data
                .timeStamp,
              nonceStr: data.nonceStr,
              package: data.packageValue,
              signType: data.signType,
              paySign: data.paySign
            }
            _this.wxPayFn(params)
          })
        })
      },
      wxPayFn(params) {
        let _this = this
        WeixinJSBridge.invoke('getBrandWCPayRequest', params, function (res) {
          if (res.err_msg == "get_brand_wcpay_request:ok") {
            _this.$router.push({
              path: "/courseDetail",
              query: {
                id: _this.courseInfo.id
              }
            })
            _this.clearAgentNo();
          }
        })
      },
      getCourseDetailInfo() {
        let params = {
          courseId: this.$route.query.id,
        }

        getCourseDetailInfo(params).then(res => {
          this.courseInfo = res.data
          if (res.data.coursePurchaseInfo) {
            this.purchaseInfo = res.data.coursePurchaseInfo;
            this.purchaseId = this.purchaseInfo.id
          }

        })
      }
    }
  };
</script>

<style lang="less" scoped>
  .course-buy-page {
    padding: 5px 16px 68px;

    /deep/.van-field__error-message {
      text-align: right;
    }

    .buy-user-info {
      width: 343px;
      background: #ffffff;
      border-radius: 6px;
      box-shadow: 0 1px 10px 4px #ebebeb;
      margin-bottom: 15px;
      margin-top: 15px;
      padding: 20px 12px;

      h3 {
        font-size: 16px;
        font-weight: bold;
        margin: 0;
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

    .buy-course-info {
      h3 {
        font-size: 16px;
        font-weight: bold;
        margin: 0;
        padding-top: 5px;
        padding-bottom: 15px;
      }

      /deep/.cover-block .pic-box {
        height: 130px;
      }
    }

    .b-buy-box {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 19px 16px;
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      width: 100%;
      width: 100%;
      height: 68px;
      background: #ffffff;
      border-top: 1px solid #999999;
      box-shadow: 1px 1px 0px 0px rgba(223, 221, 221, 0.75);

      .btn {
        width: 125px;
        height: 30px;
        font-size: 15px;
        border-radius: 15px;
        background: #a0191f;
        line-height: 0.8rem;
      }
    }

  }
</style>