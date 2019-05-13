// 模块入口文件
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import cover from './mapSelectAddress.app'
import http from './mapSelectAddress.api'
import '../../config/rem'
// import '../../config/click'
// import '../../common/DMC.filter'
import router from './mapSelectAddress.router'

import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import './../../assets/style/jquery.extend.scss'
import './../../common/jquery.extend'

Vue.use(MintUI)
Vue.prototype.http = http;

Vue.config.productionTip = false


new Vue({
  el: '#mapSelectAddress',
  router:router,
  template: '<cover/>',
  components: { cover }
})
