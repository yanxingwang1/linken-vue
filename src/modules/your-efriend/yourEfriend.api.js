/**
 * Created by dongooo on 2017/6/14.
 * 项目全局API配置，并在入口文件中将http暴露到全局
 *
 */
import http from '../../common/DMC.http'
import ds from '../../common/DMC.store'

try {
  const List = [
    // e闺蜜链接
    {
      id:'eGirlFriend',
      url:'wechatcall/eGirlFriend',
      format:false
    },
    // 查看用户是否关注
    {
      id:'userInfo',
      url:'wechatcall/userInfo',
      format:false
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
// http.setRequestHeader({"Authorization":"WECHAT_OPENID=75853C802EDB1E89EC9A28F7A4BA2BA14FFBB8F3A647207725A05530F936044DF04387836562002AB57936E31E2474897BDCE400FF678BBEBB355A2DCA61617B; WECHAT_USER_USERID=1166301"});
// http.setRequestHeader({Cookie:"WECHAT_OPENID=75853C802EDB1E89EC9A28F7A4BA2BA14FFBB8F3A647207725A05530F936044DF04387836562002AB57936E31E2474897BDCE400FF678BBEBB355A2DCA61617B;WECHAT_USER_USERID=1166301"});


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
