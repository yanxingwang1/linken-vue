// 模块入口文件
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import fetchAndDeliver from './fetchAndDeliver.app'
import http from './fetchAndDeliver.api'
import '../../config/rem'
// import '../../config/click'
import '../../common/DMC.filter'
import '../../common/zeptoExtension'
import '../../assets/style/stylewx.scss'
import fetchAndDeliverRouter from './fetchAndDeliver.router'
import VueLazyload from 'vue-lazyload'
import N3Components from 'N3-components'
import 'N3-components/dist/index.min.css'
import DialogImg from '../../components/dialogImg'
import DialogBack from '../../components/dialogBack'
import './../../assets/style/form.scss'
import './../../assets/style/jquery.extend.scss'
import './../../common/jquery.extend'


Vue.prototype.http = http;


Vue.config.productionTip = false

Vue.prototype.$Bus = new Vue();

Vue.use(MintUI)
Vue.use(VueLazyload)
Vue.use(N3Components)
Vue.use(N3Components, 'en')
Vue.component('DialogImg',DialogImg)
Vue.component('DialogBack',DialogBack)
new Vue({
  el: '#fetchAndDeliver',
  router:fetchAndDeliverRouter,
  template: '<fetchAndDeliver/>',
  components: { fetchAndDeliver }
})
