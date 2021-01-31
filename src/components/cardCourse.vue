<template>
  <div class="card-course-wrap flex m-b-20">
    <van-image
      class="m-r-10"
      width="90"
      height="56"
      fit="cover"
      :src="item.thumbnail"
    />
    <div class="flex-auto">
      <div class="van-ellipsis m-b-10 course-title">{{ item.name }}</div>
      <div class="flex">
        <span class="col-gray-9 f12">{{ item.duration }}</span>
        <van-button v-if="item.ifTry == 1 && !item.isPay" type="info" plain hairline @click="handeClick">试看</van-button>
        <van-button v-else-if="item.learnStatus == 'LEARNING'" type="info" plain hairline @click="handeClick">学习中</van-button>
        <span class="col-gray-9 f12"v-else-if="item.learnStatus == 'LEARNED'">已学习</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "cardCourse",
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
    handeClick(){
      this.$emit("handleClick",this.item)
    }
  }
};
</script>

<style lang="less" scoped>
.card-course-wrap {
  padding: 15px 16px;
  width: 100%;
  border-bottom: 1px solid #d7d7d7;

  .course-title {
    margin-bottom: 16px;
    width: 244px;
    height: 16px;
    line-height: 16px;
  }

  .van-button.van-button--info {
    height: 18px;
    line-height: 18px;
    font-size: 12px;
    border-color: #a0191f;
    color: #333;
    overflow: hidden;
  }
  .van-button--hairline::after {
    border-radius: 18px;
  }

}
.card-progress-wrap:last-child{
    margin-bottom: 0;
    border-bottom: none;
  }
</style>
