<template>
  <div class="study-center">
    <!--  -->
    <van-tabs v-model="active" @change="onChange">
      <van-tab title="学习中">
        <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
          <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad"
          >
            <!-- <template v-for="(item, index) in list">
              <cardProgress :key="index"></cardProgress>
            </template> -->
          </van-list>
        </van-pull-refresh>
      </van-tab>

      <van-tab title="已学完">
        <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
          <p>刷新次数: 1</p>
        </van-pull-refresh>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import cardProgress from '@/components/cardProgress'

import { getLearnList, getLearnFinishList } from '@/api/course'

export default {
  components: { cardProgress },
  data() {
    return {
      active: 0,
      loading: false,
      finished: false,
      refreshing: false,
      params: {
        rows: 10,
        page: 1,
        queryConditions:{
          messageType: this.$route.query.type
        }
      },
      list: [{
        id: 1,
      }]
    };
  },

  methods: {
    onChange () {
      this.onRefresh()
    },
    onRefresh () {
      // 清空列表数据
      this.finished = false;

      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      this.loading = true;
      this.onLoad();
    },
    onLoad() {
      if (this.refreshing) {
        this.list = [];
        this.refreshing = false;
        this.params.page = 1;
      }

      if (this.active == 0) {
        getLearnList().then(res => {
          this.loading = false;
          this.params.total = res.data.total;
          if (this.params.page < res.data.total) {
            this.params.page = this.params.page + 1
          } else {
            this.finished = true;
          }
        })
      } else {
        getLearnFinishList().then(res => {
          this.loading = false;
          this.params.total = res.data.total;
          if (this.params.page < res.data.total) {
            this.params.page = this.params.page + 1
          } else {
            this.finished = true;
          }
        })
      }
    },
  }
};
</script>

<style lang="less">
  .test {
    width: 750px;
    height: 750px;
    background: #333
  }
</style>
