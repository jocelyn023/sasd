<template>
  <div class="msg-details">
    <div class="msg-date col-gray-3 f12 txt-c">{{ detail.createDate}}</div>

    <div class="content bg-white f14" v-html="detail.content"></div>
  </div>
</template>

<script>
import { getMessageDetailAndRead } from '@/api/user'

export default {
  data() {
    return {
      params: {
        id: this.$route.query.id
      },
      loading: true,
      content: '',
      detail: {}
    }
  },
  created() {
    this.getMessageDetailAndRead();
  },
  methods:{
    getContent() {
      this.content = '<p>111</p><p>111</p><p>111</p>';
    },
    getMessageDetailAndRead () {
      getMessageDetailAndRead(this.params).then(res => {
        this.loading = false
        this.detail = res.data
      })
    }
  }
};
</script>

<style lang="less" scoped>
.msg-details {
  padding-bottom: 15px;
  min-height: 100vh;
  background: #f8f8f8;

  .msg-date {
    height: 55px;
    line-height: 55px;
  }

  .content {
    margin: 0 auto;
    padding: 15px;
    width: 345px;
    line-height: 28px;
    border-radius: 5px;
    min-height: 20px;
  }
}
</style>
<style>
.msg-details p {
  margin: 0;
}
</style>
