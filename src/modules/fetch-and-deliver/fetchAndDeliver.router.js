import Vue from 'vue'
import Router from 'vue-router'
const fetchIndex = () => import(/* webpackChunkName: "group-home" */  './fetchIndex')
const orderList = () => import('./deliveryOrderList')
const orderDetail = () => import('./deliveryOrderDetail')
const workOrder = () => import('./workOrderList')
const createSendOrder = () => import('./createSendOrder')

Vue.use(Router)

const fetchAndDeliverRouter = new Router({
  routes: [
    {
      path: '/',
      name: 'fetchIndex',
      component: fetchIndex,
      meta: {keepAlive: true} // 这个是不需要keepalive的
    },{
      path: '/fetchIndex',//服务总监列表
      name: 'fetchIndex',
      component: fetchIndex,
      meta: {keepAlive: true} // 这个是不需要keepalive的
    },{
      path: '/orderList',//服务工程师列表
      name: 'orderList',
      component: orderList,
      meta: {keepAlive: true} // 这个是不需要keepalive的
    },{
      path: '/orderDetail',//服务工程师详情,服务总监详情
      name: 'orderDetail',
      component: orderDetail,
      meta: {keepAlive: false} // 这个是不需要keepalive的
    },{
      path: '/workOrder',//服务工程师工单列表
      name: 'workOrder',
      component: workOrder,
      meta: {keepAlive: true} // 这个是不需要keepalive的
    },{
      path: '/createSendOrder',//服务工程师创建送车订单
      name: 'createSendOrder',
      component: createSendOrder,
      meta: {keepAlive: false} // 这个是不需要keepalive的
    }
  ]
})

export default fetchAndDeliverRouter;


