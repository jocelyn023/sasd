<template>
  <div class="apply-result">
      <div class="wrapper">
        <div class="icon-result">
          <van-icon v-if="result.status != 'REJECT'" name="checked" color="#31ac37" size="60px" />
          <van-icon v-else name="clear" color="#f39a35" size="60px" />
        </div>

        <div class="txt-c title-result" :class="result.status != 'REJECT' ? 'col-yellow-f39a35' : 'col-gray-3'">
          <span v-if="result.status == 'APPROVING'">申请已提交</span>
          <span v-if="result.status == 'REJECT'">申请未通过</span>
          <span v-if="result.status == 'APPROVED'">申请通过</span>
        </div>
        
        <div class="tips-result">
          <span class="result-wait" v-if="result.status != 'REJECT'">
            <span v-if="result.status == 'APPROVING'">您的提现申请已经提交，工作人员会在三个工作日内，进行处理，请耐心等待！</span>
            <span v-if="result.status == 'APPROVED'">恭喜您，申请通过！</span>
          </span>
          
          <div v-else class="no-pass">
            <span class="title col-theme">审批回执</span>
            <span>{{ result.approvalComments }}</span>
          </div>
        </div>
      </div>
      <div class="btn-submit-box txt-c">
        <van-button v-if="result.status != 'APPROVING'" class="btn-submit m-b-10" type="theme" @click="pushRouter">重新提交</van-button>
        <van-button v-if="result.status == 'APPROVED'" class="btn-submit" type="theme" @click="pushReplace('/wallet')">返回我的钱包</van-button>
      </div>
        
  </div>
</template>

<script>
export default {
  components: {},
  watch: {
    resultObj: {
      immediate: true,
      handler(val) {
        this.result = val
      }
    }
  },
  props: {
    resultObj: {}
  },
  data () {
    return {
      result: {}
    }
  },
  created () {},
  methods: {
    submitAgain () {},
    pushRouter(url) {
      this.$parent.showApply = true
    },
    pushReplace (url) {
      this.$parent.$router.replace(url)
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
      width: 100%;
      height: 40px;
      line-height: 40px;
      border-radius: 8px;
    }
    .btn-submit.m-b-10 {
      margin-bottom: 10px
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
