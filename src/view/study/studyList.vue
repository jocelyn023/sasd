<template>
  <div class="index">
    <cardProgress></cardProgress>
  </div>
</template>

<script>
import cardProgress from '@/components/cardProgress'
export default {
  components: { cardProgress },
  data() {
    return {
      list: [{
        id: 1,
      }]
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
