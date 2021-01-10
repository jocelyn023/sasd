<template>

  <div>
    <div class="user-info bg-theme flex ">
      <van-image
        class="m-r-15"
        width="100"
        height="100"
        round
        fit="cover"
        :src="userInfo.avatar"
      >
      </van-image>
      <div class="user-other">
        <div class="f16 col-white" :class="{'m-b-10': userInfo.isAgent}">{{ userInfo.nickName }}</div>
        <template v-if="userInfo.isAgent">
          <div class="f12 col-white m-b-10">代理商编码：{{ agentInfo.id }}</div>
          <div class="badge f12">申请成为代理</div>
        </template>
        <!-- <div>填写基本信息</div>
        <div>申请成为代理商</div> -->
      </div>
    </div>

    <van-cell-group>
      <van-cell title="申请成为推广员" to="/applyPromoter" is-link />
      <van-cell title="消息中心" to="/msgCenter" is-link />
      <van-cell title="我的订单" :to="{path: '/orderList', query: {type: 1}}" is-link />
      <van-cell title="成绩查询" :to="{path: '/scoreList', query: {type: 2}}" is-link />
      <van-cell title="我的证书" to="/msgList" is-link />
      <van-cell title="邮寄地址" to="/address" is-link />
      <van-cell title="我的钱包" to="/msgList" is-link />
    </van-cell-group>
    <CommonFt :active="2"></CommonFt>
  </div>
</template>

<script>
import CommonFt from '@/components/commonFt'

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
      }
    }
  }
}
</script>

<style lang="less">
.user-info {
  padding-left: 18px;
  width: 100%;
  height: 214px;
  background: url(../../assets/user/bg_user.jpg) no-repeat center;
  background-size: 100%;
  justify-content: flex-start;

  .user-other {
    width: 148px;
  }
  .badge {
    width: 77px;
    height: 23px;
    background: url(../../assets/user/bg_badge.png) no-repeat center;
    background-size: contain;
  }
}
</style>
