<template>
  <div class="cover-block">
    <div class="pic-box">
      <van-image
        :width="width"
        :height="height"
        fit="cover"
        :src="info.path"
      />
    </div>
    <div class="cover-item">
      <p class="van-ellipsis">{{info.desc}}</p>
      <span class="price">￥{{info.price}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "commonCover",
  props: {
    width: {
      type: Number,
      default: 343
    },
    height: {
      type: Number,
      default: 130
    },
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
.cover-block {
  .pic-box {
    width: 100%;
    overflow: hidden;
    border-radius: 10px;
  }

  .cover-item {
    display: flex;
    line-height: 24px;
    padding: 10px 0;
    p {
      margin: 0;
      padding: 0;
      font-size: 15px;
      color: #333333;
    }
    .price {
      display: inline-block;
      text-align: left;
      color: #a0191f;
      padding-left: 17px;
    }
  }
}
</style>
<style lang="less">
  .cover-block {
    .van-image {
      display: block
    }
  }
</style>
