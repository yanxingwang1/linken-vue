// 模块入口文件
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import cover from './trydrivercar.app'
import http from './trydrivercar.api'
import '../../config/rem'
import '../../config/click'
import '../../common/DMC.filter'
import './../../common/jquery.extend'
import  { ConfirmPlugin } from 'vux'
import router from './trydrivercar.router'

import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import N3Components from 'N3-components'
import './../../assets/style/common-style.scss'

Vue.use(MintUI)
Vue.use(N3Components)
Vue.use(ConfirmPlugin)
Vue.prototype.http = http;

Vue.config.productionTip = false


new Vue({
  el: '#trydrivercar',
  router:router,
  template: '<cover/>',
  components: { cover }
})
