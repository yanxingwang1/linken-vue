import Vue from 'vue'
import Router from 'vue-router'
const index = () => import(/* webpackChunkName: "group-home" */  './index')
const detail = ()=> import('./detail')
const subscribeList = ()=> import('./subscribeList')
const subscribeDetail = ()=> import('./subscribeDetail')

Vue.use(Router)

const financeRouter = new Router({
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
      meta: {keepAlive: false} // 这个是不需要keepalive的
    },
    {
      path: '/subscribeList',
      name: 'subscribeList',
      component: subscribeList,
      meta: {keepAlive: true} // 这个是不需要keepalive的
    },
    {
      path: '/subscribeDetail',
      name: 'subscribeDetail',
      component: subscribeDetail,
      meta: {keepAlive: false} // 这个是不需要keepalive的
    },
  ]
})

export default financeRouter;


