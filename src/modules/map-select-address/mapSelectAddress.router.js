import Vue from 'vue'
import Router from 'vue-router'

const index = () => import(/* webpackChunkName: "group-home" */  './index')
const drivingLine = () => import(/* webpackChunkName: "group-home" */  './drivingLine')
const wayShow = () => import('./driveWayShow')

Vue.use(Router)

const mapSelectAddressRouter = new Router({
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
    //drivingLine
    {
      path: '/drivingLine',
      name: 'drivingLine',
      component: drivingLine,
      meta: {keepAlive: true} // 这个是不需要keepalive的
    },
    {
      path: '/wayShow',
      name: 'wayShow',
      component: wayShow,
      meta: {keepAlive: true} // 这个是不需要keepalive的
    },
  ]
})

export default mapSelectAddressRouter;


