/**
 * Created by dongooo on 2017/6/14.
 * 项目全局API配置，并在入口文件中将http暴露到全局
 *
 */
import http from '../../common/DMC.http'
import ds from '../../common/DMC.store'

try {
  const List = [


 
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
