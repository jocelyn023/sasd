<template>
  <div>
    <div class="col-theme f18 txt-c p-t-20 m-b-10">课程1考试</div>
    <div class="col-theme f18 txt-c m-b-50">成绩单</div>

    <div class="table-box col-black flex txt-c">
      <div class="item">文化理论（20分）</div>
      <div class="item">10分</div>

      <div class="item">文化理论（20分）</div>
      <div class="item">10分</div>

      <div class="item">文化理论（20分）</div>
      <div class="item">10分</div>

      <div class="item">文化理论（20分）</div>
      <div class="item">10分</div>

      <div class="item">文化理论（20分）</div>
      <div class="item">10分</div>

      <div class="item">文化理论（20分）</div>
      <div class="item">10分</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      id: this.$route.query.id, //1 我的订单， 2成绩查询
      loading: false
    }
  },
  methods:{
    init () {
      this.loading = true
      this.finished = true
    }
  }
};
</script>

<style lang="less" scoped>

.table-box {
  margin: 0 auto;
  width: 322px;
  border: 1px solid #000;
  border-bottom: none;
  flex-wrap: wrap;

  .item {
    width: 50%;
    height: 36px;
    line-height: 36px;
    border-bottom: 1px solid #000;
  }
  .item:nth-child(odd) {
    border-right: 1px solid #000;
  }
}
</style>
