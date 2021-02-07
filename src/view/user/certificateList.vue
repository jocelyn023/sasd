<template>
  <div class="certificate-list f12">
    <div>
      <div class="certificate-item bg_btd flex" v-for="(item, index) in list" :key="index">
        <div class="card-left">
          <div class="logo"></div>
          <div class="certificate-type"></div>
          <div class="label-box">
            <div class="label-item dance-type">{{ item.danceTypeValue }}</div>
            <div class="label-item grade">{{ item.certificateLevelValue }}</div>
            <div class="qrcode">
              <img src="../../assets/user/qr_code.png" alt="" srcset="">
              <div class="qrcode-tips"></div>
            </div>
          </div>
        </div>

        <div class="card-right">
          <div class="txt-c m-b-10">
            <img class="avatar" :src="item.registrationPhotos" alt="" srcset="">
          </div>
          <div class="label-item name">{{ item.certificateName }}</div>
          <div class="label-item sex">{{ item.sexValue }}</div>
          <div class="label-item cardNo f12">
            <span>{{ item.idCard }}</span>
          </div>
          <div class="label-item cardid f12">
            <span>{{ item.id }}</span>
          </div>

          <div class="label-item jigou"></div>
          <div class="label-item time f12">{{ item.issueYear }}年{{ item.issueYear }}月{{ item.issueYear }}日</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getCertificateList } from '@/api/user'

export default {
  data () {
    return {
      type: this.$route.query.type,
      loading: true,
      list: []
    }
  },
  created () {
    this.init()
  },
  methods: {
    init() {
      getCertificateList({'examCategory': this.type}).then(res => {
        this.list = res.data
      })
    }
  }
}
</script>

<style lang="less">
.certificate-list {

  .certificate-item {
    margin: 0 auto 20px;
    padding: 12px 0;
    width: 356px;
    border-radius: 4px;
    border-top: 4px solid #b30101;
    border-bottom: 4px solid #b30101;

    .label-item {
      margin-bottom: 10px;
      padding-left: 70px;
      width: 100%;
      height: 20px;
      line-height: 18px;
    }

    .card-left {
      padding-left: 10px;
      padding-top: 10px;
      width: 48%;

      .logo {
        margin-bottom: 10px;
        width: 100%;
        height: 30px;
        background: url(../../assets/user/logo_btd.png) no-repeat center;
        background-size: contain;
      }

      .certificate-type {
        margin-bottom: 15px;
        width: 100%;
        height: 20px;
        background: url(../../assets/user/card_name_coach.png) no-repeat center;
        background-size: contain;
      }

      .dance-type {
        background: url(../../assets/user/label_dance_type.png) no-repeat 30px center;
        background-size: contain;
      }

      .grade {
        background: url(../../assets/user/label_grade.png) no-repeat 30px center;
        background-size: contain;
      }

      .qrcode {
        width: 100%;
        text-align: center;

        img {
          margin-bottom: 10px;
          vertical-align: top;
          width: 76px;
        }

        .qrcode-tips {
          width: 100%;
          height: 15px;
          background: url(../../assets/user/qrcode_tips.png) no-repeat center;
          background-size: contain;
        }
      }
    }

    .card-right {
      width: 52%;
      .label-item {
        margin-bottom: 3px;
        padding-left: 50px;
        height: 22px;
        line-height: 14px;
      }
      .avatar {
        vertical-align: top;
        width: 50px;
        height: 70px;
      }

      .name {
        background: url(../../assets/user/label_name.png) no-repeat 5px center;
        background-size: contain;
      }

      .sex {
        background: url(../../assets/user/label_sex.png) no-repeat 5px center;
        background-size: contain;
      }

      .cardNo {
        position: relative;
        line-height: 12px;
        background: url(../../assets/user/label_cardno.png) no-repeat 5px center;
        background-size: contain;

        span {
          position: absolute;
          left: 48px;
          top: -2px;
          font-size: 10px;
        }
      }

      .cardid {
        margin-bottom: 20px;
        position: relative;
        line-height: 12px;
        background: url(../../assets/user/label_id.png) no-repeat 0 center;
        background-size: contain;

        span {
          position: absolute;
          left: 46px;
          top: -2px;
          font-size: 10px;
        }
      }
      .jigou {
        margin-bottom: 4px;
        height: 10px;
        background: url(../../assets/user/label_jigou.png) no-repeat 0 center;
        background-size: contain;
      }
      .time {
        height: 20px;
        line-height: 20px;
        background: url(../../assets/user/label_time.png) no-repeat 0 center;
        background-size: 46px;
      }
    }
  }

  .bg_btd {
    height: 270px;
    background: url(../../assets/user/bg_certificate.jpg) #fff no-repeat bottom center;
    background-size: 100% 100%;
  }
}
</style>
