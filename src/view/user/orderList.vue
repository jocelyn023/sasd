<template>
  <div>
    <van-list
      class="container"
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <template v-for="item in list">
        <div class="item" :key="item.id">
          <img :src="item.img" alt="" srcset="" />
          <div class="info txt-c">
            <div class="col-white f16 title">课程1</div>
            <div class="col-theme price">200</div>
          </div>
          <div class="button-box txt-r">
            <van-button class="f12 button" :type="type == 1 && item.isPay ? 'theme' : 'primary'" @click="pushRouter(item.id, item.isPay)">
              {{ type == 1 ? item.isPay ? '缴费成功' : '待缴费' : '成绩查询' }}
            </van-button>
          </div>
        </div>
      </template>
    </van-list>
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
        routerParams.path = '/myScore'
      }
      console.log(routerParams);

      this.$router.push(routerParams)
    }
  }
};
</script>

<style lang="less" scoped>
.container {
  width: 100%;
  padding: 15px 16px;

  .item {
    margin-bottom: 15px;
    position: relative;
    width: 100%;
    height: 130px;
    border-radius: 5px;
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
    }

    .info {
      position: absolute;
      left: 0;
      top: 0;
      padding-top: 49px;
      background: rgba(0, 0, 0, 0.2);
      width: 100%;
      height: 100%;

      .title {
        height: 16px;
        line-height: 16px;
        margin-bottom: 12px;
      }
      .price {
        height: 12px;
        line-height: 12px;
      }
    }
    .button-box {
      position: absolute;
      right: 0;
      bottom: 7px;
      padding-right: 7px;
      width: 100%;
      height: 22px;

      .button {
        height: 22px;
        line-height: 22px;
      }
    }
  }
}

</style>
