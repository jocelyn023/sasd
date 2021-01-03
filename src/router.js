import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

const routes = [

  {
    name: 'demo',
    component: () => import('./view/demo'),
    meta: {
      title: '示例'
    }
  },
  {
    name: '/',
    component: () => import('./view/index'),
    meta: {
      title: '首页'
    }
  },
  {
    name: 'newsList',
    component: () => import('./view/index/newsList'),
    meta: {
      title: '新闻列表'
    }
  },
  {
    name: 'newsDetails',
    component: () => import('./view/index/newsDetails'),
    meta: {
      title: '新闻详情'
    }
  },
  {
    name: 'studyCenter',
    component: () => import('./view/study/studyCenter'),
    meta: {
      title: '学习中心'
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
      title: '我的'
    }
  },
  {
    name: 'msgCenter',
    component: () => import('./view/user/msgCenter'),
    meta: {
      title: '消息中心'
    }
  },
  {
    name: 'msgList',
    component: () => import('./view/user/msgList'),
    meta: {
      title: '消息列表'
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
  },
  {
    name: 'score',
    component: () => import('./view/user/score'),
    meta: {
      title: '成绩单'
    }
  },
  {
    path: '*',
    redirect: '/404'
  }
];

// add route path
routes.forEach(route => {
  route.path = route.path || '/' + (route.name || '');
});

const router = new Router({
  mode: 'history',
  routes
});

router.beforeEach((to, from, next) => {
  const title = to.meta && to.meta.title;
  if (title) {
    document.title = title;
  }
  next();
});

export {
  router
};