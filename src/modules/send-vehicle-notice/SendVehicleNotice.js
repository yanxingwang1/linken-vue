// 模块入口文件
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import './../../assets/style/normalize.mobile.min.css'
import Vue from 'vue'
import cover from './SendVehicleNotice.app'
import http from './SendVehicleNotice.api'
import '../../config/rem'
import '../../config/click'
import router from './SendVehicleNotice.router'

import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
// import N3Components from 'N3-components'
import './../../assets/style/common-style.scss'
import './../../assets/style/jquery.extend.scss'
import './../../common/jquery.extend'
// import VueAwesomeSwiper from 'vue-awesome-swiper'

Vue.use(MintUI)
// Vue.use(N3Components)
// Vue.use(VueAwesomeSwiper)
Vue.prototype.http = http;

Vue.config.productionTip = false
Vue.prototype.$Bus = new Vue();//全局bus


new Vue({
  el: '#trydrivercar',
  router:router,
  template: '<cover/>',
  components: { cover }
})
