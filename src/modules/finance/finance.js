// 模块入口文件
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import finance from './finance.app'
import http from './finance.api'
import '../../config/rem'
import '../../config/click'
import '../../common/DMC.filter'
import '../../common/zeptoExtension'
import '../../assets/style/stylewx.scss'
import financeRouter from './finance.router'
import VueLazyload from 'vue-lazyload'
import N3Components from 'N3-components'
import 'N3-components/dist/index.min.css'
import DialogImg from '../../components/dialogImg'
import DialogBack from '../../components/dialogBack'


Vue.prototype.http = http;


Vue.config.productionTip = false

Vue.use(MintUI)
Vue.use(VueLazyload)
Vue.use(N3Components)
Vue.use(N3Components, 'en')
Vue.component('DialogImg',DialogImg)
Vue.component('DialogBack',DialogBack)
new Vue({
  el: '#finance',
  router:financeRouter,
  template: '<finance/>',
  components: { finance }
})
