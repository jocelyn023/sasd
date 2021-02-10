<template>
  <div class="apply-promoter">
    <!-- <van-nav-bar
      safe-area-inset-top
      :title="showApply ? '提现申请' : '审批结果'"
      left-arrow
      @click-left="onClickLeft"
    /> -->

    <walletApply v-if="!loading && showApply" :resultObj="result" @applyAgain="applyAgain"></walletApply>
    <walletResult ref="walletResult" :resultObj="result" v-if="!loading && !showApply"></walletResult>
  </div>
</template>

<script>
import walletApply from '@/components/page/walletApply'
import walletResult from '@/components/page/walletResult'
import { getMyPersonalInfo, cashoutResult, cashoutResultById } from '@/api/user'

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
    this.cashoutResult()
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
        localStorage.setItem('userInfo', JSON.stringify(userInfo))
      })
    },
    cashoutResult () {
      cashoutResult().then(res => {
        if (res.code == 200) {
          if (res.data == null) {
            this.showApply = true
            this.loading = false
          } else {
            this.cashoutResultById(res.data.businessId)
          }
        }
      })
    },
    cashoutResultById(id) {
      cashoutResultById({'applyId': id}).then(res => {
        this.loading = false
        this.result = res.data
        console.log('========', this.result)
        this.showApply = false
      })
    },
    onClickLeft () {
      this.$router.go(-1)
    }
  }
}
</script>
