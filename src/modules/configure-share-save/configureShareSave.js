// 模块入口文件
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import configureShareSave from './configureShareSave.app'
import http from './configureShareSave.api'
import '../../config/rem'
import '../../config/click'
import '../../common/DMC.filter'
import '../../assets/style/stylewx.scss'
import configureShareSaveRouter from './configureShareSave.router'
import VueLazyload from 'vue-lazyload'

Vue.prototype.http = http;

Vue.config.productionTip = false

Vue.use(MintUI)
Vue.use(VueLazyload)
new Vue({
  el: '#configureShareSave',
  router:configureShareSaveRouter,
  template: '<configureShareSave/>',
  components: { configureShareSave }
})
