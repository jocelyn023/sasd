<template>
  <div class="apply-promoter">
    <van-nav-bar
      safe-area-inset-top
      :title="showApply ? '提现申请' : '审批结果'"
      left-arrow
      @click-left="onClickLeft"
    />

    <walletApply v-if="!loading && showApply"></walletApply>
    <walletResult ref="walletResult" v-if="!loading && !showApply"></walletResult>
  </div>
</template>

<script>
import { Toast } from 'vant';
import walletApply from '@/components/page/walletApply'
import walletResult from '@/components/page/walletResult'

export default {
  components: {
    walletApply,
    walletResult
  },
  data () {
    let self = this;
    return {
      loading: true,
      showApply: true
    }
  },
  created () {
    this.init()
  },
  methods: {
    init () {
      const userInfo = JSON.parse(localStorage.getItem('userInfo'))

      if (userInfo.cashoutStatus != null) {
        this.loading = false
        this.showApply = false
      }
    },
    onClickLeft () {
      this.$router.go(-1)
    }
  }
}
</script>
