<template>
  <div id="app">
    <!-- <van-nav-bar
      v-if="!hideNavBar"
      safe-area-inset-top
      :title="navTitle"
      left-arrow
      @click-left="onClickLeft"
    /> -->
    <router-view />
    <van-number-keyboard safe-area-inset-bottom />
  </div>
</template>

<script>
import { ShareImpl } from '@/utils/wxApi.js'

export default {
  watch: {
    '$route'(to) {
      this.hideNavBar = to.meta.hideNavBar;
      this.navTitle = to.meta.title;
    }
  },
  data() {
    return {
      hideNavBar: true,
      navTitle: ''
    };
  },
  mounted() {
    let url = window.location.href
    ShareImpl({
      shareTitle: document.title,
      shareDesc: document.title,
      shareUrl: url,
      shareImg: require('@/assets/logo.png'),
    });
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1)
    }
  }
};
</script>

<style>
@import url(./styls/reset_vant.css);
@import url(./styls/common.css);
body {
  -webkit-font-smoothing: antialiased;
}
#app {
  font-size: 14px;
  font-family: MicrosoftYaHei;
  color: #333;
}
</style>
