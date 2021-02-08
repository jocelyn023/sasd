<template>
  <div>
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <van-list
        class="container"
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <template v-for="item in list">
          <div class="item" :key="item.courseId">
            <img :src="item.thumbnail" alt="" srcset="" />
            <div class="info txt-c">
              <div class="col-white f16 title">{{ item.name }}</div>
              <div class="col-theme price">¥{{ item.price }}</div>
            </div>
            <div class="button-box txt-r">
              <van-button
                class="f12 button"
                :type="(type == 1 && item.status != 'PAYING') ? 'primary' : 'theme'"
                @click="pushRouter(item.courseId, item.status, item)"
              >
                {{ type == 1 ? item.status == 'PAYING' ? '待缴费' : '缴费成功' : '查看成绩' }}
              </van-button>

              <van-button
                v-if="type == 1 && item.status == 'PAYING'"
                class="f12 button m-l-10"
                type="theme"
                @click="delOrder(item)"
              >
                删除
              </van-button>
            </div>
          </div>
        </template>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getOrderList, getScoreList, delOrderCourse } from '@/api/user'
import { getCoursePurchaseOrder } from '@/api/course'
import { wxPay } from '@/api/common'
import { Toast } from 'vant';

export default {
  data() {
    return {
      loading: false,
      finished: false,
      refreshing: false,
      list: [],
      params: {
        rows: 10,
        page: 1
      },
      type: this.$route.query.type, //1 我的订单， 2成绩查询
      payId: ''
    }
  },
  methods:{
    delOrder (item) {
      delOrderCourse({purchaseId: item.purchaseId}).then(res => {
        if (res.code == 200) {
          this.onRefresh()
          Toast('删除成功')
        } else {
          Toast(res.returnMsg)
        }
      })
    },
    onLoad() {
      if (this.refreshing) {
        this.list = [];
        this.refreshing = false;
        this.params.page = 1;
      }

      if (this.type == 1) {
        getOrderList(this.params).then(res => {
          this.loading = false;
          this.params.total = res.data.total;
          if (this.params.page < res.data.pages) {
            this.params.page = this.params.page + 1
          } else {
            this.finished = true;
          }
          res.data.records.forEach(item => {
            this.list.push(item)
          })
        })
      } else {
        getScoreList(this.params).then(res => {
          this.loading = false;
          this.params.total = res.data.total;
          if (this.params.page < res.data.pages) {
            this.params.page = this.params.page + 1
          } else {
            this.finished = true;
          }
          res.data.records.forEach(item => {
            this.list.push(item)
          })
        })
      }
    },
    onRefresh () {
      // 清空列表数据
      this.list = []
      this.finished = false;

      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      this.loading = true;
      this.onLoad();
    },
    pushRouter(id, isPay, item) {
      let routerParams = {}
      let _this = this

      if (this.type == 1) {
        // 订单
        if (isPay != 'PAYING') {
          // 已支付
          routerParams = {
            path: '/courseDetail',
            query: {
              id: id,
              type: 2
            }
          }
        } else {
          // 未支付
          getCoursePurchaseOrder(item.purchaseId).then(res => {
            if (res.code == 200) {
              this.payId = res.data
            }
          }).then(() => {
            wxPay(_this.payId).then(ret => {
              alert(ret.code)
              let data = ret.data
              let params = {
                appId: data.appId,
                timeStamp: data.timeStamp,
                nonceStr: data.nonceStr,
                package: data.packageValue,
                signType: data.signType,
                paySign: data.paySign
              }
              _this.wxPayFn(params)
            })
          })
        }
      } else {
        // 成绩查询
        routerParams = {
          path: '/myScore',
          query: {
            id: item.purchaseId
          }
        }
      }
      this.$router.push(routerParams)
    },
    wxPayFn(params) {
      let _this = this
      WeixinJSBridge.invoke('getBrandWCPayRequest', params, function (res) {
        if (res.err_msg == "get_brand_wcpay_request:ok") {
          _this.onRefresh()
        }
      })
    },
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
      .button.m-l-10 {
        margin-left: 10px
      }
    }
  }
}

</style>
