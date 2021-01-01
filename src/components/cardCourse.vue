<template>
  <div class="card-course-wrap flex m-b-20">
    <van-image
      class="m-r-10"
      width="90"
      height="56"
      fit="contain"
      :src="item.img"
    />
    <div class="flex-auto">
      <div class="van-ellipsis m-b-10 course-title">{{ item.title }}</div>
      <div class="col-gray-9 f12 course-num">
        <span>共{{ item.courseNum }}节</span>｜
        <span>已学习{{ item.learned }}节</span>
      </div>
      <div>
        <div v-if="percentage != 100" class="col-gray-9 f12 txt-r">已学习{{ percentage }}%</div>
        <div v-else class="col-gray-9 f12 txt-r">已学完</div>
        <div class="progress-bar">
          <div class="bar" :style="'width: ' + percentage + '%'"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "cardProgress",
  watch: {
    item: {
      immediate: true,
      handler(val) {
        this.percentage = parseInt(val.learned/val.courseNum*100)
      }
    }
  },
  props: {
    item: {
      type: Object,
      default: () => ({}),
      required: true
    },
  },
  data() {
    return {
      percentage: 0
    };
  },
  methods: {
    emitClick() {
      this.$emit("emitClick", this.item)
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
    width: 213px;
    height: 16px;
    line-height: 16px;
  }
  .card-progress {
    
    .course-num {
      padding-left: 16px;
      box-sizing: border-box;
      background: url(../assets/icon_play.png) left center no-repeat;
      background-size: 11px;
    }
    .progress-bar {
      position: relative;
      width: 100%;
      height: 4px;
      border-radius: 2px;
      background: #bfbfbf;
      overflow: hidden;

      .bar {
        position: absolute;
        left: 0;
        top: 0;
        width: 0;
        height: 100%;
        background-image: linear-gradient(-90deg,	#a0191f 0%,	#c8363d 50%, #f0535a 100%), linear-gradient(#a0191f,	#a0191f);
      }
    }
  }

  .van-button {
    height: 20px;
    line-height: 20px;
    border-radius: 5px;
    font-size: 12px;
  }

}
.card-progress-wrap:last-child{
    margin-bottom: 0;
    border-bottom: none;
  }
</style>
