<template>
  <div class="course-list-page">
    <van-sticky>
      <div class="search-block">
        <van-search v-model="queryConditions.name" show-action shape="round" placeholder="请输入搜索关键词" @search="onSearch"
          @cancel="onCancel" />
      </div>
      <div class="filter-select">
        <div class="dropdown-item" :class="queryConditions.courseStatus?'active': ''" @click="showPopup(2)">
          <span class="dropdown-title">课程状态</span>
        </div>
        <div class="dropdown-item" :class="queryConditions.teachingType?'active': ''" @click="showPopup(3)">
          <span class="dropdown-title">课程方式</span>
        </div>
        <div class="dropdown-item" :class="queryConditions.cityId?'active': ''" @click="showPopup(1)">
          <span class="dropdown-title">地区选择</span>
        </div>
      </div>
    </van-sticky>
    <div class="course-main">
      <div class="course-sidebar">
        <van-sidebar v-model="activeKey">
          <van-sidebar-item v-for="(item, index) in danceTypeList" :key="index" :title="item.value"
            @click="sidebarClick(item.keyName)" />
        </van-sidebar>
      </div>
      <div class="course-main-right">
        <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
          <div v-for="(item,index) in courseList" :key="index+'course'" @click="handleClick(item)">
            <commonCover :info="item"></commonCover>
          </div>
        </van-list>
      </div>
    </div>
    <van-popup v-model="showPicker" round position="bottom" :style="{ height: '40%' }">
      <van-area v-show="selectActive == 1" title="选择城市" :area-list="cityObj" :columns-num="2" value="110101"
        @cancel="showPicker = false" @confirm="onConfirm" />
      <van-picker v-show="selectActive == 2" show-toolbar :columns="teachingStatusList" @cancel="showPicker = false"
        @confirm="onConfirm" />
      <van-picker v-show="selectActive == 3" show-toolbar :columns="teachingTypeList" @cancel="showPicker = false"
        @confirm="onConfirm" />
    </van-popup>
  </div>
</template>
<script>
  import {
    queryCourseInfoPage,
  } from '@/api/course'
  import {
    serchByKeyGroup,
  } from '@/api/common'
  import {
    filterJson, setCookie
  } from '@/utils/utils'
  import commonCover from "@/components/commonCover";
  import city from "@/mixins/city";
  export default {
    components: {
      commonCover
    },
    mixins: [city],
    data() {
      return {
        showPicker: false,
        selectActive: 1,
        value: "",
        selectValue: {},
        activeKey: 0,
        danceTypeList: [],
        courseList: [],
        teachingTypeList: [],
        teachingStatusList: [],
        queryConditions: {
          danceType: "",
          name: "",
          teachingType: "",
          cityId: "",
          courseStatus: ""
        },
        info: {
          // dancyType: "Popping"
          // dancyTypeValue: "Popping"
          // id: "1349729841098825729"
          // name: "111"
          // price: 199
          // teachingType: "ON"
          // teachingTypeValue: "线上"
          // thumbnail: "http://qiniu.csda.cn.com/picture/1610621367127.jpg",
        },
        loading: false,
        finished: false,
        page: 1,
      };
    },
    mounted() {
      if(this.$route.query.agentNo){
        setCookie("agentId",this.$route.query.agentNo)
      }
      this.getDanceTypeList();
      this.getModeList();
      this.getTeachingStatusList();
    },

    methods: {
      onLoad() {
        let page = 1;
        this.finished = true;
        this.getCourseList(page);
      },
      getTeachingStatusList() {
        serchByKeyGroup("COURSE_TEACHING_STATUS").then(res => {
          this.teachingStatusList = res.data.map(item => {
            return {
              text: item.value,
              key: item.keyName
            }
          })
          this.queryConditions.courseStatus = this.teachingStatusList[0].keyName
          this.getCourseList();
        })
      },
      getDanceTypeList() {
        serchByKeyGroup("DANCY_TYPE").then(res => {
          this.danceTypeList = res.data;
          this.queryConditions.danceType = this.danceTypeList[0].keyName
          this.getCourseList();
        })
      },
      getModeList() {
        serchByKeyGroup("EXAM_MODE").then(res => {
          this.teachingTypeList = res.data.map(item => {
            return {
              text: item.value,
              key: item.keyName
            }
          })
        })
      },

      getCourseList(page) {
        let params = {
          page: page ? page : this.page,
          rows: 10,
          queryConditions: this.queryConditions
        }

        queryCourseInfoPage(filterJson(params)).then(res => {
          this.courseList = res.data.records;
        })
      },
      sidebarClick(val) {
        this.queryConditions.danceType = val
        this.getCourseList(1);
      },
      showPopup(active) {
        this.showPicker = true;
        this.selectActive = active;
      },
      onConfirm(value) {
        this.selectValue = value;
        this.showPicker = false;
        if (this.selectActive == 1) {
          this.queryConditions.cityId = value[1].code
        } else if (this.selectActive == 3) {
          this.queryConditions.teachingType = value.key
        } else if (this.selectActive == 2) {
          this.queryConditions.courseStatus = value.key
        }
        this.getCourseList(1);
      },
      handleClick(item) {
        this.$router.push({
          path: "/courseDetail",
          query: {
            id: item.id,
            type: 1
          }
        })
      },
      onSearch(val) {
        this.getCourseList(1);
      },
      onCancel() {
        this.getCourseList(1);
      }
    }
  };
</script>

<style lang="less" scoped>
  .course-list-page {
    .filter-select {
      display: flex;
      padding: 0 19px;
      height: 48px;
      background-color: #fff;
      justify-content: center;

      .dropdown-item {
        flex: 1;
        cursor: pointer;

        &.active,
        &:hover {
          .dropdown-title {
            color: #a0191f;

            &:after {
              border-color: transparent transparent #a0191f #a0191f;
            }
          }
        }
      }

      .dropdown-title {
        padding-right: 15px;
        position: relative;
      }

      .dropdown-title:after {
        border: 5px solid;
        position: absolute;
        top: 50%;
        right: -0.10667rem;
        margin-top: -7px;
        border-color: transparent transparent #999999 #999999;
        -webkit-transform: rotate(-45deg);
        transform: rotate(-45deg);
        opacity: .8;
        content: '';
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
      height: calc(100vh - 120px);
      display: flex;
      padding-top: 5px;

      .course-sidebar {
        flex-basis: 114px;
        flex: 1;
        min-width: 114px;
      }

      .course-main-right {
        overflow: auto;
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