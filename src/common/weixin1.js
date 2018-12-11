
import $ from 'jquery';
import Helper from './helper';

/**
 * 微信相关接口方法调用
 */
class WxJSHandler {
    constructor() {
        this.init();
    }

    init() {
        // Add weixin plugin
        if (document.getElementById('scr_weixin') == null) {
            let script = document.createElement('script');
            script.src = 'https://res.wx.qq.com/open/js/jweixin-1.2.0.js';
            script.id  = "scr_weixin";
            document.getElementsByTagName('head')[0].appendChild(script);
        }
    }
    onback1(res){
        debugger
    }

    wxReady(callback) {
       
        
        let  nonceStr,
             timestamp,
             corpid='wx74d1cc6f423aeb6e',
             corpsecret='X0Z4q92Z8XIBAfI_mWhh_t9TBy4twQyQCb-DQ9tacYI',
            // url = url[0] ? url[0] + '/wx/sharepage/getTicket' : '';
            url1 = 'https://qyapi.weixin.qq.com/cgi-bin/gettoken';
            // url = 'http://carowner.yonyouauto.com/wx/sharepage/getTicket'
            // url = location.origin+'/wx/sharepage/getTicket';
            nonceStr = Helper.createNonceStr();
            timestamp = Math.floor(new Date().getTime() / 1000);
            // debugger
            $.ajax({
                url:url1,
                type: 'get',
                dataType: 'jsonp',  // 请求方式为jsonp
                // jsonp: "callback",
                jsonpCallback: 'onback1',    // 自定义回调函数名
                data:{
                    'corpid':corpid,
                    'corpsecret':corpsecret
                },
                success: function (data) {
                                        //    var result = JSON.stringify(data); //json对象转成字符串
                                      debugger
                                        //   onback1(data)
                 }
                
            })
           
            //  .done(function(res) {
            //      debugger
            //     console.log("success");
            //     console.log(res);
            //   })
            //   .fail(function(res) {
            //     console.log("error");
            //     console.log(res);
            //   });
             
            debugger
            // $.get(url, {}, function(res) {
            //     debugger
            //     $.get('https://qyapi.weixin.qq.com/cgi-bin/get_jsapi_ticket?access_token='+res.access_token, {}, function(ticket) {

            //     let params = {
            //         // jsapi_ticket: ticket,
            //         group_ticket: ticket,
            //         noncestr: nonceStr,
            //         timestamp: timestamp,
            //         url:encodeURIComponent(location.href.split('#')[0])
            //     }, str = '',
               
            //     signature = '';
            //     debugger
            //     for (let v in params) {
            //         str += v + '=' + params[v] + '&';
            //     }
            //     str = str.substring(0, str.length - 1);
            //     signature = Helper.hexCode(str);
            //     debugger
            //     wx.config({
            //         debug: true,
            //         // appId: 'wxb85ed633e428bafc', // Required, the only identification of Official account.//测试
            //         // appId: 'wx235b2abcc8c160dc', //UAT
            //         appId: 'wx74d1cc6f423aeb6e',
            //         // appId: 'wx77d29b0a35fdcb33',//生产
            //         timestamp: timestamp, // Required, generate a signed timestamp
            //         nonceStr: nonceStr, // Required, generate a signed nonceStr
            //         signature: signature,// Required, signature. See Appendix 1
            //         jsApiList: ['checkJsApi','chooseImage','uploadImage','previewImage','onHistoryBack'] // Required, required JA interface list, all JS interface list, see Appendix 2
            //     });
            //      wx.ready(function() {
            //             if (typeof callback === 'function') {
            //                 callback && callback()
            //             }
            //     })
    
               

            //     wx.error(function(res) {
            //         console.log(res);
            //     });
            
                      
            // });

            // });
    }
    /**
     * 选择上传图片
     * @return
     */
    selectImage() {
        return new Promise((resolve, reject) => {
            wx.chooseImage({
                count: 1, // 默认9
                sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
                sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
                success: function (res) {
                    // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
                    resolve(res.localIds);
                }
            });
        });
    }
    /**
     * 上传图片
     * @param {String} id
     * @return
     */
    uploadImage(id) {
        // debugger
        return new Promise((resolve, reject) => {
            wx.uploadImage({
                localId: id, // 需要上传的图片的本地ID，由chooseImage接口获得
                isShowProgressTips: 1, // 默认为1，显示进度提示
                success: function (res) {
                    // 返回图片的服务器端ID
                    resolve(res.serverId);
                }
            });
        });
    }
    previewImage(url) {
        // debugger
        return new Promise((resolve, reject) => {
            wx.previewImage({
                current: url, // 当前显示图片的http链接
                urls: [url] // 需要预览的图片http链接列表
            });
        });
    }
    onHistoryBack(url) {
        // debugger
        return new Promise((resolve, reject) => {
            wx.onHistoryBack(function(){
                return confirm('确定要放弃当前页面的修改？')
            });
        });
    }
   

   
  
}

export default new WxJSHandler
