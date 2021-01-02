<template>
  <div class="news-item">
    <div class="title van-ellipsis">{{ info.title }}</div>
    <div class="flex" v-if="info.imgs && info.imgs.length > 2">
      <van-image
        v-for="(item, index) in info.imgs"
        :key="index"
        :width="100"
        :height="140"
        fit="cover"
        :src="item"
      />
    </div>
    <template v-if="info.imgs && info.imgs.length == 1">
      <van-image
        v-for="(item, index) in info.imgs"
        :key="index"
        :width="323"
        :height="140"
        fit="cover"
        :src="item"
      />
    </template>

    <div class="f12 col-gray-6 other">
      <span class="m-r-10">{{ info.author }}</span>
      <span>{{ info.times }}</span>
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
}
</style>
