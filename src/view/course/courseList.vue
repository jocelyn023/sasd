<template>
  <div class="course-list-page">
    <div class="search-block">
      <van-search v-model="value" show-action shape="round" placeholder="请输入搜索关键词" @search="onSearch"
        @cancel="onCancel" />
    </div>
    <div class="filter-select">
      <van-dropdown-menu>
        <van-dropdown-item v-model="selectValue" :options="option" />
      </van-dropdown-menu>
    </div>
    <div class="course-main">
      <div class="course-sidebar">
        <van-sidebar v-model="activeKey">
          <van-sidebar-item title="popping" />
          <van-sidebar-item title="jazz" />
          <van-sidebar-item title="breaking" />
          <van-sidebar-item title="hip-hop" />
          <van-sidebar-item title="locking" />
        </van-sidebar>
      </div>

      <div class="course-main-right">
        <div v-for="n in 3" :key="n" @click="handleClick(n)">
          <commonCover :info="info"></commonCover>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  import commonCover from "@/components/commonCover";
  export default {
    components: {
      commonCover
    },
    data() {
      return {
        selectValue: 1,
        option: [{
            text: "全部",
            value: 0
          }, {
            text: "线上",
            value: 1
          },
          {
            text: "线下",
            value: 2
          },
        ],
        value: "",
        activeKey: 0,
        info: {
          status: 1,
          path: "https://img.yzcdn.cn/vant/cat.jpeg",
          desc: "这是一段1最多显示一行的文这是一段最多显示一行的文字，多余的内容会被省略",
          price: "132"
        }
      };
    },

    methods: {
      handleClick(id){
        this.$router.push({
          path: "/courseDetail",
          query: {
            id: id,
            type: 1
          }
        })
      },
      onSearch(val) {
        console.log(val);
      },
      onCancel() {
        console.log("取消");
      }
    }
  };
</script>

<style lang="less" scoped>
  .course-list-page {
    /deep/.filter-select {
      .van-dropdown-menu__bar {
        box-shadow: none;
      }

      .van-dropdown-menu__item {
        justify-content: flex-end;
        padding-right: 20px;
      }

      .van-dropdown-menu__title {
        color: #999999;
        padding-right: 15px;
      }

      .van-dropdown-menu__title::after {
        border: 5px solid;
        border-color: transparent transparent #dcdee0 #dcdee0;
      }
    }

    /deep/.search-block {
      .van-search--show-action {
        padding: 15px 29px;
      }

      .van-search__content {
        border: 1px solid rgba(149, 149, 149, 0.5);
        background: #fff;
      }

      .van-search__action,
      .van-cell {
        color: #999;
      }

    }

    /deep/.cover-block .pic-box {
      height: 88px;
    }

    .course-main {
      display: flex;
      padding-top: 5px;

      .course-sidebar {
        flex-basis: 114px;
        flex: 1;
        min-width: 114px;
      }

      .course-main-right {
        width: calc(100% - 114px);
        padding: 20px 18px 20px 10px;
      }
    }

    /deep/.van-sidebar {
      width: 100%;
    }

    /deep/.van-sidebar-item {
      background: #f5f5f5;
      color: #999999;
      padding: 20px 18px;
      font-size: 15px;
    }

    /deep/.van-sidebar-item--select {
      color: #333333;
    }

    /deep/.van-sidebar-item--select::before {
      width: 4px;
      height: 12px;
      background: #a0191f;
    }
  }
</style>