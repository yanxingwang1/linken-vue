/**
 * Created by dongooo on 2019/3/6.
 * 项目全局API配置，并在入口文件中将http暴露到全局
 *
 */
import http from '../../common/DMC.http';

try {
	const List = [
		// 服务工程是取送车列表 || 服务总监取送车列表
		{ id: 'fetchAndDeliverList', url: 'PUD/api/v1/DeliveryOrderDetails', format: false },
		// 送车订单详情
		{ id: 'fetchAndDeliverDetail', url: 'PUD/api/v1/OrderDetails', format: false },
		// 工单列表
		{ id: 'workOrderList', url: 'PUD/api/v1/RoNoList', format: false },
		// 工单详情
		{ id: 'workOrderDetail', url: 'PUD/api/v1/pay/getRrepairOrder', format: false },
		// 创建
		{ id: 'creatOrder', url: 'PUD/api/v1/pay/creatOrder', format: false },
		// 订单取消
		{ id: 'orderCancel', url: 'PUD/api/v1/pay/orderCancel', format: false },
		// “该工单已经存在未完成的送车服务订单”
		{ id: 'checkOrder', url: 'PUD/api/v1/pay/checkOrder', format: false },
		
		// 修改和重新下单
		{
			id: 'updateOrder',
			url: 'PUD/api/v1/pay/updateOrder',
			format: false
		},
		// 获取司机信息
		{ id: 'driverInfo', url: 'PUD/api/v1/driverInfo', format: false },
		// 计算预估距离
		{ 
			id: 'getEstimatedPrice', 
			url: 'PUD/api/v1/pay/getEstimatedPrice',
			format: false 
		},
		// 获取轨迹路径
		{ 
			id: 'getDriverTrace', 
			url: 'PUD/api/v1/pay/driverTrace',
			format: false 
		},
	];

	//默认不开启，开启后读取本地模拟数据
	//http.setDebugger(true);

	//是否启用约定的返回格式
	http.setResponseFormat(false);

	//全局写入接口前缀域名
	// http.setDomainUrl("http://47.96.75.147/api/");

	// http.setRequestHeader({"Authorization":"eyJhbGciOiJSUzI1NiJ9.eyJzdWIiOiIwTHg5eUUiLCJ1c2VySWQiOiIxMTY1OTYzIiwibmFtZSI6IiIsInJlbWFyayI6IiIsImRlYWxlckNvZGUiOiIiLCJkZWFsZXJOYW1lIjoiIiwia2lja091dCI6ZmFsc2UsInRlbFBob25lIjoiMTc2MDIxODA0NTQiLCJleHAiOjE1MzY3MjAwODd9.AYNp3nTimv8JK2r97FRbwn4bqzilmyVJgaGFZVUHhhRzINw2z6d1D5tcTIsFpQ-vtGbdvdugik3LF-XEuoDtLJtvlC3CsOvvnpEtwAFAg2jy9RJWBpQZ4UXE9OAVDh12wAacs0wiJGvkGcHHKtvHvF_hty3T9C46TdOyRGcJ868"});
	// http.setRequestHeader({"Authorization":"eyJhbGciOiJSUzI1NiJ9.eyJzdWIiOiIyczd2NjQiLCJ1c2VySWQiOiIxMTY2MDI5IiwibmFtZSI6IiIsInJlbWFyayI6IiIsImRlYWxlckNvZGUiOiIiLCJkZWFsZXJOYW1lIjoiIiwia2lja091dCI6ZmFsc2UsInRlbFBob25lIjoiMTg4MTY1NDU5MDMiLCJleHAiOjE1MzU4NzI5MDl9.zytu8EV7Zc-OZTDBEn0LPwEi7QT3xZKEqgibtTQWcG8MBa-A55xl5svSq_u7e-Zbz4wjMl_vgr5lqwuEMm-J-__TPUtjZYyIbKXVkgxc15c4697v19GBsK4xV5JtU6VQPkfqZQDZrmtI-MHkBqvou0RKiuYyxs_mzbWfxv57R5g"});

	//获取第三方连入的URL参数
	// let openId = http.getQueryValue('openid');
	// //openId非空判断
	// if (openId != null && openId != '' && openId != undefined) {
	//   ds.setCookie('WECHAT_USER_OPENID', openId.split('#')[0])

	// } else {

	//   let preOpenId = ds.getCookie('WECHAT_USER_OPENID') || "";
	//   if (preOpenId.indexOf('#') > -1) {
	//     let _strOpenId = preOpenId.split('#')[0];
	//     ds.setCookie('WECHAT_USER_OPENID', _strOpenId);
	//   }
	// };

	//全局写入接口
	http.setMutiApi(List);
} catch (e) {
	tracker.sendData(e.message);
}

//暴露http
export default http;
