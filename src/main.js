import Vue from 'vue';
import App from './App';
import router from './router';
import Vant from 'vant';
import { Lazyload } from 'vant';
import 'vant/lib/index.css';
import 'lib-flexible/flexible'
import { ShareImpl } from '@/utils/wxApi.js'

let url = window.location.href
// if(url.indexOf('from') != -1){
//   url = window.location.href.split("?")[0];
// }
console.log(url + 'favicon.png');
ShareImpl({
  shareTitle: document.title,
  shareDesc: document.title,
  shareUrl: url,
  shareImg: url + 'favicon.png',
});

Vue.use(Vant);
Vue.use(Lazyload);

new Vue({
  router,
  el: '#app',
  render: h => h(App)
});
