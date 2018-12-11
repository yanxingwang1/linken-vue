import Vue from 'vue'
import Router from 'vue-router'
const index = () => import(/* webpackChunkName: "group-home" */  './index')
const detail = ()=> import('./detail')
const boundCar = ()=> import('./boundCar')

Vue.use(Router)

const myorderRouter = new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index,
      meta: {keepAlive: true} // 这个是需要keepalive的
    },
    {
      path: '/index',
      name: 'index',
      component: index,
      meta: {keepAlive: true} // 这个是需要keepalive的
    },
    {
      path: '/detail',
      name: 'detail',
      component: detail,
      meta: {keepAlive: false} // 这个是不需要keepalive的
    },
    {
      path: '/boundCar',
      name: 'boundCar',
      component: boundCar,
      meta: {keepAlive: false} // 这个是不需要keepalive的
    },
  ]
})

export default myorderRouter;


