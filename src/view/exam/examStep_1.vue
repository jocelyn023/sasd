<template>
  <div class="examstep_1-page">
    <div class="user-pic">
      <van-uploader :after-read="afterRead">
        <img :src="fileList[0].url" />
      </van-uploader>
    </div>
    <div v-if="status == 1">
      <p>
        <van-icon name="checked" color="#07c160" style="position: relative; top: 2px;" /> 上传成功
      </p>
      <div class="buy-user-info">
        <h3>基础信息填写</h3>
        <div>
          <van-field v-model="userInfo.name" label="姓名" placeholder="请输入用户名" />
          <van-field v-model="userInfo.sex" label="性别" placeholder="请选择性别" @click="sexShow = true" readonly />
          <van-field v-model="userInfo.name" label="联系方式" placeholder="请输入用户名" />
          <van-field v-model="userInfo.type" label="证件类型" placeholder="请选择证件类型" @click="typeShow = true" readonly />
          <van-field v-model="userInfo.name" label="证件号" placeholder="请输入用户名" />
        </div>
      </div>
    </div>

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
    <van-action-sheet v-model="sexShow" :actions="actions" @select="onSelect" />
    <van-action-sheet v-model="typeShow" :actions="typeActions" @select="onSelectType" />
  </div>
</template>

<script>
  export default {

    data() {
      return {
        sexShow: false,
        typeShow: false,
        userInfo: {},
        status: 1,
        typeActions: [{
          name: "身份证"
        }, {
          name: "其他"
        }],
        actions: [{
          name: "男"
        }, {
          name: "女"
        }],
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
    padding-top: 0;

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
      padding: 15px 58px;
      font-size: 12px;
      text-align: center;
      color: #040000;
      line-height: 1.5;
      margin: 0;
    }

    .buy-user-info {
      width: 343px;
      background: #ffffff;
      border-radius: 6px;
      box-shadow: 0 1px 10px 4px #ebebeb;
      margin: 0 auto 15px;
      padding: 20px 12px;

      h3 {
        font-size: 16px;
        font-weight: bold;
        margin: 0;
      }

      /deep/.van-cell {
        padding: 5px 0;
      }

      /deep/.van-field__label {
        color: #333;
      }

      /deep/.van-field__control {
        text-align: right;
      }
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
      padding: 15px 0;

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