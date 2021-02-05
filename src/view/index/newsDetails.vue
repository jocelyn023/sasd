<template>
  <div class="news-detail">
    <div class="m-b-10 f16 title">{{ detail.title }}</div>
    <div class="m-b-10">
      <span class="m-r-10">{{ detail.author }}</span>
      <span>{{ detail.pubTime }}</span>
    </div>

    <div class="content-news" v-html="detail.content"></div>
  </div>
</template>

<script>
import { getNewsDetail } from '@/api/index'

export default {
  components: {},

  data() {
    return {
      detail: {},
    };
  },
  created () {
    this.getNewsDetail()
  },
  methods: {
    pushRouter(path) {
      this.$router.push(path)
    },
    getNewsDetail () {
      getNewsDetail({id: this.$route.query.id}).then(res => {
        this.detail = res.data;
      })
    }
  }
};
</script>
<style lang="less">
.news-detail {
  margin: 0 auto;
  width: 340px;
  p {
    margin-bottom: 10px;
  }
  img {
    padding-top: 10px;
    max-width: 340px;
  }
}
</style>
