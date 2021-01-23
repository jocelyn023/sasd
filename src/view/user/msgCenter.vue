<template>
  <div>
    <van-cell-group>
      <template v-for="(item, index) in msgType">
        <van-cell :key="index" :to="{path: '/msgList', query: {title: item.messageTypeName, type: item.messageType}}" is-link>
          <template #title>
            <div class="flex msg-list-title icon-notice" style="justify-content: flex-start">
              <span class="m-r-10">{{ item.messageTypeName }}</span>
              <van-badge color="#a0191f" :content="item.toReadCount" max="99" />
            </div>
          </template>
        </van-cell>
      </template>
    </van-cell-group>
  </div>
</template>

<script>
import { messageCenter } from '@/api/user'

export default {
  data() {
    return {
      isLogin: false,
      msgType: []
    }
  },
  created () {
    this.getMsgCenter()
  },
  methods:{
    getMsgCenter () {
      messageCenter().then(res => {
        this.msgType = res.data;
      })
    }
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
