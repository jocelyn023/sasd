<template>
  <div>
    <div class="option txt-r m-b-10">
      <span @click="showPickerFn">
        <span class="m-r-10">筛选</span>
        <van-icon class="rotate90" name="play" />
      </span>
    </div>

    <div class="container">
      <!-- 总结 -->
      <div class="summary txt-r m-b-10 col-gray-3 f14">
        <span class="m-r-10">共收入¥ {{ cashoutTotal.incomne ? cashoutTotal.incomne : '0.00' }}</span>
        <span>提现¥ {{ cashoutTotal.cashout ? cashoutTotal.cashout : '0.00' }}</span>
      </div>

      <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
        >
          <template v-for="(item, index) in list">
            <div :key="index" class="detail-item">
              <div class="flex f14 desc">
                <span>{{ item.typeValue }}</span>

                <span v-if="item.type == 'cashout'" class="col-green-31ac37">-{{ item.amount }}</span>
                <span v-else>+{{ item.amount }}</span>
              </div>

              <div class="f12 col-gray-6 p-b-10">{{ item.createDate }}</div>
            </div>
          </template>
        </van-list>
      </van-pull-refresh>
    </div>

    <!-- 底部picker -->
    <van-popup v-model="pickerConfig.show" round position="bottom">
      <van-picker
        title=""
        show-toolbar
        value-key="text"
        :columns="pickerConfig.columns"
        @confirm="onConfirm"
        @cancel="pickerConfig.show = false"
      />
    </van-popup>
  </div>
</template>

<script>
import { getIncomeCashoutDetail } from '@/api/user'

export default {
  data() {
    return {
      pickerConfig: {
        show: false,
        chooseVal: '',
        columns: [{
          key: '',
          text: '全部'
        }, {
          key: 'incomne',
          text: '收入'
        }, {
          key: 'cashout',
          text: '支出'
        }]
      },
      cashoutTotal: {},
      params: {
        rows: 10,
        page: 1,
        queryConditions:{
          type: ''
        }
      },
      loading: false,
      finished: false,
      refreshing: false,
      list: []
    }
  },
  methods:{
    onConfirm(val) {
      this.pickerConfig.show = false
      this.params.queryConditions = {
        type: val.key
      }
      
      this.list = []
      this.params.page = 1;
      this.onRefresh()
    },
    showPickerFn () {
      this.pickerConfig.show = true
    },
    onLoad() {
      if (this.refreshing) {
        this.list = [];
        this.refreshing = false;
        this.params.page = 1;
      }

      getIncomeCashoutDetail(this.params).then(res => {
        this.loading = false;
        this.params.total = res.data.total;
        if (this.params.page < res.data.total) {
          this.params.page = this.params.page + 1
        } else {
          this.finished = true;
        }
        res.data.records.forEach(item => {
          this.list.push(item)
        })
      })
    },
    onRefresh () {
      // 清空列表数据
      this.finished = false;

      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      this.loading = true;
      this.onLoad();
    },
    pushRouter(id) {
      this.$router.push({
        path: '/msgDetails',
        query: {
          id: id
        }
      })
    }
  }
};
</script>

<style lang="less" scoped>
.option {
  padding: 0 21px;
  height: 50px;
  line-height: 50px;
  box-shadow: 1px 2px 2px 0px	rgba(0, 0, 0, 0.1);
}
.container {
  padding: 0 21px;
}
.summary {
  height: 50px;
  line-height: 50px;
}
.detail-item {
  border-bottom: 1px solid #ececec;

  .desc {
    height: 34px;
    line-height: 34px;
  }
}
.msg-item:last-child {
  border-bottom: none;
}
.rotate90 {
  transform: rotate(90deg);
}
</style>
