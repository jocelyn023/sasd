<template>
  <div class="channel-tab">
    <div class="search-box">
        <van-search
          v-model="value"
          shape="round"
          show-action
          placeholder="搜索学员/课程名称"
          @search="onSearch"
        >
          <template #action>
            <div class="col-gray-9" @click="onSearch">搜索</div>
          </template>
        </van-search>
    </div>

    <div class="m-b-10">
      <div class="filter-select">
        <div class="dropdown-item" :class="params.time?'active': ''" @click="showPopup(2)">
          <span class="dropdown-title">日期筛选</span>
        </div>
        <div class="dropdown-item" :class="params.status?'active': ''" @click="showPopup(3)">
          <span class="dropdown-title">支付状态</span>
        </div>
      </div>
      <div class="txt-r f12 p-lr-20">
        共<span class="col-theme">50</span>人
      </div>
    </div>

    <div class="tab-list txt-c f12">
      <div class="tab-item flex col-theme f14">
        <div class="item van-ellipsis username">姓名</div>
        <div class="item van-ellipsis tel">联系方式</div>
        <div class="item van-ellipsis name">课程名字</div>
        <div class="item van-ellipsis status">支付状态</div>
        <div class="item van-ellipsis date">报课日期</div>
      </div>

      <div class="tab-item flex">
        <div class="item van-ellipsis username">哈哈哈哈</div>
        <div class="item van-ellipsis tel">13800000000</div>
        <div class="item van-ellipsis name">具体课程名称</div>
        <div class="item van-ellipsis status">待支付</div>
        <div class="item van-ellipsis date">2020.03.19</div>
      </div>
    </div>

    <van-empty description="暂无数据" />
    
    <van-popup v-model="showPicker" round position="bottom" :style="{ height: '40%' }">
      <van-datetime-picker
        v-model="params.time"
        type="date"
        title="选择年月日"
        :max-date="maxDate"
        @confirm="onConfirmDate"
        @cancel="showPicker = false"
      />
    </van-popup>
  </div>
</template>

<script>
export default {
  data () {
    return {
      value: '',
      showPicker: false,
      maxDate: new Date(),
      params: {
        time: new Date(),
        status: ''
      }
    }
  },
  created () {
    // this.init()
  },
  methods: {
    onSearch () {

    },
    showPopup () {
      this.showPicker = true
    },
    onConfirmDate (val) {
      console.log(val)
      this.showPicker = false
    },
    init () {
      let userInfo = localStorage.getItem('userInfo')
      if (userInfo == null) {
        this.$router.push('/me')
      }
      userInfo = JSON.parse(userInfo)
      this.codeValue = window.location.host + '/courseList?agentId=' + userInfo.openId
    }
  }
}
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
        opacity: .8;
        content: '';
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
        line-height: 45px;
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
