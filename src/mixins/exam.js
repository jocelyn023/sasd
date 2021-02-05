import {
  getExamInfo
} from '@/api/exam'
import {
  getCookie
} from '@/utils/utils'
export default {
  data() {
    return {
      purchaseId: this.$route.query.id || getCookie("purchaseId"),
      examInfo: {}
    };
  },

  methods: {
    getStep() {
      this.getExamInfo(1)
    },
    getExamInfo(type) {
      getExamInfo({
        purchaseId: this.purchaseId
      }).then(res => {
        res.data.cardTypeStr = "";
        res.data.sexStr = "";
        this.examInfo = res.data;
        if (type == 1) {
          this.updateRouter()
        }
        console.log(JSON.stringify(res.data))
      })
    },
    nextStep(step) {
      let path = "/examStep_" + step
      this.$router.push({
        path: path,
        query: {
          id: this.purchaseId
        }
      })
    },
    updateRouter() {
      // PAYING   未支付
      // PAYED  已支付
      // BEGIN_EXAM  开始考试
      // UN_WRITE  笔试未通过
      // WRITED  笔试完成
      // OVER_EXAM  提交考试
      // PASS  合格
      // NO_PASS  不合格
      // EDIT_ADDR  地址填写
      // EDIT_INFO  物流填写
      // FINISH  完成
      let path = "/examStep_1"

      if (this.examInfo.status == "UN_WRITE" || this.examInfo.status == "WRITED") {
        path = "/examStep_2"

      } else if (this.examInfo.status == "OVER_EXAM" || this.examInfo.status == "PASS" ||
        this.examInfo.status == "NO_PASS") {
        path = "/examStep_3"

      } else if (this.examInfo.status == "EDIT_ADDR" || this.examInfo.status == "EDIT_INFO") {
        path = "/examStep_4"
      }

      this.$router.push({
        path: path,
        query: {
          id: this.purchaseId
        }
      })

    }

  }
};