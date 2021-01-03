<template>
  <div>
    <van-cell-group>
      <van-cell :to="{path: '/msgList', query: {type: 1}}" is-link>
        <template #title>
          <div class="flex msg-list-title icon-notice" style="justify-content: flex-start">
            <span class="m-r-10">系统公告</span>
            <van-badge color="#a0191f" :content="200" max="99" />
          </div>
        </template>
      </van-cell>

      <van-cell :to="{path: '/msgList', query: {type: 2}}" is-link>
        <template #title>
          <div class="flex msg-list-title icon-chat" style="justify-content: flex-start">
            <span class="m-r-10">考试提醒</span>
            <van-badge color="#a0191f" :content="200" max="99" />
          </div>
        </template>
      </van-cell>
    </van-cell-group>
  </div>
</template>

<script>
export default {
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
  },
  methods:{
  }
};
</script>

<style lang="less" scoped>
.msg-list-title {
  padding-left: 32px;
}
.icon-notice {
  background: url(../../assets/user/icon_notice.png) no-repeat 0 center;
  background-size: 24px;
}
.icon-chat {
  background: url(../../assets/user/icon_chat.png) no-repeat 0 center;
  background-size: 24px;
}
</style>
