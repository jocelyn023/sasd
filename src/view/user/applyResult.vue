<template>
  <div class="apply-result" v-if="!loading">
    <template v-if="showPayResult">
      <div class="wrapper">
        <template v-if="result.status == 'REJECT'">
          <div class="icon-result">
            <van-icon name="clear" color="#f39a35" size="60px" />
          </div>
          <div class="txt-c title-result col-gray-3">
            <span v-if="result.status == 'REJECT'">申请未通过</span>
          </div>

          <div class="tips-result">
            <div class="no-pass">
              <span class="title col-theme">审批回执</span>
              <span>{{ result.approvalComments }}</span>
            </div>
          </div>
        </template>

        <template v-else>
          <div class="icon-result">
            <van-icon name="checked" color="#31ac37" size="60px" />
          </div>

          <div class="txt-c title-result col-yellow-f39a35">
            <span v-if="result.status == 'APPROVING'">申请已提交</span>
            <span v-if="result.status == 'APPROVED'">申请通过</span>
          </div>

          <div class="tips-result">
            <span class="result-wait">
              <span v-if="result.status == 'APPROVING'">您的提现申请已经提交，工作人员会在三个工作日内，进行处理，请耐心等待！</span>
              <span v-if="result.status == 'APPROVED'">恭喜您，申请通过！请尽快缴纳推广员押金。</span>
            </span>
          </div>
        </template>
      </div>
      <div class="btn-submit-box txt-c">
        <van-button v-if="result.status == 'REJECT'" class="btn-submit m-b-10" type="theme" @click="submitAgain">重新提交</van-button>
        <van-button v-if="result.status == 'APPROVED'" class="btn-submit m-b-10" type="theme" @click="pay">缴纳押金</van-button>
        <van-button class="btn-submit" type="theme" @click="pushRouter">回到个人中心</van-button>
      </div>
    </template>

    <template v-else>
      <div class="wrapper pay">
        <div class="title txt-c">缴费成功</div>
        <div class="col-theme f12 m-b-20">恭喜您，缴费成功，成为思爱思帝课程推广员。</div>
        <div class="m-b-20">推广员编码：123456789910</div>
        <div class="m-b-10">推广员专属二维码：</div>
        <div class="ercode">
          <img src="" alt="" srcset="">
        </div>
      </div>

      <div class="btn-submit-box txt-c">
        <van-button class="btn-submit" type="theme" @click="pushRouter">回到个人中心</van-button>
      </div>
    </template>
  </div>
</template>

<script>
import wx from 'weixin-js-sdk'
import { getAgentStatus, createApplyOrder } from '@/api/user'
import { wxPay } from '@/api/common'

export default {
  components: {},
  data () {
    return {
      loading: true,
      showPayResult: true,
      result: {},
      payId: ''
    }
  },
  created () {
    this.init()
  },
  methods: {
    init () {
      getAgentStatus().then(res => {
        this.result = res.data
        this.loading = false
        localStorage.setItem('agentResult', JSON.stringify(res.data));
      })
    },
    submitAgain () {
      this.$router.push('applyPromoter')
    },
    pay () {
      let _this = this
      console.log(this.result)
      createApplyOrder(this.result.id).then(res => {
        if (res.code == 200) {
          this.payId = res.data
        }
        this.showPayResult = false
      }).then(() => {
        wxPay(this.payId).then(res => {
          let data = res.data
            // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
            let params = {
              appId: data.appId,
              timestamp: data.timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
              nonceStr: data.nonceStr, // 支付签名随机串，不长于 32 位
              package: data.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=\*\*\*）
              signType: data.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
              paySign: data.paySign, // 支付签名
              success: function (res) {
                // 支付成功后的回调函数
                console.log(res)
              }
            }

            _this.wxPayFn(params)
        })
      })
    },
    wxPayFn (params) {
      WeixinJSBridge.invoke('getBrandWCPayRequest', params, function(res) {
        if (res.err_msg == "get_brand_wcpay_request:ok") {
          // alert(callBackMessage);
              // window.location.href = callBackUrl;
        } // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回 ok，但并不保证它绝对可靠。
      });
    },
    pushRouter() {
      this.$router.push('me')
    }
  }
}
</script>

<style lang="less" scoped>
.apply-result {
  padding: 100px 33px 0;
  width: 100%;

  .wrapper {
    width: 100%;
    padding: 26px 18px 40px;
    box-shadow: 0px 0px 4px 0px rgba(6, 0, 1, 0.15);

    .icon-result {
      margin: 0 auto 20px;
      width: 60px;
    }

    .title-result {
      margin-bottom: 26px;
      font-family: MicrosoftYaHei;
      font-size: 16px;
      font-weight: bold;
      font-stretch: normal;
      height: 24px;
      line-height: 24px;
    }
    .result-wait {
      font-family: MicrosoftYaHei;
      font-size: 13px;
      font-weight: normal;
      font-stretch: normal;
      line-height: 24px;
      letter-spacing: 0px;
      color: #666666;
    }
    .no-pass {
      margin: 0 auto;
      position: relative;
      padding: 36px 17px;
      width: 239px;
      min-height: 84px;
      border: 1px solid #b50202;
      border-radius: 4px;
      font-family: MicrosoftYaHei;
      font-size: 13px;
      font-weight: normal;
      font-stretch: normal;
      line-height: 24px;
      color: #333;

      .title {
        position: absolute;
        left: 50%;
        top: -12px;
        margin-left: -37px;
        padding: 0 5px;
        font-family: MicrosoftYaHei;
        font-size: 16px;
        font-weight: bold;
        font-stretch: normal;
        height: 24px;
        line-height: 24px;
        background: #fff;
      }
    }
  }
  .btn-submit-box {
    margin: 0 auto;
    padding-top: 40px;
    width: 244px;

    .btn-submit {
      margin-bottom: 10px;
      width: 100%;
      height: 40px;
      line-height: 40px;
      border-radius: 8px;
    }
  }
  .wrapper.pay {
    .title {
      margin-bottom: 20px;
      font-size: 16px;
      font-weight: normal;
      font-stretch: normal;
      height: 24px;
      line-height: 24px;
    }
    .ercode {
      margin: 0 auto;
      width: 125px;
      min-height: 125px;
      background: #333
    }
  }
}
</style>
