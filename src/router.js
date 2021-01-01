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