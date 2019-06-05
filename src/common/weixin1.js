// 用户直接进入通过授权获取openid查看是否关注
//nginx需要配置反向代理
import $ from 'jquery';
import util from './DMC.util.js'
import {wechatConfigOpenId} from '../config/variable'
// 使用
// const code = await  jssdk.code(salesCaseID);//获取code
// const openid = await  jssdk.openid(code);//获取openid
// const res = await  jssdk.isfoll(openid);//根据openid获取是否关注

/**
 * 微信相关接口方法调用
 */
class WxJSHandler {
    constructor() {
        // this.init();
    }
    async code(salesCaseID) {
    console.log(salesCaseID)
       return new Promise((resolve, reject) => {
        let  
        //公众号的唯一标识
        AppId=wechatConfigOpenId.appId,
        //授权后重定向的回调链接地址(填当前页)//ssid有值是分享进入，没有值是直接获取
        GetCodes=wechatConfigOpenId.getCodes,
        //返回类型，请填写code
        Response_type= "code",
        //应用授权作用域，snsapi_base （不弹出授权页面，直接跳转，只能获取用户openid）
        Scope= "snsapi_base",
        //重定向后会带上state参数，开发者可以填写a-zA-Z0-9的参数值，最多128字节
        State= salesCaseID,
        //必须带此参数
        Wechat_Redirect= "#wechat_redirect",
        BaseUrl= "https://open.weixin.qq.com/connect/oauth2/authorize?",
        code= util.getQueryValue('code');

       //如果有code参数，那么GetOpenId获取openid
       if (!!code) {
        //     this.wxReady(code)
          resolve(code)
            //没有那么重定向去获取
        } else {
            /**
             * 具体参考微信获取code文档 ：http://mp.weixin.qq.com/wiki/17/c0f37d5704f0b64713d5d2c37b468d75.html
             * 官方接口：
             * https://open.weixin.qq.com/connect/oauth2/authorize?appid=APPID&redirect_uri=REDIRECT_URI&response_type=code&scope=SCOPE&state=STATE#wechat_redirect
             */
            //重定向去微信来获取code
                window.location = BaseUrl + "appid=" + AppId + "&redirect_uri=" + GetCodes + "&response_type=" + Response_type + "&scope=" + Scope + "&state=" +State + Wechat_Redirect
                
        }
     }) 

    }
    async codelogin(salesCaseID) {
        console.log(salesCaseID)
           return new Promise((resolve, reject) => {
            let  
            //公众号的唯一标识
            AppId=wechatConfigOpenId.appId,
            //授权后重定向的回调链接地址(填当前页)//ssid有值是分享进入，没有值是直接获取
            GetCodes= wechatConfigOpenId.eLincoln,
            //返回类型，请填写code
            Response_type= "code",
            //应用授权作用域，snsapi_base （不弹出授权页面，直接跳转，只能获取用户openid）
            Scope= "snsapi_base",
            //重定向后会带上state参数，开发者可以填写a-zA-Z0-9的参数值，最多128字节
            State= salesCaseID,
            //必须带此参数
            Wechat_Redirect= "#wechat_redirect",
            BaseUrl= "https://open.weixin.qq.com/connect/oauth2/authorize?",
            code= util.getQueryValue('code');
    
           //如果有code参数，那么GetOpenId获取openid
           if (!!code) {
            //     this.wxReady(code)
              resolve(code)
                //没有那么重定向去获取
            } else {
                /**
                 * 具体参考微信获取code文档 ：http://mp.weixin.qq.com/wiki/17/c0f37d5704f0b64713d5d2c37b468d75.html
                 * 官方接口：
                 * https://open.weixin.qq.com/connect/oauth2/authorize?appid=APPID&redirect_uri=REDIRECT_URI&response_type=code&scope=SCOPE&state=STATE#wechat_redirect
                 */
                //重定向去微信来获取code
                    window.location = BaseUrl + "appid=" + AppId + "&redirect_uri=" + GetCodes + "&response_type=" + Response_type + "&scope=" + Scope + "&state=" +State + Wechat_Redirect
                    
            }
         }) 
    
        }
    
    async openid(code){
        
        return new Promise((resolve, reject) => {
        let AppId=wechatConfigOpenId.appId,
        Secret=wechatConfigOpenId.secret;
        var url2=`/weixin/sns/oauth2/access_token?appid=${AppId}&secret=${Secret}&code=${code}&grant_type=authorization_code`
            $.ajax({
                    url:url2,
                    type: 'get',
                    // dataType: 'jsonp',  // 请求方式为jsonp
                    // jsonp: "callback",
                    // jsonpCallback: 'successCallback',    // 自定义回调函数名 
                    success: function (response) {
                        var response=JSON.parse(response)
                        if(response.openid){
                            resolve(response.openid)
                        
                        }else{
                            resolve(response.errmsg)
                        }
                    
                    },
                    error:function(error){
                            console.log("res==error",error)
                    }
            })
        })
    }

   
    async access_token(){
        return new Promise((resolve, reject) => {
            var url2= wechatConfigOpenId.accessToken;
            $.ajax({
                url:url2,
                type: 'get',
                success: function (response) {
                    resolve(response)
                },
                error:function(error){
                        console.log("res==error",error)
                }
            })
        })
    }
    async isfoll(openid) {
        let access_token = await this.access_token();
        return new Promise((resolve, reject) => {
            var url2=`/weixin/cgi-bin/user/info?access_token=${access_token}&openid=${openid}&lang=zh_CN`
            $.ajax({
                    url:url2,
                    type: 'get',
                    success: function (response) {
                        if(response.openid){
                            resolve(response)
                           
                        }else{
                            resolve(response.errmsg)
                        }
                       
                    },
                    error:function(error){
                            console.log("res==error",error)
                    }
             })

        })
    }
}

export default new WxJSHandler
