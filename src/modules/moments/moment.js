// 模块入口文件
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import moments from './moment.app'
import http from './moment.api'
import '../../config/rem'
// import '../../config/click'
import '../../common/DMC.filter'
import momentsRouter from './moment.router'
import VueVideoPlayer from 'vue-video-player'
import VueAwesomeSwiper from 'vue-awesome-swiper'

import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
Vue.use(MintUI)
Vue.use(VueVideoPlayer)
Vue.use(VueAwesomeSwiper)

Vue.prototype.http = http;

Vue.config.productionTip = false


new Vue({
  el: '#apply',
  router:momentsRouter,
  template: '<moments/>',
  components: { moments }
})
