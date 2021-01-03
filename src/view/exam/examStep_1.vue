<template>
  <div class="examstep_1-page">
    <div class="user-pic">
      <van-uploader :after-read="afterRead">
        <img :src="fileList[0].url" />
      </van-uploader>
    </div>
    <p v-if="status == 1">
      <van-icon name="checked" color="#07c160" style="position: relative; top: 2px;" /> 上传成功
    </p>
    <p v-else>
      样例：请提交一寸红底免冠照片用于证书的制作 （注意：照片尺寸为 2.5*3.5cm）
    </p>
    <div class="step-btn-group" v-if="status == 1">
      <van-button type="theme" plain class="btn">重新上传</van-button>
      <van-button type="theme" class="btn" to="/examStep_2">下一步</van-button>
    </div>
    <div class="submit-btn-box" v-else>
      <van-button type="theme" class="btn">提交一寸红底证件照</van-button>
    </div>
  </div>
</template>

<script>
  export default {

    data() {
      return {
        status: 1,
        fileList: [{
          url: 'https://img.yzcdn.cn/vant/leaf.jpg'
        }],
      };
    },

    methods: {
      afterRead(file) {
        // 此时可以自行将文件上传至服务器
        console.log(file);
      },
    }
  };
</script>

<style lang="less" scoped>
  .examstep_1-page {
    padding-top: 30px;

    .user-pic {
      width: 104px;
      height: 163px;
      margin: 0 auto;

      img {
        width: 100%;
        height: 100%;

      }
    }

    p {
      padding: 20px 58px;
      font-size: 12px;
      text-align: center;
      color: #040000;
      line-height: 1.5;
      margin: 0;
    }

    /deep/.van-uploader,
    /deep/ .van-uploader__wrapper {
      width: 100%;
      height: 100%;
    }

    .submit-btn-box {
      text-align: center;
      padding: 50px 0 0;

      .btn {
        width: 225px;
        height: 48px;
        background: #a0191f;
        border-radius: 7px;
        font-size: 16px;
      }
    }

    .step-btn-group {
      text-align: center;
      padding: 50px 0 0;

      .btn {
        width: 165px;
        height: 48px;
        border-radius: 5px 5px 5px 5px;

        &.van-button--plain {
          color: #000;
          margin-right: 15px;
        }
      }
    }
  }
</style>