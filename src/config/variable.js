/**
 * Created by dongooo on 2017/5/22.
 */
export const baiduKey = 'Nqu6xBZbhA3UvkGcde6dOy2qjQzi0Roz';

const appId = 'wxb85ed633e428bafc';

export const wechatConfig = {
	debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
	appId: appId, // 必填，公众号的唯一标识
	//appId: appId, // 必填，公众号的唯一标识
	timestamp: '1414587457', // 必填，生成签名的时间戳
	nonceStr: 'hgwzB8MJj23xVa7G', // 必填，生成签名的随机串
	signature: '', // 必填，签名，见附录1
	jsApiList: [] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
};

// Created by lincoln on 2019/3/22

// test
// 微信获取openid接口
// export const wechatConfigOpenId = {
//   appId:'wx4d85c20a03879912',
//   secret:'322be62c3979df32a77552fa82bb11d5',
//   getCodes: location.origin +"/modules/configureShareSave.html",
//   eLincoln: location.origin + "/modules/yourEfriend.html",//通过页面入口获取e闺蜜用户openid
//   accessToken:location.origin + '/qy/Token',
// };
// //接口地址配置
// export const domainUrlConfig = "http://lincoln-mp-test.yonyouauto.com/qy/";
// //座驾定制跳转
// //uat
// export const middleUrlConfig='https://qa.wechat.lincoln.imagination-dev.cn/';
// export const login="http://lincoln.iooo.net/test/user_info.php" 

//uat
//微信获取openid接口
export const wechatConfigOpenId = {
	appId: 'wx235b2abcc8c160dc',
	secret: 'b9cf93fcc593ab143d7b65a3f3eb73a1',
	getCodes: location.origin + '/modules/configureShareSave.html',//通过分享获取openid
	eLincoln: location.origin + '/modules/yourEfriend.html',//通过页面入口获取e闺蜜用户openid
	accessToken: location.origin + '/qy/Token'
};
//接口地址配置
// export const domainUrlConfig = 'https://lincoln-mp-dev.yonyouauto.com/qy/';
export const domainUrlConfig = 'https://www.easy-mock.com/mock/5cf72b0fccb1f01a29f72b11/qy/'
//座驾定制跳转
export const middleUrlConfig = 'https://qa.wechat.lincoln.imagination-dev.cn/';
// e闺蜜注册地址
export const login="http://lincoln.iooo.net/test/bd.php?act=miss_lincoln" 

//生产
//微信获取openid接口
// export const wechatConfigOpenId = {
// 	appId: 'wx77d29b0a35fdcb33',
// 	secret: '721d1f678db67699917dce5ea57ab147',
// 	getCodes: location.origin + '/modules/configureShareSave.html',
//  eLincoln: location.origin + '/modules/yourEfriend.html',//通过页面入口获取e闺蜜用户openid
// 	accessToken: location.origin + '/qy/Token'
// };
// //接口地址配置
// export const domainUrlConfig = 'https://lincoln-mp.yonyouauto.com/qy/';
// //座驾定制跳转
// export const middleUrlConfig = 'https://lincoln.ps-dev.cn/';
// e闺蜜注册地址
// export const login="" 
