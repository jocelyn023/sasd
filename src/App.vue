<template>
  <div id="app">
    <van-nav-bar safe-area-inset-top />
    <router-view />
    <van-number-keyboard safe-area-inset-bottom />
  </div>
</template>

<style>
@import url(./styls/reset_vant.css);
body {
  font-size: 16px;
  background-color: #f8f8f8;
  -webkit-font-smoothing: antialiased;
}
</style>
