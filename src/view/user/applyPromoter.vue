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
            v-model="form.cityName"
            placeholder="请选择"
            is-link
            readonly
            @click="isShowPicker = true"
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
            v-model="form.fullName"
            placeholder="请输入"
            :rules="rules.fullName"
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

    <van-popup v-model="isShowPicker" round position="bottom">
      <van-area title="选择城市" :area-list="cityObj" :columns-num="2" value="110101"
        @cancel="isShowPicker = false" @confirm="onConfirmArea" />
    </van-popup>
  </div>
</template>

<script>
import {
  serchByKeyGroup,
  getToken,
  uploadFileToQiniu
} from '@/api/common'
import city from "@/mixins/city"

import { agentApply } from '@/api/user'
import { Toast } from 'vant'

export default {
  components: {},
  mixins: [city],
  data () {
    return {
      toastObj: null,
      // 选择地区
      isShowPicker: false,
      cityObj: [],
      domin: process.env.VUE_APP_QINIU_DOMIN,
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
        cityName: '',
        teachingCampName: '',
        fullName: '',
        idenType: '',
        idenName: '',
        cardNo: '',
        telNo: '',
        applyReason: ''
      },
      fileList: [],
      rules: {
        applyName: [{ required: false, message: '请选择认证类型' }],
        cityId: [{ required: false, message: '请选择认证地区' }],
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
      }).then(() => {
        let agentResult = localStorage.getItem('agentResult');

        if (agentResult != null) {
          agentResult = JSON.parse(agentResult)
          // 认证类型
          let arrApplyType = this.typeColumns.filter(item => {
            return item.keyName == agentResult.applyType
          })
          if (arrApplyType && arrApplyType.length > 0) {
            agentResult.applyName = arrApplyType[0].value
          }
          agentResult.idenName = ''
          this.form = agentResult

          this.fileList = []
          this.fileList.push({
            status: "complete",
            url: this.form.idChardFontPhoto || ''
          })

          this.fileList.push({
            status: "complete",
            url: this.form.idChardBackPhoto || ''
          })
        }
      })

      serchByKeyGroup('CARD_TYPE').then(res => {
        this.idenColumns = res.data
      }).then(() => {
        // 证件类型
        let agentResult = this.form
        let arrIdenType = this.idenColumns.filter(item => {
          return item.keyName == agentResult.cardType
        })
        if (arrIdenType && arrIdenType.length > 0) {
          this.form.idenName = arrIdenType[0].value
        }
        
      })
    },
    onSubmit() {
      let params = {
        applyType: this.form.applyType,
        fullName: this.form.fullName,
        cardType: this.form.idenType,
        cardNo: this.form.cardNo,
        telNo: this.form.telNo,
        applyReason: this.form.applyReason
      }
      if (this.form.id) {
        params.id = this.form.id
      }
      if (this.fileList && this.fileList.length < 2) {
        Toast('请确认上传的身份证照片是否正确')
        return;
      }
      params.idChardFontPhoto = this.fileList[0].url
      params.idChardBackPhoto = this.fileList[1].url

      if (params.applyType == 'TEACHING_CAMP') {
        params.teachingCampName = this.form.teachingCampName
        params.cityId = this.form.cityId

        if (params.cityId == '') {
          Toast('请选择地区')
          return
        }
      }

      agentApply(params).then(res => {
        if (res.code == 200) {
          this.$router.push({
            path: '/applyResult'
          })
        } else {
          Toast.fail(res.returnMsg)
        }
        
      })
    },
    onOversize(file) {
      Toast('文件大小不能超过' + this.maxUploadSize/ 1024 / 1024);
    },
    async beforeRead (file) {
      this.toastObj = Toast.loading({
        duration: 0,
        text: '加载中。。。'
      })
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
    afterRead( file ) {
      file.status = 'uploading'
      file.message = '上传中...'
      uploadFileToQiniu(this.uploadParams, function(event) {
        //TODO 列表上传进度
        // _this.progressVal = parseInt((event.loaded / event.total) * 100);
        // option.onProgress({
        //     percent: parseInt((event.loaded / event.total) * 100)
        // });
      }).then(res => {
        this.toastObj.clear()
        this.toastObj = null
        file.url = this.domin + this.uploadParams.key
        file.status = 'complete'
        file.message = ''
        console.log(this.fileList)
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
    onConfirmArea(val) {
      this.isShowPicker = false
      console.log(val)
      this.form.cityId = val[1].code
      this.form.cityName = val[1].name
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
