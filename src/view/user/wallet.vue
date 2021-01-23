<template>
  <div>
    <div class="my-wallet">
      <div class="icon-wallet"></div>
      <div class="col-gray-3 f16 txt-c">余额</div>
      <div class="col-gray-3 txt-c money">
        <span>¥</span>
        <span>{{ userInfo && userInfo.accountBalance ? userInfo.accountBalance : '0.00' }}</span>
      </div>
      <div class="buttons-wrap">
        <van-button class="btn" color="#faa207" block @click="pushRouter('/walletApply')">提现</van-button>
        <van-button class="btn" type="primary" block @click="pushRouter('/walletDetails')">收支明细</van-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  data () {
    return {
      userInfo: {}
    }
  },
  created () {
    this.userInfo = JSON.parse(localStorage.getItem('userInfo'))
  },
  methods: {
    pushRouter(url) {
      this.$router.push(url)
    }
  }
}
</script>

<style lang="less">
.my-wallet {
  padding-top: 82px;

  .icon-wallet {
    margin: 0 auto 24px;
    width: 54px;
    height: 54px;
    background: url(../../assets/user/icon_wallet.png) no-repeat center;
    background-size: cover;
  }

  .money {
    margin-bottom: 42px;
    height: 56px;
    line-height: 56px;
    font-size: 26px;
  }

  .buttons-wrap {
    padding: 0 93px;

    .btn {
      height: 54px;
      line-height: 54px;
    }

    .btn:first-child {
      margin-bottom: 20px;
    }
  }
}
</style>
