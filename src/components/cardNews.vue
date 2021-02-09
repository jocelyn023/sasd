<template>
  <div class="news-item">
    <div class="title van-ellipsis">{{ info.title }}</div>

    <div class="flex" v-if="info.picType == 2">
      <template v-for="(item, index) in info.thumbnails">
        <van-image
          class="img-box"
          v-if="index <= 2"
          :key="index"
          fit="cover"
          :src="item"
        />
      </template>
    </div>

    <template v-if="info.picType == 1">
      <template v-for="(item, index) in info.thumbnails">
        <van-image
          v-if="index == 0"
          class="img-box"
          :key="index"
          fit="cover"
          :src="item"
        />
      </template>
    </template>

    <div class="f12 col-gray-6 other">
      <span v-if="info.author" class="m-r-10">{{ info.author }}</span>
      <span>{{ info.pubTime }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "commonCover",
  props: {
    info: {
      type: Object,
      default: () => {
        return {};
      },
      required: true
    }
  },
  data() {
    return {};
  },
  methods: {}
};
</script>

<style lang="less" scoped>
.news-item {
  width: 100%;

  .title {
    width: 100%;
    height: 40px;
    line-height: 40px;
  }
  .other {
    height: 24px;
    line-height: 24px;
  }
  .img-box {
    width: 323px;
    height: 140px;
  }
  .flex .img-box {
    width: 100px;
    height: 140px;
  }
}
</style>
