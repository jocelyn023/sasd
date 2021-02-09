<template>
  <div>
    <!-- <van-nav-bar
      safe-area-inset-top
      :title="title"
      left-arrow
      @click-left="onClickLeft"
    /> -->

    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text=""
        @load="onLoad"
      >
        <template v-for="(item, index) in list">
          <div class="msg-item flex" :key="index" @click="pushRouter(item.id)">
            <van-icon color="#a0191f" v-if="title == 'system'" class="m-r-10" size="24px" name="setting-o" />
            <div style="width: 100%">
              <div class="flex title-box">
                <div class="flex">
                  <van-badge v-if="item.status == 'to_read'" dot class="m-r-5" />
                  <span class="van-ellipsis msg-title f16">{{ item.title }}</span>
                </div>
                <div>{{ item.createDate }}</div>
              </div>
              <div class="subtitle van-multi-ellipsis--l2">{{ item.content }}</div>
            </div>
          </div>
        </template>
        <template v-if="list && list.length == 0">
          <van-empty description="暂无消息" />
        </template>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getMessagePageByType } from '@/api/user'

export default {
  data() {
    return {
      title: this.$route.query.title,
      params: {
        rows: 10,
        page: 1,
        queryConditions:{
          messageType: this.$route.query.type
        }
      },
      loading: false,
      finished: false,
      refreshing: false,
      list: []
    }
  },
  methods:{
    onLoad() {
      if (this.refreshing) {
        this.list = [];
        this.refreshing = false;
        this.params.page = 1;
      }
      getMessagePageByType(this.params).then(res => {
        this.loading = false;
        this.params.total = res.data.total;
        if (this.params.page < res.data.pages) {
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
      this.refreshing = true;
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
    },
    onClickLeft () {
      this.$router.go(-1)
    }
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
</style>
