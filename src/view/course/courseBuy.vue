<template>
  <div class="course-buy-page">
    <div class="buy-user-info">
      <h3>基础信息填写</h3>
      <div>
        <van-field v-model="userInfo.name" label="姓名" placeholder="请输入用户名" />
        <van-field v-model="userInfo.name" label="联系方式" placeholder="请输入用户名" />
      </div>
    </div>
    <div class="buy-course-info">
      <h3>课程信息</h3>
      <commonCover :info="info"></commonCover>
    </div>
    <div class="b-buy-box">
      <p><span class="col-gray-9 f12">价格</span> 399.00</p>
      <van-button type="theme" class="btn">确认支付</van-button>
    </div>

    <van-action-sheet v-model="sexShow" :actions="actions" @select="onSelect" />
    <van-action-sheet v-model="typeShow" :actions="typeActions" @select="onSelectType" />
  </div>
</template>

<script>
  import commonCover from "@/components/commonCover";
  export default {
    components: {
      commonCover
    },
    data() {
      return {
        sexShow: false,
        typeShow: false,
        value: "",
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
        userInfo: {
          name: ""
        },
        info: {
          path: "https://img.yzcdn.cn/vant/cat.jpeg",
          desc: "这是一段1最多显示一行的文这是一段最多显示一行的文字，多余的内容会被省略",
          price: "132"
        }

      };
    },

    methods: {
      onSelect(item) {
        console.log(item);
        this.sexShow = false;
        this.userInfo.sex = item.name;
      },
      onSelectType(item) {
        console.log(item);
        this.typeShow = false;
        this.userInfo.type = item.name;
      },
    }
  };
</script>

<style lang="less" scoped>
  .course-buy-page {
    padding: 5px 16px 68px;

    .buy-user-info {
      width: 343px;
      background: #ffffff;
      border-radius: 6px;
      box-shadow: 0 1px 10px 4px #ebebeb;
      margin-bottom: 15px;
      margin-top: 15px;
      padding: 20px 12px;

      h3 {
        font-size: 16px;
        font-weight: bold;
        margin: 0;
      }

      /deep/.van-cell {
        padding: 5px 0;
      }
      /deep/.van-field__label{
        color: #333;
      }

      /deep/.van-field__control {
        text-align: right;
      }
    }

    .buy-course-info {
      h3 {
        font-size: 16px;
        font-weight: bold;
        margin: 0;
        padding-top: 5px;
        padding-bottom: 15px;
      }

      /deep/.cover-block .pic-box {
        height: 130px;
      }
    }

    .b-buy-box {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 19px 16px;
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      width: 100%;
      width: 100%;
      height: 68px;
      background: #ffffff;
      border-top: 1px solid #999999;
      box-shadow: 1px 1px 0px 0px rgba(223, 221, 221, 0.75);

      .btn {
        width: 125px;
        height: 30px;
        font-size: 15px;
        border-radius: 15px;
        background: #a0191f;
        line-height: 0.8rem;
      }
    }

  }
</style>