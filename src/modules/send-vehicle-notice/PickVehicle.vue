<template>
  <div class="detail-index">
      <!-- 客户欢迎语 -->
    <welcome-word :welcome="welcome" v-if="welcome"></welcome-word>

    <!-- 客户经销商展示 -->
    <dealer :dealer="dealer" v-if="dealer"></dealer>
    <!-- 车辆进厂维修状态 -->
    <service-mode :servicemode="servicemode" @diffValue="changeServiceMode" v-if="servicemode"></service-mode>
    <!-- 车辆信息 -->
    <car-info :carinfo="carinfo" :showProgress="showProgress" v-if="carinfo"></car-info>
    <!-- 查看司机信息模态框 -->
    <toasts v-model="popupVisible" :driverStar="driverStar"></toasts>

    <!-- 确认和取消按钮 -->
    <!-- 取消状态不可查看和修改 -->
    <div class="btns" >
        <!-- 已接单可以查看司机信息 -->
        <div class="bt" v-if="listStatus==9" @click="()=>{this.popupVisible=!this.popupVisible}">查看司机信息</div>
        <div class="bt" v-if="listStatus==7||listStatus==8||listStatus==9">修改预约</div>
        <div class="canel" v-if="listStatus==7||listStatus==8||listStatus==9" @click="canel">取消预约</div>
        <!-- 订单开启状态 -->
        <div class="bt" v-if="listStatus==10||listStatus==11||listStatus==12">查看轨迹</div>
        <!-- 工单估价确认 -->
        <div class="bt" v-if="listStatus==13">工单估价确认</div>
        <div class="canel" v-if="listStatus==1">查看工单估价</div>
        <div class="bt" v-if="listStatus==5">服务评价</div>
    </div>

 
     
    <!-- <loading :show="showLoading" text=""></loading> -->
  </div>
</template>

<script>

  import {
    Loading
  } from 'vux'
  import util from '../../common/DMC.util'
  import WelcomeWord from './components/WelcomeWord'
  import Dealer from "./components/Dealer"
  import ServiceMode from "./components/ServiceMode"
  import CarInfo from "./components/CarInfo"
  import Toasts from "./components/Toasts"
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
  const reparetypes = {
  '10661003': '待进厂',
	'10661000': '已进厂',
	'10661004': '已完成',
	'10661006': '已取消'
};
//   import serviceComment from './components/serviceComment'
//   import incomingState from './components/IncomingState'
import { Toast } from 'mint-ui';
  export default {
    name: "index",
    components: {
      Loading,
      WelcomeWord,
      Dealer,
      ServiceMode,
      CarInfo,
      Toasts
     
    //   showTip,
    //   serviceComment,
    //   incomingState,
    },
    created() {
      end_time = new Date().getTime();
      console.log("index加载时间：", end_time - start_time, "ms");
    },
    data() {
      return {
        welcome:null,
        dealer:null,
        servicemode:null,
        carinfo:null,
        listStatus:null,
        status:null,
        popupVisible:false,//模态框展示
        driverStar:2.6,
        cancelServiceShow: true,
        showProgress:1
      }
    },
    directives: {
    },
    watch:{
      
    },
    methods: {
      init() {
        var parmas={
          id:this.$route.id
        }
        // this.http.get("detail", parmas, res => {
        //   debugger
        // })
        var data={
				    address: "上海市静安区康宁路956号（近场中路）",
				    assStatus: "2",
				    bookingTypeCode: "1,2,3,4",
				    dealerCode: "LK180101",
				    dealerName: "上海绿地林肯中心",
				    detailDto: {
				    appointmentDate: "2018年12月20日 08:00",
				    appointmentDateTimeStamp: 1545264000000,
				    appointmentNo: "28010YO201812100001",
				    appointmentPhone: "17123458904",
				    appointmentSource: "3",
				    appointmentTime: null,
				    cancleTime: "2018年12月11日 17:03",
				    carModelName: "KMZ",
				    currMileage: null,
				    endDeliverTime: "2019-19-12",
				    enterFactoryMileage: 1001.5,
				    expDeliverTime: "2018年12月14日 08:00",
				    ifEws: "1",
				    interchangeTime: "2018年12月14日 08:00",
				    outFactoryMileage: 1002,
				    plateNumber: "沪A12345",
				    qualityTime: "2018年12月14日 11:07",
				    remark: "测试",
				    repairWaitTime: "2018年12月14日 11:07",
				    repairingTime: "2018年12月14日 11:07",
				    roNo: "RO12345678",
				    roType: "自费",
				    scootor: "0",
				    serviceEnginnerName: "张三",
				    serviceFinshTime: null,
				    serviceType: "1",
				    step: 5,
				    vin: "LVSHBFDC7BF112301",
				    washTime: "2018年12月14日 11:07",
				   },
				    serviceHotline: "021-56651999",
            status: "10661004",//订单状态
            listStatus:"3",
				    title: "卢先生",
        }
        this.welcome={
            name:data.title,
            status:data.status,
            dealerName:data.dealerName,
            listStatus:data.listStatus,
            ass:data.ass
        }
        this.dealer={
            dealerName:data.dealerName
        }
        this.servicemode={
            status:data.status,
        }
       
        this.carinfo={
            status:data.status,
            listStatus:data.listStatus,
            carModelName:data.detailDto.carModelName,
            plateNumber:data.detailDto.plateNumber,
            currMileage:data.detailDto.currMileage,
            appointmentPhone:data.detailDto.appointmentPhone,
            scootor:data.detailDto.scootor,
            serviceType:data.detailDto.serviceType,
            serviceEnginnerName:data.detailDto.serviceEnginnerName,
            appointmentDate:data.detailDto.appointmentDate,
            cancleTime:data.detailDto.cancleTime,
            remark:data.detailDto.remark,
            diff:1,//完成状态，
            step:this.formateStep(data.listStatus),//车辆接收状态
        }
        this.listStatus=data.listStatus
        this.status=data.status
        // 初始化判断显示进度
        this.showProgress = 3;
       
      },
      canel(){
          this.cancelServiceShow = true;
          $.dialog({
                title: "提示",
                // message:'你好 林肯',
                html: `
                  <style>
                    .confirm-cancel-title {
                      font-size: 16px;
                      font-weight: 400;
                      color: #323232;
                      margin-top: 10px;
                    }
                    .confirm-cancel-content {
                      display: flex;
                      justify-content: center;
                      font-size: 16px;
                      margin-top: 10px;
                    }
                    .confirm-cancel-content-img {
                      width: 15px;
                      height: 15px;
                      margin-right: 10px;
                    }
                    .display-none {
                      display: none;
                    }
                  </style>
                  <div class="confirm-cancel-title">请确认取消服务内容</div>
                  <div id="cancelServiceButton" class="confirm-cancel-content">
                    <div>
                      <img id="unCheckImg" class="confirm-cancel-content-img display-none" src="${require('./imgs/check0@2x.png')}"/>
                      <img id="checkImg" class="confirm-cancel-content-img" src="${require('./imgs/check1@2x.png')}"/>
                    </div>
                    <div>取消售后服务预约</div>
                  </div>
                  <div class="confirm-cancel-content">
                    <div><img class="confirm-cancel-content-img" src="${require('./imgs/check1@2x.png')}"/></div>
                    <div>取消取车服务预约</div>
                  </div>
                `,
                buttons: [
                  {
                    title: "取消"
                  },
                  {
                    title: "确认",
                    isBold: true,
                    callback: () => {
                      console.log("点击确认"+this.cancelServiceShow);
                    }
                  }
                ],
                isMask: true
            });
            $("#cancelServiceButton")
              .off("click")
              .on("click", () => {
                  this.cancelServiceShow = !this.cancelServiceShow;
                  if(this.cancelServiceShow) {
                    $("#unCheckImg").addClass("display-none");
                    $("#checkImg").removeClass("display-none");
                  }else {
                    $("#unCheckImg").removeClass("display-none");
                    $("#checkImg").addClass("display-none");
                  }
              });
      },
      formateStep(listStatus){
        var  step; 
        switch (listStatus){
          case "7":
            step=1;
            break; 
          case "8":
            step=2;
            break; 
          case "9":
            step=3;
            break; 
          case "10":
            step=4;
            break; 
          case "11":
            step=5;
            break; 
          case "12":
            step=6;
            break; 
          case "13"://估价待确认
            step=11;
            break; 
          case "1"://等待服务
            step=12;
            break; 
          case "2"://正在服务
            step=13;
            break; 
          case "3"://正在质检
            step=14;
            break; 
          case "4"://正在洗车
            step=15;
            break; 
          case "5"://交车准备
            step=16;
            break; 
          default:
            step=1;
        }
        return step;
      },
      changeServiceMode: function(val) {
        console.log(val);
        this.showProgress = val;
      }
    },
    beforeMount() {
      $(document).attr('title','售后预约');
    },
    mounted() {
    //   this.orderId = this.$route.query.orderCode;
    //   this.profession = this.$route.query.profession;
      return this.$nextTick(() => this.init());
    }
  };

</script>

<style lang="sass" scoped>
  @function px($px) {
    @return ($px/20) + rem;
  }
  .detail-index {
      background:#fff;
      .btns{
        padding: 20px;
        padding-top: 0;
        div.bt{
          height:46px;
          background:rgba(180,95,26,1);
          border-radius:3px;
          font-size:17px;
          color:#fff;
          text-align: center;
          line-height: 46px;
          margin-bottom: 20px;
        }
         div.canel{
          height:46px;
          border-radius:3px;
          border:1px solid rgba(180,95,26,1);
           font-size:17px;
          color:rgba(180,95,26,1);
           text-align: center;
          line-height: 46px;
        }
      }
  }
  
</style>
