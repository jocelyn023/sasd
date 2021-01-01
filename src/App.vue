<template>
  <div id="app">
    <van-nav-bar safe-area-inset-top />
    <router-view />
    <van-number-keyboard safe-area-inset-bottom />
  </div>
</template>

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
