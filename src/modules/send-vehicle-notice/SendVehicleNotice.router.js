import Vue from 'vue';
import Router from 'vue-router';
import http from './SendVehicleNotice.api';

const index = () => import(/* webpackChunkName: "group-home" */ './index');
const SendVehicle = () => import(/* webpackChunkName: "group-home" */ './SendVehicle');
const test = () => import('./test');
const PickVehicle=()=>import("./PickVehicle")
const userRate = ()=>import("./userRate")

Vue.use(Router);

const applyRouter = new Router({
	routes: [
		{
			path: '/',
			name: 'index',
			component: index,
			meta: { keepAlive: true } // 这个是不需要keepalive的
		},
		{
			path: '/index',
			name: 'index',
			component: index,
			meta: { keepAlive: true } // 这个是不需要keepalive的
		},
		{
			path: '/SendVehicle', //表示其他送车状态
			name: 'SendVehicle',
			component: SendVehicle,
			meta: { keepAlive: true } // 这个是不需要keepalive的
		},
		{
			path: '/PickVehicle', //表示其他送车状态
			name: 'PickVehicle',
			component: PickVehicle,
			meta: { keepAlive: false } // 这个是不需要keepalive的
		},
		{
			path: '/userRate',
			name: 'userRate',
			component: userRate,
			meta: { keepAlive: false } // 这个是不需要keepalive的
		},
		{
			path: '/test',
			name: 'test',
			component: test,
			meta: { keepAlive: true } // 这个是不需要keepalive的
		}
	]
});

// 全局路由守卫
// applyRouter.beforeEach((to, from, next) => {
//   console.log('navigation-guards');
//   // to: Route: 即将要进入的目标 路由对象
//   // from: Route: 当前导航正要离开的路由
//   // next: Function: 一定要调用该方法来 resolve 这个钩子。执行效果依赖 next 方法的调用参数。
//   if (route.indexOf(to.name) >= 0) {
//     if (!isLogin) {
//       this.$router.push({ path:'/login',});
//     }
//   }
//   const route = ['/', '/index'];
//   // 已登录状态；当路由到login时，跳转至home
//   if (to.name === 'index') {
//     // debugger
//     http.get('getBaseInfo', res => {
//       // debugger
//       console.log('查询用户绑车信息 getBaseInfo', res)
//       if (res.resultCode == 1) {
//         const data = res.data
//         if (data.code == 3) {
//           return;
//         } else {
//           alert('路由守卫失败')
//           window.location.href = location.origin + "/modules/myorder.html#/boundCar"
//         }
//       } else {
//         console.log('getBaseInfo error')
//       }
//     })
//   }
//   next();
// });

export default applyRouter;
