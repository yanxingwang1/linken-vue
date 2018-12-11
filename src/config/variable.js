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
