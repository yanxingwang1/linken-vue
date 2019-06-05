<!-- 上门取送车开关 -->
<template>
  <div>
    <switch-cell
      title="上门取车"
      :label="true"
      v-show="switchShow"
      :value="value"
      @input="$emit('input',!value)"
      :disabled="switchDisabled"
      :on-click="switchOnClick"
    >
    </switch-cell>
    <div class="qcs-info-panel" v-show="value">
      <!-- 起点和终点 -->
      <start-and-end-point-view
        :test="value"
        :data="data"
        :choose-start="true"
      ></start-and-end-point-view>
      <!-- 取送车时间 -->
      <take-time-picker-view
        :defaultValue="data.taketime"
        @change="timePickerChange"
        title="预约取车时间"
        :simple="true"
      ></take-time-picker-view>
      <!--<wx-check-box v-model="data.checkValue1">我需要返程送车服务</wx-check-box>-->
      <wx-check-box v-model="data.isAgree">
        <span style="font-size: 0.6rem;color: #A9A9A9;">我同意</span>
        <take-and-send-agreement></take-and-send-agreement>
      </wx-check-box>
    </div>
  </div>
</template>

<script>
  import SwitchCell from './SwitchCell'
  import {Popup} from 'mint-ui';
  import TakeTimePickerView from './DateTimePickerComp/TakeTimePickerView'
  import StartAndEndPointView from './StartAndEndPointView'
  import TakeAndSendAgreement from './TakeAndSendAgreement'
  import WxCheckBox from './WxCheckBox'

  export default {
    components: {
      SwitchCell,
      Popup,
      TakeTimePickerView,
      StartAndEndPointView,
      TakeAndSendAgreement,
      WxCheckBox
    },
    name: "TakeAndSendSwitch",
    props: {
      value: {
        type: Boolean
      },
      switchDisabled: {
        type: Boolean
      },
      switchShow: Boolean,
      switchOnClick: Function,
      data: {
        type: Object,
        default() {
          return {
            taketime: '',
            isAgree: false,
            startName: '我的位置',
            startAddress: '我的位置',
            showStartHouseNumber: false,
            startHouseNumber: '',//门牌号
            endName: '经销商地址',
            endAddress: '距离',
            latitude: "",
            longitude: "",
            from: 'reservationService',
          }
        }
      },
    },
    data() {
      return {}
    },
    methods: {
      timePickerChange(value) {
        console.log('TakeAndSend timePickerChange', value)
        this.data.taketime = value
      }
    },
    mounted() {
      window.tw = this
    }
  }
</script>

<style scoped lang="sass" type="text/scss">
  @function px($px) {
    @return ($px/20)+rem;
  }

  .qcs-info-panel {
    background: #F8F7F7;
    border-radius: 2px;
    padding: px(10) 0;
  }
</style>
