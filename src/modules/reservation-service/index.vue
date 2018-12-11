<template>
  <div class="index">
    <!--车辆信息-->
    <div class="vehicle-info-wrap">
      <div class="vehicle-info">
        <div class="title">
          尊敬的{{ userInfo.lastName + (userInfo.sex ?'女士': '先生') }}，{{ filteTimePeriod() }}！
        </div>
        <mt-swipe :auto="0">
          <mt-swipe-item v-for="(vechinfo,i) in vechinfos" :key="i">
            <vehicle-info-card :vechinfo="vechinfo"></vehicle-info-card>
          </mt-swipe-item>
        </mt-swipe>
      </div>
    </div>
    <div class="add-vehicle-btn"
         @click="addVehicleBtnHandleClick"
    >
      + 添加车辆
    </div>
    <!--预约信息-->
    <div class="reservation-info-wrap">
      <service-type @vehicleServicesChange="vehicleServicesChange"></service-type>
      <div class="dealers-info-wrap">
        <dealer-info-panel
          @click.native="goAgentlistPage"
          :dealerInfo="dealersInfoCommonly"
        ></dealer-info-panel>
        <div class="wx-form">
          <time-picker></time-picker>
        </div>
        <div class="dbc">
          <div class="cell">
            <div>是否申请代步车</div>
            <div>
              <mt-switch v-model="switchvalue"></mt-switch>
            </div>
          </div>
          <div class="tips">
            提示：代步车实际提供情况，以经销商线下反馈为准
          </div>
        </div>
      </div>
      <div class="wx-form">
        <wx-input label="联系电话" v-model="appointmentPhone" :required="true"></wx-input>
        <wx-verification-code-input
          v-if="appointmentPhone != userInfo.phone"
          v-model="dxyzm"
          :phone="appointmentPhone"
          label="短信验证"
          @verificationCodeChange="verificationCodeChange"
        ></wx-verification-code-input>
        <wx-input placeholder="备注信息"></wx-input>
      </div>
      <div class="btn-wrap">
        <wx-button>服务预约</wx-button>
      </div>
      <div class="btn-wrap">
        <wx-button @click.native="testHandleClick">测试</wx-button>
      </div>
    </div>
  </div>
</template>

<script>
  import {MessageBox, Swipe, SwipeItem, Switch} from 'mint-ui'
  import WxInput from './../../components/WxInput'
  import WxButton from './../../components/WxButton'
  import WxVerificationCodeInput from '../../components/WxVerificationCodeInput'
  import VehicleInfoCard from './components/VehicleInfoCard'
  import ServiceType from './components/ServiceType'
  import DealerInfoPanel from './components/DealersInfoPanel'
  import TimePicker from './components/TimePicker'


  export default {
    name: 'index',
    created() {
      end_time = new Date().getTime()
      console.log('index加载时间：', end_time - start_time, 'ms')
    },
    beforeDestroy() {
      clearInterval(this.timer)
    },
    data() {
      return {
        license: '',
        testArr: [1],
        switchvalue: false,
        dxyzm: '',
        /* 用户信息 */
        userInfo: {},
        /* 用户车辆信息 */
        vechinfos: [],
        /* 常用经销商信息 {}*/
        dealersInfoCommonly: {
          address: '',
          dealerCode: '',
          dealerName: '',
          serviceHotline: ''
        },
        /** S */
        appointmentNo: "string",
        appointmentPhone: "string",   //手机号
        appointmentSource: "string",
        appointmentTime: "2018-12-07T02:20:11.023Z",  //预约时间
        assStatus: "string",
        cancleTime: "2018-12-07T02:20:11.023Z",  //取消时间
        carModelCode: "string",  //车型代码'
        carModelName: "string",  //车型名称
        createBy: 0,
        createDate: "2018-12-07T02:20:11.024Z",
        currMileage: 0,  //当前里程数
        dealerCode: "string",  //经销商代码
        dealerName: "string",  //经销商名称
        enterFactoryMileage: 0,   //进厂里程数
        expDeliverTime: "2018-12-07T02:20:11.024Z",
        firstName: "string",  //名
        id: 0,
        interchangeTime: "2018-12-07T02:20:11.024Z",
        lastName: "string",  //姓
        outFactoryMileage: 0,  //出厂里程数
        plateNumber: "string",  //车牌号
        qualityTime: "2018-12-07T02:20:11.024Z",
        remark: "string",  //备注
        repairWaitTime: "2018-12-07T02:20:11.024Z",
        repairingTime: "2018-12-07T02:20:11.024Z",
        roNo: "string",
        scootor: "string",
        serviceEnginnerCode: "string",
        serviceEnginnerName: "string",
        serviceFinshTime: "2018-12-07T02:20:11.024Z",
        serviceType: "string",    //服务类型（1维修服务、2保养服务、3检查服务、4其他服务）
        sex: 0,  //'性别（0:男；1：女）
        status: "string",
        updateBy: 0,
        updateDate: "2018-12-07T02:20:11.024Z",
        userId: 0,
        vin: "string",  //vin
        washTime: "2018-12-07T02:20:11.024Z"
        /** E */
      }
    },
    directives: {},
    watch: {},
    methods: {},
    beforeMount() {
      $(document).attr('title', '试乘试驾车列表')
    },
    components: {
      WxButton,
      WxInput,
      WxVerificationCodeInput,
      MessageBox,
      Swipe,
      SwipeItem,
      MtSwitch: Switch,
      ServiceType,
      DealerInfoPanel,
      TimePicker,
      VehicleInfoCard
    },
    mounted() {
      //查询用户绑车信息
      this.getBaseInfo()
      //查询 是否存在 常用经销商
      this.queryAftersaleDealer()
    },
    methods: {
      //测试方法
      testHandleClick() {
        this.queryAftersaleDealer()
      },
      initData(data) {
        //用户信息
        const userInfo = data.userInfo
        this.userInfo = userInfo
        //车辆信息
        const vechinfos = data.vechinfos
        this.vechinfos = data.vechinfos.concat([])
        //姓
        this.lastName = userInfo.lastName
        //预约手机号
        this.appointmentPhone = userInfo.phone

      },
      filteTimePeriod() {
        let nowtime = new Date()
        let hour = nowtime.getHours()
        let str = ''
        if (hour >= 5 && hour < 11) {
          str = '早上好'
        } else if (hour >= 11 && hour < 13) {
          str = '中午好'
        } else if (hour >= 13 && hour < 19) {
          str = '下午好'
        } else {
          str = '晚上好'
        }
        return str
      },
      verificationCodeChange(value) {
        console.log('收到短信验证码,', value)
      },
      //进入选择经销商页面
      goAgentlistPage() {
        console.log('进入选择经销商页面')
        return;
        window.location.href = 'http://localhost:3000/wchat/agentlist'
      },
      //添加车辆按钮点击
      addVehicleBtnHandleClick() {
        let self = this
        $.dialog({
          title: '请输入VIN码添加车辆',
          html: `<input id="vin-input" type="email" maxlength="17"/>`,
          buttons: [
            {
              title: '取消'
            },
            {
              title: '确定',
              isBold: true,
              callback() {
                let vin = $('#vin-input').val()
                if (vin.length !== 17) {
                  $.alert('该VIN码位数输入有误，请重新输入')
                  return
                } else {
                  self.saveTieCar(vin)
                }
              }
            }
          ]
        })
      },
      //车辆服务类型改变
      vehicleServicesChange(value) {
        this.queryAftersaleDealer(value)
      },
      //查询用户车辆
      getBaseInfo() {
        this.http.get('getBaseInfo', res => {
          console.log('查询用户绑车信息 getBaseInfo', res)
          if (res.resultCode == 1) {
            const data = res.data
            if (data.code == 3) {
              this.initData(data)
            } else {
              console.log('getBaseInfo error')
            }
          } else {
            console.log('getBaseInfo error')
          }
        })
      },
      //添加车辆
      saveTieCar(vin) {
        this.http.post('saveTieCar', {vin}, res => {
          console.log('添加用户车辆信息 saveTieCar', res)
          if (res.resultCode == 1) {
            const data = res.data
            if (data == 'ok') {
              alert('添加车辆信息成功')
              this.getBaseInfo()
            } else {
              console.log('saveTieCar error')
            }
          } else {
            console.log('saveTieCar error')
          }
        })
      },
      //更新车牌
      testgxcp() {

      },
      //查询常用经销商 根据服务类型
      queryAftersaleDealer(vehicleServices) {
        this.http.get('queryAftersaleDealer', {vehicleServices}, res => {
          console.log('查询常用经销商 queryAftersaleDealer', res)
          if (res.resultCode == 1) {
            const data = res.data
            if (data) {
              const {dealerCode, dealerName, serviceHotline} = data
              console.log(dealerCode, dealerName, serviceHotline)
              if (vehicleServices) {
                //选择服务类型查出来的
              } else {
                //刚进页面查出来的 这个是常用经销商
                this.dealersInfoCommonly = data
              }

            } else {
              console.log('queryAftersaleDealer error')
            }
          } else {
            console.log('queryAftersaleDealer error')
          }
        })
      }
    }
  }
</script>

<style lang="sass" type="text/scss" rel="stylesheet/scss" scoped>
  @function px($px) {
    @return ($px/20)+rem;
  }

  .mint-swipe {
    height: px(368);
  }

  .index {
    .vehicle-info-wrap {
      position: relative;

      .vehicle-info {
        position: relative;
        /*height: px(190);*/
        color: #323232;
        background-color: #EBEBEB;
        padding: 0 px(20);

        .title {
          font-weight: 500;
          font-size: px(14);
          height: px(50);
          line-height: px(50);
        }
      }
    }

    .add-vehicle-btn {
      line-height: px(55);
      font-size: px(16);
      text-align: center;
      border-bottom: px(10) solid #F5F5F5;
    }

    .reservation-info-wrap {
      position: relative;
      padding: px(20);

      .dealers-info-wrap {
        .wx-form {
          padding: 0;
        }

        .dbc {
          .cell {
            display: flex;
            line-height: px(60);
            justify-content: space-between;
            align-items: center;
          }

          .tips {
            font-size: px(12);
            color: #BBBBBB;
          }
        }
      }

      .wx-form {
        padding: px(10) 0;
      }

      .btn-wrap {
        padding: px(10) 0;
      }
    }
  }
</style>
