<template>
  <div class="me">
    <div class="user-head">
      <div class="user-info bg-theme flex ">
        <van-image
          class="m-r-15 img-box"
          round
          fit="cover"
          :src="userInfo.icon"
          @click="$router.push('/editUser')"
        >
        </van-image>
        <div class="user-other">
          <div class="f16 col-white" :class="{'m-b-10': userInfo.ifAgent}">{{ userInfo.nickName }}</div>
          <template v-if="userInfo.ifAgent == 1">
            <template>
              <div v-if="userInfo.agentType == 'TEACHING_CAMP'" class="f14 col-white m-b-10">训练营编码: {{ userInfo.agentNo }}</div>
              <div v-else class="f14 col-white m-b-10">推广员编码: {{ userInfo.agentNo }}</div>
            </template>
            <div class="badge f12">
              <span v-if="userInfo.agentType == 'TEACHING_CAMP'">师资营</span>
              <span v-else>推广员</span>
              <!-- <span v-else>思爱思帝推广员</span> -->
            </div>
          </template>
        </div>
      </div>

      <!-- 代理商 -->
      <div class="agent-box flex" v-if="userInfo.ifAgent == 1">
        <div class="item" @click="pushRouter('/channel')">我的渠道</div>
        <div class="item" @click="pushRouter('/channelTab')">渠道报表</div>
      </div>
    </div>

    <van-cell-group>
      <van-cell v-if="userInfo.ifAgent != 1" title="申请成为推广员" @click="jumpAgent" is-link />
      <van-cell to="/msgCenter" is-link >
        <!-- 使用 title 插槽来自定义标题 -->
        <template #title>
          <van-badge dot v-if="hasNoReadMsg">
            <span class="custom-title">消息中心</span>
          </van-badge>
          <span v-else class="custom-title">消息中心</span>
          <!-- <van-tag type="danger">标签</van-tag> -->
        </template>
      </van-cell>
      <van-cell title="我的订单" :to="{path: '/orderList', query: {type: 1}}" is-link />
      <van-cell title="成绩查询" :to="{path: '/scoreList', query: {type: 2}}" is-link />
      <van-cell title="我的证书" to="/certificateType" is-link />
      <van-cell title="邮寄地址" to="/address" is-link />
      <van-cell title="我的钱包" to="/wallet" is-link />
    </van-cell-group>
    <CommonFt :active="2"></CommonFt>
  </div>
</template>

<script>
import CommonFt from '@/components/commonFt'
import { getMyPersonalInfo, getAgentStatus, getReadMessageCount } from '@/api/user'

export default {
  components: { CommonFt },
  data () {
    return {
      hasNoReadMsg: false,
      isLogin: false,
      userInfo: {
        nickName: '六羽',
        avatar: 'https://img.yzcdn.cn/vant/cat.jpeg',
        isAgent: true
      },
      agentInfo: {
        id: 123456789,
        erCode: 'https://img.yzcdn.cn/vant/cat.jpeg'
      },
      userInfo: {},
      agentResult: {}
    }
  },
  created () {
    this.getMyPersonalInfo()
    this.getReadMessageCount()
  },
  methods: {
    getReadMessageCount () {
      getReadMessageCount().then(res => {
        if (res.data && res.data > 0) {
          this.hasNoReadMsg = true
        }
      })
    },
    getMyPersonalInfo () {
      getMyPersonalInfo().then(res => {
        this.userInfo = res.data
        localStorage.setItem('userInfo', JSON.stringify(res.data));

        if (res.data.ifAgent != 1) {
          this.getAgentResult()
        }
      })
    },
    getAgentResult () {
      getAgentStatus().then(res => {
        this.agentResult = res.data
      })
    },
    jumpAgent () {
      if (this.agentResult == null) {
        this.$router.push("/applyPromoter")
      } else {
        this.$router.push("/applyResult")
      }
    },
    pushRouter (url) {
      this.$router.push(url)
    }
  }
}
</script>

<style lang="less">
.me .van-badge--fixed {
  top: 50%;
  right: -5px;
}
.user-head {
  position: relative;

  .agent-box {
    position: absolute;
    left: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.6);
    width: 100%;
    height: 40px;

    .item {
      width: 50%;
      height: 18px;
      line-height: 18px;
      text-align: center;
      color: #fff;
      text-decoration: underline;
    }

    .item:first-child {
      border-right: 1px solid #fff;
      box-sizing: border-box;
    }
  }
}
.user-info {
  padding-left: 18px;
  width: 100%;
  height: 214px;
  background: url(../../assets/user/bg_user.jpg) no-repeat center;
  background-size: 100%;
  justify-content: flex-start;

  .img-box {
    width: 100px;
    height: 100px;
  }

  .user-other {
    width: 200px;
  }
  .badge {
    position: relative;
    padding-left: 26px;
    padding-top: 2px;
    width: 90px;
    height: 30px;
    background: url(../../assets/user/bg_badge.png) no-repeat center;
    background-size: contain;

    span {
      position: absolute;
      left: 28px;
      top: 6px;
      width: 90px;
      /* transform: scale(0.9); */
    }
  }
}
</style>
