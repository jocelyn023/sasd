<template>
  <div class="cover-block">
    <p class="online-status" v-if="info.courseStatus" :class="info.courseStatus=='teaching'?'green_bg':'red_bg'">
      <span>{{info.courseStatusValue}}</span></p>
    <div class="pic-box">
      <van-image class="img" fit="cover" :src="info.thumbnail" />
    </div>
    <div class="cover-item">
      <p class="van-ellipsis">{{info.name}}</p>
      <span class="price">￥{{info.price}}</span>
    </div>
    <div class="cover-item gray-color">
      <p class="mr10">课程方式：{{info.teachingTypeValue}}</p>
      <p class="van-ellipsis" v-if="info.teachingType != 'ON'">地区：{{info.cityNamePath}}</p>
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
    position: relative;
    overflow: hidden;
    border-radius: 10px;

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
        padding-left: 27px;
        margin-right: -5px;
        font-size: 9px;
      }

      &:after {
        content: "";
        position: absolute;
        top: -38px;
        right: -38px;
        z-index: 1;
        transform: rotate(45deg);
        width: 0;
        height: 0;
        border: 37.5px solid;
        border-color: transparent transparent #31ad37;
      }

    }

    .pic-box {
      width: 100%;
      overflow: hidden;
      border-radius: 10px;

      .img {
        width: 343px;
        height: 130px;
      }
    }

    .cover-item {
      display: flex;
      line-height: 24px;
      padding-top: 10px;

      &.gray-color {
        padding-bottom: 10px;
        padding-top: 0;
        color: #999;

        p {
          font-size: 12px;
          color: #999999;
          margin-right: 10px;
          white-space: nowrap;
        }
      }

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