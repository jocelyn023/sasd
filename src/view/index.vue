<template>
  <div class="index">
    <div class="test"></div>
    <CommonFt :active="3"></CommonFt>
  </div>
</template>

<script>
import CommonFt from '@/components/commonFt'
export default {
  components: { CommonFt },

  data() {
    return {
      goods: {}
    };
  },

  methods: {
    
  }
};
</script>

<style lang="less">
  .test {
    width: 750px;
    height: 750px;
    background: #333
  }
</style>
