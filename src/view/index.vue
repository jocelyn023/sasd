<template>
  <div class="index">
    <footer :active="3"></footer>
  </div>
</template>

<script>
import footer from '@components/footer'

export default {
  components: { footer },

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
