// 模块入口文件
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import http from './moments.api'
import '../../config/rem'
import moments from './moments.app'
import momentsRouter from './moments.router'
import VueTouch from 'vue-touch'
import VueVideoPlayer from 'vue-video-player'
import VueAwesomeSwiper from 'vue-awesome-swiper'


Vue.prototype.http = http;


Vue.config.productionTip = false

Vue.use(MintUI)
Vue.use(VueTouch, {name: 'v-touch'})
Vue.use(VueVideoPlayer)
Vue.use(VueAwesomeSwiper)

new Vue({
  el: '#moments',
  router:momentsRouter,
  template: '<moments/>',
  components: { moments }
})
