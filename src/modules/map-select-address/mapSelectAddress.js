// 模块入口文件
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import cover from './mapSelectAddress.app'
import http from './mapSelectAddress.api'
// import '../../config/rem'
import '../../config/click'
import '../../common/DMC.filter'
import './../../common/jquery.extend'
import router from './mapSelectAddress.router'

// import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
// import './../../assets/style/common-style.scss'

// Vue.use(MintUI)
Vue.prototype.http = http;

Vue.config.productionTip = false


new Vue({
  el: '#mapSelectAddress',
  router:router,
  template: '<cover/>',
  components: { cover }
})
