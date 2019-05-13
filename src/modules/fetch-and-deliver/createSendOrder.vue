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
    <en-trust title="委托他人取车" v-model="scootor" :uptrust="uptrust"></en-trust>
    <!--进度信息-->
    <div class="progress-info">
      <start-and-end-point-view :data="startAndEndPointViewData" :choose-end="true"></start-and-end-point-view>
      <take-time-picker-view
        :simple="simple"
        :defaultValue="taketime"
        @change="(value)=>{this.taketime = value;}"
        title="预约取车时间"
        subtitle="请注意预留行驶时间"
      ></take-time-picker-view>
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
import EnTrust from "./components/Entrust.vue";
import { Toast } from "mint-ui";

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
      returnAddressLng: ""
      // unedit:"",//已接单和送车中不可以修改
    };
  },
  computed: {
    startAndEndPointViewData() {
      const { data, adress } = this;
      return {
        startName: data.dealerName,
        startAddress: data.detailAddress || data.pickupAddress,
        endName: adress || "选择客户预约送达地址",
        endAddress: this.distance || "",
        // latitude: "31.306374",
        // longitude: "121.434909",
        from: "createSendOrder"
      };
    },

    submitdisabled() {
      var flag = false;
      if (!this.adress) flag = true;
      if (!this.taketime) flag = true;
      if (this.scootor) {
        if (!this.uptrust.lastName) flag = true;
        // if (!this.uptrust.firstName) flag = true;
        if (!this.uptrust.phone || !/^1[0-9]{10}$/.test(this.uptrust.phone))
          flag = true;
      }

      return flag;
    },
    edit() {
      var edit = true;
      if (
        this.data.orderStatus == "90041002" ||
        this.data.orderStatus == "90041003"
      ) {
        edit = false;
      }
      return edit;
    }
  },

  watch: {
    startAndEndPointViewData: {
      deep: true,
      handler(newVal, oldVal) {
        if (newVal.startAddress && newVal.endName) {
          util
            .computedDrivingDistance(newVal.startAddress, newVal.endName)
            .then(distance => {
              this.distance = `预估距离：${distance} Km`;
            })
            .catch(err => {
              console.log(err);
            });
        }
      }
    },
    adress(newVal, oldVal) {
      util.getLinLat(newVal).then(res => {
        const [p1, p2] = res;
        (this.returnAddressLat = p2), //返回地址的经纬度
          (this.returnAddressLng = p1);
      });
    }
  },

  methods: {
    // 初始化
    init() {
      // 已经创建完订单，从订单详情修改订单或者取消订单进入通过route传递订单id，或者点击修改订单号，从服务工程师列表进入
      if (this.$route.query.way == "detail" && this.$route.query.id) {
        this.http.get(
          "fetchAndDeliverDetail",
          { id: this.$route.query.id },
          res => {
            if (res.resultCode) {
              // 数据回显
              this.data = res.data.data;
              this.taketime = this.data.bookingTime;
              this.adress = this.data.returnAddress;
              //  委托人信息回显
              var parmas = {
                firstName: this.data.pickerFirstName,
                lastName: this.data.pickerLastName,
                phone: this.data.pickerPhone,
                sex: this.data.pickerSex
              };
              this.uptrust = parmas;
              this.scootor = this.data.pickerLastName ? true : false;
            }
          }
        );
      } else {
        // 从服务工程师页面第一次进入创建工单
        var param = {
          roNo: this.$route.query.roNo,
          dealerCode: this.$route.query.dealerCode
        };
        this.http.get("workOrderDetail", param, res => {
          if (res.resultCode) {
            this.data = res.data;
          }
        });
      }
    },
    // 修改订单
    Edit() {
      this.$router.push({
        path: "workOrder",
        query: { id: this.$route.query.id }
      });
    },
    commitHandleClick() {
      $.dialog({
        title: "信息确认",
        type: "wx-alert",
        // message:'你好 林肯',
        html: `
            <style>
              .server-confirm-panel {padding-top: 25px;border-top: 1px solid #E2E2E2;}
              .server-confirm-panel > div {display: flex;line-height: 28px;font-size: 15px;}
              .server-confirm-panel > div > div:nth-of-type(1) {text-align: left;width: 75px;flex: 0 0 auto;color: #808080;}
              .server-confirm-panel > div > div:nth-of-type(2) {text-align: left;color: #141414;}
            </style>
            <div class="server-confirm-panel">
              <div>
                <div>送车时间：</div>
                <div>${moment(this.taketime).format(
                  "YYYY年MM月DD日 HH:mm"
                )}</div>
              </div>
              <div>
                <div>送车地点：</div>
                <div>${this.startAndEndPointViewData.endName}</div>
              </div>
            </div>
          `,
        buttons: [
          {
            title: "确认提交",
            isBold: true,
            callback: () => {
              // console.log("点击确认", $("#testtest").val());
              this.submit();
            }
          }
        ],
        isMask: true
        // maskOnClick:()=>{console.log('点击遮罩')}
      });
    },
    submit() {
      if (moment(this.taketime) < moment().add(2, "hours")) {
        Toast("时间不对，重新选择时间");
        return;
      }
      Indicator.open({
        spinnerType: "triple-bounce"
      });
      var parmas = {
        id: this.$route.query.id ? this.$route.query.id : null,
        assStatus: "",
        bookingTime: moment(this.taketime).utc(),
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
        isAssess: "12781002",
        lastName: this.data.userName,
        orderNo: "",
        orderStatus: "90041001",
        phone: this.data.phone,
        pickupAddress: this.$route.query.id
          ? this.data.pickupAddress
          : this.data.detailAddress, //经销商地址
        pickupAddressLat: this.$route.query.id
          ? this.data.pickupAddressLat
          : this.data.latitude,
        pickupAddressLng: this.$route.query.id
          ? this.data.pickupAddressLng
          : this.data.longitude,
        remark: "",
        returnAddress: this.adress,
        returnAddressLat: this.returnAddressLat,
        returnAddressLng: this.returnAddressLng,
        roNo: this.data.roNo,
        serverStatus: "",
        sex: 1,
        updateBy: "",
        updateDate: "",
        pickerFirstName: this.scootor ? this.uptrust.firstName : "",
        pickerLastName: this.scootor ? this.uptrust.lastName : "",
        pickerSex: this.scootor ? this.uptrust.sex : "",
        pickerPhone: this.scootor ? this.uptrust.phone : "",
        serviceHotline: this.data.serviceHotline
      };

      if (this.$route.query.id) {
        //更新
        this.http.post("updateOrder", parmas, res => {
          if (res.resultCode) {
            console.log("订单号", res.data);
            Indicator.close();

            //服务工程师详情,服务总监详情
            this.$router.push({
              name: "orderDetail",
              query: { orderId: res.data, position: "engineer" }
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
              query: { orderId: res.data.id, position: "engineer" }
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
        this.adress = address;
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
      sessionStorage.removeItem("createorder");
    }
  },

  created() {
    this.chooseAddressCallback();
    if (sessionStorage.getItem("createorder")) {
      this.getCache();
    }
    // 获取 // 监听委托人组件值变化并缓存
    this.$Bus.$on("uptrust", data => {
      console.log("uptrust", data);
      this.uptrust = data;
    });
  },
  beforeMount() {
    $(document).attr("title", "送车服务订单");
  },
  mounted() {
    window.app = this;
    this.$nextTick(() => {
      this.init();
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
    }

    .btn-wrap {
      padding: px(20) px(23);
      background-color: #F5F5F5;
    }

  }
</style>
