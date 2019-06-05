<template>
  <div class="send-vehicle">
    <!-- 派单中 -->

    <div class="fetch-detail-index Canscroll" v-if="data.orderStatus==90041002">
      <div class="fetch-detail-index-status">派单中</div>
      <div class="fetch-detail-index-user">
        <div class="fetch-detail-index-username">尊敬的{{data.lastName}}{{data.sex=='1'?'女士':'先生'}}</div>
        <div class="fetch-detail-index-userdesc">您的订单正在派单中。</div>
      </div>
      <show-cancel-title title="联系林肯中心取消订单" :userPhone="data.engineerPhone"></show-cancel-title>

      <div class="fetch-detail-index-detail">
        <show-tip-title title="送车上门服务"></show-tip-title>
        <show-tip-content title="车辆信息：" :detail="`${data.carModelName} ${data.carNo}`"></show-tip-content>
        <show-tip-content title="车主信息：" :detail="carOwnerInfo"></show-tip-content>
        <show-tip-content v-show="data.pickerPhone" title="委托接车人：" :detail="helpOwnerInfo"></show-tip-content>
        <show-tip-content title="预计送达时间：" :detail="bookingTime"></show-tip-content>
        <show-tip-content title="预约送车地址：" :detail="returnAddress"></show-tip-content>
        <show-shop-title title="林肯中心信息" :userPhone="data.serviceHotline"></show-shop-title>
        <show-tip-content title="林肯中心：" :detail="data.dealerName"></show-tip-content>
        <show-tip-content title="林肯中心地址：" :detail="data.pickupAddress"></show-tip-content>
        <show-tip-content title="服务工程师：" :detail="data.engineerName"></show-tip-content>
        <show-tip-title title="订单信息"></show-tip-title>
        <show-tip-content title="订单编号：" :detail="data.orderNo"></show-tip-content>
        <show-tip-content title="创建时间：" :detail="createDate"></show-tip-content>
      </div>
    </div>
    <!-- 已接单 -->
    <div class="fetch-detail-index Canscroll" v-if="data.orderStatus==90041003">
      <div class="fetch-detail-index-status">已接单</div>

      <drive-info
        :driverImg="orderDetailDrive.pictureSmall"
        :driverName="orderDetailDrive.driverName"
        :jobNumber="orderDetailDrive.driverNo"
        :driverPhone="orderDetailDrive.driverPhone"
        :driverStar="orderDetailDrive.newLevel"
        driverStatus="0"
        code="0"
      ></drive-info>
      <show-cancel-title title="联系林肯中心取消订单" :userPhone="data.engineerPhone"></show-cancel-title>

      <div class="fetch-detail-index-detail">
        <show-tip-title title="送车上门服务"></show-tip-title>
        <show-tip-content title="车辆信息：" :detail="`${data.carModelName} ${data.carNo}`"></show-tip-content>
        <show-tip-content title="车主信息：" :detail="carOwnerInfo"></show-tip-content>
        <show-tip-content v-show="data.pickerPhone" title="委托接车人：" :detail="helpOwnerInfo"></show-tip-content>
        <show-tip-content title="预计送达时间：" :detail="bookingTime"></show-tip-content>
        <show-tip-content title="预约送车地址：" :detail="returnAddress"></show-tip-content>
        <show-shop-title title="林肯中心信息" :userPhone="data.serviceHotline"></show-shop-title>
        <show-tip-content title="林肯中心：" :detail="data.dealerName"></show-tip-content>
        <show-tip-content title="林肯中心地址：" :detail="data.pickupAddress"></show-tip-content>
        <show-tip-content title="服务工程师：" :detail="data.engineerName"></show-tip-content>
        <show-tip-title title="订单信息"></show-tip-title>
        <show-tip-content title="订单编号：" :detail="data.orderNo"></show-tip-content>
        <show-tip-content title="创建时间：" :detail="createDate"></show-tip-content>
        <show-tip-content title="接单时间：" :detail="takingTime"></show-tip-content>
      </div>
    </div>
    <!-- 订单开启 -->
    <div class="fetch-detail-index" v-if="data.orderStatus==90041004">
      <!-- <div class="fetch-detail-index-status">订单开启</div> -->
      <!-- :code="code" -->
      <drive-info
        :driverImg="orderDetailDrive.pictureSmall"
        :driverName="orderDetailDrive.driverName"
        :jobNumber="orderDetailDrive.driverNo"
        :driverPhone="orderDetailDrive.driverPhone"
        :driverStar="orderDetailDrive.newLevel"
        driverStatus="1"
        code="0"
      ></drive-info>
      <!-- <show-cancel-title title="联系林肯中心取消订单" :userPhone="data.userPhone"></show-cancel-title> -->
      <div class="fetch-detail-index-help">
        <div class="fetch-detail-index-help1" >有问题请拨打服务电话 <img @click="phoneClick('400-810-3939')" src="./imgs/phone-o@3x.png"></div>
        <!-- <div class="fetch-detail-index-help2" @click="phoneClick('400-810-3939')">400-810-3939</div> -->
        <div class="fetch-detail-index-help3">代驾客服服务时间 7:00-21:00</div>
      </div>
      <div class="fetch-detail-index-detail">
        <show-tip-title title="送车上门服务"></show-tip-title>
        <show-tip-content title="车辆信息：" :detail="`${data.carModelName} ${data.carNo}`"></show-tip-content>
        <show-tip-content title="车主信息：" :detail="carOwnerInfo"></show-tip-content>
        <show-tip-content v-show="data.pickerPhone" title="委托接车人：" :detail="helpOwnerInfo"></show-tip-content>
        <show-tip-content title="预计送达时间：" :detail="bookingTime"></show-tip-content>
        <show-tip-content title="预约送车地址：" :detail="returnAddress"></show-tip-content>
        <show-shop-title title="林肯中心信息" :userPhone="data.serviceHotline"></show-shop-title>
        <show-tip-content title="林肯中心：" :detail="data.dealerName"></show-tip-content>
        <show-tip-content title="林肯中心地址：" :detail="data.pickupAddress"></show-tip-content>
        <show-tip-content title="服务工程师：" :detail="data.engineerName"></show-tip-content>
        <show-tip-title title="订单信息"></show-tip-title>
        <show-tip-content title="订单编号：" :detail="data.orderNo"></show-tip-content>
        <show-tip-content title="创建时间：" :detail="createDate"></show-tip-content>
        <show-tip-content title="接单时间：" :detail="takingTime"></show-tip-content>
      </div>
    </div>
    <!-- 送车中 -->
    <div class="fetch-detail-index" v-if="data.orderStatus==90041005">
      <!-- <div class="fetch-detail-index-status">送车中</div> -->
      <!-- :code="code" -->
      <drive-info
        :driverImg="orderDetailDrive.pictureSmall"
        :driverName="orderDetailDrive.driverName"
        :jobNumber="orderDetailDrive.driverNo"
        :driverPhone="orderDetailDrive.driverPhone"
        :driverStar="orderDetailDrive.newLevel"
        driverStatus="2"
        code="0"
      ></drive-info>
      <!-- <show-cancel-title title="联系林肯中心取消订单" :userPhone="data.userPhone"></show-cancel-title> -->
      <div class="fetch-detail-index-help">
        <div class="fetch-detail-index-help1">有问题请拨打服务电话
          <img  @click="phoneClick('400-810-3939')" src="./imgs/phone-o@3x.png">
        </div>
        <!-- <div class="fetch-detail-index-help2" >400-810-3939</div> -->
        <div class="fetch-detail-index-help3">代驾客服服务时间 7:00-21:00</div>
      </div>
      <div class="fetch-detail-index-detail">
        <show-tip-title title="送车上门服务"></show-tip-title>
        <show-tip-content title="车辆信息：" :detail="`${data.carModelName} ${data.carNo}`"></show-tip-content>
        <show-tip-content title="车主信息：" :detail="carOwnerInfo"></show-tip-content>
        <show-tip-content v-show="data.pickerPhone" title="委托接车人：" :detail="helpOwnerInfo"></show-tip-content>
        <show-tip-content title="预计送达时间：" :detail="bookingTime"></show-tip-content>
        <show-tip-content title="预约送车地址：" :detail="returnAddress"></show-tip-content>
        <show-shop-title title="林肯中心信息" :userPhone="data.serviceHotline"></show-shop-title>
        <show-tip-content title="林肯中心：" :detail="data.dealerName"></show-tip-content>
        <show-tip-content title="林肯中心地址：" :detail="data.pickupAddress"></show-tip-content>
        <show-tip-content title="服务工程师：" :detail="data.engineerName"></show-tip-content>
        <show-tip-title title="订单信息"></show-tip-title>
        <show-tip-content title="订单编号：" :detail="data.orderNo"></show-tip-content>
        <show-tip-content title="创建时间：" :detail="createDate"></show-tip-content>
        <show-tip-content title="接单时间：" :detail="takingTime"></show-tip-content>
      </div>
    </div>
    <!-- 已送达 -->
    <div class="fetch-detail-index" v-if="data.orderStatus==90041006">
      <!-- <div class="fetch-detail-index-status">已送达</div> -->
      <drive-info
        :driverImg="orderDetailDrive.pictureSmall"
        :driverName="orderDetailDrive.driverName"
        :jobNumber="orderDetailDrive.driverNo"
        :driverPhone="orderDetailDrive.driverPhone"
        :driverStar="orderDetailDrive.newLevel"
        driverStatus="3"
        :code="code"
      ></drive-info>
      <!-- <show-cancel-title title="联系林肯中心取消订单" :userPhone="data.userPhone"></show-cancel-title> -->
      <div class="fetch-detail-index-help">
        <div class="fetch-detail-index-help1" >有问题请拨打服务电话
             <img @click="phoneClick('400-810-3939')" src="./imgs/phone-o@3x.png">
        </div>
        <!-- <div class="fetch-detail-index-help2" @click="phoneClick('400-810-3939')">400-810-3939</div> -->
        <div class="fetch-detail-index-help3">代驾客服服务时间 7:00-21:00</div>
      </div>
      <div class="fetch-detail-index-detail">
        <show-tip-title title="送车上门服务"></show-tip-title>
        <show-tip-content title="车辆信息：" :detail="`${data.carModelName} ${data.carNo}`"></show-tip-content>
        <show-tip-content title="车主信息：" :detail="carOwnerInfo"></show-tip-content>
        <show-tip-content v-show="data.pickerPhone" title="委托接车人：" :detail="helpOwnerInfo"></show-tip-content>
        <show-tip-content title="预计送达时间：" :detail="bookingTime"></show-tip-content>
        <show-tip-content title="预约送车地址：" :detail="returnAddress"></show-tip-content>
        <show-shop-title title="林肯中心信息" :userPhone="data.serviceHotline"></show-shop-title>
        <show-tip-content title="林肯中心：" :detail="data.dealerName"></show-tip-content>
        <show-tip-content title="林肯中心地址：" :detail="data.pickupAddress"></show-tip-content>
        <show-tip-content title="服务工程师：" :detail="data.engineerName"></show-tip-content>
        <show-tip-title title="订单信息"></show-tip-title>
        <show-tip-content title="订单编号：" :detail="data.orderNo"></show-tip-content>
        <show-tip-content title="创建时间：" :detail="createDate"></show-tip-content>
        <show-tip-content title="接单时间：" :detail="takingTime"></show-tip-content>
      </div>
    </div>

    <!-- 已完成未评价 -->
    <!--<div class="fetch-detail-index" v-if="data.orderStatus==90041007">-->
      <div class="fetch-detail-index Canscroll"  v-if="data.orderStatus==90041007">
      <div class="fetch-detail-index-status">已完成</div>
      <div class="fetch-detail-index-user">
        <div class="fetch-detail-index-username">尊敬的{{data.lastName}}{{data.sex=='1'?'女士':'先生'}}</div>
        <div
          class="fetch-detail-index-userdesc"
        >您的订单已完成，感谢您对{{data.dealerName}}的信任，{{this.hasRated?'期待您再次光临。':'诚邀您对本次服务进行评价。'}}</div>
      </div>
      <div class="fetch-detail-index-commit">
        <div class="commit" @click="open()">{{this.hasRated?'查看评价':'服务评价'}}</div>
        <div class="fetch-detail-index-centerdiv"></div>
        <div class="phone" @click="phoneClick(data.engineerPhone)">联系服务工程师
          <img src="./imgs/phone-o@3x.png" alt="">
        </div>
      </div>
      <div class="fetch-detail-index-detail">
        <show-tip-title title="送车上门服务"></show-tip-title>
        <show-tip-content title="车辆信息：" :detail="`${data.carModelName} ${data.carNo}`"></show-tip-content>
        <show-tip-content title="车主信息：" :detail="carOwnerInfo"></show-tip-content>
        <show-tip-content v-show="data.pickerPhone" title="委托接车人：" :detail="helpOwnerInfo"></show-tip-content>
        <show-tip-content title="预计送达时间：" :detail="bookingTime"></show-tip-content>
        <show-tip-content title="预约送车地址：" :detail="returnAddress"></show-tip-content>
        <show-shop-title title="林肯中心信息" :userPhone="data.serviceHotline"></show-shop-title>
        <show-tip-content title="林肯中心：" :detail="data.dealerName"></show-tip-content>
        <show-tip-content title="林肯中心地址：" :detail="data.pickupAddress"></show-tip-content>
        <show-tip-content title="服务工程师：" :detail="data.engineerName"></show-tip-content>
        <show-tip-title title="订单信息"></show-tip-title>
        <show-tip-content title="订单编号：" :detail="data.orderNo"></show-tip-content>
        <show-tip-content title="创建时间：" :detail="createDate"></show-tip-content>
        <show-tip-content title="接单时间：" :detail="takingTime"></show-tip-content>
        <show-tip-content title="完成时间：" :detail="arrivalTime"></show-tip-content>
        <show-tip-content
          title="代驾专员信息："
          :phone="orderDetailDrive.driverPhone"
          :detail="orderDetailDrive.driverName"
        ></show-tip-content>
      </div>
      <div class="fetch-detail-index-getcommit">
        <mt-popup v-model="popupVisible" position="bottom">
          <fetch-and-deliver-rate :hasRated="hasRated" :remark="remark" :rateValue="rateValue"></fetch-and-deliver-rate>
        </mt-popup>
      </div>
    </div>

    <!-- 已取消 -->
    <div class="fetch-detail-index Canscroll" v-if="data.orderStatus==90041008">
      <div class="fetch-detail-index-status">已取消</div>
      <div class="fetch-detail-index-user">
        <div class="fetch-detail-index-username">尊敬的{{data.lastName}}{{data.sex=='1'?'女士':'先生'}}</div>
        <div class="fetch-detail-index-userdesc">您的送车上门服务已取消，林肯中心期待下次为您服务。</div>
      </div>
      <show-cancel-title title="联系服务工程师" :userPhone="data.engineerPhone">
         <img src="./imgs/phone-o@3x.png" alt="">
      </show-cancel-title>

      <div class="fetch-detail-index-detail">
        <show-tip-title title="送车上门服务"></show-tip-title>
        <show-tip-content title="车辆信息：" :detail="`${data.carModelName} ${data.carNo}`"></show-tip-content>
        <show-tip-content title="车主信息：" :detail="carOwnerInfo"></show-tip-content>
        <show-tip-content v-show="data.pickerPhone" title="委托接车人：" :detail="helpOwnerInfo"></show-tip-content>
        <show-tip-content title="预计送达时间：" :detail="bookingTime"></show-tip-content>
        <show-tip-content title="预约送车地址：" :detail="returnAddress"></show-tip-content>
        <show-shop-title title="林肯中心信息" :userPhone="data.serviceHotline"></show-shop-title>
        <show-tip-content title="林肯中心：" :detail="data.dealerName"></show-tip-content>
        <show-tip-content title="林肯中心地址：" :detail="data.pickupAddress"></show-tip-content>
        <show-tip-content title="服务工程师：" :detail="data.engineerName"></show-tip-content>
        <div v-show="data.orderNo">
          <show-tip-title title="订单信息"></show-tip-title>
          <show-tip-content title="订单编号：" :detail="data.orderNo"></show-tip-content>
          <show-tip-content title="创建时间：" :detail="createDate"></show-tip-content>
          <show-tip-content title="取消时间：" :detail="cancelTime"></show-tip-content>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import UserPhone from "./components/UserPhone";
import DriveInfo from "./components/DriveInfo";
import ShowTipTitle from "./components/ShowTipTitle";
import ShowShopTitle from "./components/ShowShopTitle";
import ShowCancelTitle from "./components/ShowCancelTitle";
import ShowTipContent from "./components/ShowTipContent";
import fetchAndDeliverRate from "./components/FetchAndDeliverRate";
import { Popup, Indicator } from "mint-ui";
import { setTimeout } from "timers";
import { detail } from "./mock/fetchList";

export default {
  props: {
    data: Object, //接收dms接口信息
    orderDetailDrive: Object, //接收代驾接口信息
    code: String
    // popupVisible:Boolean,//控制评价显示
    // onBounce:Boolean,//滑动地图控制
  },
  name: "SendVehicle",
  components: {
    UserPhone,
    DriveInfo,
    ShowTipTitle,
    ShowTipContent,
    ShowShopTitle,
    ShowCancelTitle,
    fetchAndDeliverRate,
    Popup
  },
  created() {
    end_time = new Date().getTime();
    console.log("index加载时间：", end_time - start_time, "ms");
    // this.init();
    this.$Bus.$on("popupVisible", data => {
      this.popupVisible = data.state;
    });
  },
  beforeDestroy() {},
  data() {
    return {
      sendType: 4,
      // data: {},
      popupVisible: false
      // hasRated: false,
      // takingTime: "", //接单时间
      // getcode: false,
      // rateValue: {
      //   rate: "10731001",
      //   text:
      //     "阿道夫拉时代峻峰拉水电费阿斯蒂芬姐啦时代峻峰拉可适当阿斯蒂芬静安寺都快疯了阿萨德发生大幅阿萨德发送到",
      //   date: "2019年3月10日 20:30"
      // }
    };
  },
  computed: {
    //wang先生 18301998709
    returnAddress:function(){//送车地址
      if(this.data.houseNumber==null) {
        return this.data.returnAddress
      }
      return `${this.data.returnAddress+this.data.houseNumber}`
    },
    carOwnerInfo: function() {
      return `${this.data.lastName +
        (this.data.sex == "1" ? "女士" : "先生") +
        " " +
        this.data.phone}`;
    },
    helpOwnerInfo: function() {
      return `${this.data.pickerLastName +
        this.data.pickerFirstName +
        (this.data.pickerSex == "1" ? "女士" : "先生") +
        " " +
        this.data.pickerPhone}`;
    },
    bookingTime: function() {
      return moment(this.data.arrivalTime).format("YYYY年MM月DD日 dddd HH:mm");
    },
    createDate: function() {
    
      return moment(this.orderDetailDrive.createTime).format("YYYY年MM月DD日  HH:mm");
    },
    takingTime: function() {
      return moment(this.orderDetailDrive.takingTime).format(
        "YYYY年MM月DD日  HH:mm"
      );
    },
    arrivalTime: function() {
      return moment(this.orderDetailDrive.arrivalTime).format(
        "YYYY年MM月DD日  HH:mm"
      );
    },
    drivingTime: function() {
      return moment(this.orderDetailDrive.drivingTime).format(
        "YYYY年MM月DD日  HH:mm"
      );
    },
    cancelTime: function() {
      var datadms = this.data.cancelTime;
      var middata = this.orderDetailDrive.orderCancellingTime;
      var time = "";
      if (middata) {
        time = middata;
      } else if (datadms) {
        time = datadms;
      } else {
        time = middata;
      }
      return moment(time).format("YYYY年MM月DD日  HH:mm");
    },
    hasRated: function() {
      //监听是否已经评价
      return this.data.assStatus ? true : false;
    },
    remark: function() {
      //监听是否已经评价
      return this.data.remark ? true : false;
    },
    rateValue: function() {
      //监听计算评价内容
      var parmas = {
        assStatus: this.data.assStatus,
        eAssStatus: this.data.eAssStatus,
        remark: this.data.remark,
        date: moment(this.data.assStatusTime).format("YYYY年MM月DD日  HH:mm")
      };
      return parmas;
    }
    // rateValue: {
    //   rate: "10731001",
    //   text:
    //     "阿道夫拉时代峻峰拉水电费阿斯蒂芬姐啦时代峻峰拉可适当阿斯蒂芬静安寺都快疯了阿萨德发生大幅阿萨德发送到",
    //   date: "2019年3月10日 20:30"
    // }
  },
  watch: {
    popupVisible(newval, oldval) {}
    // getcode(newVal, oldVal) {
    //   if (newVal) {
    //     debugger;
    //     this.getCode();
    //   }
    // }
  },
  mounted() {
    // console.log("详情data", this.data);
    // return this.$nextTick(() => this.init());
    // this.init();
  },
  methods: {
    // init() {

    // },
    // getCode() {
    //   var parmas = {
    //     orderId: this.data.orderNo,
    //     type: 1
    //   };
    //   this.http.get("VerifyCode", parmas, res => {
    //     if (res.resultCode) {
    //       debugger;
    //     }
    //   });
    // },
    open() {
      this.popupVisible = !this.popupVisible;
    },
    submitUserRate: function(val) {
      // Indicator.open({
      //   spinnerType: "triple-bounce"
      // });
      // console.log(val);
      // this.popupVisible = false;
      // this.hasRated = true;
      // this.rateValue.rate = val.rate;
      // this.rateValue.text = val.text;
      // this.rateValue.date = moment().format("YYYY年MM月DD日 HH:mm");
      // setTimeout(function() {
      //   Indicator.close();
      // }, 1000);
    },
    phoneClick(phone) {
      if (phone) {
        console.log("打电话", phone);
        window.location.href = `tel:${phone}`;
      }
    }
    // obBtnHandleClick() {
    //   console.log("obBtnHandleClick");
    //   $.dialog({
    //     title: "提示",
    //     message: "确认提交后如需修改或取消请联系林肯中心。",
    //     buttons: [
    //       {
    //         title: "取消"
    //       },
    //       {
    //         title: "确认",
    //         isBold: true,
    //         callback: function() {
    //           console.log("点击确认");
    //         }
    //       }
    //     ],
    //     isMask: true
    //   });
    // },
    // cancelBtnHandleClick() {
    //   console.log("cancelBtnHandleClick");
    //   $.dialog({
    //     title: "提示",
    //     message:
    //       "送达地址与您的取车地址不一致，是否确认送达该目的地，确认提交后需修改或取消请联系林肯中心。",
    //     buttons: [
    //       {
    //         title: "取消"
    //       },
    //       {
    //         title: "确认",
    //         isBold: true,
    //         callback: function() {
    //           console.log("点击确认");
    //           window.location.href = "tel://17521282018";
    //         }
    //       }
    //     ],
    //     isMask: true
    //   });
    // }
  }
};
</script>

<style lang="sass" type="text/scss" rel="stylesheet/scss" scoped>
@function px($px) {
  @return ($px/20) + rem;
}
.fetch-detail-index {
  font-family: PingFangSC-Regular;
  font-weight: 400;
  padding-bottom: 40px;
  &-order-num {
    font-size: 14px;
    color: rgba(50, 50, 50, 1);
    padding: 24px 15px;
  }
  &-status {
    font-size: 16px;
    color: rgba(184, 97, 34, 1);
    background: rgba(255, 248, 243, 1);
    padding: 10px 15px;
    text-align: center;
  }
  &-user {
    border-bottom: 1px solid #e2e2e2;
    margin: 0 15px;
    height: 120px;
  }
  &-username {
    font-size: 16px;
    font-family: PingFangSC-Medium;
    line-height: 60px;
    font-weight: 500;
  }
  &-userdesc {
    font-size: 14px;

    font-weight: 400;
  }
  &-detail {
    padding: 0 15px;
    // margin-bottom: 40px;
  }
  &-help {
    padding: 20px 15px 10px 15px;
    border-bottom: 10px solid #f5f5f5;
    display: flex;
    flex-direction: column;
        text-align: center;
  }

  &-help1 {
    font-size:16px;
    padding-bottom:10px;
    img{
      float:right;
      width:18px;
      margin-right:5px;
    }
  }
  &-help2 {
       font-size:14px;
       color:#18B0FF;
       margin: 8px 0 15px;
  }
  &-help3 {
        border-top: 1px solid #E2E2E2;
       font-size:12px;
       color:#A9A9A9;
       padding-top: 10px;
  }
  &-commit {
    border-bottom: 10px solid #f5f5f5;
    padding: 0 15px;
    display: flex;
    justify-content: space-around;
    .commit{
        padding: 10px 8px 10px 35px;
    }
    .phone{
          padding: 10px 11px 10px 5px;
          img{
            float:right;
            width:18px;
            margin-left: 10px;
          }
    }
  }
   &-centerdiv {
    float: left;
    width: 20px;
    border-right: 1px solid #e2e2e2;
     margin: 5px;
  }
}
.Canscroll{
  height: 100vh;
  overflow:scroll;
}
</style>
