<template>
  <div class="swiper" id="swiper">
    <van-swipe :autoplay="100000">
      <van-swipe-item class="banner-item" v-for="(item, key) in bannerList" :key="key" @click="clickBanner(item)">
        <van-image
          class="m-r-10 img-box"
          fit="cover"
          lazy-load
          :src="item.adThumbnail"
        />
        <div class="title van-ellipsis col-white f12">{{ item.adName }}</div>
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
export default {
  name: "cardCourse",
  props: {
    bannerList: {
      type: Array,
      default: () => ([]),
      required: true
    }
  },
  data() {
    return {};
  },
  methods: {
    clickBanner(item) {
      if (item.adDetailUrl != null) {
        if (item.adDetailUrl.indexOf('?') == -1) {
          window.location.href = item.adDetailUrl + "?id = " + item.id
        } else {
          window.location.href = item.adDetailUrl + "&id = " + item.id
        }
      } else {
        this.$router.push({
          path: '/bannerDetail',
          query: {
            id: item.id
          }
        })
      }
    }
  }
};
</script>

<style lang="less" scoped>
.swiper {
  position: relative;

  .banner-item {
    position: relative;

    .title {
      position: absolute;
      left: 0;
      bottom: 0;
      padding-left: 9px;
      padding-right: 145px;
      width: 100%;
      height: 40px;
      line-height: 40px;
      background: rgba(34, 32, 35, 0.3)
    }
    .img-box {
      width: 375px;
      height: 200px;
      overflow: hidden;
    }
  }
  
}
</style>
<style lang="less">
  #swiper .van-swipe__indicators {
    left: auto;
    right: 0;
    .banner-item {
    position: relative;

    .title {
      position: absolute;
      left: 0;
      bottom: 0;
      padding-left: 9px;
      padding-right: 145px;
      width: 100%;
      height: 40px;
      line-height: 40px;
      background: rgba(34, 32, 35, 0.3)
    }
  }
    .van-swipe__indicator {
      background: #fff;
      opacity: 0.42;
    }
    .van-swipe__indicator--active {
      opacity: 1;
    }
  }
</style>
