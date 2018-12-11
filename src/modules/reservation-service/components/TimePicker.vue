<template>
  <div class="time-picker-wrap">
    <wx-input label="预约时间" v-model="time" :required="true"></wx-input>
    <div class="btn"  @click="testHandleClick"></div>
    <mt-popup
      v-model="popupVisible"
      position="bottom">
      <div class="mt-popup-panel">
        <wx-time-interval></wx-time-interval>
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
    data() {
      return {
        time: '',
        popupVisible:false
      }
    },
    methods:{
      testHandleClick() {
        console.log('testHandleClick')
        this.popupVisible = !this.popupVisible
      }
    }
  }
</script>

<style scoped lang="sass" type="text/scss">
  .time-picker-wrap{
    position: relative;
    .btn{
      position: absolute;
      width: 74%;
      height: 100%;
      top: 0;
      right: 0;
      opacity: 1;
    }
  }

</style>
