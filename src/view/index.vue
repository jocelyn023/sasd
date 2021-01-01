<template>
  <div class="index">
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

</style>
