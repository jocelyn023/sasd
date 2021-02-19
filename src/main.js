import Vue from 'vue';
import App from './App';
import router from './router';
import Vant from 'vant';
import { Lazyload } from 'vant';
import 'vant/lib/index.css';
import 'lib-flexible/flexible'
import Video from "video.js"
import "video.js/dist/video-js.css"
Vue.prototype.$video = Video;
import Vconsole from 'vconsole';
new Vconsole();

Vue.use(Vant);
Vue.use(Lazyload);

new Vue({
  router,
  el: '#app',
  render: h => h(App)
});
