// 模块入口文件
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import apply from './apply.app'
import http from './apply.api'
import '../../config/rem'
import '../../config/click'
import '../../common/DMC.filter'
import applyRouter from './apply.router'

import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
Vue.use(MintUI)

Vue.prototype.http = http;

Vue.config.productionTip = false


new Vue({
  el: '#apply',
  router:applyRouter,
  template: '<apply/>',
  components: { apply }
})
