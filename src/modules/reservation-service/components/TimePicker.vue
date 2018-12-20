<template>
  <div class="time-picker-wrap">
    <wx-input :disabled="disabled" label="预约时间" :value="inputValue" :required="true" port="c"></wx-input>
    <div class="opacity-btn" @click="testHandleClick"></div>
    <mt-popup
      v-model="popupVisible"
      position="bottom">
      <div class="mt-popup-panel">
        <wx-time-interval
          :dealerCode="dealerCode"
          @timeIntervalChange="timeIntervalChange"
        ></wx-time-interval>
      </div>
    </mt-popup>
  </div>
</template>

<script>
  import WxInput from './../../../components/WxInput'
  import WxTimeInterval from './WxTimeInterval'
  import {Popup} from 'mint-ui'

  export default {
    name: "TimePicker",
    components: {
      WxInput,
      Popup,
      WxTimeInterval
    },
    props: {
      disabled: {
        type: Boolean,
        default: false
      },
      value: {
        type: String
      },
      dealerCode:{
        type: String
      }
    },
    computed: {
      inputValue(){
        return this.value?new Date(Number(this.value)).Format('yyyy年MM月dd日 HH:mm'):''
      }
    },
    data() {
      return {
        time: '',
        popupVisible: false
      }
    },
    methods: {
      testHandleClick() {
        console.log('testHandleClick')
        if (this.disabled) {
          return
        } else {
          this.popupVisible = !this.popupVisible
        }
      },
      timeIntervalChange(time) {
        console.log('TimePicker', time.date)
        console.log(time.date.Format('yyyy年MM月dd HH:mm'))
        this.$emit('input', time.date.getTime().toString())
        this.popupVisible = !this.popupVisible
      }
    }
  }
</script>

<style scoped lang="sass" type="text/scss">
  .time-picker-wrap {
    position: relative;

    .opacity-btn {
      position: absolute;
      width: 74%;
      height: 100%;
      top: 0;
      right: 0;
      opacity: 1;
    }
  }

</style>
