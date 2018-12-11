import Vue from 'vue'
import Router from 'vue-router'
const index = () => import( /* webpackChunkName: "group-home" */ './index')

const dailyRegister = () => import("./dailyregister.vue")
const driverForm = () => import("./driverform.vue")
const endDrive = () => import("./endDrive.vue")
const driveAgreement = () => import("./driveagreement.vue")
const drivePreview = () => import("./drivePreview.vue")
const qrCode = () => import("./qrCode.vue")
const demo = () => import("./demo.vue")
const demo1 = () => import("./demo1.vue")

Vue.use(Router)

const registerRouter = new Router({
  routes: [{
      path: '/',
      name: 'index',
      component: index,
      meta: {
        keepAlive: false
      } // 这个是不需要keepalive的
    },
    {
      path: '/index',
      name: 'index',
      component: index,
      meta: {
        keepAlive: false
      } // 这个是不需要keepalive的
    },
    {
      path: '/dailyregister',
      name: '当日试驾',
      component: dailyRegister,
      meta: {
        keepAlive: false
      } // 这个是不需要keepalive的
    },
    {
      path: '/driverform',
      name: '试乘试驾登记',
      component: driverForm,
      meta: {
        keepAlive: false
      } // 这个是不需要keepalive的
    },
    {
      path: '/endDrive',
      name: '试乘试驾登记结束',
      component: endDrive,
      meta: {
        keepAlive: false
      } // 这个是不需要keepalive的
    },
    {
      path: '/driveagreement',
      name: '试驾协议',
      component: driveAgreement,
      meta: {
        keepAlive: false
      } // 这个是不需要keepalive的
    },
    {
      path: '/drivePreview',
      name: '试驾协议预览',
      component: drivePreview,
      meta: {
        keepAlive: false
      } // 这个是不需要keepalive的
    },
    {
      path: '/qrCode',
      name: '二维码',
      component: qrCode,
      meta: {
        keepAlive: false
      } // 这个是不需要keepalive的
    },
    {
      path: '/demo',
      name: '监听微信返回关闭',
      component: demo,
      meta: {
        keepAlive: false
      } // 这个是不需要keepalive的
    },
    {
      path: '/demo1',
      name: '监听微信返回关闭',
      component: demo1,
      meta: {
        keepAlive: false
      } // 这个是不需要keepalive的
    },
  ]
})
export default registerRouter;
