<template>
  <div class="card-progress flex">
    <van-image
      class="m-r-15"
      width="90"
      height="64"
      fit="contain"
      :src="item.img"
    />
    <div class="flex-auto">
      <p class="van-ellipsis">{{ item.title }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "cardProgress",
  props: {
    item: {
      type: Object,
      default: () => ({}),
      required: true
    },
  },
  data() {
    return {};
  },
  methods: {
  }
};
</script>

<style lang="less" scoped>
  .card-progress {
    margin: 0 auto 16px;
    padding: 20px 10px;
    width: 343px;
    background: #fff;
    border-radius: 2px;
    box-sizing: border-box;
    box-shadow: 0 0 5px 3px rgba(0, 0, 0, 0.1);
  }
  .card-progress:last-child{
    margin-bottom: 0
  }
</style>
