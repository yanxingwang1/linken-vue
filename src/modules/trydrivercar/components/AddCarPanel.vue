<!-- 添加试乘试驾车 弹窗 -->
<template>
  <div class="add-car-panel">
    <div class="title">
      添加试乘试驾车
    </div>
    <div class="content">
      <div class="form-wrap">
        <div class="form-item-wrap">
          <!--<lk-input-->
          <!--label="车牌号码"-->
          <!--v-model="license"-->
          <!--:required="true"-->
          <!--:disabled="false"-->
          <!--&gt;</lk-input>-->
          <license-input :required="true" v-model="license"></license-input>
        </div>
        <div class="form-item-wrap">
          <lk-select
            label="车系"
            :opts="seriesOpt"
            v-model="series"
            :required="true"
            :disabled="false"
          ></lk-select>
        </div>
        <div class="form-item-wrap">
          <lk-select
            label="车型"
            :opts="modelOpt"
            v-model="model"
            :required="true"
            :disabled="series?false:true"
          ></lk-select>
        </div>
        <div class="form-item-wrap">
          <lk-input
            label="VIN码"
            type="email"
            v-model="vin"
            :required="true"
            :disabled="false"
            maxlength="17"
          ></lk-input>
        </div>
        <div class="form-item-wrap">
          <div class="mileage">
            <div>最新车辆里程数</div>
            <!--<div>0 km</div>-->
          </div>
        </div>
      </div>
      <div class="btn-wrap">
        <wx-button
          :disabled="!(license&&vin&&series&&model)"
          @click.native="addCar"
        >添加试乘试驾车
        </wx-button>
      </div>
    </div>
  </div>
</template>

<script>
  import {MessageBox} from 'mint-ui';
  import WxButton from './../../../components/WxButton'
  import LkInput from './LkInput'
  import LkSelect from './LkSelect'
  import LicenseInput from './LicenseInput'

  export default {
    name: 'AddCarPanel',
    data() {
      return {
        isAdd: true,//添加 按钮是否可以点击
        /** 选项参数 */
        seriesOpt: [],
        modelOpt: [],
        /** model 参数 */
        license: '',
        model: '',
        modelName: '',
        phone: this.$route.query.mobile,
        series: '',
        seriesName: '',
        vin: '',
        wxId: this.$route.query.userid
      }
    },
    watch: {
      license(q) {
        console.log('license', q)
      },
      series(val) {
        console.log('series change', val)
        const item = this.seriesOpt.find((currentValue) => {
          return currentValue.value == this.series
        })
        this.seriesName = item ? (item.label || '') : ''
        console.log('seriesName change', this.seriesName)
        this.model = ''
        this.queryModel().then((arr) => {
          this.modelOpt = arr
        })
      },
      model(val) {
        const item = this.modelOpt.find((currentValue) => {
          return currentValue.value == this.model
        })
        this.modelName = item ? (item.label || '') : ''
        console.log('modelName change', this.modelName)
      }
    },
    methods: {
      //数据初始化
      renderData() {
        isAdd: true//添加 按钮是否可以点击
        // /** 选项参数 */
        this.seriesOpt = []
        this.modelOpt = []
        /** model 参数 */
        this.license = ''
        this.model = ''
        this.modelName = ''
        this.series = ''
        this.seriesName = ''
        this.vin = ''
        this.querySeries().then((arr) => {
          this.seriesOpt = arr
        })
      },
      addCar() {
        console.log('add Car Panel Click')
        if (!this.checkLicense(this.license)) {
          MessageBox('提示', '车牌号格式不正确')
          return
        }
        if (!this.checkVIN(this.vin)) {
          MessageBox('提示', '该VIN码位数输入有误，请重新输入')
          return
        }
        this.saveVehicleListAction()
      },//添加试乘试驾车
      saveVehicleListAction() {
        var params = {
          license: this.license,
          model: this.model,
          modelName: this.modelName,
          phone: this.phone,
          series: this.series,
          seriesName: this.seriesName,
          vin: this.vin,
          wxId: this.wxId,
          mileage:''
        }
        this.http.post('saveVehicleList', params, res => {
          console.log('添加试乘试驾车 saveVehicleList', res)
          var arr = []
          if (res.resultCode == '1' && res.data) {
            if (res.data.errCode == 200) {
              console.log(res.data.errMsg)
              console.log('添加试乘试驾车 成功')
              MessageBox('提示', '保存成功')
              this.renderData()
              this.$emit('saveVehicleListSuccess')
            } else {
              MessageBox('提示', res.data.errMsg)
            }

          } else {
            MessageBox('提示', res.errMsg)
          }
        })
      },
      //查询车系
      querySeries() {
        return new Promise((resolve, reject) => {
          this.http.get('getSeries', {
            //this.$route.query.userid
            //this.$route.query.userid
            wxId: this.$route.query.userid,
            wxPhone: this.$route.query.mobile
          }, res => {
            console.log('查询 getSeries', res)
            var arr = []
            if (res.resultCode == '1') {
              if (res.data) {
                arr = res.data.map((item) => {
                  const {seriesCode, seriesName} = item
                  return {
                    value: seriesCode,
                    label: seriesName
                  }
                })
                resolve(arr)
              }
            } else {
              MessageBox('提示', res.errMsg)
            }
          })
        })
      },
      queryModel() {
        return new Promise((resolve, reject) => {
          this.http.get('getModel', {
            //code: 'LK180101',
            id: this.series,
            wxId: this.$route.query.userid,
            wxPhone: this.$route.query.mobile
          }, res => {
            console.log('查询 getModel', res)
            var arr = []
            if (res.resultCode == '1') {
              if (res.data) {
                arr = res.data.map((item) => {
                  const {modelCode, modelName} = item
                  return {
                    value: modelCode,
                    label: modelName
                  }
                })
                resolve(arr)
              }
            } else {
              MessageBox('提示', res.errMsg)
            }
          })
        })
      },
      checkVIN(vin) {
        var result = true;
        if(vin.length!=17||!/^[0-9a-zA-Z]+$/.test(vin)){
          result = false;
        }
        return result;
      },
      checkLicense(vehicleNumber) {
        var result = false;
        var express = /^(([京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领][A-Z](([0-9]{5}[DF])|([DF]([A-HJ-NP-Z0-9])[0-9]{4})))|([京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领][A-Z][A-HJ-NP-Z0-9]{4}[A-HJ-NP-Z0-9挂学警港澳使领]))$/;
        result = express.test(vehicleNumber);
        return result;
      }
    },

    components: {
      LkSelect,
      WxButton,
      LkInput,
      MessageBox,
      LicenseInput
    },
    mounted() {
      // console.log(this.$route.query)
      this.renderData()
      $('.n3-dropdown-menu').n3SelectScroll()
    }
  }
</script>

<style scoped lang="sass" type="text/scss">
  .add-car-panel {
    background-color: white;
    padding: 0 20px;
    font-size: 16px;

    .title {
      text-align: center;
      height: 64px;
      line-height: 64px;
      font-weight: 500;
      border-bottom: 1px solid #E2E2E2;
    }

    .content {
      position: relative;
      height: 380px;
      margin-top: 20px;

      .form-wrap {
        .form-item-wrap {
          display: flex;
          height: 60px;
          align-items: center;

          .mileage {
            width: 100%;
            display: flex;
            height: 40px;
            justify-content: space-between;
            align-items: center;
            font-size: 16px;
            font-weight: 500;
          }
        }
      }

      .btn-wrap {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        padding: 20px 0px;
      }
    }
  }
</style>
