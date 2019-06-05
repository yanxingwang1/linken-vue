<template>
  <div>
    <div v-if="isDrawer" id="amap-container"></div>
    <drawer-view
      :is-drawer="isDrawer"
      :titleText="titleText"
      :bodyInitHeight="bodyInitHeight"
      @drawerEnd="drawerEnd"
      @drawerStart="drawerStart"
    >
      <div class="send-vehicle-notice">
        <div class="daiqueren Canscroll" v-if="data.orderStatus==90041001">
          <!-- 头部提示信息 -->
          <div class="index-1">
            <div class="user-name">尊敬的{{data.lastName}}{{data.sex=='1'?'女士':'先生'}}</div>
            <div
              class="information"
            >您的爱车{{data.carNo}}已完成{{serverStatus[serverCode]}}服务，{{data.updateBy?'原有的送车上门服务信息已更新，请重新确认。':'请确认送车上门服务信息。'}}</div>
          </div>
          <!-- 车辆信息 -->
          <div class="index-2">
            <vehicle-info-panel :data="data"></vehicle-info-panel>
          </div>
          <!-- 进度信息 -->
          <div class="index-3">
            <start-and-end-point-view :data="startAndEndPointViewData" :choose-end="false"></start-and-end-point-view>
            <!-- 预约送出时间 车主信息 接车人信息-->
            <user-card :data="data"></user-card>
            <!-- 用户信息 -->
            <wx-check-box v-model="ageen">
              <span style="font-size: 0.6rem;" class="ageen">我同意</span>
              <take-and-send-agreement></take-and-send-agreement>
            </wx-check-box>
          </div>

          <!-- 用户确认 -->
          <div class="index-4">
            <wx-button :disabled="submitdisabled" @click.native="obBtnHandleClick">确认订单</wx-button>
            <div style="height: 1rem;"></div>
            <div class="index-4-inner">
              <wx-button @click.native="cancelBtnHandleClick">信息有误，联系林肯中心</wx-button>
            </div>
          </div>
        </div>
        <!-- 待确认 -->
        <!-- 查看订单详情 -->

        <send-vehicle v-else :data="data" :code="code" :orderDetailDrive="orderDetailDrive"></send-vehicle>
      </div>
    </drawer-view>
  </div>
</template>

<script>
import util from "../../common/DMC.util";
import WxButton from "./../../components/WxButton";
import VehicleInfoPanel from "./components/VehicleInfoPanel";
import StartAndEndPointView from "./../reservation-service/components/StartAndEndPointView";
import TakeTimePickerView from "./../reservation-service/components/DateTimePickerComp/TakeTimePickerView";
import WxCheckBox from "./../reservation-service/components/WxCheckBox";
import TakeAndSendAgreement from "./../reservation-service/components/TakeAndSendAgreement";
import SendVehicle from "./SendVehicle";
import UserCard from "./components/UserCard";
import { Toast } from "mint-ui";
import { setTimeout } from "timers";
import DrawerView from "./../map-select-address/components/DrawerView";
import { debuglog } from "util";

const drivingLine = require("./../map-select-address/script/drivingLine");
const testArr = [
  [121.423393, 31.211748],
  [121.425972, 31.210045],
  [121.428909, 31.210487],
  [121.430916, 31.212656],
  [121.434464, 31.214918],
  [121.438469, 31.217804],
  [121.442772, 31.219658],
  [121.447235, 31.221125],
  [121.45369, 31.223351],
  [121.461395, 31.223871],
  [121.466743, 31.223734],
  [121.474792, 31.226597],
  [121.480835, 31.2299],
  [121.483376, 31.230824],
  [121.487389, 31.230728],
  [121.493073, 31.233278],
  [121.500496, 31.238016],
  [121.504807, 31.236597],
  [121.50927, 31.236986],
  [121.511292, 31.235538]
];

export default {
  name: "index",
  components: {
    WxButton,
    VehicleInfoPanel,
    StartAndEndPointView,
    TakeTimePickerView,
    WxCheckBox,
    TakeAndSendAgreement,
    SendVehicle,
    UserCard,
    DrawerView
  },
  created() {
    end_time = new Date().getTime();
    console.log("index加载时间：", end_time - start_time, "ms");
    // 接收评价组件的值
    this.$Bus.$on("userRate", data => {
      console.log("userRate", data);
      this.userRate = data;
      this.Commit();
    });
  },
  beforeDestroy() {},
  data() {
    return {
      taketime: "",
      data: {},
      orderDetailDrive: {},
      simple: true, //复杂展示,
      adress: "",
      ageen: true,
      distance: "",
      getcode: "", //取车验证码，
      code: "",
      userRate: {}, //评价内容
      //
      isDrawer: false, //是否显示抽屉
      startPos: null, //起点
      endPos: null, //终点
      currentPos: null, //途径点
      drivingPos: null, //司机坐标,
      // titleText:"",文字标题
      // bodyInitHeight: 114,
      // onBounce: false //司机进程默认隐藏
      //
      serverStatus: {
        S001: "维修",
        S002: "保养",
        S003: "检查",
        S004: ""
      },
      serverCode: "S001"
      // startAndEndPointViewData: {}
    };
  },
  computed: {
    submitdisabled() {
      var flag = false;
      if (!this.ageen) flag = true;
      return flag;
    },

    startAndEndPointViewData() {
      const { data, adress } = this;
      return {
        startName: data.dealerName,
        startAddress: data.pickupAddress,
        endName: `${data.returnAddress + data.houseNumber}`,
        endAddress: "",
        showHouseNumber: false,
        houseNumber: "",
        // latitude: "31.306374",
        // longitude: "121.434909",
        from: "createSendOrder"
      };
    },
    titleText() {
      var titleText = "";
      if (this.data.orderStatus == 90041004) {
        titleText = "送车订单开启";
      } else if (this.data.orderStatus == 90041005) {
        titleText = "送车中";
      } else if (this.data.orderStatus == 90041006) {
        titleText = "已送达";
      }
      return titleText;
    },
    bodyInitHeight() {
      var Height;
      if (this.data.orderStatus == 90041004) {
        Height = 90;
      } else if (this.data.orderStatus == 90041005) {
        Height = 90;
      } else if (this.data.orderStatus == 90041006) {
        Height = 140;
      }
      return Height;
    }
    // 控制是否显示地图
    // isDrawer(){
    //   var isDrawer=false;
    //   if (
    //         this.data.orderStatus == 90041004 ||
    //         this.data.orderStatus == 90041005 ||
    //         this.data.orderStatus == 90041006
    //       ) {
    //         debugger
    //         isDrawer = true;
    //       }
    //       return isDrawer;
    // }
  },
  watch: {
    getcode(newVal, oldVal) {
      if (newVal) {
        this.getCode();
      }
    }
    // startAndEndPointViewData: {
    //   deep: true,
    //   handler(newVal, oldVal) {
    //     if (newVal.startAddress) {
    //       util
    //         .computedDrivingDistance(newVal.startAddress, newVal.endName)
    //         .then(distance => {
    //           this.distance = `距离：${distance} 千米`;
    //         });
    //     }
    //   }
    // }
  },
  beforeMount() {
    $(document).attr("title", "我的预约");
  },
  mounted() {
      window.app = this;
    this.$nextTick(() => {
      this.init();
      console.log(this.distanse);
    });
  },
  methods: {
    initData() {
      this.startPos = [121.423596, 31.211773];
      this.endPos = [121.510652, 31.235425];
      this.drivingPos = [121.423596, 31.211773];
      this.currentPos = [];
    },
    //初始化地图
    initAmap() {
      drivingLine.initMap(() => {
        //模拟更新数据
        const timer = setInterval(() => {
          this.testDriverTrace()
        }, 60000)
        setTimeout(() => {
          this.testDriverTrace()
        }, 500)
      });
    },
    //完成地图轨迹
    testDriverTrace() {
      this.http.get('getDriverTrace', {
        orderId: this.orderDetailDrive.orderId  // 32646
      }, res => {
        console.log('轨迹', res.data)
        const data = res.data
        const startPos = [data.startPos.lng, data.startPos.lat]
        const endPos = [data.endPos.lng, data.endPos.lat]
        let drivingPos
        if (data.currentPos) {
          drivingPos = [data.currentPos.lng, data.currentPos.lat]
        }
        let currentPos = []
        if (data.drivingPos){
          currentPos = data.drivingPos.map(item => {
            const {lng, lat} = item
            return [lng, lat]
          })
        }
        drivingLine.createLine(startPos, endPos, [...currentPos], drivingPos)
      })
    },
    drawerStart(data) {
      //监听开始拖动
      // 通知司机组件隐藏进度
      this.$Bus.$emit("onBounce", { state: data });
    },
    drawerEnd(data) {
      //监听拖动结束
      this.$Bus.$emit("onBounce", { state: data });
    },
    phoneClick(phone) {
      // if (phone) {

      console.log("打电话", phone);
      window.location.href = "tel:10086";
      // }
    },
    async init() {
      // 获取验证码

      var parmas = {
        id: this.$route.query.id
      };
      var _this = this;
      this.http.get("OrderDetails", parmas, res => {
        if (res.resultCode) {
          // 待确认
          this.data = res.data.data;
          // 订单详情
          if (res.data.data2) {
            this.orderDetailDrive = res.data.data2;
            // console.log(JSON.parse(res.data.data2))
          }
          this.serverCode = res.data.data3;
          // debugger
          // 是否允许获取验证码
          if (
            this.data.orderStatus == 90041003 ||
            this.data.orderStatus == 90041004 ||
            this.data.orderStatus == 90041005 ||
            this.data.orderStatus == 90041006
          ) {
            this.getcode = true;
          }
          // 是否允许显示地图
          if (
            this.data.orderStatus == 90041004 ||
            this.data.orderStatus == 90041005 ||
            this.data.orderStatus == 90041006
          ) {
            _this.isDrawer = true;
            _this.$nextTick(() => {
              this.initAmap();
            });
          }

          // this.taketime = this.data.bookingTime;
        }
      });
    },
    //获取取车验证码
    getCode() {
      var parmas = {
        orderId: this.data.orderNo,
        type: 1
      };
      this.http.get("VerifyCode", parmas, res => {
        if (res.resultCode) {
          this.code = res.data;
        }
      });
    },
    //提交评论接口
    Commit() {
      if (
        (this.userRate.assStatus == "90061001" ||
          this.userRate.assStatus == "90061002") &&
        (this.userRate.eAssStatus == "90061001" ||
          this.userRate.eAssStatus == "90061002")
      ) {
        this.userRate.remark = "";
      }

      var parmas = {
        ...this.userRate,
        id: this.$route.query.id
      };

      this.http.get("assess", parmas, res => {
        if (res.resultCode) {
          //  this.popupVisible=false;
          this.$Bus.$emit("popupVisible", { state: false });
          Toast("评价成功");
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        }
      });
    },
    obBtnHandleClick() {
      console.log("obBtnHandleClick");
      // 地址一致
      $.dialog({
        title: "提示",
        message: "确认提交后如需修改或取消请联系林肯中心。",
        buttons: [
          {
            title: "返回"
          },
          {
            title: "确认",
            isBold: true,
            callback: () => {
              this.submit();
            }
          }
        ],
        isMask: true
      });
      // 地址不一致
      // $.dialog({
      //   title: "提示",
      //   message:
      //     "送达地址与取车地址不一致，确认提交后需修改或取消请联系林肯中心。",
      //   buttons: [
      //     {
      //       title: "返回"
      //     },
      //     {
      //       title: "确认",
      //       isBold: true,
      //       callback: () => {
      //         console.log("点击确认");
      //         window.location.href = `tel://${this.data.serviceHotline}`;
      //       }
      //     }
      //   ],
      //   isMask: true
      // });
    },
    submit() {
      var parmas = {
        ...this.data,
        bookingTime: moment(this.data.bookingTime).utc(),
        id: this.$route.query.id
      };
      this.http.post("order", parmas, res => {
        if (res.resultCode) {
          if (Boolean(parseInt(res.data))) {
            console.log("下单成功,单号", res.data);
            window.location.reload();
            // history.go(0);
          } else {
            Toast(res.data);
          }
        }
      });
    },
    cancelBtnHandleClick() {
      console.log("cancelBtnHandleClick");
      if (this.data.engineerPhone) {
        console.log("打电话", this.data.engineerPhone);
        window.location.href = `tel:${this.data.engineerPhone}`;
      }
    }
  }
};
</script>

<style lang="sass" scoped type="text/scss">
  @function px($px) {
    @return ($px/20)+rem;

  }

  #amap-container {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }

  .index-1 {
    padding: px(20);
    border-bottom: solid px(10) #F5F5F5;

    .user-name {
      font-size: px(16);
      font-weight: 500;
      /*height: px(30);*/
      line-height: px(40);
      font-weight: 600;

    }

    .information {
      font-size: px(15);
      line-height: px(30);

    }

  }

  .index-2 {
  }

  .userinfo {

    .usericon {
      width: 1.75rem;
      display: inline-block;
      text-align: center;

    }

  }

  .userinfo img {
    width: 1rem;

  }

  .index-3 {
    padding: px(20) px(10);

  }

  .index-4 {
    padding: px(20);
    background-color: #F5F5F5;
    .index-4-inner {
      .mint-button{
        background-color: #F5F5F5;
        color: #b45f1a;
        border: 1px solid #b45f1a;
      }
    }
  }
  .Canscroll{
  height: 100vh;
  overflow:scroll;
}
</style>
