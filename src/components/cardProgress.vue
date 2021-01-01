<template>
  <div class="card-progress-wrap">
    <div class="card-progress flex m-b-20">
      <van-image
        class="m-r-15"
        width="90"
        height="64"
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
    <div class="txt-r">
      <van-button type="theme" @click="emitClick">{{ item.status == 1 ? '去考试中心' : '继续学习' }}</van-button>
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
.card-progress-wrap {
  margin: 0 auto 16px;
  padding: 20px 10px;
  width: 343px;
  background: #fff;
  border-radius: 2px;
  box-sizing: border-box;
  box-shadow: 0 0 5px 3px rgba(0, 0, 0, 0.1);

  .card-progress {
    .course-title {
      width: 213px;
      height: 16px;
      line-height: 16px;
    }
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
    margin-bottom: 0
  }
</style>
