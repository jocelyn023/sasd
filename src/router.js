import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const redirect_uri = ''
const routes = [
  {
    name: 'demo',
    component: () => import('./view/demo'),
    meta: {
      title: '示例'
    }
  }, {
    name: '/',
    component: () => import('./view/index'),
    meta: {
      title: '首页',
      hideNavBar: true
    }
  }, {
    name: 'NotFound',
    component: () => import('./view/NotFound'),
    meta: {
      title: 'NotFound',
      hideNavBar: true
    }
  }, {
    name: 'newsList',
    component: () => import('./view/index/newsList'),
    meta: {
      title: '新闻列表',
      hideNavBar: true
    }
  }, {
    name: 'newsDetails',
    component: () => import('./view/index/newsDetails'),
    meta: {
      title: '新闻详情'
    }
  }, {
    name: 'bannerDetail',
    component: () => import('./view/index/bannerDetail'),
    meta: {
      title: '新闻详情'
    }
  },
  {
    name: 'studyCenter',
    component: () => import('./view/study/studyCenter'),
    meta: {
      title: '学习中心',
      hideNavBar: true
    }
  },
  {
    name: 'studyList',
    component: () => import('./view/study/studyList'),
    meta: {
      title: '学习列表'
    }
  },
  {
    name: 'courseList',
    component: () => import('./view/course/courseList'),
    meta: {
      title: '课程列表'
    }
  },
  {
    name: 'courseDetail',
    component: () => import('./view/course/courseDetail'),
    meta: {
      title: '课程详情'
    }
  },
  {
    name: 'courseBuy',
    component: () => import('./view/course/courseBuy'),
    meta: {
      title: '购买课程'
    }
  },
  {
    name: 'me',
    component: () => import('./view/user/index'),
    meta: {
      title: '我的',
      hideNavBar: true
    }
  }, {
    name: 'channel',
    component: () => import('./view/user/channel'),
    meta: {
      title: '我的渠道',
      hideNavBar: true
    }
  }, {
    name: 'editUser',
    component: () => import('./view/user/editUser'),
    meta: {
      title: '个人信息设置'
    }
  }, {
    name: 'channelTab',
    component: () => import('./view/user/channelTab'),
    meta: {
      title: '渠道报表',
      hideNavBar: true
    }
  }, {
    name: 'wallet',
    component: () => import('./view/user/wallet'),
    meta: {
      title: '我的钱包'
    }
  }, 
  // {
  //   name: 'walletResult',
  //   component: () => import('./view/user/walletResult'),
  //   meta: {
  //     title: '提现结果'
  //   }
  // },
  {
    name: 'walletApply',
    component: () => import('./view/user/walletApply'),
    meta: {
      title: '提现申请',
      hideNavBar: true
    }
  }, {
    name: 'walletDetails',
    component: () => import('./view/user/walletDetails'),
    meta: {
      title: '收支明细'
    }
  }, {
    name: 'applyPromoter',
    component: () => import('./view/user/applyPromoter'),
    meta: {
      title: '申请成为推广员'
    }
  },
  {
    name: 'applyResult',
    component: () => import('./view/user/applyResult'),
    meta: {
      title: '申请结果'
    }
  },
  {
    name: 'address',
    component: () => import('./view/user/address'),
    meta: {
      title: '邮寄地址',
      hideNavBar: true
    }
  },
  {
    name: 'msgCenter',
    component: () => import('./view/user/msgCenter'),
    meta: {
      title: '消息中心'
    }
  },{
    name: 'certificateType',
    component: () => import('./view/user/certificateTypeList'),
    meta: {
      title: '我的证书'
    }
  }, {
    name: 'certificateList',
    component: () => import('./view/user/certificateList'),
    meta: {
      title: '我的证书'
    }
  }, {
    name: 'msgList',
    component: () => import('./view/user/msgList'),
    meta: {
      title: '消息列表',
      hideNavBar: true
    }
  },
  {
    name: 'msgDetails',
    component: () => import('./view/user/msgDetails'),
    meta: {
      title: '消息详情'
    }
  },
  {
    name: 'orderList',
    component: () => import('./view/user/orderList'),
    meta: {
      title: '我的订单'
    }
  }, {
    name: 'scoreList',
    component: () => import('./view/user/orderList'),
    meta: {
      title: '成绩查询'
    }
  }, {
    name: 'myScore',
    component: () => import('./view/user/score'),
    meta: {
      title: '成绩单'
    }
  }, {
    name: 'examStep',
    component: () => import('./view/exam/examStep'),
    meta: {
      title: '考试'
    },
    redirect: '/examStep_1',
    children: [{
      name: 'examStep_1',
      component: () => import('./view/exam/examStep_1'),
      meta: {
        title: '上传一寸照',
        stepActive: 0
      }
    }, {
      name: 'examStep_2',
      component: () => import('./view/exam/examStep_2'),
      meta: {
        title: '笔试成绩',
        stepActive: 1
      }
    }, {
      name: 'examStep_3',
      component: () => import('./view/exam/examStep_3'),
      meta: {
        title: '上传视频',
        stepActive: 2
      }
    }, {
      name: 'examStep_4',
      component: () => import('./view/exam/examStep_4'),
      meta: {
        title: '证书地址',
        stepActive: 3
      }
    }]
  }, {
    path: '*',
    redirect: {
      name: 'NotFound'
    }
  }
]

// add route path
routes.forEach(route => {
  route.path = route.path || '/' + (route.name || '')
  if (route.children) {
    route.children.forEach(child => {
      child.path = child.path || '/' + (child.name || '')
    })
  }
})

const router = new Router({
  mode: 'history',
  // base: '/dist',
  routes
})

// const VuerouterPush = router.prototype.push
// router.prototype.push = function push (to) {
//   return VuerouterPush.call(this, to).catch(err => err)
// }

router.beforeEach((to, from, next) => {
  const title = to.meta && to.meta.title
  if (title) {
    document.title = title
  }
  let token = localStorage.getItem("token");
  
  if (typeof token == "undefined" || token == null || token == "") {
    const reg = new RegExp("(^|&)token=([^&]*)(&|$)");
    const r = window.location.search.substr(1).match(reg);
    if(r!=null) {
      token = unescape(r[2])
    } else {
      token = null
    }

    if (!(typeof token == "undefined" || token == null || token == "")) { // 如果获取到openId,放到localStorage中
      localStorage.setItem("token", token);
      next()
    } else { // 如果没有获取到openId，去微信授权
      let url = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + process.env.VUE_APP_APPID
      url = url + '&redirect_uri='+ process.env.VUE_APP_BASE_API_URL +'/sasd/wx/auth/' + process.env.VUE_APP_APPID + '/greetUser'
      url = url + '?callBackAction=' + to.fullPath
      url = url + '&response_type=code&scope=snsapi_userinfo&state=1#wechat_redirect'

      window.location.href = url
    }
  } else {
    next()
  }
})

export default router
