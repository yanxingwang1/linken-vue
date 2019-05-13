<template>
  <div>
    <div v-if="isDrawer" id="amap-container"></div>
    <drawer-view 
      :is-drawer="isDrawer" 
      :titleText="orderDetail.orderStatus==90041004?'订单开启':orderDetail.orderStatus==90041005?'代驾中':orderDetail.orderStatus==90041006?'已到达':''" 
      @drawerStart="drawerStartFun"
      @drawerEnd="drawerEndFun"
      :bodyInitHeight="80">
      <!-- 服务总监送车订单明细 -->
      <div class="delivery-detail-index" :class="{'delivery-detail-index-height':orderDetail.orderStatus==90041001||orderDetail.orderStatus==90041002||orderDetail.orderStatus==90041003}">
        <div :class="{'delivery-detail-index-text':showButton}">
          <div v-show="openShow||!isDrawer" class="delivery-detail-index-order-num">
            工单号：{{orderDetail.roNo}}
          </div>
          <div v-if="orderDetail.orderStatus!=90041004&&orderDetail.orderStatus!=90041005&&orderDetail.orderStatus!=90041006" class="delivery-detail-index-status">
            {{orderDetail.orderStatus==90041001?'待确认':orderDetail.orderStatus==90041002?'派单中':orderDetail.orderStatus==90041003?'已接单':orderDetail.orderStatus==90041007?'已完成':orderDetail.orderStatus==90041008?'已取消':''}}
          </div>
          <div v-show="openShow" v-else class="delivery-detail-index-line"></div>
          <user-phone
            v-show="openShow||!isDrawer"
            :userName="userName"
            :sex="orderDetail.sex"
            :userPhone="orderDetail.phone">
          </user-phone>
          <drive-info
            v-show="orderDetail.orderStatus==90041003||orderDetail.orderStatus==90041004||orderDetail.orderStatus==90041005||orderDetail.orderStatus==90041006"
            :driverImg="orderDetailDrive.pictureSmall"
            :driverName="orderDetailDrive.driverName"
            :jobNumber="orderDetailDrive.driverNo"
            :driverPhone="orderDetailDrive.driverPhone"
            :orderStatus="orderDetail.orderStatus">
          </drive-info>
          <div class="delivery-detail-index-detail">
            <show-tip-title title="送车服务"></show-tip-title>
            <show-tip-content title="车辆信息：" :detail="carModelCodeNo"></show-tip-content>
            <show-tip-content title="车主信息：" :detail="carOwnerInfo" :otherDetail="orderDetail.phone"></show-tip-content>
            <show-tip-content v-show="orderDetail.pickerLastName&&orderDetail.pickerLastName!=''" title="接车人信息：" :detail="pickerUserInfo" :otherDetail="orderDetail.pickerPhone"></show-tip-content>
            <show-tip-content title="预约送出时间：" :detail="sendTime"></show-tip-content>
            <show-tip-content title="预约送车地址：" :detail="orderDetail.returnAddress"></show-tip-content>
            <div v-show="orderDetailDrive.orderId&&orderDetailDrive.orderId!=''">
              <show-tip-title title="订单信息"></show-tip-title>
              <show-tip-content title="订单编号：" :detail="orderDetailDrive.orderId"></show-tip-content>
              <show-tip-content title="创建时间：" :detail="orderCreateTime"></show-tip-content>
              <show-tip-content v-show="orderDetail.orderStatus!=90041002&&orderDetail.orderStatus!=90041008" title="接单时间：" :detail="takingTimeFormat"></show-tip-content>
              <show-tip-content v-show="orderDetail.orderStatus==90041007" title="完成时间：" :detail="receiptTimeFormat"></show-tip-content>
              <show-tip-content v-show="orderDetail.orderStatus==90041007" title="司机信息：" :detail="orderDetailDrive.driverName" :phone="orderDetailDrive.driverPhone"></show-tip-content>
              <show-tip-content v-show="orderDetail.orderStatus==90041008" title="取消时间：" :detail="cancelTimeFormat"></show-tip-content>
            </div>
            <div class="delivery-detail-index-bottom-height"></div>
          </div>
        </div>
        <div class="delivery-detail-index-botton" v-show="showButton">
          <div class="delivery-detail-index-botton-item">
            <wx-button @click.native="updateInfo">更新信息</wx-button>
          </div>
          <div class="delivery-detail-index-botton-item">
            <wx-button @click.native="cancelOrder">取消订单</wx-button>
          </div>
        </div>
        <mt-popup v-model="reasonVisible" position="bottom">
          <cancel-reason
            :reasonChoose="reasonChoose"
            @cancel="submitCancel"
          ></cancel-reason>
        </mt-popup>
      </div>
    </drawer-view>
  </div>
</template>

<script>
  import UserPhone from './components/UserPhone'
  import DriveInfo from './components/DriveInfo'
  import ShowTipTitle from './components/ShowTipTitle'
  import ShowTipContent from './components/ShowTipContent'
  import WxButton from "./../../components/WxButton"
  import CancelReason from "./components/CancelReason";
  import { Popup, Indicator } from "mint-ui";
  import { setTimeout } from "timers";

  import DrawerView from './../map-select-address/components/DrawerView'
  const drivingLine = require('./../map-select-address/script/drivingLine')
  const testArr = [[121.423393, 31.211748], [121.425972, 31.210045], [121.428909, 31.210487], [121.430916, 31.212656], [121.434464, 31.214918], [121.438469, 31.217804], [121.442772, 31.219658], [121.447235, 31.221125], [121.45369, 31.223351], [121.461395, 31.223871], [121.466743, 31.223734], [121.474792, 31.226597], [121.480835, 31.2299], [121.483376, 31.230824], [121.487389, 31.230728], [121.493073, 31.233278], [121.500496, 31.238016], [121.504807, 31.236597], [121.50927, 31.236986], [121.511292, 31.235538]]


  // import {detail} from './mock/fetchList'
  export default {
    name: "fetchDetail",
    components: {
      UserPhone,
      DriveInfo,
      ShowTipTitle,
      ShowTipContent,
      CancelReason,
      Popup,
      WxButton,
      DrawerView
    },
    computed: {
      showButton() {
        if(this.position=='engineer'&&this.orderDetail.orderStatus){
          if(this.orderDetail.orderStatus==90041001||this.orderDetail.orderStatus==90041002||this.orderDetail.orderStatus==90041003){
            return true;
          }
        }
        return false;
      },
      userName() {
        if(this.orderDetail.lastName) {
          return this.orderDetail.lastName+this.orderDetail.firstName+'';
        }
      },
      carModelCodeNo() {
        if(this.orderDetail.carModelName) {
          return `${this.orderDetail.carModelName} ${this.orderDetail.carNo}`;
        }
      },
      sendTime() {
        if(this.orderDetail.bookingTime) {
          return moment(new Date(Number(this.orderDetail.bookingTime))).format('YYYY年MM月DD日  星期dd  HH:mm');
        }
      },
      orderCreateTime() {
        if(this.orderDetailDrive.createTime) {
          return moment(new Date(Number(this.orderDetailDrive.createTime))).format('YYYY年MM月DD日  HH:mm');
        }
      },
      carOwnerInfo() {
        if(this.orderDetail.lastName) {
          var sexName = this.orderDetail.sex==0?'先生':this.orderDetail.sex==1?'女士':'';
          return this.orderDetail.lastName+this.orderDetail.firstName+sexName;
        }
      },
      pickerUserInfo() {
        if(this.orderDetail.pickerLastName) {
          var pickerSex = this.orderDetail.pickerSex==0?'先生':this.orderDetail.pickerSex==1?'女士':'';
          return this.orderDetail.pickerLastName+this.orderDetail.pickerFirstName+pickerSex;
        }
      },
      takingTimeFormat() {
        if(this.orderDetailDrive.takingTime) {
          return moment(new Date(Number(this.orderDetailDrive.takingTime))).format('YYYY年MM月DD日  HH:mm');
        }
      },
      receiptTimeFormat() {
        if(this.orderDetailDrive.receiptTime) {
          return moment(new Date(Number(this.orderDetailDrive.receiptTime))).format('YYYY年MM月DD日  HH:mm');
        }
      },
      cancelTimeFormat() {
        if(this.orderDetailDrive.orderCancellingTime) {
          return moment(new Date(Number(this.orderDetailDrive.orderCancellingTime))).format('YYYY年MM月DD日  HH:mm');
        }
        if(this.orderDetail.cancelTime) {
          return moment(new Date(Number(this.orderDetail.cancelTime))).format('YYYY年MM月DD日  HH:mm');
        }
      }
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
        orderId:"",
        position:"",
        orderDetail:{
        },
        orderDetailDrive:{
        },
        reasonVisible:false,
        reasonChoose:[{id:'客户原因取消',value:'客户原因取消'},
                      {id:'客户修改信息（时间、地点）',value:'客户修改信息（时间、地点）'},
                      {id:'工单关联错误',value:'工单关联错误'},
                      {id:'其他',value:'其他'}],
        openShow: false,
        //
        isDrawer: false,//是否显示抽屉
        startPos: null,//起点
        endPos: null,//终点
        currentPos: null,//途径点
        drivingPos: null,//司机坐标
        //
      }
    },
    directives: {
    },
    watch:{

    },
    methods: {
      //初始化地图
      initAmap() {
        drivingLine.initMap(() => {
          //模拟更新数据
          this.startPos = [121.423596, 31.211773]
          this.endPos = [121.510652, 31.235425]
          this.drivingPos = [121.423596, 31.211773]
          this.currentPos = []
          let index = 1
          const timer = setInterval(() => {
            const arr = [...testArr]
            arr.length = index
            this.drivingPos = arr[arr.length - 1]
            this.currentPos = arr
            drivingLine.createLine(this.startPos, this.endPos, [...this.currentPos, this.drivingPos])
            index += 1
            if (index === 21) {
              clearInterval(timer)
            }
          }, 2000)
          drivingLine.createLine(this.startPos, this.endPos, [...this.currentPos, this.drivingPos])
        })
      },
      init() {
        this.http.get('fetchAndDeliverDetail',{id:this.orderId},res=>{
          if(res.data.data){
            this.orderDetail = res.data.data;
          }
          if(res.data.data2) {
            this.orderDetailDrive = res.data.data2;
          }
          // 是否允许显示地图
          if(this.orderDetail.orderStatus == 90041004 ||
            this.orderDetail.orderStatus == 90041005 ||
            this.orderDetail.orderStatus == 90041006){
              this.isDrawer=true;
              this.$nextTick(()=>{
                  this.initAmap()
              })
            }
          Indicator.close();
        });
        // this.orderDetail = detail;
      },
      updateInfo() {
        window.sessionStorage.removeItem("parmas");
        this.$router.push({name :'createSendOrder', query: {id:this.orderDetail.id,way:'detail'}});
      },
      cancelOrder() {
        if(this.orderDetail.orderStatus==90041001) {
          console.log("cancelOrder");
          $.dialog({
            title: "提示",
            html: `
              <div style="text-align:justify;margin-top:5px;font-size:16px;padding: 0 15px;">
                确认取消车牌号${this.orderDetail.carNo}的送车服务
              </div>`,
            buttons: [
              {
                title: "取消"
              },
              {
                title: "确认",
                isBold: true,
                callback: () => {
                  // console.log("点击确认");
                  this.doSubmitCancel('客户原因取消');
                }
              }
            ],
            isMask: true
          });
        }else if(this.orderDetail.orderStatus==90041002||this.orderDetail.orderStatus==90041003) {
          this.reasonVisible = true;
        }
      },
      submitCancel(val) {
        this.reasonVisible = false;
        console.log(val);
        this.doSubmitCancel(val);
      },
      doSubmitCancel(reason) {
        Indicator.open({
          spinnerType: "triple-bounce"
        });
        this.http.get('orderCancel',{orderId:this.orderDetail.id,cancelReason:reason},res=>{
          this.init();
          // setTimeout(function() {
          //   Indicator.close();
          // }, 1000);
        });
      },
      drawerStartFun(val) {
        this.openShow = true;
      },
      drawerEndFun(val) {
        if(val=='open') {
          this.openShow = true;
        }else if(val=='close') {
          this.openShow = false;
        }
      }
    },
    beforeMount() {
      $(document).attr('title','送车服务订单');
    },


    mounted() {
      this.orderId = this.$route.query.orderId;
      this.position = this.$route.query.position;

      return this.$nextTick(() => this.init());

    }
  };

</script>

<style lang="sass" scoped type="text/scss">
  @function px($px) {
    @return ($px/20) + rem;
  }
  #amap-container {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }
  .delivery-detail-index {
    font-family:PingFangSC-Regular;
    font-weight:400;
    &-height {
      height: 100vh;
    }
    &-text {
      height: calc(100vh - 90px);
      overflow: scroll;
    }
    &-line {
      margin: 0 15px;
      height:1px;
      background: #E2E2E2;
    }
    &-order-num {
      font-size:14px;
      color:rgba(50,50,50,1);
      padding:24px 15px;
    }
    &-status {
      height:px(42);
      font-size:16px;
      color:rgba(184,97,34,1);
      background:rgba(255,248,243,1);
      padding:10px 15px;
    }
    &-detail {
      padding:0 15px;
      margin-bottom: 40px;
    }
    &-botton {
      display: flex;
      justify-content: space-evenly;
      position: absolute;
      width: 100vw;
      height: 90px;
      align-items: center;
      bottom: 0;
      &-item {
        width: 42%;
      }
    }
    &-bottom-height {
      height: 40px;
    }
  }
</style>
