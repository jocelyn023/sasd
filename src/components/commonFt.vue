<template>
  <div class="footer">
    <van-tabbar v-model="active" active-color="#ee0a24" inactive-color="#000" route>
      <van-tabbar-item replace :to="item.linkPath" v-for="(item, index) in tabbars" :key="index">
        <span>{{ item.name }}</span>
        <template #icon="props">
          <img class="icons" :src="props.active ? item.icon.normal : item.icon.active" />
        </template>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: "commonFt",
  props: {
    active: {
      type: Number,
      default: 0
    },
  },
  data() {
    return {
      tabbars: [
        {
          name: '首页',
          linkPath: '/',
          icon: {
            normal: require('@/assets/tabbar/icon_index.png'),
            active: require('@/assets/tabbar/icon_index_active.png')
          }
        },
        {
          name: '首页',
          linkPath: '/',
          icon: {
            normal: require('@/assets/tabbar/icon_study.png'),
            active: require('@/assets/tabbar/icon_study_active.png')
          }
        },
        {
          name: '首页',
          linkPath: '/',
          icon: {
            normal: require('@/assets/tabbar/icon_me.png'),
            active: require('@/assets/tabbar/icon_me_active.png')
          }
        }
      ]
    };
  },
  methods: {}
};
</script>

<style lang="less" scoped>
  .icons {
    width: 25px;
    height: 21px;
  }
</style>
