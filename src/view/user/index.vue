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
      <template v-if="userInfo.isAgent">
        <van-image
          width="75"
          height="75"
          fit="contain"
          :src="agentInfo.erCode"
        >
        </van-image>
      </template>
    </div>

    <van-cell-group>
      <!-- <van-cell icon="points" title="消息中心" is-link /> -->
      <van-cell to="/msgCenter" title="消息中心" is-link />
      <van-cell :to="{path: '/orderList', query: {type: 1}}" title="我的订单" is-link />
      <van-cell :to="{path: '/orderList', query: {type: 2}}" title="成绩查询" is-link />
      <van-cell to="/msgList" title="我的证书" is-link />
      <van-cell to="/msgList" title="邮寄地址" is-link />
      <van-cell to="/msgList" title="我的钱包" is-link />
      <van-cell to="/msgList" title="消息中心" is-link />
      <van-cell to="/msgList" title="消息中心" is-link />
    </van-cell-group>
    <CommonFt :active="2"></CommonFt>
  </div>
</template>

<script>
import CommonFt from '@/components/commonFt'

export default {
  components: { CommonFt },
  data() {
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
};
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
