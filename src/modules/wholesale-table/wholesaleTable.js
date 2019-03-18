// 模块入口文件
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import wholesale from './wholesaleTable.app'
import http from './wholesaleTable.api'
import '../../config/rem'
import '../../config/click'
import '../../common/DMC.filter'
import '../../common/jquery.extend'
import router from './wholesaleTable.router'


import './../../assets/style/common-style.scss'


Vue.prototype.http = http;

Vue.config.productionTip = false


new Vue({
  el: '#wholesaleTable',
  router:router,
  template: '<wholesale/>',
  components: { wholesale }
})
