<template>
  <div class="examstep_1-page">
    <van-form @submit="saveExamInfo" v-if="examInfo.purchaseId">
      <div class="user-pic">
        <img v-if="examInfo.photoAddr" :src="examInfo.photoAddr" />
        <img v-else src="../../assets/exam/default.jpg" />
        <!-- <van-uploader :after-read="afterRead">
          <img :src="fileList[0].url" />
        </van-uploader> -->
      </div>
      <div v-if="examInfo.photoAddr">
        <p>
          <van-icon name="checked" color="#07c160" style="position: relative; top: 2px;" /> 上传成功
        </p>
        <div class="buy-user-info">
          <h3>基础信息填写</h3>
          <div>
            <van-field v-model="examInfo.fullName" :rules="[{ required: true, message: '请输入姓名' }]" label="姓名" placeholder="请输入姓名" />
            <van-field v-model="examInfo.sexStr" :rules="[{ required: true, message: '请选择性别' }]" label="性别" placeholder="请选择性别" @click="showPicker(1)" readonly />
            <van-field v-model="examInfo.contract" :rules="[{ required: true, message: '请输入联系方式' }]" label="联系方式" placeholder="请输入联系方式" />
            <van-field v-model="examInfo.cardTypeStr" :rules="[{ required: true, message: '请选择证件类型' }]" label="证件类型" placeholder="请选择证件类型" @click="showPicker(2)"
              readonly />
            <van-field v-model="examInfo.cardNo" :rules="[{ required: true, message: '请输入证件号' }]" label="证件号" placeholder="请输入证件号" />
          </div>
        </div>
      </div>
      <p v-else>
        样例：请提交一寸红底免冠照片用于证书的制作 （注意：照片尺寸为 2.5*3.5cm）
      </p>
      <div class="step-btn-group" v-if="examInfo.photoAddr">
        <van-uploader :max-size="maxUploadSize" :before-read="beforeRead" :after-read="afterRead" @oversize="onOversize">
          <van-button type="theme" plain class="btn">重新上传</van-button>
        </van-uploader>
        <van-button type="theme" class="btn" native-type="submit">下一步</van-button>
      </div>
      <div class="submit-btn-box" v-else>
        <van-uploader :max-size="maxUploadSize" :before-read="beforeRead" :after-read="afterRead" @oversize="onOversize">
          <van-button type="theme" class="btn">提交一寸红底证件照</van-button>
        </van-uploader>
      </div>
      <van-popup v-model="pickerVisiable" round position="bottom" :style="{ height: '40%' }">
        <van-picker v-show="selectActive == 1" show-toolbar :columns="sexList" @cancel="pickerVisiable = false"
          @confirm="onConfirm" />
        <van-picker v-show="selectActive == 2" show-toolbar :columns="cardTypeList" @cancel="pickerVisiable = false"
          @confirm="onConfirm" />
      </van-popup>
    </van-form>
  </div>
</template>

<script>
  import {
    getToken,
    uploadFileToQiniu
  } from '@/api/common'
  import {
    saveExamInfo
  } from '@/api/exam'
  import {
    serchByKeyGroup
  } from '@/api/common'
  import examMixin from "@/mixins/exam";
  export default {
    mixins: [examMixin],
    data() {
      return {
        maxUploadSize: 1024 * 1024 * 3,
        selectActive: 1,
        pickerVisiable: false,
        userInfo: {},
        status: 1,
        cardTypeList: [],
        sexList: [],
        fileList: [{
          url: 'https://img.yzcdn.cn/vant/leaf.jpg'
        }],
      };
    },
    created() {
      this.getExamInfo(1);
      this.getSexList();
    },

    methods: {
      showPicker(active) {
        this.selectActive = active;
        this.pickerVisiable = true;
      },
      onConfirm(value) {
        this.pickerVisiable = false;
        if (this.selectActive == 1) {
          this.examInfo.sex = value.key
          this.examInfo.sexStr = value.text
        } else if (this.selectActive == 2) {
          this.examInfo.cardType = value.key
          this.examInfo.cardTypeStr = value.text
        }
      },
      getCardTypeList() {
        serchByKeyGroup("CARD_TYPE").then(res => {
          this.cardTypeList = res.data.map(item => {
            return {
              text: item.value,
              key: item.keyName
            }
          })
          this.getText();
        })
      },
      getSexList() {
        serchByKeyGroup("SEX").then(res => {
          this.sexList = res.data.map(item => {
            return {
              text: item.value,
              key: item.keyName
            }
          })
          this.getCardTypeList();
        })
      },
      getText() {
        let _this = this;
        if (this.examInfo.purchaseId) {
          this.sexList.forEach(item => {
            if (item.key == this.examInfo.sex) {
              this.examInfo.sexStr = item.text
            }
          })
          this.cardTypeList.forEach(item => {
            if (item.key == this.examInfo.cardType) {
              this.examInfo.cardTypeStr = item.text
            }
          })
        } else {
          setTimeout(() => {
            _this.getText();
          }, 1000)
        }
      },
      saveExamInfo() {
        let params = {
          id: this.examInfo.id,
          fullName: this.examInfo.fullName,
          sex: this.examInfo.sex,
          contract: this.examInfo.contract,
          cardType: this.examInfo.cardType,
          cardNo: this.examInfo.cardNo,
          photoAddr: this.examInfo.photoAddr
        }

        saveExamInfo(params).then(res => {
          this.nextStep(2)
        })
      },
      onOversize(file) {
        Toast('文件大小不能超过' + this.maxUploadSize / 1024 / 1024);
      },
      async beforeRead(file) {
        await getToken({}).then(res => {
          const fileName = file.name
          this.uploadParams = {
            token: res.data,
            key: 'picture/' + new Date().getTime() + '.' + fileName.split('.').pop().toLowerCase(),
            name: fileName,
            file: file
          }
          return true;
        })
      },
      afterRead(file) {
        let _this = this;
        file.status = 'uploading'
        file.message = '上传中...'
        uploadFileToQiniu(this.uploadParams, function (event) {
          //TODO 列表上传进度
          // _this.progressVal = parseInt((event.loaded / event.total) * 100);
          // option.onProgress({
          //     percent: parseInt((event.loaded / event.total) * 100)
          // });
        }).then(res => {
          console.log()
          file.url = process.env.VUE_APP_QINIU_DOMIN + this.uploadParams.key
          _this.examInfo.photoAddr = file.url
          file.status = 'complete'
          file.message = ''
        })
      },
    }
  };
</script>

<style lang="less" scoped>
  .examstep_1-page {
    padding-top: 0;
    /deep/.van-field__error-message {
      text-align: right;
    }
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
      width: auto;
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
          background-color: #fff;
        }
      }
    }
  }
</style>