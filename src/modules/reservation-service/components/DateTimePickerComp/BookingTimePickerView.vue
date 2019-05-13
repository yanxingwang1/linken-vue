<template>
  <div class="time-picker-wrap">
    <wx-input :disabled="disabled" label="预约时间" :value="inputValue" :required="true" port="c"></wx-input>
    <div class="opacity-btn" @click="testHandleClick"></div>
    <mt-popup
      v-model="popupVisible"
      position="bottom">
      <div class="mt-popup-panel">
        <!--<wx-time-interval-->
        <!--:dealerCode="dealerCode"-->
        <!--@timeIntervalChange="timeIntervalChange"-->
        <!--&gt;</wx-time-interval>-->
        <date-time-picker
          :dealerCode="dealerCode"
          :default-value="value"
          @confirm="pickerConfirm"
        ></date-time-picker>
      </div>
    </mt-popup>
  </div>
</template>

<script>
  import WxInput from './../../../../components/WxInput'
  import DateTimePicker from './DateTimePicker1'
  import {Popup} from 'mint-ui'

  export default {
    name: "BookingTimePicker",
    components: {
      WxInput,
      Popup,
      DateTimePicker
    },
    data() {
      return {
        dateTime: this.value,
        popupVisible: false
      }
    },
    props: {
      disabled: {
        type: Boolean,
        default: false
      },
      value: {
        type: String
      },
      dealerCode: {
        type: String
      }
    },
    watch: {
      // dealerCode(newVal,oldVal){
      //   if (newVal !== oldVal) {
      //     this.$emit('input', '')
      //   }
      // }
    },
    computed: {
      inputValue() {
        return this.value ? moment(this.value).format('YYYY年MM月DD日  dddd  HH:mm') : ''
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
      pickerConfirm(time) {
        console.log('BookingTimePicker onChange', time)
        this.$emit('input', moment(time).format('YYYY-MM-DD HH:mm'))
        this.popupVisible = !this.popupVisible
        // return
        // console.log(time.date.Format('yyyy年MM月dd HH:mm'))
        // this.$emit('input', time.date.getTime().toString())
        // this.popupVisible = !this.popupVisible
      }
    },
    mounted() {
      window.bt = this
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
