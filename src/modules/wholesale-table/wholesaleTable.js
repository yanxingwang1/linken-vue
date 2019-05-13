// 模块入口文件
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import wholesale from './wholesaleTable.app';
import http from './wholesaleTable.api';
import '../../config/rem';
// import '../../config/click';
import '../../common/DMC.filter';
import '../../common/jquery.extend';
// import ElementUI from 'element-ui';
// import 'element-ui/lib/theme-chalk/index.css';
import router from './wholesaleTable.router';
import './../../assets/style/common-style.scss';
import './../../assets/style/jquery.extend.scss'
import './../../common/jquery.extend'
import MintUI from "mint-ui";
import 'mint-ui/lib/style.css'
// Vue.use(ElementUI, { size: 'small', zIndex: 3000 });

Vue.prototype.http = http;

Vue.config.productionTip = false;

Vue.use(MintUI)
new Vue({
	el: '#wholesaleTable',
	router: router,
	template: '<wholesale/>',
	components: { wholesale }
});
