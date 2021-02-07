<template>
  <div class="card-progress-wrap">
    <div class="card-progress flex m-b-20">
      <div class="thumbnail-box m-r-15">
        <van-image
          class="thumbnail"
          fit="cover"
          :src="item.thumbnail"
        />

        <p class="online-status" v-if="item.teachingType" :class="item.teachingType == 'ON'?'green_bg':'red_bg'">
          <span>{{ item.teachingType == 'ON' ? '线上':'线下'}}</span>
        </p>
      </div>
      <div class="flex-auto">
        <div class="van-ellipsis m-b-10 course-title">{{ item.courseName }}</div>
        <div class="col-gray-9 f12 course-num">
          <span>共{{ item.totalRecord }}节</span>｜
          <span>已学习{{ item.finishRecord }}节</span>
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
      <van-button type="theme" @click="emitClick">{{ percentage == 100 ? '重新学习' : '继续学习' }}</van-button>
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
        this.percentage = parseInt(val.finishRecord / val.totalRecord * 100)
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

  .online-status {
      color: #fff;
      position: absolute;
      top: 0;
      right: 0;
      margin: 0;
      &.red_bg{
         &:after{
           border-color: transparent transparent #a0191f;
         }
      }

      span {
        position: relative;
        z-index: 2;
        transform: rotate(45deg);
        display: block;
        padding-left: 16px;
        margin-right: -4px;
        font-size: 9px;
      }

      &:after {
        content: "";
        position: absolute;
        top: -22px;
        right: -22px;
        z-index: 1;
        transform: rotate(45deg);
        width: 0;
        height: 0;
        border: 22px solid;
        border-color: transparent transparent #31ad37;
      }
  }
  .card-progress {
    .thumbnail-box {
      position: relative;
    }
    .thumbnail {
      width: 90px;
      height: 64px;
    }
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
