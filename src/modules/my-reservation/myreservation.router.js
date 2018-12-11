import Vue from 'vue'
import Router from 'vue-router'
const index = () => import(/* webpackChunkName: "group-home" */  './index')
const detail = ()=> import('./detail')
const demo=()=>import('./demo')

Vue.use(Router)

const myreservationRouter = new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index,
      meta: {keepAlive: true} // 这个是不需要keepalive的
    },
    {
      path: '/index',
      name: 'index',
      component: index,
      meta: {keepAlive: true} // 这个是不需要keepalive的
    },
    {
      path: '/detail',
      name: 'detail',
      component: detail,
      meta: {keepAlive: true} // 这个是不需要keepalive的
    },
    {
      path: '/demo',
      name: 'demo',
      component: demo,
      meta: {keepAlive: true} // 这个是不需要keepalive的
    },
   
  ]
})

export default myreservationRouter;


