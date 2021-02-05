<template>
  <div class="channel-tab">
    <div class="search-box">
      <van-search
        v-model="params.queryConditions.keyWords"
        shape="round"
        show-action
        placeholder="搜索学员/课程名称"
        @search="onRefresh"
      >
        <template #action>
          <div class="col-gray-9" @click="onRefresh">搜索</div>
        </template>
      </van-search>
    </div>

    <div class="m-b-10">
      <div class="filter-select">
        <div
          class="dropdown-item"
          :class="params.time ? 'active' : ''"
          @click="showPopup('date')"
        >
          <span class="dropdown-title">日期筛选</span>
        </div>
        <div
          class="dropdown-item"
          :class="params.status ? 'active' : ''"
          @click="showPopup('status')"
        >
          <span class="dropdown-title">支付状态</span>
        </div>
      </div>
      <div class="txt-r f12 p-lr-20">共<span class="col-theme" v-if="params.total !== undefined || params.total !== null">{{ params.total }}</span>人</div>
    </div>

    
      <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
        <van-list
          class="container"
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
        >
          <div class="tab-list txt-c f12" v-if="list && list.length > 0">
            <div class="tab-item flex col-theme f14">
              <div class="item van-multi-ellipsis--l2 username">姓名</div>
              <div class="item van-multi-ellipsis--l2 tel">联系方式</div>
              <div class="item van-multi-ellipsis--l2 name">课程名字</div>
              <div class="item van-multi-ellipsis--l2 status">支付状态</div>
              <div class="item van-multi-ellipsis--l2 date">报课日期</div>
            </div>

            <template v-for="(item, index) in list">
              <div class="tab-item flex" :key="index">
                <div class="item van-multi-ellipsis--l2 username">哈哈哈哈</div>
                <div class="item van-multi-ellipsis--l2 tel">13800000000</div>
                <div class="item van-multi-ellipsis--l2 name">具体课程名称</div>
                <div class="item van-multi-ellipsis--l2 status">待支付</div>
                <div class="item van-multi-ellipsis--l2 date">2020.03.19</div>
              </div>
            </template>
          </div>
        </van-list>
      </van-pull-refresh>

    <van-popup
      v-model="showPicker"
      round
      position="bottom"
    >
      <van-date-picker
        v-if=" showPickerType == 'date'"
        show-toolbar
        v-model="date"
        title="选择时间段"
        :max-date="maxDate"
        @cancel="showPicker = false"
        @confirm="onConfirmDate"
      >
      </van-date-picker>

      <van-date-picker
        v-if=" showPickerType == 'status'"
        show-toolbar
        v-model="date"
        title="选择时间段"
        :max-date="maxDate"
        @cancel="showPicker = false"
        @confirm="onConfirmDate"
      >
      </van-date-picker>
    </van-popup>
  </div>
</template>

<script>
import VanDatePicker from "@/components/VanDatePicker";
import { getChannelTabList } from "@/api/user";


export default {
  components: { VanDatePicker },
  data() {
    return {
      loading: false,
      finished: false,
      refreshing: false,
      params: {
        page: 1,
        rows: 10,
        queryConditions: {
          keyWords: '',
          payStatus: '', // PAYED;PAYING
          startDate: '', //"2021-01-01
          endDate: ''
        }
      },
      list: [],
      value: "",
      showPicker: false,
      showPickerType: '',
      date: new Date(),
      maxDate: new Date()
    };
  },
  created() {},
  methods: {
    showPopup(type) {
      this.showPicker = true;
      this.showPickerType = type
    },
    onConfirmDate(val) {
      this.params.queryConditions.startDate = val[0] + '-' + val[1] + '-' + val[2]
      this.params.queryConditions.endDate = val[4] + '-' + val[5] + '-' + val[6]
      this.showPicker = false;
      this.onRefresh()
    },
    onLoad() {
      if (this.refreshing) {
        this.list = [];
        this.refreshing = false;
        this.params.page = 1;
      }
      getChannelTabList(this.params).then(res => {
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
  },
};
</script>

<style lang="less" scoped>
.channel-tab {
  .search-box {
    padding: 10px 10px 20px;
    box-shadow: 1px 2px 5px 0px rgba(96, 90, 91, 0.48);
  }

  .filter-select {
    display: flex;
    padding: 0 19px;
    height: 30px;
    background-color: #fff;
    justify-content: center;

    .dropdown-item {
      flex: 1;
      cursor: pointer;

      &.active,
      &:hover {
        .dropdown-title {
          color: #a0191f;

          &:after {
            border-color: transparent transparent #a0191f #a0191f;
          }
        }
      }
    }

    .dropdown-title {
      padding-right: 15px;
      position: relative;
    }

    .dropdown-title:after {
      border: 5px solid;
      position: absolute;
      top: 50%;
      right: -0.10667rem;
      margin-top: -7px;
      border-color: transparent transparent #999999 #999999;
      -webkit-transform: rotate(-45deg);
      transform: rotate(-45deg);
      opacity: 0.8;
      content: "";
    }
  }

  .tab-list {
    margin: 0 auto;
    width: 344px;
    border-left: 1px solid #000;
    border-top: 1px solid #000;

    .tab-item {
      .item {
        height: 45px;
        line-height: 20px;
        border-right: 1px solid #000;
        border-bottom: 1px solid #000;
        flex-shrink: 0;
        flex-grow: 0;
      }
      .username {
        width: 48px;
      }
      .tel {
        width: 80px;
      }
      .name {
        width: 90px;
      }
      .status {
        width: 62px;
      }
      .date {
        width: 63px;
      }
    }

    .tab-item.col-theme .item {
      height: 36px;
      line-height: 36px;
    }
  }
}
</style>
