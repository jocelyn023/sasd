<template>
  <div>
    <van-nav-bar
      :title="msgType == 1 ? '系统公告' : '考试提醒'"
      left-arrow
      @click-left="onClickLeft"
    />

    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >

      <template v-for="item in list">
        <div class="msg-item flex" :key="item.id" @click="pushRouter(item.id)">
          <van-icon color="#a0191f" v-if="msgType == '1'" class="m-r-10" size="24px" name="setting-o" />
          <div style="width: 100%">
            <div class="flex title-box">
              <div class="flex">
                <van-badge v-if="msgType != '1'" dot class="m-r-5" />
                <span class="van-ellipsis msg-title f16">{{msgType == '1'?'系统公告': '考试提醒'}}</span>
              </div>
              <div>2020-01-01</div>
            </div>
            <div class="subtitle van-multi-ellipsis--l2">{{item.content}}</div>
          </div>
        </div>
      </template>
    </van-list>
  </div>
</template>

<script>
export default {
  data() {
    return {
      msgType: this.$route.query.type, //1 系统公告， 2考试提醒
      loading: false,
      finished: false,
      list: [{
        id: 1,
        title: '',
        content: '1消息中心消息中心消息中心消息中心消息中心消息中心消息中心消息中心消息中心消息中心消息中心消息中心消息中心'
      }, {
        id: 2,
        title: '',
        content: '2消息中心消息中心消息中心消息中心消息中心消息中心消息中心消息中心消息中心消息中心消息中心消息中心消息中心'
      }]
    }
  },
  methods:{
    onLoad() {
      this.loading = true
      this.finished = true
    },
    pushRouter(id) {
      this.$router.push({
        path: '/msgDetails',
        query: {
          id: id
        }
      })
    },
    onClickLeft() {
      this.$router.go(-1)
    },
  }
};
</script>

<style lang="less" scoped>
.msg-item {
  padding: 10px 20px;
  align-items: center;
  justify-content: flex-start;
  border-bottom: 1px solid #ececec;
}
.msg-item:last-child {
  border-bottom: none;
}
.title-box {
  width: 100%;
  flex-shrink: 1;
}
.msg-title {
  display: inline-block;
  width: 100%;
  height: 20px;
  line-height: 20px;
}
.msg-subtitle {

}
</style>
