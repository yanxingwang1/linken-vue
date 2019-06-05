<template>
  <div class="index" v-show="pageShow" style="background-color: #FFFFFF;">
    <!--车辆信息-->
    <div class="vehicle-info-wrap">
      <div class="vehicle-info">
        <welcome-panel :last-name="lastName" :sex="sex"></welcome-panel>
        <vehicles-swipe
          ref="mySwiper"
          @slideChange="swipeHandelChange"
          @inputPlateBlur="updateTieCarAction"
          :vechinfos="vechinfos"
        ></vehicles-swipe>
      </div>
    </div>
    <div
      v-show="!(fromPage==='mydetail')"
      class="add-vehicle-btn"
      @click="addVehicleBtnHandleClick">
      + 添加新车辆
    </div>
    <!--预约信息-->
    <div class="reservation-info-wrap">
      <service-type v-model="serviceType"></service-type>
      <dealer-info-panel
        @click.native="goAgentlistPage"
        :dealerInfo="dealersInfo">
      </dealer-info-panel>
      <div class="wx-form booking-time-wrap">
        <booking-time-picker-view
          :dealerCode="dealersInfo.dealerCode"
          v-model="testTime"
          :disabled="!dealersInfo.dealerCode">
        </booking-time-picker-view>
      </div>
      <!--代步车-->
      <switch-cell
        title="是否申请代步车"
        tips="提示：代步车实际提供情况，以经销商线下反馈为准。"
        :label="false"
        v-show="serviceType==1"
        v-model="scootor">
      </switch-cell>
      <!--取车-->
      <take-and-send-switch
        v-if="0"
        v-model="isTake"
        :data="takeVehicleData"
        :switch-disabled="isTakeDisabled"
        :switch-show="true"
        :switch-on-click="takeAndSendSwitchOnClick"
      >
      </take-and-send-switch>
      <!--送车-->
      <switch-cell
        title="送车上门"
        :label="true"
        v-model="isPud"
        :disabled="isTakeDisabled"
        v-if="1"
        :on-click="pudSwitchHandleClick"
      >
      </switch-cell>
      <div class="wx-form wx-form2">
        <wx-input label="联系电话" type="tel" v-model="appointmentPhone" :maxlength="11" :required="true"
                  port="c"></wx-input>
        <wx-verification-code-input
          v-if="appointmentPhone != userPhone"
          v-model="verificationCode"
          :phone="appointmentPhone"
          label="短信验证"
          port="c">
        </wx-verification-code-input>
        <wx-input type="textarea" v-model="remark" :maxlength="50" placeholder="备注信息" port="c"></wx-input>
      </div>
      <div class="btn-wrap">
        <wx-button :disabled="submitdisabled" @click.native="baocunyuyuedan">提交</wx-button>
      </div>
    </div>
  </div>
</template>

<script>
  import util from '../../common/DMC.util'
  import {Switch, Indicator} from 'mint-ui'
  import WelcomePanel from './components/WelcomePanel'
  import WxInput from './../../components/WxInput'
  import WxButton from './../../components/WxButton'
  import WxVerificationCodeInput from '../../components/WxVerificationCodeInput'
  import VehicleInfoCard from './components/VehicleInfoCard'
  import ServiceType from './components/ServiceType'
  import DealerInfoPanel from './components/DealersInfoPanel'
  import BookingTimePickerView from './components/DateTimePickerComp/BookingTimePickerView'
  import Dict from './script/dict'
  import VehiclesSwipe from './components/VehiclesSwipe'
  import SwitchCell from './components/SwitchCell'
  import TakeAndSendSwitch from './components/TakeAndSendSwitch'

  const ServerConfirmPanel = require('./script/ServerConfirmPanel')

  export default {
    name: 'index',
    components: {
      WelcomePanel,
      WxButton,
      WxInput,
      WxVerificationCodeInput,
      MtSwitch: Switch,
      ServiceType,
      DealerInfoPanel,
      BookingTimePickerView,
      VehicleInfoCard,
      Indicator,
      VehiclesSwipe,
      SwitchCell,
      TakeAndSendSwitch
    },
    created() {
      console.log('index加载时间：', new Date().getTime() - start_time, 'ms')
    },
    data() {
      return {
        pageShow: false,
        fromPage: '',
        swipeIndex: 0,
        testTime: '',
        /* 用户车辆信息 */
        vechinfos: [],
        /* 经销商信息 {}*/
        dealersInfo: {
          address: '',
          dealerCode: '',
          dealerName: '',
          serviceHotline: '',
          bookingTypeCode: ''
        },
        //用户手机
        userPhone: '',
        /**保存参数 S */
        //预约单id  膝盖预约单时用
        serviceId: '',
        //用户信息
        firstName: '',  //名
        lastName: '',  //姓
        sex: '',  //'性别（0:男；1：女）
        //预约信息
        serviceType: '',    //服务类型（1维修服务、2保养服务、3检查服务、4其他服务）
        verificationCode: '',//短信验证码
        appointmentDate: '',//预约时间 时间戳
        appointmentTime: '',  //预约时间  字典
        scootor: false,//是否代步车
        isTake: false,//取车服务 预留字段
        isPud: false,//送车服务 预留字段
        isTakeAndPubSwitch: true, //经销商是否支持取送车
        takeVehicleData: {
          taketime: '',
          isAgree: false,
          startName: '我的位置',//
          startAddress: '我的位置',
          startAddressLat: '',
          startAddressLng: '',
          showStartHouseNumber: false,
          startHouseNumber: '',//门牌号
          endName: '经销商地址',
          endAddress: '',
          latitude: "",
          longitude: "",
          from: 'reservationService',
        },
        appointmentPhone: '',   //验证码手机号
        dealerCode: '',  //经销商代码
        dealerName: '',  //经销商名称
        remark: '',  //备注
        /**保存参数 E */
        addVin: '',//新绑车的VIN 绑车成功后显示
        //
      }
    },
    computed: {
      vin() {
        return this.vechinfos.length ? this.vechinfos[this.swipeIndex].vin : ''
      },
      plateNumber() {
        return this.vechinfos.length ? this.vechinfos[this.swipeIndex].plateNumber : ''
      },
      currMileage() {
        return this.vechinfos.length ? this.vechinfos[this.swipeIndex].currentMaintenanceMileage : ''
      },
      carModelName() {
        return this.vechinfos.length ? this.vechinfos[this.swipeIndex].modelName : ''
      },
      carModelCode() {
        return this.vechinfos.length ? this.vechinfos[this.swipeIndex].modelCode : ''
      },
      //开启上门取车服务 的开关
      isTakeDisabled() {
        return this.testTime ? false : true
      },
      submitdisabled() {
        //车牌 里程数 维修类型 经销商信息 预约时间 电话
        var flag = false
        if (!(this.plateNumber && this.plateNumber.length >= 7)) flag = true
        if (!Number(this.currMileage)) flag = true
        if (!this.dealersInfo.dealerCode) flag = true
        if (!this.testTime) flag = true
        if (!this.appointmentPhone) flag = true
        if (this.isTake) {
          if (!this.takeVehicleData.taketime) return true
          if (!this.takeVehicleData.isAgree) return true
        }
        return flag
      },
    },
    watch: {
      //车辆服务类型改变
      serviceType(value) {
        this.serviceType = value
        //选择服务类型
        if (value) {
          //判断 是否已经选择经销商
          if (this.$route.query.from) {
            //用户已选择经销商
            //判断 当前选择的经销商 是否有该服务 若有不操作，若没有经销商信息清除
            const bookingTypeCode = this.dealersInfo.bookingTypeCode
            if (!(bookingTypeCode && bookingTypeCode.indexOf(value) !== -1)) {
              this.dealersInfo = {}
              this.clearDealersInfoAfter()
            }
          } else {
            //未选择
            //查询常用经销商是否支持该服务
            this.queryAftersaleDealer(value)
          }
        } else {
          //取消服务类型 清除经销商
          this.dealersInfo = {}
          //清除 经销商 以下选择的数据  预约时间 代步车  取车
          this.clearDealersInfoAfter()
        }
      },
      dealersInfo: {
        deep: true,
        handler(newVal, oldVal) {
          if (newVal.dealerName !== oldVal.dealerName) {
            this.takeVehicleData.endName = newVal.dealerName
            if (newVal.address && this.takeVehicleData.startAddress) {
              // util.computedDrivingDistance(this.dealersInfo.address, this.takeVehicleData.startAddress).then(res => {
              //   this.takeVehicleData.endAddress = `预估距离：${res} 千米`
              // })
            }

          }
          //经销商代码变化(只能是从新选择经销商才发生变化) 判断取送车开关显示与否
          if (newVal.dealerCode && newVal.dealerCode !== oldVal.dealerCode) {
            this.httpQueryDealerIsTake(newVal.dealerCode).then((flag) => {
              this.isTakeAndPubSwitch = flag
            })
            if (!this.isTakeAndPubSwitch){
              this.isPud = false
            }


          }
        }
      },
      takeVehicleData: {
        deep: true,
        handler(newVal, oldVal) {
          if (newVal.startAddress && this.dealersInfo.address) {
            // util.computedDrivingDistance(this.takeVehicleData.startAddress, this.dealersInfo.address).then(res => {
            //   this.takeVehicleData.endAddress = `预估距离：${res} 千米`
            // })
          }
        }
      },
      isTake(newVal) {
        if (newVal) {
          //上门取车 开关打开时
          //客户选择服务类型为"维修""检查""其他"，打开取车服务开关，需弹窗提示：【请确保您的车辆XXX可以正常行驶 返回 确认】

        }
      }
    },
    beforeMount() {
      $(document).attr('title', '售后服务预约')
    },
    mounted() {
      window.app = this
      window.util = util
      //查询用户绑车信息
      this.getBaseInfo()
      //键盘bug
      $('.reservation-info-wrap>.wx-form .wx-input').on('blur', () => {
        $(document).scrollTop(620)
      })
    },
    methods: {
      //上门送车开关点击 拦截事件
      pudSwitchHandleClick() {
        //若 经销商 不支持 提示文案，支持 改true
        if (!this.isTakeAndPubSwitch) {
          $.toast('该经销商暂未开通送车上门服务')
        } else {
          this.isPud = !this.isPud
        }
      },
      //上门取车 开关点击 客户选择服务类型为"维修""检查""其他"，打开取车服务开关，需弹窗提示：【请确保您的车辆XXX可以正常行驶 返回 确认】
      takeAndSendSwitchOnClick() {
        const {serviceType, isTake} = this
        if (isTake) {
          this.isTake = false
          return
        }
        if (serviceType == '1' || serviceType == '3' || serviceType == '4') {
          $.dialog({
            title: '提示',
            message: `请确保您的车辆${this.plateNumber}可以驾驶`,
            buttons: [
              {title: '取消'},
              {
                title: '确认',
                isBold: true,
                callback: () => {
                  this.isTake = true
                }
              }
            ]
          })
        }
      },
      //精确定位
      aMapGeolocation() {
        AMap.plugin('AMap.Geolocation', () => {
          var geolocation = new AMap.Geolocation({
            enableHighAccuracy: true,
          })
          geolocation.getCurrentPosition((status, data) => {
            if (status === 'complete') {
              // data是具体的定位信息
              console.log('具体的定位信息', data)
              // $.toast(JSON.stringify(data))
              this.takeVehicleData.startAddress = data.formattedAddress
              this.takeVehicleData.startAddressLng = data.position.lng
              this.takeVehicleData.startAddressLat = data.position.lat
              this.takeVehicleData.showStartHouseNumber = true
            } else {
              console.log('定位出错', data)
              $.toast('无法获取当前位置')
            }
          })
        })
      },
      swipeHandelChange(index) {
        this.swipeIndex = index
      },
      initData(data) {
        if (this.$route.query.from == 'agentlist') {
          console.log('来自 经销商列表 读缓存 或者 来自选择我的位置页面')
          this.reloadCache()
          const {dealerCode, detailAddress, salesHotline, storeName, bookingTypeCode} = this.$route.query
          this.dealersInfo = {
            dealerCode, bookingTypeCode,
            address: detailAddress,
            serviceHotline: salesHotline,
            dealerName: storeName,
          }
          this.$nextTick(() => {
            $(document).scrollTop(9999)
          })//返回上次下滑高度)
        } else {
          //创建预约单
          //用户信息
          const userInfo = data.userInfo
          this.lastName = userInfo.lastName
          this.sex = userInfo.sex
          this.userPhone = userInfo.phone
          //预约手机号
          this.appointmentPhone = userInfo.phone
          //车辆信息
          data.vechinfos.forEach((item, i) => {
            item.currentMaintenanceMileage = '0'
          })
          this.vechinfos = data.vechinfos.concat([])
          // this.swipeIndex = 0
          if (this.$route.query.from == 'mydetail') {
            this.fromPage = 'mydetail'
            //查询预约单
            const id = this.$route.query.id
            this.afterSaledetail(id)
          }
          if (sessionStorage.getItem('shouhouyuyue')) {
            this.reloadCache()
          }
        }
        //是新添加的车辆
        if (this.addVin) {
          let vechinfo = this.vechinfos.find((item) => {
            return item.vin === this.addVin
          })
          const index = this.vechinfos.indexOf(vechinfo)
          this.$nextTick(() => {
            this.$refs.mySwiper.slideTo(index + 1, 0)
          })
          this.addVin = ''
        }
        this.selectAddressPageCallback()
      },
      //本地化存储信息
      saveCache() {
        const data = {
          fromPage: this.fromPage,
          swipeIndex: this.swipeIndex,
          vechinfos: this.vechinfos,
          dealersInfo: this.dealersInfo,
          userPhone: this.userPhone,
          serviceId: this.serviceId,
          /**保存参数 S */
          firstName: this.firstName,  //名
          lastName: this.lastName,  //姓
          sex: this.sex,  //'性别（0:男；1：女）
          //预约信息
          serviceType: this.serviceType,    //服务类型（1维修服务、2保养服务、3检查服务、4其他服务）
          testTime: this.testTime, //预约时间
          scootor: this.scootor,//是否代步车
          appointmentPhone: this.appointmentPhone,   //验证码手机号
          dealerCode: this.dealerCode,  //经销商代码
          dealerName: this.dealerName,  //经销商名称
          remark: this.remark,  //备注
          //上门取车
          isTake: this.isTake,
          takeVehicleData: this.takeVehicleData,
          //送车服务
          isPud: this.isPud,
          /**保存参数 E */
        }
        sessionStorage.setItem('shouhouyuyue', JSON.stringify(data))
      },
      reloadCache() {
        const cacheStr = sessionStorage.getItem('shouhouyuyue')
        const data = JSON.parse(cacheStr)
        $.each(data, (k, v) => {
          this[k] = v
        })
        this.$refs.mySwiper.slideTo(this.swipeIndex, 0)
      },
      //进入选择经销商页面
      goAgentlistPage() {
        //清除部分数据 预约时间  是否代步车  取车 地址
        this.clearDealersInfoAfter()
        this.saveCache()
        console.log('进入选择经销商页面')
        //dev: location.origin+'/wchat/agentlist'
        //test: http://localhost:3000/wchat/agentlist
        if (this.serviceType) {
          const url = `/wchat/agentlist?agentlist=reservation&bookingTypeCode=${this.serviceType}`
          // window.location.href = 'https://lincoln-mp-dev.yonyouauto.com' + url
          window.location.href = location.origin + url
        } else {
          $.toast('请先选择服务类型')
        }
      },
      //清除部分数据 预约时间  是否代步车  取车 送车 地址
      clearDealersInfoAfter() {
        this.testTime = ''
        // this.scootor = false
        this.isTake = false
        // this.isPud = false
        this.takeVehicleData = {
          taketime: '',
          isAgree: false,
          startName: '我的位置',//
          startAddress: '我的位置',
          startAddressLat: '',
          startAddressLng: '',
          showStartHouseNumber: false,
          startHouseNumber: '',//门牌号
          endName: '经销商地址',
          endAddress: '距离',
          latitude: "",
          longitude: "",
          from: 'reservationService',
        }
        sessionStorage.setItem('reservationServiceSelectAddress', '')
        sessionStorage.setItem('reservationServiceSelectAddressLng', '')
        sessionStorage.setItem('reservationServiceSelectAddressLat', '')
      },
      //进入选择地址页面
      goSelectAddressPage() {
        this.saveCache()
      },
      //选择地址成功回调
      selectAddressPageCallback() {
        // this.reloadCache()
        const item = 'reservationServiceSelectAddress'
        const address = sessionStorage.getItem(item)
        const lat = sessionStorage.getItem('reservationServiceSelectAddressLat')
        const lng = sessionStorage.getItem('reservationServiceSelectAddressLng')
        if (address) {
          // $.toast('地址' + address)
          this.takeVehicleData.startAddress = address
          this.takeVehicleData.showStartHouseNumber = true
          this.takeVehicleData.startAddressLng = lng
          this.takeVehicleData.startAddressLat = lat
        } else {
          this.aMapGeolocation()
          // $.toast('选择地址失败')
        }
      },
      //添加车辆按钮点击
      addVehicleBtnHandleClick() {
        let self = this
        $.dialog({
          title: '添加车辆',
          html: `
          <div style="margin-top: 15px;">
            <input id="vin-input" placeholder="请输入17位VIN码" type="email" maxlength="17"/>
          </div>
          `,
          buttons: [
            {title: '取消'},
            {
              title: '确认',
              isBold: true,
              callback() {
                let vin = $('#vin-input').val()
                const checkVin = /^[0-9a-zA-Z]+$/.test(vin)
                if (checkVin && vin.length === 17) {
                  self.saveTieCar(vin)
                } else {
                  $.toast('该VIN码位数输入有误，请重新输入')
                  return false
                }
              }
            }
          ]
        })
      },
      //查询用户车辆
      getBaseInfo() {
        this.httpGetBaseInfo().then(data => {
          if (data.code == 3) {
            this.pageShow = true
            this.initData(data)
          } else {
            window.location.href = location.origin + "/modules/myorder.html#/boundCar"
            console.log('getBaseInfo error')
          }
        })
      },
      //添加车辆
      saveTieCar(vin) {
        this.httpSaveTieCar({vin}).then(data => {
          if (data == 'ok') {
            $.toast('车辆绑定成功')
            this.addVin = vin
            this.getBaseInfo() //之后要显示到新绑车页面
          } else {
            console.log('saveTieCar error')
          }
        })
      },
      //更新车牌
      updateTieCarAction({vin, license}) {
        let params = {
          license, vin,
          mobile: this.userPhone,
          // mobile:'13988888888'
        }
        this.httpUpdateTieCarAction(params).then(data => {
          console.log('updateTieCar', res)
          //更新车牌成功
          //this.saveCache()
          sessionStorage.removeItem('shouhouyuyue')
          setTimeout(() => {
            this.getBaseInfo()
          }, 1000)
        })
      },
      //查询常用经销商 根据服务类型
      queryAftersaleDealer(vehicleServices) {
        this.httpQueryAftersaleDealer({vehicleServices}).then(data => {
          const {dealerCode, dealerName, serviceHotline} = data
          console.log('查询常用经销商', {dealerCode, dealerName, serviceHotline})
          if (vehicleServices) {
            //选择服务类型查出来的
            this.dealersInfo = data
          }
        })
      },
      baocunyuyuedan() {
        let self = this
        let params = {
          verificationCode: this.verificationCode,
          appointmentDate: moment(this.testTime).toDate().getTime(),//预约时间 时间戳
          appointmentTime: Dict.findKey(Dict.timeDict, moment(this.testTime).format('HH:mm')),  //预约时间  字典
          appointmentPhone: this.appointmentPhone,   //手机号
          carModelCode: this.carModelCode,  //车型代码'
          carModelName: this.carModelName,  //车型名称
          currMileage: this.currMileage,  //当前里程数
          dealerCode: this.dealersInfo.dealerCode,  //经销商代码
          dealerName: this.dealersInfo.dealerName,  //经销商名称
          firstName: this.firstName,  //名
          lastName: this.lastName,  //姓
          plateNumber: this.plateNumber,  //车牌号
          remark: this.remark,  //备注
          serviceType: this.serviceType,    //服务类型（1维修服务、2保养服务、3检查服务、4其他服务）
          sex: this.sex,  //'性别（0:男；1：女）
          vin: this.vin,  //vin
          scootor: this.serviceType == 1 ? (this.scootor ? 0 : 1) : 1,//是否代步车
          $isTakeAndPubSwitch: this.isTakeAndPubSwitch,//标记字段  经销商没有开通取送车业务的 不显示；开通送车未勾选，显示不需要
          // isTake: this.isTake ? '12781001' : '12781002',//取车
          isPud: this.isPud ? '12781001' : '12781002',//是否送车
          id: this.serviceId || '',
          // pickupAddress: this.takeVehicleData.startAddress,//取车地址
          // pickupAddressLng: this.takeVehicleData.startAddressLng, //经度
          // pickupAddressLat: this.takeVehicleData.startAddressLat, //维度
          // bookingTime: moment(this.takeVehicleData.taketime).toDate().getTime(),//取车预约时间
          // houseNumber: this.takeVehicleData.startHouseNumber || '', //取车门牌号
          //以下字段传空
          outFactoryMileage: '',  //出厂里程数
          enterFactoryMileage: '',   //进厂里程数
          cancleTime: '',
          appointmentDmsNo: '',
          appointmentNo: '',
          appointmentSource: '',
          assStatus: '',
          createBy: '',
          createDate: '',
          expDeliverTime: '',
          interchangeTime: '',
          qualityTime: '',
          repairWaitTime: '',
          repairingTime: '',
          roNo: '',
          roType: '',
          serviceEnginnerCode: '',
          serviceEnginnerName: '',
          serviceFinshTime: '',
          status: '',
          updateBy: '',
          updateDate: '',
          userId: '',
          washTime: ''
        }
        $.each(params, (k, v) => {
          if (v === '') {
            params[k] = null
          }
        })
        console.log('要提交的参数', params)
        $.dialog({
          type: 'wx-alert',
          title: '售后服务预约',
          html: ServerConfirmPanel.initPanel(params),
          buttons: [{
            title: '确认提交',
            callback() {
              console.log('点击确认')
              if (self.appointmentPhone !== self.userPhone) {
                if (!self.verificationCode) {
                  $.toast('请输入短信验证码')
                  return
                }
              }
              Indicator.open({
                text: '提交中',
                spinnerType: 'triple-bounce'
              });
              if (self.serviceId) {
                self.updateAftersaleAction(params)
              } else {
                self.creatAftersaleAction(params)
              }
            }
          }]
        })
      },
      creatAftersaleAction(params) {
        //创建售后预约单
        this.http.post('creatAftersale', params, res => {
          console.log('创建售后预约单 creatAftersale', res)
          Indicator.close();
          if (res.resultCode == 1) {
            if (res.data) {
              $.toast('预约成功')
              setTimeout(() => {
                document.location.href = location.origin + `/wchat/mydetail1?id=${res.data}&appointmentType=3&agentlist=reservation`
              }, 2500)
            }
          } else {
            if (res.errMsg.indexOf('您在该经销商有售后预约未完成') !== -1) {
              const id = res.errMsg.split(' ')[1]
              $.dialog({
                title: '提示',
                message: '您在该经销商有售后预约未完成',
                buttons: [{
                  title: '查看未完成的预约',
                  isBold: true,
                  callback() {
                    console.log('查看未完成的预约')
                    document.location.href = location.origin + `/wchat/mydetail1?id=${id}&appointmentType=3&agentlist=reservation`
                    return false
                  }
                }]
              })
            } else {
              $.toast(res.errMsg)
            }
          }
          0
        })
      },
      updateAftersaleAction(params) {
        this.http.post('updateAftersale', params, res => {
          console.log('更新售后预约单 updateAftersale', res)
          Indicator.close();
          if (res.resultCode == 1) {
            if (res.data) {
              $.toast('修改成功')
              setTimeout(() => {
                document.location.href = location.origin + `/wchat/mydetail1?id=${res.data}&appointmentType=3&agentlist=reservation`
              }, 2500)
            }
          } else {
            $.toast(res.errMsg)
          }
        })
      },
      //查询售后预约单
      afterSaledetail(id) {
        console.log('查询售后预约单')
        this.serviceId = id
        this.httpAfterSaledetail({id}).then((res) => {
          console.log(res)
          const data = res.data
          const detailDto = data.detailDto
          /* 预约的车辆 */
          const vin = detailDto.vin
          // const vin = 'LW201812121234561'
          let vechinfo_tmp = this.vechinfos.find((item) => {
            return item.vin === vin
          })
          if (vechinfo_tmp) {
            vechinfo_tmp.currentMaintenanceMileage = detailDto.currMileage
            const swipeIndex = this.vechinfos.indexOf(vechinfo_tmp)
            vechinfo_tmp.plateNumber = detailDto.plateNumber
            this.vechinfos = [vechinfo_tmp]
            this.swipeIndex = 0
          }
          /* 回显 之前保存的信息 */
          //服务类型
          this.serviceType = detailDto.serviceType
          //是否代步车
          this.scootor = detailDto.scootor == 0 ? true : false
          //经销商
          this.dealerCode = data.dealerCode  //经销商代码
          this.dealerName = data.dealerName  //经销商名称
          var dealersInfo = {
            dealerCode: data.dealerCode,
            address: data.address,
            serviceHotline: data.serviceHotline,
            dealerName: data.dealerName,
            bookingTypeCode: data.bookingTypeCode
          }
          this.dealersInfo = dealersInfo
          //预约时间
          this.testTime = moment(Number(detailDto.appointmentDateTimeStamp))
          //预约电话
          this.appointmentPhone = detailDto.appointmentPhone
          //是否送车
          this.isPud = detailDto.isPud == '12781001' ? true : false
          //备注
          this.remark = detailDto.remark
        })
      },
      /*** http相关 **///,,,,,,
      httpGetBaseInfo() {
        return new Promise((resolve, reject) => {
          if (window.location.host == 'localhost:8000' || window.location.host == '192.168.1.100:8000') {
            console.log('test http')
            var res = require('./script/getBaseInfo')
            resolve(res.data)
            return
          }
          this.http.get('getBaseInfo', res => {
            console.log('查询用户绑车信息 getBaseInfo', res)
            if (res.resultCode == 1) {
              resolve(res.data)
            } else {
              console.log('getBaseInfo error')
            }
          })
        })
      },
      httpSaveTieCar({vin}) {
        return new Promise((resolve, reject) => {
          this.http.post('saveTieCar', {vin}, res => {
            console.log('添加用户车辆信息 saveTieCar', res)
            if (res.resultCode == 1) {
              const data = res.data
              if (data == 'ok') {
                resolve(data)
              } else {
                console.log('saveTieCar error')
              }
            } else {
              $.toast(res.errMsg)
            }
          })
        })
      },
      httpUpdateTieCarAction(params) {
        return new Promise((resolve, reject) => {
          this.http.get('updateTieCar', params, res => {
            if (res.resultCode == 1) {
              const data = res.data
              if (data) {
                resolve(data)
              }
            } else {
              console.log('updateTieCar error')
            }
          })
        })
      },
      httpQueryAftersaleDealer({vehicleServices}) {
        return new Promise((resolve, reject) => {
          this.http.get('queryAftersaleDealer', {vehicleServices}, res => {
            if (res.resultCode == 1) {
              const data = res.data
              if (data) {
                resolve(data)
              } else {
                console.log('queryAftersaleDealer error')
              }
            } else {
              console.log('queryAftersaleDealer error')
            }
          })
        })
      },
      httpAfterSaledetail({id}) {
        return new Promise((resolve, reject) => {
          this.http.get('afterSaledetail', {id}, res => {
            if (res.resultCode == 1) {
              resolve(res)
            } else {
              $.toast('查询售后预约单失败')
            }
          })
        })
      },
      //查询经销商 是否支持取送车
      httpQueryDealerIsTake(dealerCode) {
        return new Promise((resolve, reject) => {
          this.http.get('queryDealerIsTake', {dealerCode}, res => {
            if (res === true) {
              resolve(true)
            }
            if (res === false) {
              resolve(false)
            }
          })
        })
      },
      //预估时间距离
      httpGetEstimatedPrice() {
        return new Promise((resolve, reject) => {
          this.http.post('getEstimatedPrice', {
            "endLng": 121.423596,
            "endLat": 31.211773,
            "startLng": 121.133652,
            "startLat": 31.153702,
            "bookingTime": '20190601121212'
          }, res => {
            if (res === true) {
              /**
               distance: 33.76  预估距离 千米
               overFee: 20  超出费用
               startFee: 50  起步费
               totalFee: 70  预估价格 元
               */
              resolve(true)
            }
            if (res === false) {
              resolve(false)
            }
          })
        })
      }
    }
  }
</script>

<style lang="sass" type="text/scss" rel="stylesheet/scss" scoped>
  @function px($px) {
    @return ($px/20)+rem;
  }

  .index {
    .vehicle-info-wrap {
      .vehicle-info {
        color: #323232;
        background-color: #EBEBEB;
        padding: 0;
      }
    }

    .add-vehicle-btn {
      line-height: px(55);
      font-size: px(16);
      text-align: center;
      border-bottom: px(10) solid #F5F5F5;
    }

    .reservation-info-wrap {
      padding: px(20);

      .btn-wrap {
        padding: px(15) 0 px(10) 0;
      }
    }
  }

  .booking-time-wrap {
    padding: 0;
    padding-bottom: px(10);
  }

  .wx-form2 {
    margin-top: px(10);
  }
</style>
