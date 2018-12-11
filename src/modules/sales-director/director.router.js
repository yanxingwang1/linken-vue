import Vue from 'vue'
import Router from 'vue-router'
const index = () => import(/* webpackChunkName: "group-home" */  './index')
const route = () => import(/* webpackChunkName: "group-home" */  './route')
const feedback = () => import('./feedback')

Vue.use(Router)

const directorRouter = new Router({
  routes: [
    {
        path: '/',
        name: '试乘试驾资源管理',
        component: index,
        meta: {keepAlive: true} // 这个是需要keepalive的
    },
    {
        path: '/index',
        name: '试乘试驾资源管理',
        component: index,
        meta: {keepAlive: true} // 这个是需要keepalive的
    },
    {
        path: '/route',
        name: '试乘试驾路线',
        component: route,
        meta: {keepAlive: true} // 这个是需要keepalive的
    },
    {
        path: '/feedback',
        name: '试乘试驾反馈表',
        component: feedback,
        meta: {keepAlive: true} // 这个是需要keepalive的
    },
  ]
})

export default directorRouter;