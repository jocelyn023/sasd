<template>
  <div class="footer">
    <div class="block"></div>
    <van-tabbar v-model="activeIndex" active-color="#a0191f" inactive-color="#000" @change="onChange">
      <van-tabbar-item replace v-for="(item, index) in tabbars" :key="index">
        <span>{{ item.name }}</span>
        <template #icon="props">
          <img class="icons" :src="props.active ? item.icon.active : item.icon.normal" />
        </template>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: "commonFt",
  watch: {
    active: {
      immediate: true,
      handler (val) {
        this.activeIndex = parseInt(val)
      }
    }
  },
  props: {
    active: {
      type: Number,
      default: 0
    },
  },
  data() {
    return {
      activeIndex: 0,
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
          name: '学习中心',
          linkPath: '/studyCenter',
          icon: {
            normal: require('@/assets/tabbar/icon_study.png'),
            active: require('@/assets/tabbar/icon_study_active.png')
          }
        },
        {
          name: '我的',
          linkPath: '/me',
          icon: {
            normal: require('@/assets/tabbar/icon_me.png'),
            active: require('@/assets/tabbar/icon_me_active.png')
          }
        }
      ]
    };
  },
  methods: {
    onChange(val) {
      let pathParams = {
        path: this.tabbars[val].linkPath
      }
      this.$router.push(pathParams)
    }
  }
};
</script>

<style lang="less" scoped>
  .block {
    width: 100%;
    height: 60px;
  }
  .icons {
    width: 25px;
    height: 21px;
  }
</style>
