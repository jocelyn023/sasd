<template>
  <div>
    <van-cell-group>
      <van-cell
        v-for="item in certificateTypeList"
        :key="item.keyName"
        :title="item.value"
        :to="{path: '/certificateList', query: {type: item.keyName}}"
        is-link
      />
    </van-cell-group>
  </div>
</template>

<script>
import { serchByKeyGroup } from '@/api/common'

export default {
  data () {
    return {
      loading: true,
      certificateTypeList: []
    }
  },
  created () {
    this.init()
  },
  methods: {
    init() {
      serchByKeyGroup('CERTIFICATE_TYPE').then(res => {
        this.certificateTypeList = res.data
      })
    }
  }
}
</script>

<style lang="less">
.user-head {
  position: relative;

  .agent-box {
    position: absolute;
    left: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.6);
    width: 100%;
    height: 40px;

    .item {
      width: 50%;
      height: 18px;
      line-height: 18px;
      text-align: center;
      color: #fff;
      text-decoration: underline;
    }

    .item:first-child {
      border-right: 1px solid #fff;
      box-sizing: border-box;
    }
  }
}
.user-info {
  padding-left: 18px;
  width: 100%;
  height: 214px;
  background: url(../../assets/user/bg_user.jpg) no-repeat center;
  background-size: 100%;
  justify-content: flex-start;

  .img-box {
    width: 100px;
    height: 100px;
  }

  .user-other {
    width: 200px;
  }
  .badge {
    padding-left: 26px;
    padding-top: 2px;
    width: 77px;
    height: 23px;
    background: url(../../assets/user/bg_badge.png) no-repeat center;
    background-size: contain;
  }
}
</style>
