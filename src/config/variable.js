/**
 * Created by dongooo on 2017/5/22.
 */
export const baiduKey = 'Nqu6xBZbhA3UvkGcde6dOy2qjQzi0Roz';


//生产
const appId = "wxb85ed633e428bafc";

export const wechatConfig = {
  debug: false , // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
  appId: appId, // 必填，公众号的唯一标识
   //appId: appId, // 必填，公众号的唯一标识
  timestamp: "1414587457", // 必填，生成签名的时间戳
  nonceStr: 'hgwzB8MJj23xVa7G', // 必填，生成签名的随机串
  signature: '',// 必填，签名，见附录1
  jsApiList: [] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
}

// test
// //微信获取openid接口
// export const wechatConfigOpenId = {
//   appId:'wx4d85c20a03879912',
//   secret:'322be62c3979df32a77552fa82bb11d5',
//   getCodes: location.origin +"/modules/configureShareSave.html",
//   accessToken:location.origin + '/qy/Token',
// };
// //接口地址配置
// export const domainUrlConfig = "http://lincoln-mp-test.yonyouauto.com/qy/";
// //座驾定制跳转
// //uat
// export const middleUrlConfig='https://qa.wechat.lincoln.imagination-dev.cn/';

//uat
//微信获取openid接口
export const wechatConfigOpenId = {
  appId:'wx235b2abcc8c160dc',
  secret:'b9cf93fcc593ab143d7b65a3f3eb73a1',
  getCodes: location.origin +"/modules/configureShareSave.html",
  accessToken:location.origin + '/qy/Token',
};
//接口地址配置
export const domainUrlConfig = "https://lincoln-mp-dev.yonyouauto.com/qy/";
//座驾定制跳转
export const middleUrlConfig='https://qa.wechat.lincoln.imagination-dev.cn/';

//生产
// //微信获取openid接口
// export const wechatConfigOpenId = {
//   appId:'wx77d29b0a35fdcb33',
//   secret:'',
//   getCodes: location.origin +"/modules/configureShareSave.html",
//   accessToken:location.origin + '/qy/Token',
// };
// //接口地址配置
// export const domainUrlConfig = "https://lincoln-mp.yonyouauto.com/qy/";
// //座驾定制跳转
// export const middleUrlConfig='https://lincoln.ps-dev.cn/';