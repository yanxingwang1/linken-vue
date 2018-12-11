// 模块入口文件
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import director from './director.app'
import http from './director.api'
import '../../config/rem'
import '../../config/click'
import '../../common/DMC.filter'
import '../../common/zeptoExtension'
import '../../assets/style/stylewx.scss'
import directorRouter from './director.router'
import VueLazyload from 'vue-lazyload'
import N3Components from 'N3-components'
import 'N3-components/dist/index.min.css'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';


Vue.prototype.http = http;


Vue.config.productionTip = false

Vue.use(MintUI)
Vue.use(VueLazyload)
Vue.use(N3Components)
Vue.use(N3Components, 'en')
Vue.use(ElementUI)
new Vue({
  el: '#director',
  router:directorRouter,
  template: '<director/>',
  components: { director }
})
