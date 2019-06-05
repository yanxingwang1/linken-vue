<template>
  <div class="index">

    <cover-panel :username="username" :headImgurl="headImgurl" :loginurl="loginurl" :showStatus="showStatus"></cover-panel>
    <btn-group @messageBtnHandleClick="messageBtnHandleClick"></btn-group>
    <content-panel></content-panel>
    <mt-popup v-model="popupValue" >
      <div class="title-text">请先关注“林肯之道”服务号</div>
      <img style="width:250px;" :src="imgUrlCode"/>
    </mt-popup>
  </div>
</template>

<script>
import CoverPanel from "./components/CoverPanel";
import jssdk from "../../common/weixin1";
import BtnGroup from "./components/BtnGroup";
import ContentPanel from "./components/ContentPanel";
import jssdkCommon from "../../common/weixin";
import { login } from "../../config/variable";
import { Toast,Popup,Indicator } from "mint-ui";
import { debuglog } from "util";
export default {
  name: "your-efriend",
  components: { BtnGroup, CoverPanel, ContentPanel },
  data() {
    return {
      openid: null,
      subscribe: null,
      popupValue: false,
      username:null,
      headImgurl:null,
      loginurl:null,
      showStatus:false,
      imgUrlCode: location.origin +'/fs01/MissLincoln.jpg',//'https://lincoln-mp-dev.yonyouauto.com/fs01/MissLincoln.jpg'
    };
  },
  directives: {},
  watch: {},
  methods: {
    init(){
      this.http.get("userInfo", { openId: this.openid },res => {
        if(res.data.userName){
          this.username=res.data.userName
          this.headImgurl = res.data.headImgurl
        }else{
          // document.location.href = login
          this.loginurl=login
        }
        this.showStatus = true
      })
    },
    messageBtnHandleClick() {
      //1=关注；0=未关注；
      if(this.subscribe==1) {
        Indicator.open({
            text: '正在接入e闺蜜',
            spinnerType: 'fading-circle'
        });
        this.http.get("eGirlFriend",  { openId: this.openid }, res => {
          // $.toast(JSON.stringify(res));
          Indicator.close();
          if (res.code != "200") {
            Toast(res.errMsg);
          } else {
            jssdkCommon.closeWindow1();
          }
        });
      }else {
        this.popupValue = true;
      }
    }
  },
  async created() {
    if (!this.openid) {
      var State = ""; //用于带回当前页面，防止url或者数据丢失
      // var GetCodes = wechatConfigOpenId.eLincoln; //页面从定向的地址
      const code = await jssdk.codelogin(State); //获取code
      const openid = await jssdk.openid(code); //获取openid
      const res = await  jssdk.isfoll(openid);//根据openid获取是否关注
      this.subscribe=res.subscribe;
      this.openid=openid;
      if(this.openid){
        this.init()
      }

    }
  },
  beforeMount() {
    $(document).attr("title", "Miss Lincoln");
  },
  beforeCreate() {
    jssdkCommon.wxReady(() => {
      var shareData = {
          title: 'Miss Lincoln',
          desc: '逸享生活的林肯女性专属平台',
          link: location.origin+'/modules/yourEfriend.html',
          imgUrl: location.origin+'/fs01/shareImg.png'

      };
      
      jssdkCommon.OnMenuShareAppMessage1(shareData).then(() => {
        // alert("分享给朋友")
        // 分享成功埋点
        // console.log(shareData)
      });
      jssdkCommon.OnMenuShareTimeline1(shareData).then(() => {
        // 分享成功埋点
        // console.log(shareData)
      });
      jssdkCommon.OnMenuShareQQ1(shareData).then(() => {
        // 分享成功埋点
        // console.log(shareData)
      });
      // 注销分享禁用
      // jssdkCommon.hideOptionMenuShare();
    });
  },

  mounted() {
    window.app = this;
  }
};
</script>

<style lang="sass" type="text/scss" rel="stylesheet/scss" scoped>
  @function px($px) {
    @return ($px/20)+rem;
  }

  .index {
    background-color: #f7f7f7;
    .title-text {
      font-size: 16px;
      margin-top: 15px;
      text-align: center;
    }
  }
</style>
