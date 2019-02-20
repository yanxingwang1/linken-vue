// 模块入口文件
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import carBook from './carBook.app'
import '../../config/rem'
import '../../config/click'
import '../../common/DMC.filter'
import '../../assets/style/stylewx.scss'
import carBookRouter from './carBook.router'
import VueLazyload from 'vue-lazyload'



Vue.config.productionTip = false

Vue.use(MintUI)
Vue.use(VueLazyload)
new Vue({
  el: '#carBook',
  router:carBookRouter,
  template: '<carBook/>',
  components: { carBook }
})
