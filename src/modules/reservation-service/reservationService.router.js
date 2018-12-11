import Vue from 'vue'
import Router from 'vue-router'
const index = () => import(/* webpackChunkName: "group-home" */  './index')
const demo = () => import(/* webpackChunkName: "group-home" */  './demo')
const dialog = () => import(/* webpackChunkName: "group-home" */  './dialog')

Vue.use(Router)

const applyRouter = new Router({
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
      path: '/demo',
      name: 'demo',
      component: demo,
      meta: {keepAlive: true} // 这个是不需要keepalive的
    },
    {
      path: '/dialog',
      name: 'dialog',
      component: dialog,
      meta: {keepAlive: true} // 这个是不需要keepalive的
    },
  ]
})

export default applyRouter;


