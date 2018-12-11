// 模块入口文件
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import myorder from './myorder.app'
import http from './myorder.api'
import '../../config/rem'
import '../../config/click'
import '../../common/DMC.filter'
import '../../common/zeptoExtension'
import '../../assets/style/stylewx.scss'
import myorderRouter from './myorder.router'
import VueLazyload from 'vue-lazyload'
import N3Components from 'N3-components'
import 'N3-components/dist/index.min.css'
import Dialog from '../../components/dialog'
import DialogBack from '../../components/dialogBack'


Vue.prototype.http = http;


Vue.config.productionTip = false

Vue.use(MintUI)
Vue.use(VueLazyload)
Vue.use(N3Components)
Vue.use(N3Components, 'en')
Vue.component('Dialog',Dialog)
Vue.component('DialogBack',DialogBack)
new Vue({
  el: '#myorder',
  router:myorderRouter,
  template: '<myorder/>',
  components: { myorder }
})
