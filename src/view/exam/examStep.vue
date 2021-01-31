<template>
  <div class="">
    <div class="step-block">
      <van-steps :active="active">
        <van-step>上传一寸照</van-step>
        <van-step>笔试成绩</van-step>
        <van-step>考试视频</van-step>
        <van-step>填证书地址</van-step>
      </van-steps>
    </div>

    <router-view :key="active+ 'step'" />
  </div>
</template>

<script>
  export default {
    data() {
      return {
        active: this.$route.meta.stepActive,
      };
    },
    watch: {
      $route() {
        this.active = this.$route.meta.stepActive
      }
    },
    methods: {}
  };
</script>

<style lang="less" scoped>
  .step-block {
    padding: 15px 42px;

    /deep/.van-steps--horizontal {
      padding: 0;
    }

    /deep/.van-steps {
      overflow: unset;
    }

    /deep/.van-step__circle {
      width: 12px;
      height: 12px;
    }

    /deep/.van-step--horizontal .van-step__icon {
      font-size: 13px;
    }

    /deep/.van-step--horizontal:first-child .van-step__title {
      -webkit-transform: translateX(-50%);
      transform: translateX(-50%);
    }

    /deep/.van-step--horizontal:last-child .van-step__title {
      -webkit-transform: translateX(50%);
      transform: translateX(50%);
    }
  }
</style>