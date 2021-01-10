<template>
  <div class="apply-promoter">
    <div class="wrapper">
      <van-form @submit="onSubmit">
        <div class="label">
          <div class="f12 tips"><span class="col-theme">*</span> 请选择您要认证的类型</div>
          <van-field
            v-model="form.type"
            placeholder="请选择"
            is-link
            readonly
            @click="showPicker('applytype')"
            :rules="rules.type"
          />
        </div>

        <div class="label">
          <div class="f12 tips"><span class="col-theme">*</span> 请输入您的姓名</div>
          <van-field
            v-model="form.userName"
            placeholder="请输入"
            :rules="rules.userName"
          />
        </div>

        <div class="label">
          <div class="f12 tips"><span class="col-theme">*</span> 请选择您的证件类型</div>
          <van-field
            v-model="form.idenType"
            placeholder="请选择"
            is-link
            readonly
            @click="showPicker('identype')"
            :rules="rules.idenType"
          />
        </div>

        <div class="label">
          <div class="f12 tips"><span class="col-theme">*</span> 请输入您的证件号码</div>
          <van-field
            v-model="form.idCard"
            placeholder="请输入"
            :rules="rules.idCard"
          />
        </div>

        <div class="label">
          <div class="f12 tips"><span class="col-theme">*</span> 请输入您的联系电话</div>
          <van-field
            v-model="form.tel"
            placeholder="请输入"
            :rules="rules.tel"
          />
        </div>

        <div class="label">
          <div class="f12 tips"><span class="col-theme">*</span> 请提供身份证正反面照片</div>
          <van-uploader
            v-model="fileList"
            multiple
            :after-read="afterRead"
            :max-count="2"
          />
        </div>

        <div class="label">
          <div class="f12 tips"><span class="col-theme">*</span> 请提供身份证正反面照片</div>
          <van-field
            v-model="form.reason"
            rows="2"
            autosize
            type="textarea"
            maxlength="50"
            placeholder="请输入留言"
            show-word-limit
          />
        </div>
        
      </van-form>

    </div>
    <div class="txt-c">
      <van-button class="btn-submit" type="theme" native-type="submit" @click="onSubmit">提交</van-button>
    </div>
    <van-popup v-model="pickerConfig.show" round position="bottom">
      <van-picker
        :title="pickerConfig.title"
        show-toolbar
        :columns="pickerConfig.columns"
        @confirm="onConfirm"
        @cancel="closePicker"
      />
    </van-popup>
  </div>
</template>

<script>
export default {
  components: { },
  data () {
    return {
      pickerType: '',
      pickerConfig: {
        show: false,
        title: '',
        columns: []
      },
      typeColumns: ['杭州', '宁波', '温州', '绍兴', '湖州', '嘉兴', '金华', '衢州'],
      idenColumns: ['身份证', '护照'],
      form: {
        type: '',
        userName: '',
        idenType: '',
        idCard: '',
        tel: '',
        avatar: '',
        reason: ''
      },
      fileList: [{
        url: 'https://cloud-image',
        isImage: true,
        status: 'uploading',
        message: '上传中...'
      }],
      rules: {
        type: [{ required: false, message: '请选择认证类型' }],
        userName: [{ required: true, message: '请填写用户名' }],
        idenType: [{ required: false, message: '请选择证件类型' }],
        idCard: [{ required: true, message: '请填写用户名' }],
        tel: [{ required: true, message: '请填写联系电话' }],
        avatar: [{ required: true, message: '请填写用户名' }],
        reason: [{ required: true, message: '请填写用户名' }],
      }
    }
  },
  methods: {
    onSubmit() {
      this.$router.push({path: ''})
    },
    afterRead(file) {
      console.log(file)
      file.status = 'uploading';
      file.message = '上传中...';

      setTimeout(() => {
        file.status = 'failed';
        file.message = '上传失败';
      }, 1000);
    },
    showPicker(type) {
      this.pickerConfig.show = true
      this.pickerType = type
      if (type === 'applytype') {
        this.pickerConfig.title = "认证类型"
        this.pickerConfig.columns = this.typeColumns
      } else {
        this.pickerConfig.title = "证件类型"
        this.pickerConfig.columns = this.idenColumns
      }
      console.log(this.pickerConfig)
    },
    onConfirm(val, index) {
      this.closePicker()
      if (this.pickerType === 'applytype') {
        this.form.type = val
      }
    },
    closePicker() {
      this.pickerConfig.show = false
    }
  }
}
</script>

<style lang="less" scoped>
.apply-promoter {
  width: 100%;
  padding: 34px 15px 22px;

  .wrapper {
    width: 100%;
    margin-bottom: 28px;
    padding: 0 20px 50px;
    box-shadow: 0px 0px 4px 0px 
    rgba(6, 0, 1, 0.15);
    
    .label {
      margin-bottom: 26px;

      .tips {
        height: 20px;
        line-height: 20px;
      }
    }
  }
  .btn-submit {
    height: 40px;
    line-height: 40px;
    border-radius: 5px;
    width: 244px;
  }
}
</style>
<style lang="less">
.apply-promoter {
  .van-cell {
    position: relative;
    border: 1px solid #ececec;
    padding-top: 5px;
    padding-bottom: 5px;
  }
}

</style>
