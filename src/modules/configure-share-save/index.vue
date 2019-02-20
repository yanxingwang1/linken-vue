<template>
  <div v-show="onLoaded" class="continental-index">
    <div v-if="showErWeiMa" class="un-guanzhu-user">
      <div><span>扫码关注，“林肯之道”公众号，</span></div>
      <div class="un-guanzhu-user-title"><span>保存您的座驾配置</span></div>
      <img :src="imgUrlCode"/>
      <!-- <img src='https://lincoln-mp-dev.yonyouauto.com/fs01/share_qrcode.jpg'/> -->
    </div>
    <div v-else class="guanzhu-user">
      <div class="guanzhu-user-logo">
        <img src='./imgs/logo.png'/>
      </div>
      <div class="guanzhu-user-img">
        <img :src="carDetail.thumbnail"/>
      </div>
      <div class="guanzhu-user-title">邀你共赏我的专属座驾</div>
      <!-- <p>openid  {{openid}}</p>
        <p>是否关注{{subscribe}}</p> -->
      <div class="guanzhu-user-button">
        <div class="guanzhu-user-button-inner" @click="saveDetailBySales()">保存配置</div>
        <div class="guanzhu-user-button-inner" @click="gotoCustomBuilt()">座驾定制</div>
      </div>
      <div class="guanzhu-user-detail">
        <div class="guanzhu-user-detail-price">
          <div class="guanzhu-user-detail-price-inner">
            <div class="main-text">基础零售价</div>
            <div class="main-price">￥{{carDetail.basePrice}}</div>
          </div>
          <div class="guanzhu-user-detail-price-inner guanzhu-user-detail-price-right">
            <div class="main-text">合计</div>
            <div class="total-price">￥{{carDetail.price}}</div>
          </div>
        </div>
      </div>
      <div class="guanzhu-user-outer">外观</div>
      <detail :carList='carList' :carInfo='carDetail.features'></detail>
    </div>
  </div>
</template>

<script>
import jssdk from '../../common/weixin1'
import jssdkCommon from '../../common/weixin'
import util from '../../common/DMC.util.js'
import {middleUrlConfig} from '../../config/variable.js'
import detail from './components/detail'
import { Indicator,Toast } from "mint-ui";
export default {
    name: "configureShare",
    components: {
      detail,
      Indicator,
      Toast
    },
    beforeCreate(){
      jssdkCommon.wxReady( ()=>{
        jssdkCommon.hideOptionMenuShare()
      })
    },
    created() {
        end_time = new Date().getTime();
        console.log("index加载时间：", end_time - start_time, "ms");
    },
    beforeDestroy() {
        clearInterval(this.timer)
    },
    data() {
      return {
        openid:'null',
        subscribe:'null',
        onLoaded:false,
        showErWeiMa:false,
        salesCaseId:'',//jodq8ts4iy5gjcvry08c0hrm
        carDetail:{
          features:[],
        },
        carList:[],
        imgUrlCode: location.origin +'/fs01/share_qrcode.jpg',
      }
    },
    directives: {
    },
    watch:{
      openid:function() {
        //1=关注；0=未关注；
        if(this.subscribe==0){
          $(document).attr('title', '林肯优选体验');
          this.showErWeiMa = true;
        }else if(this.subscribe==1){
          $(document).attr('title',this.carDetail.model);
          this.showErWeiMa = false;
        }
        this.onLoaded = true;
      }
    },
    methods: {
      init() {
        this.getDetailedBySales();
      },
      getDetailedBySales() {
        if(this.subscribe==0){
          $(document).attr('title', '林肯优选体验');
        }else if(this.subscribe==1){
          $(document).attr('title',this.carDetail.model);
        }
        if(this.salesCaseId){
          this.http.get('getDetailedBySales',{salesCaseID:this.salesCaseId},res=>{
            if(res.data){
              this.carDetail = res.data[0];
              if(res.data[0].features==null||res.data[0].features=='null'){
                this.carDetail.features = [];
              }
              this.carList = this.carDetail.list[0].list;
            }
          },err=>{

          });
        }
      },
      saveDetailBySales() {
        Indicator.open({
          text: '保存中',
          spinnerType: 'triple-bounce'
        });
        this.http.get('saveDetailBySales',{salesCaseId:this.salesCaseId,openId:this.openid},res=>{
          if(res.data){
            location.href = location.origin + '/wchat/customizationdetail?salesCaseID=' + this.salesCaseId + '&state=noFinance';
          }else {
            Toast({
              message: res.errMsg,
            });
          }
          Indicator.close();
        });
        // console.log('come in'+location.origin);
        // /wchat/customizationdetail?salesCaseID=jnzc4pqaiy5gjcvrydq0f9jy
      },
      gotoCustomBuilt() {
        location.href = middleUrlConfig;
      }
    },
    activated: function () {
      $(document).attr('title', '林肯优选体验');
    },
    beforeMount() {
      $(document).attr('title', '林肯优选体验');
    },
    async created() {
      if(sessionStorage.getItem('configureShareOpenId')){
        this.openid = sessionStorage.getItem('configureShareOpenId');
        this.subscribe = sessionStorage.getItem('configureShareSubscribe');
      }else {
        const code = await  jssdk.code(util.getQueryWeChatValue("salesCaseID")?util.getQueryWeChatValue("salesCaseID"):(util.getQueryWeChatValue("state")?util.getQueryWeChatValue("state").replace('#/',''):''));//获取code
        const openid = await  jssdk.openid(code);//获取openid
        const res = await  jssdk.isfoll(openid);//根据openid获取是否关注
        this.openid=res.openid;
        this.subscribe=res.subscribe;
        sessionStorage.setItem('configureShareOpenId', res.openid);
        sessionStorage.setItem('configureShareSubscribe', res.subscribe);
      }
    },

    mounted() {
      if(util.getQueryValue("salesCaseID")){
        this.salesCaseId = util.getQueryValue("salesCaseID");
      }else {
        if(util.getQueryValue("state")){
          this.salesCaseId = util.getQueryValue("state").replace('#/','');
        }
      }
      // sessionStorage.setItem('configureShareOpenId', this.openid);
      return this.$nextTick(() => this.init());
    }
};
</script>

<style lang="sass" scoped>
  @function px($px){
    @return ($px/20)+rem;
  }
  .continental-index {
    .un-guanzhu-user {
      padding-top: 20vh;
      font-family: PingFangSC-Regular;
      font-size: 14px;
      color: #3E3E3E;
      letter-spacing: 0;
      line-height: 28px;
      text-align:center;
      span {
        background:#E7E7E7;
        padding: 1px 10px;
      }
      img {
        width:44%;
        padding-top: 10%;
      }
      &-title {
        margin-top:3px;
      }
    }
    .guanzhu-user {
      background:#ffffff;
      &-logo {
        img {
          margin-top: 11px;
          width:28%;
          margin-left:36%;
        }
      }
      &-img {
        img {
          width:78%;
          margin-left:11%;
        }
      }
      &-title {
        text-align:center;
        font-family: PingFangSC-Regular;
        font-size: 14px;
        color: #323232;
        line-height: 22px;
      }
      &-button {
        display:flex;
        justify-content:space-around;
        padding: 15px 5px 10px;
        &-inner {
          width:37.3%;
          height: 36px;
          line-height: 36px;
          text-align:center;
          border-radius: 2px;
          background:#B86122;
          color:#FBF6F3;
          font-family: PingFangSC-Regular;
          font-size: 16px;
        }
      }
      &-detail {
        margin-top:15px;
        border-top:10px solid #F5F5F5;
        border-bottom:10px solid #F5F5F5;
        &-price {
          display: flex;
          justify-content: space-between;
          padding: 10px 4.8%;
          &-inner {
            width:50%;
            .main-text {
              font-family: PingFangSC-Medium;
              font-size: 16px;
              color: #323232;
              letter-spacing: 0;
              font-weight: bold;
            }
            .main-price {
              margin-top:5px;
              font-family: PingFangSC-Regular;
              font-size: 16px;
              color: #323232;
              letter-spacing: 0;
              line-height: 20px;
            }
            .total-price {
              margin-top:5px;
              font-family: PingFangSC-Regular;
              font-size: 16px;
              color: #B45F1A;
              letter-spacing: 0;
              line-height: 20px;
            }
          }
          &-right {
            border-left: 1px solid #CCCCCC;
            padding-left: 4.8%;
          }
        }
      }
      &-outer {
        padding:10px 0 10px 3.5%;
        font-family: PingFangSC-Medium;
        font-size: 16px;
        color: #323232;
        letter-spacing: 0;
        border-bottom: 1px solid #E2E2E2;
        font-weight:bold;
      }
    }
  }
</style>
