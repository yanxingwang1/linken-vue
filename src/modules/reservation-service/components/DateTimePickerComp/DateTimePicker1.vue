<!-- 日期 和 时间段 选择器 弹窗 -->
<!-- 预约试驾时间选择 -->
<template>
  <div class="wx-time-interval" @touchmove.prevent>
    <div class="wx-title">选择预约时间</div>
    <div class="wx-month">{{filterMonth()}}</div>
    <day-picker
      :valid="[1,7]"
      :defaultValue="dateTest"
      @change="dayPickerChange"
    ></day-picker>
    <time-picker
      :defaultValue="timeTest"
      :AppointmentDate="dateTest"
      :dealerCode="dealerCode"
      @change="timePickerChange"
    ></time-picker>
    <div class="btn-wrap">
      <wx-button @click.native="okBtnHandleClick" :disabled="btnDisabled">确认</wx-button>
    </div>
  </div>
</template>

<script>
  import DayPicker from './DayPicker'
  import TimePicker from './TimePicker1'
  import WxButton from './../../../../components/WxButton'

  export default {
    components: {
      DayPicker, TimePicker, WxButton
    },
    name: "DateTimePicker1",
    data() {
      return {
        dateTest: this.defaultValue ? moment(this.defaultValue).format('YYYY-MM-DD') : moment().add(1, 'days').format('YYYY-MM-DD'),
        timeTest: this.defaultValue ? moment(this.defaultValue).format('HH:mm') : '',//moment(this.defaultValue).format('HH:mm'),
      }
    },
    props: {
      defaultValue: String,
      dealerCode: String,
    },
    watch: {
      defaultValue(newVal) {
        this.dateTest = newVal ? moment(newVal).format('YYYY-MM-DD') : moment().add(1, 'days').format('YYYY-MM-DD')
        this.timeTest = newVal ? moment(newVal).format('HH:mm') : ''
      }

    },
    computed: {
      btnDisabled() {
        const {dateTest, timeTest} = this
        return !(dateTest && timeTest)
      }
    },
    mounted() {

    },
    methods: {
      filterMonth() {
        return moment(this.dateTest).format('YYYY 年 MM 月')
      },
      okBtnHandleClick() {
        const {dateTest, timeTest} = this
        console.log(dateTest, timeTest)
        const res = moment(`${dateTest} ${timeTest}`).format('YYYY-MM-DD HH:mm')
        // console.log(res)
        this.$emit('confirm', res)
      },
      //日期选择变化
      dayPickerChange(value) {
        console.log('dayPickerChange', value)
        this.dateTest = value
      },
      timePickerChange(value) {
        console.log('timePickerChange', value)
        this.timeTest = value
      },
    }
  }
</script>

<style scoped lang="sass" type="text/scss">
  @function px($px) {
    @return ($px/20)+rem;
  }

  .wx-time-interval {
    position: relative;
    width: 100vw;
    height: px(500);
    background: #ffffff;
    padding: 0 px(20);
    text-align: center;
    color: #323232;

    .wx-title {
      height: px(48);
      line-height: px(48);
      font-size: px(16);
      border-bottom: solid 1px #E2E2E2;
    }

    .wx-month {
      height: px(46);
      line-height: px(46);
    }

    .btn-wrap {
      height: px(66);
      display: flex;
      align-items: flex-start;
    }

  }
</style>

