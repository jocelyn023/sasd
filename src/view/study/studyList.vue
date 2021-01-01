<template>
  <div class="index">
    <!-- <template v-for="(item, index) in list">
      <cardProgress :key="index" :item="item" @emitClick="handleClick"></cardProgress>
    </template> -->
    <template v-for="(item, index) in list">
      <cardCourse :key="index" :item="item" @emitClick="handleClick"></cardCourse>
    </template>
  </div>
</template>

<script>
// import cardProgress from '@/components/cardProgress'
import cardCourse from '@/components/cardCourse'
export default {
  components: { cardCourse },
  data() {
    return {
      list: [{
        id: 1,
        img: 'https://img.yzcdn.cn/vant/cat.jpeg',
        title: 'popping精品学习课程学习呢再来几个字呢最多能多少',
        learned: 10,
        courseNum: 20,
        status: 0 //0学习中 1已结业
      }, {
        id: 2,
        img: 'https://img.yzcdn.cn/vant/cat.jpeg',
        title: 'popping精品学习课程学习呢2',
        learned: 20,
        courseNum: 20,
        status: 1 //0学习中 1已结业
      }]
    };
  },

  methods: {
    handleClick(val) {
      console.log(val)
    }
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
