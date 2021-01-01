import Vue from 'vue';
import App from './App';
import { router } from './router';
import Vant from 'vant';
import 'vant/lib/index.css';
import 'lib-flexible/flexible'

Vue.use(Vant);

new Vue({
  router,
  el: '#app',
  render: h => h(App)
});
