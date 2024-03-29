import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import touch from 'vue-directive-touch';
Vue.use(touch);

import VueAwesomeSwiper from 'vue-awesome-swiper';
Vue.use(VueAwesomeSwiper);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
