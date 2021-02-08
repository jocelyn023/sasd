<template>
  <div class="new-detail">
    <div class="m-b-10 f16 title">{{ detail.adName }}</div>
    <div class="m-b-10 f12">
      <span class="m-r-10">{{ detail.modifyDate }}</span>
      <span class="author">{{ detail.modifyBy }}</span>
    </div>

    <div class="content-news" v-html="detail.content"></div>
  </div>
</template>

<script>
import { getBannerDetail } from '@/api/index'

export default {
  components: {},

  data() {
    return {
      detail: {},
    };
  },
  created () {
    this.getBannerDetail()
  },
  methods: {
    pushRouter(path) {
      this.$router.push(path)
    },
    getBannerDetail () {
      getBannerDetail({id: this.$route.query.id}).then(res => {
        this.detail = res.data;
      })
    }
  }
};
</script>
<style lang="less">
.new-detail {
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
    max-width: 340px;
  }
}
</style>
