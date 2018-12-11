/**
 * Created by dongooo on 2017/6/14.
 * 项目全局API配置，并在入口文件中将http暴露到全局
 *
 */
import http from '../../common/DMC.http'

try {
  const List = [

    // 获取路线方案列表
    {"id":"getPlanList","url":"appointment/api/v1/routeManage/planList","format":false},
    // 获取路线管理列表
    {"id":"getManageList","url":"appointment/api/v1/routeManage/manageList","format":false},
    // 路线方案管理,新增、更新
    {"id":"planManage","url":"appointment/api/v1/routeManage/planManage","format":false},
    // 反馈表信息获取
    {"id":"getVehicleFeedback","url":"appointment/api/v1/store/getVehicleFeedback","format":false},
    // 反馈表信息更新
    {"id":"updateVehicleFeedback","url":"appointment/api/v1/store/updateVehicleFeedback","format":false},
 
  ];
  
  //默认不开启，开启后读取本地模拟数据
  // http.setDebugger(true);

  //是否启用约定的返回格式
  http.setResponseFormat(false); 


  //全局写入接口
  http.setMutiApi(List);
} catch (e) {
  tracker.sendData(e.message);
}


//暴露http
export default http;
