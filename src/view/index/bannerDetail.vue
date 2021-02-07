<template>
  <div class="new-detail">
    <div class="m-b-10 f16">{{ detail.adName }}</div>
    <div class="m-b-10">
      <span class="m-r-10">{{ detail.modifyBy }}</span>
      <span>{{ detail.modifyDate }}</span>
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
  width: 360px;

  img {
    max-width: 360px;
  }
}
</style>
<style lang="less" scoped>
  .buttons {
    margin: 0 auto 20px;
    width: 343px;
    height: 75px;
    background: #fff;
    border-radius: 5px;
    box-shadow: 0 0 5px 5px rgba(0, 0, 0, 0.1);

    .item {
      width: 50%;
      height: 100%;
      justify-content: center;
    }
    .item:first-child {
      border-right: 1px solid #c9c9c9;
    }
  }
  .container {
    padding: 0 16px;
  }
  .see-more {
    // width: 100%;
    height: 24px;
    line-height: 24px;
    text-align: right;
  }

  .notice-wrap {
    margin: 0 auto;
    width: 343px;
    box-shadow: 0 0 5px 5px rgba(0, 0, 0, 0.1);
    border-radius: 5px;

    .title {
      padding-top: 14px;
      padding-left: 10px;
      padding-right: 10px;
      height: 42px;
    }

    .item-new {
      padding-left: 10px;
      padding-right: 10px;
      padding-bottom: 9px;
      width: 100%;
      border-bottom: 1px solid #ececec;
    }
    .item-new:last-child{
      border: none;
    }
  }
</style>
