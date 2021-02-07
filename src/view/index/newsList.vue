<template>
  <div class="news-list">
    <van-nav-bar
      safe-area-inset-top
      :title="title"
      left-arrow
      @click-left="onClickLeft"
    />
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <div
          class="item-new"
          v-for="(item, index) in list"
          :key="index"
          @click="clickBanner(item)"
        >
          <cardNews :info="item"></cardNews>
        </div>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import cardNews from '@/components/cardNews'
import { getIndexNewsList } from '@/api/index'


export default {
  components: { cardNews },

  data() {
    return {
      params: {
        rows: 10,
        page: 1,
        queryConditions:{
          articleType: "1348846386056130562"
        }
      },
      list: [],
      loading: false,
      finished: false,
      refreshing: false,
      title: "其他新闻"
    };
  },
  created () {
    this.params.queryConditions.articleType = this.$route.query.articleType;
    this.title = this.$route.query.navName
  },
  mounted () {},
  methods: {
    onClickLeft () {
      this.$router.go(-1)
    },
    clickBanner(item) {
      if (item.contentUrl != null) {
        if (item.adDetailUrl.indexOf('?') == -1) {
          window.location.href = item.contentUrl + "?id = " + item.id
        } else {
          window.location.href = item.contentUrl + "&id = " + item.id
        }
      }
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
    onLoad() {
      if (this.refreshing) {
        this.list = [];
        this.refreshing = false;
        this.params.page = 1;
      }
      getIndexNewsList(this.params).then(res => {
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
    }
  }
};
</script>

<style lang="less" scoped>
  .news-list {
    margin: 0 auto;
    width: 100%;

    .title {
      padding-top: 14px;
      padding-left: 10px;
      padding-right: 10px;
      height: 42px;
    }

    .item-new {
      padding-left: 26px;
      padding-right: 26px;
      padding-bottom: 9px;
      width: 100%;
      border-bottom: 1px solid #ececec;
    }
    .item-new:last-child{
      border: none;
    }
  }
</style>