<template>
  <div class="apply-promoter">
    <!-- <van-nav-bar
      safe-area-inset-top
      :title="showApply ? '提现申请' : '审批结果'"
      left-arrow
      @click-left="onClickLeft"
    /> -->

    <walletApply v-if="!loading && showApply" @applyAgain="applyAgain"></walletApply>
    <walletResult ref="walletResult" :resultObj="result" v-if="!loading && !showApply"></walletResult>
  </div>
</template>

<script>
import walletApply from '@/components/page/walletApply'
import walletResult from '@/components/page/walletResult'
import { getMyPersonalInfo, cashoutResult } from '@/api/user'

export default {
  components: {
    walletApply,
    walletResult
  },
  data () {
    return {
      loading: true,
      showApply: true,
      result: {}
    }
  },
  created () {
    this.init()
  },
  methods: {
    applyAgain(val) {
      if (val == 'ok') {
        this.init()
      }
    },
    init () {
      getMyPersonalInfo().then(res => {
        const userInfo = res.data
        localStorage.setItem('userInfo', JSON.stringify(res.data))
        
        this.loading = false
        
        if (userInfo.cashoutStatus == 'APPROVING') {
          this.showApply = false
          this.result = {
            approvalResult: 'APPROVING'
          }
        } else {
          if (userInfo.cashoutStatus != null) {
            this.cashoutResult()
          }
        }
      })
    },
    cashoutResult () {
      cashoutResult().then(res => {
        if (res.code == 200) {
          this.result = res.data
          if ((res.data && res.data.approvalResult && res.data.approvalResult == 'PASS')) {
            this.showApply = false
          }
        }
      })
    },
    onClickLeft () {
      this.$router.go(-1)
    }
  }
}
</script>
