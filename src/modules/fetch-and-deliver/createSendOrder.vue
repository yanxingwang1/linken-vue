<!--
    取送车-页面：服务工程师根据工单创建送车单
-->
<template>
  <div class="create-send-order-wrap">
    <!--工单号-->
    <div class="order-code">
      <div class="code">工单号：{{data.roNo||''}}</div>
      <div class="edit" v-show="edit" @click="Edit">修改</div>
    </div>
    <!--订单信息-->
    <div class="sub-title">订单信息</div>
    <!--车辆信息-->
    <vehicle-info-panel :data="data"></vehicle-info-panel>
    <!--车主信息-->
    <user-info-panel :data="data"></user-info-panel>
    <!-- 委托他人接车 -->
    <en-trust title="委托他人接车" v-model="scootor" :uptrust="uptrust">
      <div class="sex">
        <span>
          称谓
          <span class="red">*</span>
        </span>
        <span style="padding-left:0" @click="()=>{this.uptrust.sex=0}">
          <img v-show="uptrust.sex=='0'" src="./imgs/sex.png">
          <img v-show="uptrust.sex!='0'" src="./imgs/unsex.png">
          <span>先生</span>
        </span>
        <span @click="()=>{this.uptrust.sex=1}">
          <img v-show="uptrust.sex=='1'" src="./imgs/sex.png">
          <img v-show="uptrust.sex!='1'" src="./imgs/unsex.png">
          <span>女士</span>
        </span>
      </div>
    </en-trust>
    <!--进度信息-->
    <div class="progress-info">
      <start-and-end-point-view :data="startAndEndPointViewData" :choose-end="true">
        <img class="editicon" src="./imgs/edit.png">
      </start-and-end-point-view>
      <take-time-picker-view
        :simple="simple"
        :defaultValue="taketime"
        @change="upDateArr"
        title="预约取车时间"
        subtitle="请注意预留行驶时间"
      >
        <img class="editicon" src="./imgs/edit.png">
      </take-time-picker-view>
    </div>
    <div class="btn-wrap">
      <wx-button :disabled="submitdisabled" @click.native="commitHandleClick">提交</wx-button>
    </div>
  </div>
</template>

<script>
import util from "../../common/DMC.util.js";
import WxButton from "./../../components/WxButton";
import { Indicator, Picker } from "mint-ui";
import UserInfoPanel from "./../send-vehicle-notice/components/UserInfoPanel";
import VehicleInfoPanel from "./../send-vehicle-notice/components/VehicleInfoPanel";
import StartAndEndPointView from "./../reservation-service/components/StartAndEndPointView";
import TakeTimePickerView from "./../reservation-service/components/DateTimePickerComp/TakeTimePickerView";
// import { debuglog, debug } from "util";
import jssdkCommon from "../../common/weixin";
import EnTrust from "./components/Entrust.vue";
import { Toast } from "mint-ui";
import { setTimeout } from 'timers';
export default {
  components: {
    WxButton,
    StartAndEndPointView,
    TakeTimePickerView,
    UserInfoPanel,
    VehicleInfoPanel,
    EnTrust
  },
  name: "createSendOrder",
  data() {
    return {
      taketime: "",
      arrivalTime:'',//后台
      arrivalTimemin:'',//分钟
      data: {},
      simple: false, //复杂展示,
      adress: "", //自定义地址
      scootor: false, //是否委托他人取车,
      uptrust: {
        firstName: "",
        lastName: "",
        phone: "",
        sex: 0
      },
      distance: "", //计算距离
      returnAddressLat: "", //返回地址的经纬度
      returnAddressLng: "",
      houseNumber: "", //客户住址门牌号
      // unedit:"",//已接单和送车中不可以修改
      startAndEndPointViewData: {
        startName: "",
        startAddress: "",
        endName: "选择客户预约送达地址",
        endAddress: "",
        showHouseNumber: false,
        houseNumber: "",
        // latitude: "31.306374",
        // longitude: "121.434909",
        from: "createSendOrder"
      }
    };
  },
  computed: {
    submitdisabled() {
      var flag = false;
      if (!this.adress) flag = true;
      if (!this.taketime) flag = true;
      if (this.scootor) {
        if (!this.uptrust.lastName) flag = true;
        if (!this.uptrust.phone || !/^1[0-9]{10}$/.test(this.uptrust.phone))
          flag = true;
      }
      return flag;
    },
    newtime(){
      return this.taketime?this.taketime:moment().format("YYYY-MM-DD HH:mm:ss")
    },
    edit() {
      if(this.$route.query.id) {
        if(this.data.orderStatus == "90041001"){
          return true;
        }
        return false;
      }else {
        return true;
      }
    }
  },

  watch: {
    adress(newVal, oldVal) {//监听送车地址变化
      //根据送车地址返回经纬度和第三方接口返回的二点之间的距离
      util.getLinLat(newVal).then(end => {//计算送车新地址经纬度
        const [p1, p2] = end;
        (this.returnAddressLat = Number(p2)), //返回地址的经纬度
         (this.returnAddressLng = Number(p1));
        //  setTimeout(()=>{
                // var start=[this.data.pickupAddressLng||this.data.longitude,this.data.pickupAddressLat||this.data.latitude]
          this.init().then((start)=>{//初始化获取旧经销商地址经纬度
          
               this.getdistance(end,start).then(({distance})=>{//计算二点距离
                  this.startAndEndPointViewData.endAddress = `预估距离：${distance} Km`;
                })
                 util.computedDrivingDuration(start, end).then(res=>{ // 高德地图定位计算二点驾车耗时间
                      this.arrivalTimemin=res
                      this.arrivalTime=moment(this.taketime).add(res, 'm').format("YYYY-MM-DD HH:mm:ss")
                })
          })
        //  },1200)
       
      });
      if (newVal) {
        this.startAndEndPointViewData.showHouseNumber = true;
        this.startAndEndPointViewData.endName = newVal;//更新组件新的送车地址
      }
    },
    houseNumber(newVal, oldVal) {
      //送车门牌号
      this.startAndEndPointViewData.houseNumber = newVal;
    }
  },

  methods: {
    upDateArr(value){
        this.taketime = value//前端更新送达时间
          var start=[this.data.pickupAddressLng||this.data.longitude,this.data.pickupAddressLat||this.data.latitude]
            var end=[this.returnAddressLng,this.returnAddressLat]
            util.computedDrivingDuration(start, end).then(res=>{
            this.arrivalTime=moment(value).add(res, 'm').format("YYYY-MM-DD HH:mm:ss")
          })
    },
    initBefore() {
      //只在推送的时候请求的时候请求
      return new Promise((resolve, reject) => {// 该工单已经存在未完成的送车服务订单
        if (!this.$route.query.roNo) { //更新订单的时候不请求这个接口
          return;
        }
        var parm = {
          roNo: this.$route.query.roNo,
          dealerCode: this.$route.query.dealerCode
        };
        this.http.get("checkOrder", parm, res => {
          if (res.resultCode == "1" && res.data) {
            this.dialog("该工单已经存在未完成的送车服务订单",res.data);
          }
        });
      });
    },
    // 初始化
    init() {// 已经创建完订单，从订单详情修改订单或者取消订单进入通过route传递订单id，或者点击修改订单号，从服务工程师列表进入
       return new Promise((resolve, reject) => {
        if (this.$route.query.way == "detail" ||(this.$route.query.way == "list" && this.$route.query.id)) {
            this.http.get("fetchAndDeliverDetail",{id: this.$route.query.id },res => {
            if (res.resultCode) {// 数据回显
              this.data = res.data.data; //页面回显
              this.taketime = moment(this.data.bookingTime).format("YYYY-MM-DD HH:mm"); //时间组件展示预约时间
              this.arrivalTime=this.data.arrivalTime;//修改提交到后台时间
               //更新传递地址选址器组件值startName:"",startAddress: "",
              this.startAndEndPointViewData.startName = this.data.dealerName;
              this.startAndEndPointViewData.startAddress = this.data.pickupAddress;
              resolve([this.data.pickupAddressLng,this.data.pickupAddressLat])
              if (sessionStorage.getItem("createorder")) {//地图页面跳转回来
                //  回显委托人信息
                this.getCache();
              }else {// 更新工单委托人信息回显不换工单
                  var parmas = {
                    firstName: this.data.pickerFirstName,
                    lastName: this.data.pickerLastName,
                    phone: this.data.pickerPhone,
                    sex: this.data.pickerSex
                  };
                  this.uptrust = parmas;
                  this.scootor = this.data.pickerLastName ? true : false;
                  // 更新送车地址和送车门派好
                   this.adress = this.data.returnAddress;
                  this.houseNumber = this.data.houseNumber;
              }
              const item = "createSendOrderSelectAddress";
              const address = sessionStorage.getItem(item);
              if (address) {//地图页面跳转回来读缓存
                // 地图选址的地址和更新接口默认带的门牌号
                this.adress = address;
                this.houseNumber = this.data.houseNumber;
           
              }
              if (this.$route.query.way == "list") {// 修改换工单更新委托人信息
                    var param = {
                      roNo: this.$route.query.roNo,
                      dealerCode: this.$route.query.dealerCode
                    };
                    this.http.get("workOrderDetail", param, res => {
                      if (res.resultCode) {
                        this.data.license = res.data.license;
                        this.data.model = res.data.model;
                        this.data.userName = res.data.userName;
                        this.data.sex = res.data.sex;
                        this.data.phone = res.data.phone;
                        this.data.roNo = res.data.roNo;
                      }
                    });
              }
            }
          }
        );
      } else { // 从服务工程师页面第一次进入创建工单
        var param = {
          roNo: this.$route.query.roNo,
          dealerCode: this.$route.query.dealerCode
        };
        this.http.get("workOrderDetail", param, res => {
          if (res.resultCode) {
            this.data = res.data;
            resolve([this.data.longitude,this.data.latitude])
            if (sessionStorage.getItem("createorder")) {//地图页面跳转回来
                this.getCache();
              }
              const item = "createSendOrderSelectAddress";
              const address = sessionStorage.getItem(item);
              if (address) {
                this.adress = address; //把提交到后台的更新
              }
            // 更新传递地址选址器组件值startName:"",startAddress: "",
            this.startAndEndPointViewData.startName = res.data.dealerName;
            this.startAndEndPointViewData.startAddress = res.data.detailAddress;
            if (this.data.balanceType == 12781001) {
              this.dialog("该工单已取消，不可提交送车服务，请重新选择工单");
            }
          }
        });
      }
       });
    },
    getdistance([p1, p2],[p3,p4]){
        return new Promise((resolve, reject) => {
            var parmas={
              "endLng": p1,
              "endLat": p2,
              "startLng": p3,
              "startLat": p4,
              "bookingTime": moment().format('YYYYMMDDHHmmss')
            }
             this.http.post('getEstimatedPrice',parmas,res=>{
                resolve(res)
             })
        })
    },
    dialog(text,id) {
      $.dialog({
        title: "提示",
        type: "wx-alert",
        message: `${text}`,
        buttons: [
          {
            title: "确认",
            isBold: true,
            callback: () => {
              if(id){// 有工单
               //服务工程师详情,服务总监详情
                  this.$router.push({
                    name: "orderDetail",
                    query: {
                      orderId: id,
                      position: "engineer"
                    }
                  });
              }else{
                 jssdkCommon.wxReady(() => {
                  jssdkCommon.closeWindow1();
                });
              }
             
            }
          }
        ],
        isMask: true,
        maskOnClick: () => {
          return false;
        }
      });
    },
    // 修改订单
    Edit() {
      this.$router.push({
        path: "workOrder",
        query: {
          id: this.$route.query.id
        }
      });
    },
    commitHandleClick() {
        if (moment(this.taketime) < moment().add(2, "hours")) {
          Toast("预约取车时间不在允许范围之内，请重新选择");
          return;
        }
      $.dialog({
        title: "信息确认",
        type: "wx-alert",
        // message:'你好 林肯',
        html: `

<style>
.server-confirm-panel {
    padding-top: 25px;
    border-top: 1px solid #E2E2E2;
}

.server-confirm-panel>div {
    display: flex;
    line-height: 28px;
    font-size: 15px;
}

.server-confirm-panel>div>div:nth-of-type(1) {
    text-align: left;
    width: 75px;
    flex: 0 0 auto;
    color: #808080;
}

.server-confirm-panel>div>div:nth-of-type(2) {
    text-align: left;
    color: #141414;
}
</style>
            <div class="server-confirm-panel">
              <div>
                <div>送车时间：</div>
                <div>${moment(this.taketime).format(
                  "YYYY年MM月DD日 HH:mm"
                )}</div>
              </div>
              <div>
                <div>送车地址：</div>
                <div>${this.startAndEndPointViewData.endName +
                  this.startAndEndPointViewData.houseNumber}</div>
              </div>
            </div>
          `,
        buttons: [
          {
            title: "确认提交",
            isBold: true,
            callback: () => {
              this.submit();
            }
          }
        ],
        isMask: true
      });
    },
    submit() {
    
      Indicator.open({
        spinnerType: "triple-bounce"
      });
      // 有id的时候是用详情字段创建用dms字段
      // 创建订单状态
      var parma1 = {
        id: null,
        assStatus: "",
        bookingTime: moment(this.taketime).utc(),
        arrivalTime:moment(this.arrivalTime).utc(),
        cancelReason: "",
        carModelCode: this.data.model,
        carModelName: this.data.model,
        carNo: this.data.license,
        createBy: "",
        createDate: "",
        dealerCode: this.data.dealerCode, //经销商code
        dealerName: this.data.dealerName, //经销商名称
        engineerCode: this.data.engineerCode, //服务工程师
        engineerName: this.data.engineerName,
        engineerPhone: this.data.engineerPhone,
        firstName: "",
        isAssess: "",
        lastName: this.data.userName,
        orderNo: "",
        orderStatus: "",
        phone: this.data.phone,
        pickupAddress: this.data.detailAddress, //经销商地址
        pickupAddressLat: this.data.latitude,
        pickupAddressLng: this.data.longitude,
        remark: "",
        returnAddress: this.adress,
        houseNumber: this.startAndEndPointViewData.houseNumber,
        returnAddressLat: this.returnAddressLat,
        returnAddressLng: this.returnAddressLng,
        roNo: this.data.roNo,
        serverStatus: "",
        sex: this.data.sex,
        updateBy: "",
        updateDate: "",
        pickerFirstName: this.scootor ? this.uptrust.firstName : "",
        pickerLastName: this.scootor ? this.uptrust.lastName : "",
        pickerSex: this.scootor ? this.uptrust.sex : "",
        pickerPhone: this.scootor ? this.uptrust.phone : "",
        serviceHotline: this.data.serviceHotline
      };
      // 更新单子
      var parma2 = {
        id: this.$route.query.id,
        assStatus: "",
        bookingTime: moment(this.taketime).utc(),
        arrivalTime:moment(this.arrivalTime).utc(),
        cancelReason: "",
        carModelCode: this.data.carModelCode,
        carModelName: this.data.carModelName,
        carNo: this.data.carNo,
        createBy: "",
        createDate: "",
        dealerCode: this.data.dealerCode, //经销商code
        dealerName: this.data.dealerName, //经销商名称
        engineerCode: this.data.engineerCode, //服务工程师
        engineerName: this.data.engineerName,
        engineerPhone: this.data.engineerPhone,
        firstName: "",
        isAssess: this.data.isAssess,
        lastName: this.data.lastName,
        orderNo: this.data.orderNo,
        orderStatus: this.data.orderStatus,
        phone: this.data.phone,
        pickupAddress: this.data.pickupAddress, //经销商地址
        pickupAddressLat: this.data.pickupAddressLat,
        pickupAddressLng: this.data.pickupAddressLng,
        remark: "",
        returnAddress: this.adress,
        houseNumber: this.startAndEndPointViewData.houseNumber,
        returnAddressLat: this.data.returnAddressLat,
        returnAddressLng: this.data.returnAddressLng,
        roNo: this.data.roNo,
        serverStatus: "",
        sex: this.data.sex,
        updateBy: "",
        updateDate: "",
        pickerFirstName: this.scootor ? this.uptrust.firstName : "",
        pickerLastName: this.scootor ? this.uptrust.lastName : "",
        pickerSex: this.scootor ? this.uptrust.sex : "",
        pickerPhone: this.scootor ? this.uptrust.phone : "",
        serviceHotline: this.data.serviceHotline
      };
      // 更换工单更新单子
      var parma3 = {
        id: this.$route.query.id,
        assStatus: "",
        bookingTime: moment(this.taketime).utc(),
        arrivalTime:moment(this.arrivalTime).utc(),
        cancelReason: "",
        carModelCode: this.data.model,
        carModelName: this.data.model,
        carNo: this.data.license,
        createBy: "",
        createDate: "",
        dealerCode: this.data.dealerCode, //经销商code
        dealerName: this.data.dealerName, //经销商名称
        engineerCode: this.data.engineerCode, //服务工程师
        engineerName: this.data.engineerName,
        engineerPhone: this.data.engineerPhone,
        firstName: "",
        isAssess: this.data.isAssess?this.data.isAssess:"",
        lastName: this.data.userName,
        orderNo: this.data.orderNo,
        orderStatus: this.data.orderStatus?this.data.orderStatus:"",
        phone: this.data.phone,
        pickupAddress: this.data.pickupAddress, //经销商地址即使更换工单，经销商地址不变之所以不用工单地址是由于初始化渲染需要更新字段
        pickupAddressLat: this.data.pickupAddressLat,
        pickupAddressLng: this.data.pickupAddressLng,
        remark: "",
        returnAddress: this.adress,
        houseNumber: this.startAndEndPointViewData.houseNumber,
        returnAddressLat: this.data.returnAddressLat,
        returnAddressLng: this.data.returnAddressLng,
        roNo: this.data.roNo,
        serverStatus: "",
        sex: this.data.sex,
        updateBy: "",
        updateDate: "",
        pickerFirstName: this.scootor ? this.uptrust.firstName : "",
        pickerLastName: this.scootor ? this.uptrust.lastName : "",
        pickerSex: this.scootor ? this.uptrust.sex : "",
        pickerPhone: this.scootor ? this.uptrust.phone : "",
        serviceHotline: this.data.serviceHotline
      };
      
      var parmas;
      if (this.$route.query.id && this.$route.query.way == "list") {
        //更换工单
        parmas = parma3;
      } else if (this.$route.query.id && this.$route.query.way == "detail") {
        //更新订单信息
        parmas = parma2;
      } else {
        //创建工单
        parmas = parma1;
      }
      if (this.$route.query.id) {
        //更新
        this.http.post("updateOrder", parmas, res => {
          if (res.resultCode) {
            console.log("订单号", res.data);
            Indicator.close();

            //服务工程师详情,服务总监详情
            this.$router.push({
              name: "orderDetail",
              query: {
                orderId: res.data,
                position: "engineer"
              }
            });
          }
        });
      } else {
        //创建
        this.http.post("creatOrder", parmas, res => {
          if (res.resultCode) {
            console.log("订单号", res.data.id);
            Indicator.close();
            //服务工程师详情,服务总监详情
            this.$router.push({
              name: "orderDetail",
              query: {
                orderId: res.data.id,
                position: "engineer"
              }
            });
          }
        });
      }
    },
    //回显我的位置
    chooseAddressCallback() {
      const item = "createSendOrderSelectAddress";
      const address = sessionStorage.getItem(item);
      if (address) {
        this.adress = address; //把提交到后台的更新
      }
    },
    //进入选择地址页面
    goSelectAddressPage() {
      this.saveCache();
    },
    saveCache() {
      var parmas = {
        uptrust: this.uptrust,
        scootor: this.scootor,
        taketime: this.taketime
      };
      sessionStorage.setItem("createorder", JSON.stringify(parmas));
    },
    getCache() {
      const cacheStr = sessionStorage.getItem("createorder");
      const parmas = JSON.parse(cacheStr);
      this.uptrust = parmas.uptrust;
      this.scootor = parmas.scootor;
      this.taketime = parmas.taketime;
      // sessionStorage.removeItem("createorder");
    }
  },

  created() {
  
  },
  beforeMount() {
    $(document).attr("title", "送车上门服务订单");
  },
  mounted() {
    window.app = this;
    if (this.$route.query.wxPhone) {
      window.sessionStorage.setItem(
        "wxUserIdMoble",
        JSON.stringify({
          moble: this.$route.query.wxPhone,
          wxUserId: this.$route.query.wxUserId
        })
      );
    }
    // if (!sessionStorage.getItem("createorder")) {
        //  this.init();
    // }
    // setTimeout(()=>{
      this.init();
    // },1800)
   
    this.initBefore();
        $("input")
        .off("blur")
        .on("blur", () => {
          $(document).scrollTop(9999);
        });

         $(".name  input")
        .off("focus")
        .on("focus", () => {
          $(document).scrollTop(120);
        });
        $(".phone input")
        .off("focus")
        .on("focus", () => {
          $(document).scrollTop(200);
        });
        $("input.house-number-input")
        .off("focus")
        .on("focus", () => {
          $(document).scrollBottom(150);
        });
        
  }
};
</script>

<style scoped lang="sass" type="text/scss">
  @function px($px) {
    @return ($px/20)+rem;
  }

  .create-send-order-wrap {
    color: #323232;
    font-size: px(14);
    /* 工单号 */
    .order-code {
      height: px(66);
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 px(15);

      .code, .edit {
        height: 100%;
        display: flex;
        align-items: center;
        flex: 0 1 auto;
      }

      .edit {
        flex: 0 1 px(40);
        justify-content: center;
        color: #A9A9A9;
      }
    }

    /* 订单信息 */
    .sub-title {
      background-color: #EBEBEB;
      height: px(40);
      display: flex;
      align-items: center;
      padding-left: px(15);
    }

    /* 进度信息 */
    .progress-info {
      padding: px(10) px(10);
      .editicon{

           width: px(14);
           margin-left:px(8);

      }
    }

    .btn-wrap {
      padding: px(20) px(23);
      background-color: #F5F5F5;
    }

  }
</style>
