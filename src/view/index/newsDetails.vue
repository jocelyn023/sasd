<template>
  <div class="news-detail">
    <div class="m-b-10 f16 title">{{ detail.title }}</div>
    <div class="m-b-10 f12">
      <span class="m-r-10">{{ detail.pubTime }}</span>
      <span class="author">{{ detail.author }}</span>
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

  .title {
    color: #000;
    font-weight: bold;
  }
  .author {
    color: #0b65a7
  }
  p {
    margin-top: 0;
    margin-bottom: 10px;
    font-size: 14px;
    line-height: 28px;
    text-align: justify;
    word-wrap: break-word;
    word-break: break-word;
    -webkit-hyphens: auto;
    -ms-hyphens: auto;
    hyphens: auto;
    overflow: hidden;
  }
  img {
    /* padding-top: 10px; */
    max-width: 340px;
  }
}
</style>
