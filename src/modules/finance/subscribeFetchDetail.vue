<template>
  <div class="detail-index">
    <div :class="{'detail-index-height':!showButton,'detail-index-text':showButton}">
      <div class="title-background">
        <div class="detail-header">
          <div class="detail-content-height">{{detailInfo.title}}</div>
          <a :href="'tel:' + detailInfo.detailDto.appointmentPhone">
            <div class="phone">{{detailInfo.detailDto.appointmentPhone}}</div>
          </a>
        </div>
        <div class="detail-main">
          {{detailInfo.detailDto.appointmentSource==0?'微信':detailInfo.detailDto.appointmentSource==1?'APP':detailInfo.detailDto.appointmentSource==2?'DCS':'DMS'}}
        </div>
      </div>
      <div :class="{'footer-step':true,'footer-step-padding':commentList.length==0}">
        <div class="steps">
          <div :class="{'step':true,'active':step==1}"  @click="change('1')">
            <img v-show="step!=1" src="./imgs/qr-on.png" alt="">
            <img v-show="step==1" src="./imgs/qr-able.png" alt="">
            <span>待进厂</span>
          </div>
          <div :class="{'arowright':true,'arrow-right-active':step>1}"></div>
          <div v-show="showJingchang" :class="{'step':true,'active':step==2,'unable':!jingchangAble}"  @click="change('2')">
            <img v-show="step!=2&&jingchangAble" src="./imgs/jc-on.png" alt="">
            <img v-show="step==2&&jingchangAble" src="./imgs/jc-able.png" alt="">
            <img v-show="!jingchangAble" src="./imgs/jc-unable.png" alt="">
            <span>已进厂</span>
          </div>
          <div v-show="showQuxiao" :class="{'step':true,'active':step==4}"  @click="change('4')">
            <img v-show="step!=4" src="./imgs/qx-on.png" alt="">
            <img v-show="step==4" src="./imgs/qx-able.png" alt="">
            <span>已取消</span>
          </div>
          <div :class="{'arowright':true,'arrow-right-active':step==3,'visibility':!showJingchang}"></div>
          <div :class="{'step':true,'active':step==3,'visibility':!showJingchang,'unable':!wanchengAble}"  @click="change('3')">
            <img v-show="step!=3&&wanchengAble" src="./imgs/wc-on.png" alt="">
            <img v-show="step==3&&wanchengAble" src="./imgs/wc-able.png" alt="">
            <img v-show="!wanchengAble" src="./imgs/wc-unable.png" alt="">
            <span>已完成</span>
          </div>
        </div>
        <div class="steps-arrow">
          <div :class="step==1?'img-style':'img-style visibility'">
            <!-- <img src="./images/delete.png" alt=""> -->
            <img src="./imgs/jiantouup.png" alt="">
          </div>
          <div :class="step==2||step==4?'img-style':'img-style visibility'">
            <img src="./imgs/jiantouup.png" alt="">
          </div>
          <div :class="step==3?'img-style':'img-style visibility'">
            <img src="./imgs/jiantouup.png" alt="">
          </div>
        </div>
        <div class="step-detail" >
          <div v-show="hiddenAndShow">
            <div class="info-service">
              <show-tip title="车型名称：" :detail="detailInfo.detailDto.carModelName==null||detailInfo.detailDto.carModelName==' '||detailInfo.detailDto.carModelName==''?detailInfo.detailDto.vin:detailInfo.detailDto.carModelName"></show-tip>
              <show-tip title="车牌号：" :detail="detailInfo.detailDto.plateNumber"></show-tip>
              <show-tip v-show="step==1||step==4" title="当前里程数：" :detail="detailInfo.detailDto.currMileage?(detailInfo.detailDto.currMileage+' KM'):''"></show-tip>
              <show-tip v-show="step==2" title="进厂里程数：" :detail="detailInfo.detailDto.enterFactoryMileage?(detailInfo.detailDto.enterFactoryMileage+' KM'):''"></show-tip>
              <show-tip v-show="step==3" title="出厂里程数：" :detail="detailInfo.detailDto.outFactoryMileage?(detailInfo.detailDto.outFactoryMileage+' KM'):''"></show-tip>
              <show-tip v-show="detailInfo.detailDto.serviceType==1" title="代步车：" :detail="detailInfo.detailDto.scootor==0?'申请':'不申请'"></show-tip>
            </div>
            <div class="div-border"></div>
            <div class="info-service">
              <show-tip title="预约单号：" :detail="detailInfo.detailDto.appointmentNo"></show-tip>
              <show-tip v-show="step==2||step==3" title="工单号：" :detail="detailInfo.detailDto.roNo"></show-tip>
              <show-tip v-show="step==2||step==3" title="工单类型：" :detail="detailInfo.detailDto.roType"></show-tip>
              <show-tip title="服务类型：" :detail="detailInfo.detailDto.serviceType==1?'维修':detailInfo.detailDto.serviceType==2?'保养':detailInfo.detailDto.serviceType==3?'检查':'其他'"></show-tip>
              <show-tip v-show="step==1||step==4" title="预约服务时间：" :detail="detailInfo.detailDto.appointmentDate"></show-tip>
              <show-tip v-show="step==1&&!showQuxiao" title="预约取车时间：" detail="2019年3月1日 星期三 12:30"></show-tip>
              <show-tip v-show="step==1&&!showQuxiao" title="预约取车地址：" detail="上海市徐汇区肇嘉浜路788号"></show-tip>
              <show-tip v-show="step==4" title="取消服务时间：" :detail="detailInfo.detailDto.cancleTime"></show-tip>
              <show-tip v-show="step==2||step==3" title="服务工程师：" :detail="detailInfo.detailDto.serviceEnginnerName"></show-tip>
              <show-tip v-show="step==2" title="预计交车时间：" :detail="detailInfo.detailDto.expDeliverTime"></show-tip>
              <show-tip v-show="step==3" title="实际交车时间：" :detail="detailInfo.detailDto.endDeliverTime"></show-tip>
              <show-tip title="送车上门：" :detail="detailInfo.detailDto.isPud==12781001?'需要':'不需要'"></show-tip>
              <show-tip title="备注：" :detail="detailInfo.detailDto.remark"></show-tip>
            </div>
          </div>
          <div v-show="!showQuxiao" :class="{'step-detail-hidden':true,'repare':hiddenAndShow}" @click="hiddenAndShowFun()">
            {{hiddenAndShowTitle}}
            <img :class="{'step-detail-hidden-img':hiddenAndShow}" style="width:8px;margin-left:5px;" src="./imgs/down.png"/>
          </div>
          <!-- <div class="div-border" v-show='step!=4&&!showQuxiao'></div> -->
          <!-- <div class="info" v-show='step==1&&!showQuxiao'>
            <incoming-state title="待确认" :date="detailInfo.detailDto.repairWaitTime" :border="true" :status="detailInfo.detailDto.step==1?'2':detailInfo.detailDto.step>1?'3':'1'"></incoming-state>
            <incoming-state title="派单中" :date="detailInfo.detailDto.repairWaitTime" :border="true" :status="detailInfo.detailDto.step==2?'2':detailInfo.detailDto.step>2?'3':'1'"></incoming-state>
            <incoming-state title="已接单" :date="detailInfo.detailDto.repairWaitTime" :border="true" :status="detailInfo.detailDto.step==3?'2':detailInfo.detailDto.step>3?'3':'1'"></incoming-state>
            <incoming-state title="取车订单开启" :date="detailInfo.detailDto.repairWaitTime" :border="true" :status="detailInfo.detailDto.step==4?'2':detailInfo.detailDto.step>4?'3':'1'"></incoming-state>
            <incoming-state title="取车中" :date="detailInfo.detailDto.interchangeTime" :border="true" :status="detailInfo.detailDto.step==5?(detailInfo.status==10661004?'3':'2'):'1'"></incoming-state>
            <incoming-state title="已收车" :date="detailInfo.detailDto.interchangeTime" :border="false" :status="detailInfo.detailDto.step==5?(detailInfo.status==10661004?'3':'2'):'1'"></incoming-state>
          </div>
          <div class="info" v-show='step!=1&&step!=4'>
            <incoming-state title="等待服务" :date="detailInfo.detailDto.repairWaitTime" :border="true" :status="detailInfo.detailDto.step==1?'2':detailInfo.detailDto.step>1?'3':'1'"></incoming-state>
            <incoming-state title="正在服务" :date="detailInfo.detailDto.repairingTime" :border="true" :status="detailInfo.detailDto.step==2?'2':detailInfo.detailDto.step>2?((detailInfo.detailDto.qualityTime&&detailInfo.detailDto.qualityTime!=' ')||detailInfo.detailDto.ifEws==0?'3':'5'):'1'"></incoming-state>
            <incoming-state v-show="detailInfo.detailDto.ifEws==1" title="正在质检" :date="detailInfo.detailDto.qualityTime&&detailInfo.detailDto.qualityTime!=' '?detailInfo.detailDto.qualityTime:detailInfo.detailDto.step>2?'未选择该服务':''" :border="true" :status="detailInfo.detailDto.step==3?'2':detailInfo.detailDto.step>3?(detailInfo.detailDto.qualityTime&&detailInfo.detailDto.qualityTime!=' '?(detailInfo.detailDto.washTime&&detailInfo.detailDto.washTime!=' '?'3':'5'):'4'):'1'"></incoming-state>
            <incoming-state v-show="detailInfo.detailDto.ifEws==1" title="正在洗车" :date="detailInfo.detailDto.washTime&&detailInfo.detailDto.washTime!=' '?detailInfo.detailDto.washTime:detailInfo.detailDto.step>3?'未选择该服务':''" :border="true" :status="detailInfo.detailDto.step==4?'2':detailInfo.detailDto.step>4?(detailInfo.detailDto.washTime&&detailInfo.detailDto.washTime!=' '?'3':'4'):'1'"></incoming-state>
            <incoming-state title="交车准备" :date="detailInfo.detailDto.interchangeTime" :border="false" :status="detailInfo.detailDto.step==5?(detailInfo.status==10661004?'3':'2'):'1'"></incoming-state>
          </div> -->
          <!-- 进厂状态进度 -->
          <progress-step class="div-border-progress-step" :step="11" :showProgress="step" v-if="detailInfo.status!=10661006"></progress-step>
        </div>
      </div>
    </div>
    <div v-if="showButton" class="delivery-btn-wrap detail-index-button">
      <wx-button @click.native="buttonFun()">{{buttonTitle}}</wx-button>
    </div>
    <!-- 查看司机信息模态框 -->
    <toasts v-model="popupVisible" :driverStar="3.5"></toasts>
    <loading :show="showLoading" text=""></loading>
  </div>
</template>

<script>

  import {
    Loading
  } from 'vux'
  import { Popup, Indicator } from "mint-ui";
  import util from '../../common/DMC.util'
  import showTip from './components/showTip'
  import incomingState from './components/IncomingState'
  import WxButton from "./../../components/WxButton"
  import Toasts from "../send-vehicle-notice/components/Toasts"
  import ProgressStep from "../send-vehicle-notice/components/Progress"
  const listStatus={
    0:'已确认',
    1:'等待维修',
    2:'正在服务',
    3:'正在质检',
    4:'正在洗车',
    5:'交车准备',
    6:'已完成',
    7:"待确认",
    8:'派单中',
    9:'已接单',
    10:'取车订单开启',
    11:'取车中',
    12:"已收车",
    13:'估价待确认',
    14:'已取消',
  }
  export default {
    name: "fetchDetail",
    components: {
      Loading,
      Popup,
      Indicator,
      showTip,
      incomingState,
      WxButton,
      Toasts,
      ProgressStep
    },
    created() {
      end_time = new Date().getTime();
      console.log("fetchDetail加载时间：", end_time - start_time, "ms");
    },
    beforeDestroy() {
      clearInterval(this.timer)
    },
    data() {
      return {
        showLoading:false,
        step:1,
        detailInfo:{
          detailDto:{},
        },
        commentList:[],
        showJingchang:true,
        showQuxiao:false,
        jingchangAble:false,
        wanchengAble:false,
        profession:'',
        hiddenAndShow:false,
        hiddenAndShowTitle: "查看预约信息",
        showButton: true,
        popupVisible: false,
      }
    },
    computed: {
      buttonTitle() {
        if(this.showButton) {
          return "确认取车服务预约"
        }
      }
    },
    directives: {
    },
    watch:{
      
    },
    methods: {
      init() {
        this.http.get('saleDetail',{id:this.orderId},res=>{
          this.detailInfo = res.data;
          // this.detailInfo.detailDto.ifEws = 1;
          // this.detailInfo.detailDto.step = 5; 
          // this.detailInfo.detailDto.qualityTime = '2018年12月11日 17:03';
          // this.detailInfo.detailDto.washTime = '2018年12月11日 17:03';

          if(res.data.ass){
            this.commentList = res.data.ass;
          }
          //已进场 可点击已确认，已进场按钮，已完成不可点击
          if(res.data.status==10661000){
            this.jingchangAble = true;
            this.step = 2;
          }
          //已确认 可点击已确认按钮
          else if(res.data.status==10661003){

          }
          //已完成 都可点击
          else if(res.data.status==10661004){
            this.jingchangAble = true;
            this.wanchengAble = true;
            this.step = 3;
          }
          //已取消  显示确认，取消按钮 且都可点击
          else if(res.data.status==10661006){
            this.showJingchang = false;
            this.showQuxiao = true;
            this.hiddenAndShow = true;
            this.step = 4;
          }
        });
      },
      change(value){
        if(value=='2'&&!this.jingchangAble){
          return;
        }else if(value=='3'&&!this.wanchengAble){
          return;
        }
        this.step=value
      },
      hiddenAndShowFun() {
        this.hiddenAndShow = !this.hiddenAndShow;
        if(this.hiddenAndShow) {
          this.hiddenAndShowTitle = "隐藏预约信息";
        }else {
          this.hiddenAndShowTitle = "查看预约信息";
        }
      },
      buttonFun() {
        this.popupVisible = !this.popupVisible;
      }
     
    },
    beforeMount() {
      $(document).attr('title','服务内容');
    },
  

    mounted() {
      this.orderId = this.$route.query.orderCode;
      this.profession = this.$route.query.profession;
      return this.$nextTick(() => this.init());
    }
  };

</script>

<style lang="sass" scoped>
  @function px($px) {
    @return ($px/20) + rem;
  }
  .detail-index {
    &-height {
      height: 100vh;
      overflow: auto;
    }
    &-text {
      height: calc(100vh - 90px);
      overflow: auto;
    }
    &-button {
      display: flex;
      align-items: center;
      width: 82%;
      margin-left: 9%;
      height: 90px;
    }
    .title-background {
      background:#EBEBEB;
      .detail-header{
        display: flex;
        justify-content: space-between;
        font-family: PingFangSC-Medium;
        font-size: 16px;
        color: #323232;
        padding:20px 15px 11px 15px;
        .detail-content-height {
          height:px(22);
        }
        .phone {
          font-family: PingFangSC-Regular;
          font-size: 15px;
          color: #0BABFE;
          letter-spacing: -0.48px;
        }
      }
      .detail-main{
        font-family: PingFangSC-Regular;
        font-size: 12px;
        color: #323232;
        letter-spacing: -0.39px;
        padding:0 0 15px 15px;
      }   
    }
    .footer-step{
      // width:82%;
      margin:20px;
      .steps{
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      .steps-arrow {
        display: flex;
        margin-top:10px;
        padding: 0 1.1rem;
        justify-content: space-between;
        align-items: center;
        .img-style {
          width:16px;
          height:16px;
          img {
            width:16px;
          }
        }
      }
      .visibility {
        visibility:hidden;
      }
      // 自定义样式
      .step{
        display:flex;
        width:px(60);
        height:px(60);
        border-radius:50%;
        border: 1px solid #B45F1A;
        background: #fff;
        color: #B45F1A;
        flex-direction: column; 
        align-items:center;
        justify-content: space-around; 
        padding: 12px 0;
        img{
          width:16px;
        }
        span{
          font-size:12px;
          // color:#fff;
        }
      }
      .active{
        background: #B45F1A;
        color:#fff;
      }
      .unable{
        border: 1px solid #A1A1A1;
        color: #9F9F9F;
      }
      .arowright{
        display:inline-block;
        background: #A1A1A1;
        width:px(63);
        height:1px;
        // margin-top:px(30);
        align-items:center;
      }
      .arrow-right-active {
        background: #B45F1A;
      }
      .step-detail{
        background: #EBEBEB;
        border-radius: 10px;
        padding-bottom: 1rem;
        .info-service {
          padding: 20px 20px 0 ;
        }
        .repare {
          padding-top: px(25)!important;
        }
        .step-detail-hidden {
          padding: 20px 20px 0;
          font-size: 12px;
          font-weight: 600;
          // transition-duration: 1s;
          .step-detail-hidden-img {
            transform: rotate(180deg);
          }
        }
        .div-border {
          border:0.5px solid #AEAEAE;
          margin: 20px 20px 0;
        }
        .div-border-progress-step {
          padding: 0 20px;
        }
      }
    }
    .footer-step-padding {
      padding-bottom:20px;
    }
  }
  
</style>
