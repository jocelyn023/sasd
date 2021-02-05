<template>
  <div class="apply-promoter">
    <div class="wrapper">
      <van-form validate-first @submit="onSubmit">
        <div class="label">
          <div class="f12 tips"><span class="col-theme">*</span> 收款人</div>

          <van-field
            v-model="form.recevierName"
            placeholder="请填写收款人姓名"
            :rules="rules.recevierName"
          />
        </div>

        <div class="label">
          <div class="f12 tips"><span class="col-theme">*</span> 银行</div>
          <van-field
            v-model="form.bankNam"
            placeholder="请填写收款银行"
            :rules="rules.bankNam"
          />
        </div>

        <div class="label">
          <div class="f12 tips"><span class="col-theme">*</span> 开户行</div>
          <van-field
            v-model="form.branchBrank"
            placeholder="请填写收款人开户行"
            :rules="rules.branchBrank"
          />
        </div>

        <div class="label">
          <div class="f12 tips"><span class="col-theme">*</span> 收款账户</div>
          <van-field
            v-model="form.acceptAccount"
            placeholder="请填写收款人银行账户"
            :rules="rules.acceptAccount"
          />
        </div>

        <div class="label">
          <div class="f12 tips"><span class="col-theme">*</span> 提现金额</div>
          <van-field
            v-model="form.amount"
            placeholder="请填写提现金额"
            :rules="rules.amount"
          />
        </div>

        <div class="label">
          <div class="f12 tips"><span class="col-theme">*</span> 联系电话</div>
          <van-field
            v-model="form.telNo"
            placeholder="请填写收款人联系电话"
            :rules="rules.telNo"
          />
        </div>

        <div class="txt-c">
          <van-button class="btn-submit" type="theme" native-type="submit" @click="onSubmit">提交</van-button>
        </div>
      </van-form>
    </div>  
  </div>
</template>

<script>
import { Toast } from 'vant';
import { getCashoutApplyInfo, cashoutApply, getMyPersonalInfo } from '@/api/user'

export default {
  components: {},
  data () {
    let self = this;
    return {
      username: '',
      regFailed: false,
      form: {
        recevierName: '', 
        bankNam: '',
        branchBrank: '',
        acceptAccount: '',
        telNo: '',
        amount: ''
      },
      fileList: [],
      rules: {
        recevierName: [{ required: true, message: '请填写收款银行' }],
        bankNam: [{ required: true, message: '请填写收款银行' }],
        branchBrank: [{ required: true, message: '请填写收款人开户行' }],
        acceptAccount: [{ required: true, message: '请填写收款人银行账户' }],
        telNo: [{ required: true, message: '请填写收款人联系电话' }],
        amount: [{ required: true, message: '请填写提现金额' }]
      }
    }
  },
  created () {
    this.init()
  },
  methods: {
    onSubmit (val) {
      for( var key in val ){
        if (key == 'undefined') {
          this.regFailed = true
        }
      }

      if (!this.regFailed) {
        return;
      }
      let params = {
        recevierName: this.form.recevierName,
        bankNam: this.form.bankNam,
        branchBrank: this.form.branchBrank,
        acceptAccount: this.form.acceptAccount,
        telNo: this.form.telNo,
        amount: this.form.amount
      }
      if (this.form.amount == 0) {
        Toast('提现金额需大于0')
        return
      }
      cashoutApply(params).then(res => {
        if (res.code == 200) {
          this.$parent.showApply = false
        } else {
          Toast.fail(res.returnMsg)
        }
      }).then(() => {
        getMyPersonalInfo().then(res => {
          localStorage.setItem('userInfo', JSON.stringify(res.data));
        })
      })
    },
    onFailed (errorInfo) {
      console.log('failed', errorInfo);
    },
    init () {
      getCashoutApplyInfo().then(res => {
        let data = res.data || {}
        data['amount'] = ''
        this.form = data
      })
    }
  }
}
</script>

<style lang="less" scoped>
.apply-promoter {
  width: 100%;
  padding: 34px 15px 22px;

  .wrapper {
    width: 100%;
    margin-bottom: 28px;
    padding: 0 20px 50px;
    box-shadow: 0px 0px 4px 0px 
    rgba(6, 0, 1, 0.15);
    
    .label {
      margin-bottom: 26px;

      .tips {
        height: 20px;
        line-height: 20px;
      }
    }
  }
  .btn-submit {
    height: 40px;
    line-height: 40px;
    border-radius: 5px;
    width: 244px;
  }
}
</style>
<style lang="less">
.apply-promoter {
  .van-cell {
    position: relative;
    border: 1px solid #ececec;
    padding-top: 5px;
    padding-bottom: 5px;
  }
}
</style>
