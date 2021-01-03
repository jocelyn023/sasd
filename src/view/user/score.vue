<template>
  <div>
    <van-nav-bar
      :title="type == 1 ? '我的订单' : '成绩查询'"
      left-arrow
      @click-left="onClickLeft"
    />
    
  </div>
</template>

<script>
export default {
  data() {
    return {
      type: this.$route.query.type, //1 我的订单， 2成绩查询
      loading: false,
      finished: false,
      list: [{
        id: 1,
        isPay: false,
        price: '200',
        img: 'https://img.yzcdn.cn/vant/cat.jpeg'
      }, {
        id: 2,
        isPay: true,
        price: '200',
        img: 'https://img.yzcdn.cn/vant/cat.jpeg'
      }]
    }
  },
  methods:{
    onLoad() {
      this.loading = true
      this.finished = true
    },
    pushRouter(id, isPay) {
      let routerParams = {
        path: '/msgDetails',
        query: {
          id: id
        }
      }

      if (this.type == 1) {
        // 订单

        if (isPay) {
          // 已支付

        } else {
          // 未支付
        }
      } else {
        // 成绩查询
      }

      this.$router.push(routerParams)
    },
    onClickLeft() {
      this.$router.go(-1)
    },
  }
};
</script>

<style lang="less" scoped>
</style>
