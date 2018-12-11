// 模块入口文件
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import register from './register.app'
import http from './register.api'
import '../../config/rem'
// import '../../config/click'
import '../../common/DMC.filter'
import registerRouter from './register.router'
import N3Components from 'N3-components'
import 'N3-components/dist/index.min.css'


import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import './../../assets/style/common-style.scss'
import { MessageBox } from 'mint-ui'

Vue.use(MintUI)
Vue.use(N3Components)
Vue.use(N3Components, 'en')
// import './../../assets/style/common-style.scss'

Vue.prototype.http = http;

Vue.config.productionTip = false


new Vue({
  el: '#register',
  router:registerRouter,
  template: '<register/>',
  components: { register }
})
registerRouter.afterEach(route => {MessageBox.close();})
