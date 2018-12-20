<template>
  <div class="index" v-show="pageShow">
    <!--车辆信息-->
    <div class="vehicle-info-wrap">
      <div class="vehicle-info">
        <div class="title">
          尊敬的
          {{
          ($route.query.from==='boundCar'?$route.query.lastName:lastName) +
          (Number($route.query.from==='boundCar'?$route.query.sex:sex) ?'女士': '先生')
          }}，{{ filteTimePeriod() }}！
        </div>
        <div class="qwer">
          <vehicles-swipe
            ref="mySwiper"
            @slideChange="swipeHandelChange"
            @inputPlateBlur="updateTieCarAction"
            :vechinfos="vechinfos"
          ></vehicles-swipe>
        </div>
      </div>
    </div>
    <div class="add-vehicle-btn"
         @click="addVehicleBtnHandleClick"
    >
      + 添加新车辆
    </div>
    <!--预约信息-->
    <div class="reservation-info-wrap">
      <service-type v-model="serviceType"></service-type>
      <div class="dealers-info-wrap">
        <dealer-info-panel
          @click.native="goAgentlistPage"
          :dealerInfo="dealersInfo"
        ></dealer-info-panel>
        <div class="wx-form">
          <time-picker
            :dealerCode="dealersInfo.dealerCode"
            v-model="testTime"
            :disabled="!dealersInfo.dealerCode"></time-picker>
        </div>
        <div class="dbc" v-show="serviceType==1">
          <div class="cell">
            <div>是否申请代步车</div>
            <div>
              <mt-switch v-model="scootor"></mt-switch>
            </div>
          </div>
          <div class="tips">提示：代步车实际提供情况，以经销商线下反馈为准</div>
        </div>
      </div>
      <div class="wx-form">
        <wx-input label="联系电话" v-model="appointmentPhone" :required="true" port="c"></wx-input>
        <wx-verification-code-input
          v-if="appointmentPhone != userPhone"
          v-model="verificationCode"
          :phone="appointmentPhone"
          label="短信验证"
          port="c"
        ></wx-verification-code-input>
        <wx-input type="textarea" v-model="remark" placeholder="备注信息" port="c"></wx-input>
      </div>
      <div class="btn-wrap">
        <wx-button :disabled="checkRequiredParams()" @click.native="baocunyuyuedan">服务预约</wx-button>
      </div>
    </div>
  </div>
</template>

<script>
  import {Switch, Indicator} from 'mint-ui'
  import WxInput from './../../components/WxInput'
  import WxButton from './../../components/WxButton'
  import WxVerificationCodeInput from '../../components/WxVerificationCodeInput'
  import VehicleInfoCard from './components/VehicleInfoCard'
  import ServiceType from './components/ServiceType'
  import DealerInfoPanel from './components/DealersInfoPanel'
  import TimePicker from './components/TimePicker'
  import Dict from './script/dict'
  import VehiclesSwipe from './components/VehiclesSwipe'

  export default {
    name: 'index',
    components: {
      WxButton,
      WxInput,
      WxVerificationCodeInput,
      MtSwitch: Switch,
      ServiceType,
      DealerInfoPanel,
      TimePicker,
      VehicleInfoCard,
      Indicator,
      VehiclesSwipe
    },
    created() {
      end_time = new Date().getTime()
      console.log('index加载时间：', end_time - start_time, 'ms')
    },
    beforeDestroy() {
      clearInterval(this.timer)
    },
    data() {
      return {
        pageShow: false,
        // swipeShow: false,
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
        appointmentPhone: '',   //验证码手机号
        dealerCode: '',  //经销商代码
        dealerName: '',  //经销商名称
        remark: '',  //备注
        /**保存参数 E */
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
      }
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
            }
          } else {
            //未选择
            //查询常用经销商是否支持该服务
            this.queryAftersaleDealer(value)
          }
        } else {
          //取消服务类型 清除经销商
          this.dealersInfo = {}
        }
      },
    },
    beforeMount() {
      $(document).attr('title', '售后服务预约')
    },
    mounted() {
      window.self = this
      //查询用户绑车信息
      this.getBaseInfo()
    },
    methods: {
      swipeHandelChange(index) {
        this.swipeIndex = index
      },
      initData(data) {
        if (this.$route.query.from == 'agentlist') {
          console.log('来自 经销商列表')
          this.reloadCache()
          const {dealerCode, detailAddress, salesHotline, storeName, bookingTypeCode} = this.$route.query
          this.dealersInfo = {
            dealerCode, bookingTypeCode,
            address: detailAddress,
            serviceHotline: salesHotline,
            dealerName: storeName,
          }
          // this.swipeShow = true
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
            //查询预约单
            const id = this.$route.query.id
            this.afterSaledetail(id)
          }
          // else {
          // this.swipeShow = true
          // }
        }
      },
      //本地化存储信息
      saveCache() {
        const data = {
          swipeIndex: this.swipeIndex,
          // testTime: this.testTime,
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
          scootor: this.scootor,//是否代步车
          appointmentPhone: this.appointmentPhone,   //验证码手机号
          dealerCode: this.dealerCode,  //经销商代码
          dealerName: this.dealerName,  //经销商名称
          remark: this.remark,  //备注
          /**保存参数 E */
        }
        sessionStorage.setItem('shouhouyuyue', JSON.stringify(data))
      },
      reloadCache() {
        const data = JSON.parse(sessionStorage.getItem('shouhouyuyue'))
        $.each(data, (k, v) => {
          this[k] = v
        })
        this.$refs.mySwiper.slideTo(this.swipeIndex, 0)
      },
      filteTimePeriod() {
        const hour = new Date().getHours()
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
      //进入选择经销商页面
      goAgentlistPage() {
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
      //添加车辆按钮点击
      addVehicleBtnHandleClick() {
        let self = this
        $.dialog({
          title: '请输入VIN码添加车辆',
          html: `<input id="vin-input" placeholder="请输入17位VIN码" type="email" maxlength="17"/>`,
          buttons: [
            {title: '取消'},
            {
              title: '确认',
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
      //查询用户车辆
      getBaseInfo() {
        this.http.get('getBaseInfo', res => {
          console.log('查询用户绑车信息 getBaseInfo', res)
          if (res.resultCode == 1) {
            const data = res.data
            if (data.code == 3) {
              this.pageShow = true
              this.initData(data)
            } else {
              window.location.href = location.origin + "/modules/myorder.html#/boundCar"
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
              $.toast('车辆绑定成功')
              this.getBaseInfo()
            } else {
              console.log('saveTieCar error')
            }
          } else {
            console.log('saveTieCar error')
            $.toast(res.errMsg)
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
        this.http.get('updateTieCar', params, res => {
          console.log('updateTieCar', res)
          if (res.resultCode == 1) {
            const data = res.data
            if (data) {
              //更新车牌成功
              this.saveCache()
              this.getBaseInfo()
            }
          } else {
            console.log('updateTieCar error')
          }
        })
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
                this.dealersInfo = data
              }
            } else {
              console.log('queryAftersaleDealer error')
            }
          } else {
            console.log('queryAftersaleDealer error')
          }
        })
      },
      checkRequiredParams() {
        //里程数 维修类型 经销商信息 预约时间 电话
        return !(Number(this.currMileage) && this.serviceType && this.dealersInfo.dealerCode && this.testTime && this.appointmentPhone)
      },
      baocunyuyuedan() {
        let self = this
        let params = {
          verificationCode: this.verificationCode,
          appointmentDate: Number(this.testTime),//预约时间 时间戳
          appointmentTime: Dict.findKey(Dict.timeDict, new Date(Number(this.testTime)).Format('HH:mm')),  //预约时间  字典
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
          scootor: this.serviceType == 1 ? (this.scootor ? 0 : 1) : '',//是否代步车
          id: this.serviceId || '',
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
          html: `
          <div class="server-confirm-panel">
            <div>
              <div>车辆：</div>
              <div>${params.plateNumber}</div>
            </div>
            <div>
              <div>服务类型：</div>
              <div>${['', '维修', '保养', '检查', '其他'][params.serviceType]}</div>
            </div>
            <div>
              <div>经销商：</div>
              <div>${params.dealerName}</div>
            </div>
            <div>
              <div>预约时间：</div>
              <div>${new Date(Number(params.appointmentDate)).Format('yyyy年MM月dd日')} ${Dict.timeDict[params.appointmentTime]}</div>
            </div>
            <div>
              <div>联系电话：</div>
              <div>${params.appointmentPhone}</div>
            </div>
            <div>
              <div>${params.serviceType == 1 ? '代步车' : ''}</div>
              <div>${params.serviceType == 1 ? (params.scootor == 0 ? '是' : '否') : ''}</div>
            </div>
            <div>
              <div>留言：</div>
              <div>${params.remark ? params.remark : ''}</div>
            </div>
          </div>
          `,
          buttons: [{
            title: '确认提交',
            callback() {
              console.log('点击确认')
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
            $.toast(res.errMsg)
          }
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
      afterSaledetail(id) {
        console.log('查询售后预约单')
        this.serviceId = id
        this.http.get('afterSaledetail', {id}, res => {
          console.log(res)
          if (res.resultCode == 1) {
            const data = res.data
            const detailDto = data.detailDto
            /* 预约的车辆 */
            const vin = detailDto.vin
            let vechinfo_tmp = this.vechinfos.find((item) => {
              return item.vin === vin
            })
            if (vechinfo_tmp) {
              vechinfo_tmp.currentMaintenanceMileage = detailDto.currMileage
              const swipeIndex = this.vechinfos.indexOf(vechinfo_tmp)
              this.$refs.mySwiper.slideTo(swipeIndex)
              // this.swipeShow = true
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
            this.testTime = String(detailDto.appointmentDateTimeStamp)
            //预约电话
            this.appointmentPhone = detailDto.appointmentPhone
            //备注
            this.remark = detailDto.remark
          } else {
            $.toast('查询售后预约单失败')
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
        padding: 0;

        .title {
          font-weight: 500;
          font-size: px(14);
          height: px(50);
          line-height: px(50);
          padding: 0 px(20);
        }

        .qwer {
          position: relative;
          overflow: hidden;
          width: 100%;
          text-align: center;
          padding: 0 px(20);
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
          padding: 0 !important;
        }

        .dbc {
          padding-bottom: px(10);

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
        padding: 0 0 px(10) 0;
      }

      .btn-wrap {
        padding: px(10) 0;
      }
    }
  }
</style>
