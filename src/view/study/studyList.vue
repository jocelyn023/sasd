<template>
  <div class="index">
    <template v-for="(item, index) in list">
      <cardProgress :key="index" :item=item></cardProgress>
    </template>
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
        img: 'https://img.yzcdn.cn/vant/cat.jpeg',
        title: 'popping精品学习课程学习呢',
        learned: 10,
        courseNum: 20
      }, {
        id: 2,
        img: 'https://img.yzcdn.cn/vant/cat.jpeg',
        title: 'popping精品学习课程学习呢2',
        learned: 1,
        courseNum: 20
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
