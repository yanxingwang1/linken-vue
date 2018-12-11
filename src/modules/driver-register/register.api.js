/**
 * Created by dongooo on 2017/6/14.
 * 项目全局API配置，并在入口文件中将http暴露到全局
 *
 */
import http from '../../common/DMC.http'
import ds from '../../common/DMC.store'

try {
  const List = [

    // 创建试乘试驾登记单POST /
    {"id":"createTestDriveOrder","url":"appointment/api/v1/testDrive/createTestDriveOrder","format":false},
    // 更新试乘试驾登记单POST /
    {"id":"updateTestDriveOrder","url":"appointment/api/v1/testDrive/updateTestDriveOrder","format":false},
    // 试乘试驾-联系人号码发送验证码get
    {"id":"getIdfyCode","url":"appointment/api/v1/testDrive/getIdfyCode","format":false},
    // 查询品鉴工程师GET /
    {"id":"updateCancelTime","url":"appointment/api/v1/testDrive/queryTastingEngineer","format":false},
    // 获取路线管理列表
    {"id":"getManageList","url":"appointment/api/v1/routeManage/manageList","format":false},
    //试乘试驾车列表查询 get
    {"id":'getVehicleList',url:'/appointment/api/v1/store/getVehicleList',format:false},
    // 开始试驾接口POST /appointment/api/v1/testDrive/startTestDriveOrder
    {"id":"startTestDriveOrder","url":"appointment/api/v1/testDrive/startTestDriveOrder","format":false},
    //试乘试驾登记页面查询GET /appointment/api/v1/testDrive/queryAppointment
    {"id":"queryAppointment","url":"appointment/api/v1/testDrive/queryAppointment","format":false},
    //试乘试驾当天登记查询POST /appointment/api/v1/testDrive/queryTodayTestDrive
    {"id":"queryTodayTestDrive","url":"appointment/api/v1/testDrive/queryTodayTestDrive","format":false},
    // 试乘试驾当天登记查询
    {"id":"todayTestDriveDetail","url":"appointment/api/v1/testDrive/todayTestDriveDetail","format":false},
    //试乘试驾登删除POST /appointment/api/v1/testDrive/deleteTodayTestDrive
    {"id":"deleteTodayTestDrive","url":"appointment/api/v1/testDrive/deleteTodayTestDrive","format":false},
    //GET /appointment/api/v1/testDrive/uploadPhoto上传照片
    {"id":"uploadPhoto","url":"appointment/api/v1/testDrive/uploadPhoto","format":false},
    // POST /appointment/api/v1/testDrive/endTestDriveOrder结束试驾
    {"id":"endTestDriveOrder","url":"appointment/api/v1/testDrive/endTestDriveOrder","format":false},
    //POST /appointment/api/v1/testDrive/uploadPhoto上传
    {"id":"uploadPhoto","url":"appointment/api/v1/testDrive/uploadPhoto","format":false},
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
