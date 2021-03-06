
import $ from 'jquery';
import Helper from './helper';
import {wechatConfigOpenId} from '../config/variable'

/**
 * 微信相关接口方法调用
 */
class WxJSHandler {
    constructor() {
        this.init();
        this.earth_radius = 6378.137;
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

    wxReady(callback) {
       
        
        let  nonceStr,
             timestamp,
            // url = url[0] ? url[0] + '/wx/sharepage/getTicket' : '';
            // url = 'https://lincoln-mp-dev.yonyouauto.com/wx/sharepage/getTicket';
            // url = 'http://carowner.yonyouauto.com/wx/sharepage/getTicket'
            url = location.origin+'/wx/sharepage/getTicket';
            nonceStr = Helper.createNonceStr();
            timestamp = Math.floor(new Date().getTime() / 1000);
            $.get(url, {}, function(ticket) {
                let params = {
                    jsapi_ticket: ticket,
                    noncestr: nonceStr,
                    timestamp: timestamp,
                    url: location.href.split('#')[0]
                }, str = '',
                
                signature = '';
  
                for (let v in params) {
                    str += v + '=' + params[v] + '&';
                }
                str = str.substring(0, str.length - 1);
                signature = Helper.hexCode(str);
                wx.config({
                    debug: false,
                    appId: wechatConfigOpenId.appId, 
                    timestamp: timestamp, // Required, generate a signed timestamp
                    nonceStr: nonceStr, // Required, generate a signed nonceStr
                    signature: signature,// Required, signature. See Appendix 1
                    jsApiList: ['checkJsApi','chooseImage','uploadImage','previewImage','closeWindow','onHistoryBack','hideMenuItems','onMenuShareTimeline','onMenuShareAppMessage','onMenuShareQQ'] // Required, required JA interface list, all JS interface list, see Appendix 2
                });
                 wx.ready(function() {
                        if (typeof callback === 'function') {
                            callback && callback()
                        }
                })
    
               

                wx.error(function(res) {
                    console.log(res);
                });
            });
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
        debugger
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
        debugger
        return new Promise((resolve, reject) => {
            wx.previewImage({
                current: url, // 当前显示图片的http链接
                urls: [url] // 需要预览的图片http链接列表
            });
        });
    }
    // 关闭当前页面
    closeWindow1(){
        return new Promise(function(resolve, reject) {
            wx.closeWindow();
            resolve();
        })
    }

    onHistoryBack(url) {
        // debugger
        return new Promise((resolve, reject) => {
            wx.onHistoryBack(function(){
                return confirm('确定要放弃当前页面，请填写完整姓名离开？')
            });
        });
    }
    // 关闭分享按钮
    hideOptionMenuShare(){
        return new Promise(function(resolve, reject) {

            wx.hideMenuItems({
                menuList: [
                    "menuItem:share:appMessage",
                    "menuItem:share:timeline",
                    "menuItem:share:qq",
                    "menuItem:share:QZone",
                    "menuItem:copyUrl"
                ]
            });

            resolve();
        })
    }

    
    // 分享
    OnMenuShareAppMessage1(data){
        debugger
        return new Promise(function(resolve, reject) {
            wx.onMenuShareAppMessage({
                title: data.title,
                desc: data.desc,
                link: data.link,
                imgUrl: data.imgUrl,
                success: function () {
                    resolve();
                //     // 用户确认分享后执行的回调函数
                 },
                //  cancel: function () {
                //     // 用户取消分享后执行的回调函数
                //  }
            });

        })
    }
    OnMenuShareTimeline1(data){
        debugger
        return new Promise(function(resolve, reject) {
            wx.onMenuShareTimeline({
                title: data.title,
                desc: data.desc,
                link: data.link,
                imgUrl: data.imgUrl,
                success: function () {
                    resolve();
                //     // 用户确认分享后执行的回调函数
                 },
                //  cancel: function () {
                //     // 用户取消分享后执行的回调函数
                //  }
            });

        })
    }
    OnMenuShareQQ1(data){
        debugger
        return new Promise(function(resolve, reject) {
            wx.onMenuShareQQ({
                title: data.title,
                desc: data.desc,
                link: data.link,
                imgUrl: data.imgUrl,
                success: function () {
                    resolve();
                //     // 用户确认分享后执行的回调函数
                 },
                //  cancel: function () {
                //     // 用户取消分享后执行的回调函数
                //  }
            });

        })
    }
 
   

   
  
}

export default new WxJSHandler
