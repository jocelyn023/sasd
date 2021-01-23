<template>
  <div class="apply-promoter">
    <div class="wrapper">
      <van-form @submit="onSubmit">
        <div class="label">
          <div class="f12 tips"><span class="col-theme">*</span> 请选择您要认证的类型</div>
          <van-field
            v-model="form.applyName"
            placeholder="请选择"
            is-link
            readonly
            @click="showPicker('applytype')"
            :rules="rules.applyType"
          />
        </div>

        <div class="label" v-if="form.applyType == 'TEACHING_CAMP'">
          <div class="f12 tips"><span class="col-theme">*</span> 请选择师资营所在地区</div>
          <van-field
            v-model="form.cityId"
            placeholder="请选择"
            is-link
            readonly
            @click="showPicker('applytype')"
            :rules="rules.cityId"
          />
        </div>

        <div class="label" v-if="form.applyType == 'TEACHING_CAMP'">
          <div class="f12 tips"><span class="col-theme">*</span> 请输入您的师资营名称</div>
          <van-field
            v-model="form.teachingCampName"
            placeholder="请输入"
            :rules="rules.teachingCampName"
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
            v-model="form.idenName"
            placeholder="请选择"
            is-link
            readonly
            @click="showPicker('identype')"
            :rules="rules.idenName"
          />
        </div>

        <div class="label">
          <div class="f12 tips"><span class="col-theme">*</span> 请输入您的证件号码</div>
          <van-field
            v-model="form.cardNo"
            placeholder="请输入"
            :rules="rules.cardNo"
          />
        </div>

        <div class="label">
          <div class="f12 tips"><span class="col-theme">*</span> 请输入您的联系电话</div>
          <van-field
            v-model="form.telNo"
            placeholder="请输入"
            :rules="rules.telNo"
          />
        </div>

        <div class="label">
          <div class="f12 tips"><span class="col-theme">*</span> 请提供身份证正反面照片</div>
          <van-uploader
            :max-size="maxUploadSize"
            v-model="fileList"
            multiple
            :before-read="beforeRead"
            :after-read="afterRead"
            :max-count="2"
            @oversize="onOversize"
          />
        </div>

        <div class="label">
          <div class="f12 tips"><span class="col-theme">*</span> 请输入您的申请理由</div>
          <van-field
            v-model="form.applyReason"
            rows="2"
            autosize
            type="textarea"
            maxlength="50"
            placeholder="请输入留言"
            show-word-limit
            :rules="rules.applyReason"
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
        value-key="value"
        :columns="pickerConfig.columns"
        @confirm="onConfirm"
        @cancel="pickerConfig.show = false"
      />
    </van-popup>
  </div>
</template>

<script>
import {
  serchByKeyGroup,
  getToken,
  uploadToQiniu,
  agentApply
} from '@/api/common'

export default {
  components: {},
  data () {
    return {
      pickerType: '',
      pickerConfig: {
        show: false,
        title: '',
        columns: []
      },
      maxUploadSize: 1024 * 1024 * 3,
      typeColumns: [],
      idenColumns: [],
      uploadParams: {},
      form: {
        applyType: '', 
        applyName: '',
        cityId: '',
        teachingCampName: '',
        userName: '',
        idenType: '',
        idenName: '',
        cardNo: '',
        telNo: '',
        applyReason: ''
      },
      fileList: [],
      rules: {
        applyName: [{ required: false, message: '请选择认证类型' }],
        cityId: [{ required: false, message: '请选择认证类型' }],
        teachingCampName: [{ required: true, message: '请填写师资营名称' }],
        fullName: [{ required: true, message: '请填写用户名' }],
        idenName: [{ required: false, message: '请选择证件类型' }],
        cardNo: [{ required: true, message: '请填写用户名' }],
        telNo: [{ required: true, message: '请填写联系电话' }],
        applyReason: [{ required: true, message: '请填写申请原因' }],
      }
    }
  },
  created () {
    this.init()
  },
  methods: {
    init () {
      serchByKeyGroup('AGENT_TYPE').then(res => {
        this.typeColumns = res.data
      })

      serchByKeyGroup('CARD_TYPE').then(res => {
        this.idenColumns = res.data
      })
    },
    onSubmit() {
      this.$router.push({path: ''})
      console.log(this.form)
      console.log(this.fileList)
      // agentApply().then(res => {

      // })
    },
    onOversize(file) {
      Toast('文件大小不能超过' + this.maxUploadSize/ 1024 / 1024);
    },
    beforeRead (file) {
      file.status = 'uploading';
      file.message = '上传中...';

      getToken().then(res => {
        if (res.code == 200) {
          const fileName = file.name
          this.uploadParams = {
            token: res.data,
            key: 'picture/' + new Date().getTime() + '.' + fileName.split('.').pop().toLowerCase(),
            name: fileName,
            file: file.file
          }
        } else {
          return false;
        }
      })
    },
    afterRead({ file }) {
      uploadToQiniu(this.uploadParams).then(res => {
        if (res.code == 200) {
          // this.fileList.push({
          //   content: file.content,
          //   status: 'failed',
          //   message: '上传失败',
          //   url: res.
          // })
        } else {
          file.status = 'failed';
          file.message = '上传失败';
        }
      })
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
    },
    onConfirm(val, index) {
      this.pickerConfig.show = false
      if (this.pickerType === 'applytype') {
        this.form.applyName = val.value
        this.form.applyType = val.keyName
      } else {
        this.form.idenName = val.value
        this.form.idenType = val.keyName
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
