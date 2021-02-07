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
            <div class="empty-box">
              <p class="txt-c">暂无学习记录</p>
              <p class="txt-c f12 col-gray-9">赶紧去选择您感兴趣的课程吧</p>
              <div class="txt-c p-t-10">
                <van-button type="theme" @click="pushRouter('courseList')">去找课程</van-button>
              </div>
            </div>
          </template>
        </van-pull-refresh>
      </van-tab>

      <van-tab title="已学完">
        <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
          <template v-if="list && list.length > 0">
            <template v-for="(item, index) in list">
              <cardProgress
                :key="index"
                :item="item"
                @emitClick="clickItem"
              ></cardProgress>
            </template>
          </template>
          <template v-else>
            <div class="empty-box">
              <p class="txt-c">暂无学习记录</p>
              <p class="txt-c f12 col-gray-9">赶紧去选择您感兴趣的课程吧</p>
              <div class="txt-c p-t-10">
                <van-button type="theme" @click="pushRouter('courseList')">去找课程</van-button>
              </div>
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
      list: []
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
      this.$router.push({
        path: 'courseDetail',
        query: {
          id: val.courseId,
          type: 1
        }
      })
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
.study-center {
  .test {
    width: 750px;
    height: 750px;
    background: #333
  }
  .van-pull-refresh {
    padding-top: 10px;
    padding-bottom: 10px;
  }
  .empty-box {
    padding-top: 232px;
    width: 100%;
    height: 404px;
    background: url(../../assets/no_class.png) no-repeat center 90px;
    background-size: 102px;
  }
}
</style>
