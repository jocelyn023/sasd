<template>
  <div>
    <div class="col-theme f18 txt-c p-t-20 m-b-10">{{ result.courseName }}考试</div>
    <div class="col-theme f18 txt-c m-b-50">成绩单</div>

    <div class="table-box col-black flex txt-c">
      <div class="item">文化理论（20分）</div>
      <div class="item">{{ result.writtenExamScore }}</div>
      <div class="item">{{ result.writtenExamScoreText }}</div>

      <!-- 1，2，3级别课程展示内容 -->
      <template v-if="result.dancyLevel !== 'lv4'">
        <div class="item">教学讲解（20分）</div>
        <div class="item">{{ result.vedioScoreJx }}</div>
        <div class="item">{{ result.vedioScoreJxText }}</div>

        <div class="item">solo（20分）</div>
        <div class="item">{{ result.vedioScoreSolo }}</div>
        <div class="item">{{ result.vedioScoreSoloText }}</div>

        <div class="item">routine（20分）</div>
        <div class="item">{{ result.vedioScoreRontiue }}</div>
        <div class="item">{{ result.vedioScoreRontiueText }}</div>
      </template>
      
      <template v-else>
        <div class="item">视频1（20分）</div>
        <div class="item">{{ result.vedio1Score }}</div>
        <div class="item">{{ result.vedio1ScoreText }}</div>

        <div class="item">视频2（20分）</div>
        <div class="item">{{ result.vedio2Score }}</div>
        <div class="item">{{ result.vedio2ScoreText }}</div>

        <div class="item">视频3（20分）</div>
        <div class="item">{{ result.vedio3Score }}</div>
        <div class="item">{{ result.vedio3ScoreText }}</div>

        <div class="item">视频4（20分）</div>
        <div class="item">{{ result.vedio4Score }}</div>
        <div class="item">{{ result.vedio4ScoreText }}</div>

        <div class="item">视频5（20分）</div>
        <div class="item">{{ result.vedio5Score }}</div>
        <div class="item">{{ result.vedio5ScoreText }}</div>
      </template>

      <div class="item">总得分</div>
      <div class="item">{{ result.finalScore }}</div>
      <div class="item"></div>

      <div class="item">最终结果</div>
      <div class="item"></div>
      <div class="item">{{ result.finalStatusText }}</div>
    </div>
  </div>
</template>

<script>
import { getScoreInfo } from '@/api/user'

export default {
  data() {
    return {
      id: this.$route.query.id, //1 我的订单， 2成绩查询
      loading: false,
      result: {}
    }
  },
  created() {
    // this.init()
  },
  mounted() {
    this.init()
  },
  methods:{
    init () {
      getScoreInfo({'purchaseId': this.id}).then(res => {
        this.loading = true
        this.result = res.data
      })
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
    height: 36px;
    line-height: 36px;
    border-bottom: 1px solid #000;
  }
  .item:nth-child(3n+1) {
    width: 48%;
    border-right: 1px solid #000;
  }
  .item:nth-child(3n+2) {
    width: 24%;
    border-right: 1px solid #000;
  }
  .item:nth-child(3n) {
    width: 28%;
    color: #31ad37
  }
}
</style>
