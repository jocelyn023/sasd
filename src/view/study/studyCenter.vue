<template>
  <div class="study-center">
    <!--  -->
    <van-tabs v-model="active" @change="onChange">
      <van-tab title="学习中">
        <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
          <template v-if="list && list.length > 0">
            <cardProgress
              v-for="(item, index) in list"
              :key="index"
              :item="item"
              @emitClick="clickItem"
            ></cardProgress>
          </template>
          <template v-else>
            <van-empty class="custom-image" description="暂无" />
            <div class="txt-c p-t-10">
              <van-button type="theme" @click="pushRouter('courseList')">去购买</van-button>
            </div>
          </template>
        </van-pull-refresh>
      </van-tab>

      <van-tab title="已学完">
        <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
          <template v-if="list && list.length > 0">
            <template v-for="(item, index) in list">
              <cardProgress :key="index"></cardProgress>
            </template>
          </template>
          <template v-else>
            <van-empty class="custom-image" description="暂无" />
            <div class="txt-c p-t-10">
              <van-button type="theme" @click="pushRouter('courseList')">去购买</van-button>
            </div>
          </template>
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
      list: [{
        id: 1,
      }]
    };
  },
  mounted() {
    this.onLoad()
  },
  methods: {
    pushRouter(page) {
      this.$router.push(page)
    },
    onChange () {
      this.onRefresh()
    },
    clickItem(val) {

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
      }

      if (this.active == 0) {
        getLearnList().then(res => {
          this.loading = false;
          this.finished = true;
          this.list = res.data
        })
      } else {
        getLearnFinishList().then(res => {
          this.loading = false;
          this.finished = true;
          this.list = res.data
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
