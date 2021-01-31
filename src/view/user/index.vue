<template>
  <div>
    <div class="user-head">
      <div class="user-info bg-theme flex ">
        <van-image
          class="m-r-15 img-box"
          round
          fit="cover"
          :src="userInfo.icon"
        >
        </van-image>
        <div class="user-other">
          <div class="f16 col-white" :class="{'m-b-10': userInfo.ifAgent}">{{ userInfo.nickName }}</div>
          <template v-if="userInfo.ifAgent == 1">
            <div class="f12 col-white m-b-10">代理商编码：{{ userInfo.agentNo }}</div>
            <div class="badge f12">
              <span v-if="userInfo.agentType == 'TEACHING_CAMP'">师资营</span>
              <span v-else>推广员</span>
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
      <van-cell v-if="userInfo.ifAgent == 0" title="申请成为推广员" @click="jumpAgent" is-link />
      <van-cell title="消息中心" to="/msgCenter" is-link />
      <van-cell title="我的订单" :to="{path: '/orderList', query: {type: 1}}" is-link />
      <van-cell title="成绩查询" :to="{path: '/scoreList', query: {type: 2}}" is-link />
      <van-cell title="我的证书" to="/msgList" is-link />
      <van-cell title="邮寄地址" to="/address" is-link />
      <van-cell title="我的钱包" to="/wallet" is-link />
    </van-cell-group>
    <CommonFt :active="2"></CommonFt>
  </div>
</template>

<script>
import CommonFt from '@/components/commonFt'
import { getMyPersonalInfo, getAgentStatus } from '@/api/user'

export default {
  components: { CommonFt },
  data () {
    return {
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
  },
  methods: {
    getMyPersonalInfo () {
      getMyPersonalInfo().then(res => {
        this.userInfo = res.data
        localStorage.setItem('userInfo', JSON.stringify(res.data));

        if (res.data.ifAgent == 0) {
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
    padding-left: 26px;
    padding-top: 2px;
    width: 77px;
    height: 23px;
    background: url(../../assets/user/bg_badge.png) no-repeat center;
    background-size: contain;
  }
}
</style>
