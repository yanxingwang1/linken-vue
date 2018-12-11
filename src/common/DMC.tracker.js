/** 获取客户端信息
 * todo
 * 可获取客户端机型，系统版本，屏幕分辨率，浏览器类型
 * 可全局获取客户端异常
 * 可配置是否启用
 * 可配置数据发送接口
 * 支持闲时发送
 * 参数说明
 * 客户端定位
 * userAgent:客户端设备信息
 * currentUrl:当前URL路径
 * errMsg:前端全局捕获的异常
 */
class tracker{

    constructor(){
      this.sendApi = '//'+location.host+'/wx/customer/api/v1/trackBehavior';//数据发送地址
      this.disable = true;//默认启用

      this.contentType = 'application/json;charset=utf-8';

      this.model = {'userAgent':'','currentUrl':'','errMsg':''};
    }

    log(_text=''){
      alert(_text)
    }

  setContentType(_string=''){
    let vaildContentType = ['application/json;charset=utf-8','application/x-www-form-urlencoded;charset=utf-8'];
    if(vaildContentType[0].toLowerCase()!==_string.toLowerCase()&&_string.toLowerCase() !== vaildContentType[1].toLowerCase()) {
      console.error('设置的contentType无效！可设置如：：'+vaildContentType[0]+'或者'+vaildContentType[1]);
      return !1;
    }
    this['contentType'] = _string;
  }

  transGetParams(_params){
    let _resultParams = "";
    let _count = 0;
    for(let _key in _params){
      _resultParams += (_count===0?'':'&')+_key+'='+_params[_key];
      ++_count;
    }
    return _resultParams;
  }

  createRequest(){
    let xmlHttp;
    if (window.XMLHttpRequest) {
      xmlHttp = new XMLHttpRequest();
      if (xmlHttp.overrideMimeType)
        xmlHttp.overrideMimeType('text/xml');
    } else if (window.ActiveXObject) {
      try {
        xmlHttp = new ActiveXObject("Msxml2.XMLHTTP");
      } catch (e) {
        try {
          xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
        } catch (e) {
        }
      }
    }else {
      console.error('请检查是否禁用了浏览器上的某些功能！');
    }
    return xmlHttp;
  }

  //原生发起请求
  request(_method,_url,_params,_fnChange){
    let xmlHttp;
    xmlHttp = this.createRequest();
    if(_method === 'get'){
      xmlHttp.open("GET", _url, true);// 异步处理返回

      xmlHttp.setRequestHeader("Content-Type",this['contentType']);
      xmlHttp.send(this.transGetParams(_params));
    }else if(_method === 'post'){
      xmlHttp.open("POST", _url, true);

      xmlHttp.setRequestHeader("Content-Type",this['contentType']);
      xmlHttp.send(JSON.stringify(_params));

    }else if(_method === 'upload'){
      xmlHttp.open("POST", _url, true);
      xmlHttp.send(_params);
    }

    xmlHttp.onreadystatechange = function (_event) {
      if(xmlHttp.readyState==4 && xmlHttp.status==200){
        let responseText = xmlHttp.responseText;
        let result = responseText === ''?responseText:JSON.parse(responseText);
        _fnChange(result);
      }

    }

  }

    setSendApi(_path=''){
      if(_path === '') this.log('please set path to send!');
      this.sendApi = _path;
      return this;
    }

    setModel(_object){
       Object.assign(this.model,_object);
       return this;
    }


    getUserAgent(){
      return navigator.userAgent;
    }

    getCurrentUrl(){
      return location.href;
    }

    onGlobalError(msgOrEvent){
      this.sendData(msgOrEvent.message);
      return true;
    }


    sendData(_errMsg){

      let that = this;
      const timer = setTimeout(function () {
        that.model.userAgent = that.getUserAgent();
        that.model.currentUrl = that.getCurrentUrl();
        that.model.errMsg = (typeof _errMsg === 'object'?_errMsg['message']:_errMsg)
        that.request('post',that.sendApi,that.model,function (_data) {
          clearTimeout(timer);
        })
      },200)
    }


}



function install(){
  let instance = {};
  if(!window.hasOwnProperty('tracker')){
    window.tracker = instance = new tracker();
  }else {
    instance = window['tracker'];
  }

  window.addEventListener('error', instance.onGlobalError)


  return instance;
}


export default install();
