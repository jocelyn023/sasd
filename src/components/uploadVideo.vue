<template>
  <van-uploader v-model="fileList" :max-size="maxUploadSize" accept="video/*" :before-read="beforeRead" :after-read="afterRead" @oversize="onOversize">
  </van-uploader>
</template>

<script>
  import {
    getToken,
    uploadFileToQiniu
  } from '@/api/common'
export default {
  name: "uploadVideo",
  data() {
    return {
      fileList:[],
      progressVal: 0,
      uploadParams: {},
      maxUploadSize: 1024 * 1024 * 10000,
    };
  },
  methods: {
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
          // _this.progressVal = parseInt((event.loaded / event.total) * 100);
          // option.onProgress({
          //     percent: parseInt((event.loaded / event.total) * 100)
          // });
        }).then(res => {
          this.fileList = [];
          file.url = process.env.VUE_APP_QINIU_DOMIN + this.uploadParams.key
          _this.$emit("success",file.url)
          file.status = 'complete'
          file.message = ''
        })
      },
    
  }
};
</script>

<style lang="less" scoped>

</style>
