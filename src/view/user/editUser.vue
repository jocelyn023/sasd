<template>
  <div class="edit-user">
    <div class="cells">
      <van-cell title="头像">
      <!-- 使用 right-icon 插槽来自定义右侧图标 -->
        <template #right-icon>
          <van-uploader
            :accept="'image/*'"
            :max-size="maxUploadSize"
            @oversize="onOversize"
            :max-count="1"
            :preview-size="30"
            :deletable="false"
            :before-read="beforeRead"
            :after-read="afterRead"
          >
            <van-image
              v-if="fileList && fileList.length > 0"
              round
              fit="cover"
              class="avatar"
              :src="fileList[0].url"
            />
          </van-uploader>
        </template>
      </van-cell>

      <van-form @submit="onSubmit">
        <van-field
          v-model="form.fullName"
          label="姓名"
          input-align="right"
          placeholder="姓名"
          :rules="[{ required: true, message: '请填写用户名' }]"
        />

        <van-field
          readonly
          clickable
          v-model="form.sexValue"
          label="性别"
          input-align="right"
          placeholder="性别"
          :rules="[{ required: true, message: '请填写用户名' }]"
          @click="showPickerFn('sex')"
        />

        <van-field
          readonly
          clickable
          input-align="right"
          label="所在地区"
          :value="form.cityName"
          placeholder="点击选择所在地区"
          @click="showPickerFn('area')"
        />

        <van-field
          v-model="form.masterDance"
          label="擅长舞种"
          input-align="right"
          placeholder="擅长舞种"
          :rules="[{ required: true, message: '请填写擅长舞种' }]"
        />

        <van-field
          v-model="form.danceYear"
          label="舞龄"
          input-align="right"
          placeholder="舞龄"
          :rules="[{ required: true, message: '请填写舞龄' }]"
        />

        <van-field
          v-model="form.telNo"
          label="电话"
          input-align="right"
          placeholder="电话"
          :rules="[{ required: true, message: '请填写电话' }]"
        />

        <div class="btn-submit">
          <van-button round block type="theme" native-type="submit">确认修改</van-button>
        </div>
      </van-form>
    </div>

    <van-popup v-model="showPicker" round position="bottom">
      <van-area
        v-if="pickerType == 'area'"
        :value="form.cityId"
        :area-list="cityObj"
        :columns-num="2"
        @confirm="onConfirm"
        @cancel="hidePickerFn"
      />
      <van-picker
        v-if="pickerType == 'sex'"
        title="性别"
        show-toolbar
        value-key="text"
        :columns="sexColumns"
        :default-index="2"
        @confirm="onConfirm"
        @cancel="hidePickerFn"
      />
    </van-popup>
  </div>
</template>

<script>
import { getToken, uploadFileToQiniu } from '@/api/common'
import { updateMyPersonalInfo } from '@/api/user'
import city from "@/mixins/city"
import { Toast, Dialog } from 'vant'

export default {
  mixins: [city],
  data () {
    return {
      showPicker: false,
      pickerType: '',
      cityObj: [],
      loadingToast: null,
      showAvatar: true,
      uploadParams: {},
      maxUploadSize: 1024 * 1024 * 3,
      fileList: [{ url: 'https://img01.yzcdn.cn/vant/leaf.jpg', isImage: true }],
      form: {
        icon: '',
        fullName: '',
        sex: '',
        sexValue: '',
        cityId: '',
        cityName: '',
        masterDance: '',
        danceYear: '',
        telNo: '',
      },
      sexColumns: [{
        key: 'M',
        text: '男'
      }, {
        key: 'F',
        text: '女'
      }]
    }
  },
  created () {
    this.init()
  },
  methods: {
    onSubmit () {
      this.loadingToast = Toast.loading({
        duration: 0,
        message: '修改中...',
        forbidClick: true,
      })
      let form = {}
      if (this.fileList && this.fileList[0]) {
        form.icon = this.fileList[0].url
      } else {
        form.icon = this.form.icon
      }

      form.telNo = this.form.telNo
      form.fullName = this.form.fullName
      form.sex = this.form.sex
      form.cityId = this.form.cityId
      form.masterDance = this.form.masterDance
      form.danceYear = this.form.danceYear

      updateMyPersonalInfo(form).then(res => {
        this.loadingToast.clear()
        this.loadingToast = null
        localStorage.setItem('userInfo', JSON.stringify(res.data))
        Toast.success('修改成功！');
      })
    },
    showPickerFn (type) {
      this.showPicker = true
      this.pickerType = type
    },
    hidePickerFn () {
      this.showPicker = false
      this.pickerType = ''
    },
    onConfirm (val) {
      if (this.pickerType == 'area') {
        this.form.cityName = val[0].name + ', ' + val[1].name
        this.form.cityId = val[1].code
      } 

      if (this.pickerType == 'sex') {
        this.form.sex = val.key
        this.form.sexValue = val.text
      }
      this.hidePickerFn()
    },
    onOversize(file) {
      Toast('文件大小不能超过' + this.maxUploadSize/ 1024 / 1024);
    },
    async beforeRead (file) {
      this.loadingToast = Toast.loading({
        message: '加载中...',
        forbidClick: true,
        duration: 0
      });
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
      let _this = this
      uploadFileToQiniu(this.uploadParams, function(event) {
        //TODO 列表上传进度
        // _this.progressVal = parseInt((event.loaded / event.total) * 100);
        // option.onProgress({
        //     percent: parseInt((event.loaded / event.total) * 100)
        // });
      }).then(res => {
        file.url = process.env.VUE_APP_QINIU_DOMIN + this.uploadParams.key
        file.isImage = true
        _this.fileList = []
        _this.fileList.push(file)
        this.loadingToast.clear()
        this.loadingToast = null
      })
    },
    init () {
      let userInfo = localStorage.getItem('userInfo')  
      if (userInfo == null) {
        Dialog.alert({
          title: '提示',
          message: '获取个人信息失败，请返回我的页面！',
        }).then(() => {
          this.$router.replace('/me')
        });
        return
      }
      userInfo = JSON.parse(userInfo)
      this.form = userInfo
      this.fileList = []
      this.fileList.push({
        url: userInfo.icon,
        isImage: true
      })
    }
  }
}
</script>

<style lang="less" scoped>
.edit-user {
  .avatar {
    width: 36px;
    height: 36px;
  }
  .btn-submit {
    margin: 20px 30px;
  }
}
</style>
