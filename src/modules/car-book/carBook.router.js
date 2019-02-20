import Vue from 'vue'
import Router from 'vue-router'
const navigator = () => import(/* webpackChunkName: "group-home" */  './navigator')
const continental = () => import(/* webpackChunkName: "group-home" */  './continental')
const mkcCarBook = () => import(/* webpackChunkName: "group-home" */  './mkc-car-book')
const mkxCarBook = () => import(/* webpackChunkName: "group-home" */  './mkx-car-book')
const mkzCarBook = () => import(/* webpackChunkName: "group-home" */  './mkz-car-book')
const nautilus = () => import(/* webpackChunkName: "group-home" */  './nautilus')

Vue.use(Router)

const carBookRouter = new Router({
  routes: [
    {
      path: '/',
      name: 'navigator',
      component: navigator,
      meta: {keepAlive: true} // 这个是不需要keepalive的
    },
    {
      path: '/navigator',
      name: 'navigator',
      component: navigator,
      meta: {keepAlive: true} // 这个是不需要keepalive的
    },
    {
      path: '/continental',
      name: 'continental',
      component: continental,
      meta: {keepAlive: true} // 这个是不需要keepalive的
    },
    {
      path: '/mkcCarBook',
      name: 'mkcCarBook',
      component: mkcCarBook,
      meta: {keepAlive: true} // 这个是不需要keepalive的
    },
    {
      path: '/mkxCarBook',
      name: 'mkxCarBook',
      component: mkxCarBook,
      meta: {keepAlive: true} // 这个是不需要keepalive的
    },
    {
      path: '/mkzCarBook',
      name: 'mkzCarBook',
      component: mkzCarBook,
      meta: {keepAlive: true} // 这个是不需要keepalive的
    },
    {
      path: '/nautilus',
      name: 'nautilus',
      component: nautilus,
      meta: {keepAlive: true} // 这个是不需要keepalive的
    },
  ]
})

export default carBookRouter;


