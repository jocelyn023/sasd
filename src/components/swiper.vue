<template>
  <div class="swiper" id="swiper">
    <van-swipe :autoplay="3000">
      <van-swipe-item class="banner-item" v-for="(item, key) in bannerList" :key="key" @click="clickBanner(item)">
        <van-image
          class="m-r-10"
          :width="width"
          :height="height"
          fit="cover"
          lazy-load
          :src="item.img"
        />
        <div class="title van-ellipsis col-white f12">{{ item.title }}</div>
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
export default {
  name: "cardCourse",
  props: {
    width: {
      type: Number,
      default: 375
    },
    height: {
      type: Number,
      default: 200
    },
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
    clickBanner(val) {
      if (val && val.link) {
        this.$router.push({
          path: val.link,
          query: {
            id: val.id
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
