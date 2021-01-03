<template>
  <div>
    <van-nav-bar
      :title="msgType == 1 ? '我的订单' : '成绩查询'"
      left-arrow
      @click-left="onClickLeft"
    />

    <van-list
      class="container"
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <template v-for="item in list">
        <div class="item" :key="item.id" @click="pushRouter(item.id)">
          <img :src="item.img" alt="" srcset="">
        </div>
      </template>
    </van-list>
  </div>
</template>

<script>
export default {
  data() {
    return {
      msgType: this.$route.query.type, //1 我的订单， 2成绩查询
      loading: false,
      finished: false,
      list: [{
        id: 1,
        price: '',
        img: ''
      }, {
        id: 2,
        price: '',
        img: ''
      }]
    }
  },
  methods:{
    onLoad() {
      this.loading = true
      this.finished = true
    },
    pushRouter(id) {
      this.$router.push({
        path: '/msgDetails',
        query: {
          id: id
        }
      })
    },
    onClickLeft() {
      this.$router.go(-1)
    },
  }
};
</script>

<style lang="less" scoped>
.container {
  width: 100%;
  padding: 15px 16px;
}
.item {
  width: 100%;
}
</style>
