import Vue from 'vue'
import Router from 'vue-router'
const index = () => import(/* webpackChunkName: "group-home" */  './index')
const people = ()=> import('./people')
const service = ()=> import('./service')
const time = ()=> import('./time')

Vue.use(Router)

const momentsRouter = new Router({
  routes: [
    {
      path: '/',
      name: '视频时刻',
      component: index,
      meta: {keepAlive: true} // 这个是不需要keepalive的
    },
    {
      path: '/index',
      name: '视频时刻',
      component: index,
      meta: {keepAlive: true} // 这个是不需要keepalive的
    },
    {
      path: '/people',
      name: '林肯团队',
      component: people,
      meta: {keepAlive: true} // 这个是不需要keepalive的
    },
    {
      path: '/service',
      name: '林肯服务',
      component: service,
      meta: {keepAlive: true} // 这个是不需要keepalive的
    },
    {
      path: '/time',
      name: '林肯时刻',
      component: time,
      meta: {keepAlive: false} // 这个是不需要keepalive的
    },

  ]
})

export default momentsRouter;


