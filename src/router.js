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
    name: 'courseBuy',
    component: () => import('./view/course/courseBuy'),
    meta: {
      title: '购买课程'
    }
  },
  {
    name: 'examStep',
    component: () => import('./view/exam/examStep'),
    meta: {
      title: '考试'
    },
    redirect: "/examStep_1",
    children: [{
      name: 'examStep_1',
      component: () => import('./view/exam/examStep_1'),
      meta: {
        title: '上传一寸照',
        stepActive: 0,
      },
    },{
      name: 'examStep_2',
      component: () => import('./view/exam/examStep_2'),
      meta: {
        title: '笔试成绩',
        stepActive: 1,
      },
    },{
      name: 'examStep_3',
      component: () => import('./view/exam/examStep_3'),
      meta: {
        title: '上传视频',
        stepActive: 2,
      },
    },{
      name: 'examStep_4',
      component: () => import('./view/exam/examStep_4'),
      meta: {
        title: '证书地址',
        stepActive: 3,
      },
    }]
  },
  {
    path: '*',
    redirect: '/404'
  }
];

// add route path
routes.forEach(route => {
  route.path = route.path || '/' + (route.name || '');
  if (route.children) {
    route.children.forEach(child => {
      child.path = child.path || '/' + (child.name || '');
    })
  }
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