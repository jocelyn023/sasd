<template>
  <div class="channel">
    <div class="channel-box">
      <div class="title txt-c m-b-10">我的推广员专属二维码</div>
      <div class="qrcode">
        <!-- <vue-qr class="bicode" :logoMargin="5" :logoSrc="logoSrc" :logoScale="20" :text="codeValue" :margin="20" :dotScale="1"></vue-qr> -->
        <vue-qr class="bicode" :text="codeValue" :margin="20" :dotScale="1"></vue-qr>
      </div>

    </div>

    <div class="desc">
      <span class="red">*</span> 注意：此为思爱思帝推广员专属二维码，用于分享CSDA课程，让学员保存扫描此二维码后进入CSDA课程页面，成为您的代理学员。
    </div>
  </div>
</template>

<script>
import vueQr from 'vue-qr'

export default {
  components: { vueQr },
  data () {
    return {
      codeValue: '',
      logoSrc: 'http://ovj2adaf8.bkt.clouddn.com/Fmihk5W9vvsRN_mKcXQPErzDEXxg'
    }
  },
  created () {
    this.init()
  },
  methods: {
    init () {
      let userInfo = localStorage.getItem('userInfo')
      if (userInfo == null) {
        this.$router.push('/me')
      }
      userInfo = JSON.parse(userInfo)
      this.codeValue = window.location.host + '/courseList?agentId=' + userInfo.openId
    }
  }
}
</script>

<style lang="less" scoped>
.channel {
  padding-top: 84px;

  .channel-box {
    margin: 0 auto;
    padding-top: 26px;
    padding-bottom: 36px;
    width: 310px;
    box-shadow: 1px 2px 4px 0px	rgba(101, 94, 96, 0.75);

    .title {
      height: 24px;
      font-family: MicrosoftYaHei;
      font-size: 16px;
      font-weight: normal;
      font-stretch: normal;
      line-height: 24px;
      letter-spacing: 0px;
      color: #000000;
    }

    .qrcode {
      margin: 0 auto;
      width: 190px;
      height: 190px;
    }
  }
  .desc {
    padding: 22px 28px 0;
    font-family: MicrosoftYaHei;
    font-size: 14px;
    font-weight: normal;
    font-stretch: normal;
    line-height: 24px;
    letter-spacing: 0px;
    color: #666;
  }
  .red {
    color: #a0191f;
  }
}
</style>
