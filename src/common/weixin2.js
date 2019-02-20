// 用户直接进入通过授权获取openid
import $ from 'jquery';
import util from './DMC.util.js'
import axiox from 'axios';
import {wechatConfigOpenId} from '../config/variable'
// 使用
// jssdk.wxReady().then(value=>{
//     jssdk.wxReady(value).then((res)=>{
//         this.openid=res.openid;
//         this.subscribe=res.subscribe;
//     })
//   })

/**
 * 微信相关接口方法调用
 */
class WxJSHandler {
    constructor() {
        // this.init();
    }
    init() {

       return new Promise((resolve, reject) => {
        let  
        //公众号的唯一标识
        AppId=wechatConfigOpenId.appId,
        //授权后重定向的回调链接地址(填当前页)
         GetCodes="http://lincoln-mp-test.yonyouauto.com/modules/configureShareSave.html",
        // GetCodes= "https://lincoln-mp-dev.yonyouauto.com/modules/configureShareSave.html",
        // GetCodes: "https%3a%2f%2flincoln-mp-dev.yonyouauto.com%2fmodules%2fconfigureShareSave.html",
        //返回类型，请填写code
        Response_type= "code",
        //应用授权作用域，snsapi_base （不弹出授权页面，直接跳转，只能获取用户openid）
        Scope= "snsapi_base",
        //重定向后会带上state参数，开发者可以填写a-zA-Z0-9的参数值，最多128字节
        State= "test",
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
    

    wxReady() {
        return new Promise((resolve, reject) => {
            this.init().then(code=>{
               let AppId= wechatConfigOpenId.appId,
                Secret= wechatConfigOpenId.secret;
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
        })
    } 
    async access_token(){
        return new Promise((resolve, reject) => {
            var url2=`http://lincoln-mp-test.yonyouauto.com/qy/Token`
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
    async isfoll(res) {
        let access_token = await this.access_token();
        return new Promise((resolve, reject) => {
            let openid=res.openid;
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

    successCallback(data) {
        debugger
        console.log(data);
    }
}

export default new WxJSHandler
