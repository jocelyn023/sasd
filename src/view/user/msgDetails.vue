<template>
  <div class="msg-details">
    <div class="msg-date col-gray-3 f12 txt-c">2020-01-01</div>

    <div class="content bg-white f14" v-html="content"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      id: null,
      loading: false,
      content: ''
    }
  },
  created() {
    this.id = this.$route.query.id;
  },
  methods:{
    getContent() {
      this.content = '<p>111</p><p>111</p><p>111</p>';
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
