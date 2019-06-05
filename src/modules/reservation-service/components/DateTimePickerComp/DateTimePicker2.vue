<!-- 日期 和 时间 选择器 弹窗 -->
<template>
  <div class="">
    <div class="date-time-picker" @touchmove.prevent>
      <div class="wx-title">选择预约时间</div>
      <div class="wx-month">{{filterMonth()}}</div>
      <day-picker
        :valid="[0,6]"
        :defaultValue="dateTest"
        @change="dayPickerChange"
      ></day-picker>
      <time-picker
        :date-value="dateTest"
        :defaultValue="timeTest"
        :disabled="btnDisabled"
        @change="timePickerChange"
      ></time-picker>
      <div class="btn-wrap">
        <wx-button :disabled="btnDisabled" @click.native="okBtnHandleClick">确认</wx-button>
      </div>
    </div>
  </div>
</template>

<script>
  import DayPicker from './DayPicker'
  import TimePicker from './TimePicker2'
  import WxButton from './../../../../components/WxButton'

  export default {
    components: {
      DayPicker, TimePicker, WxButton
    },
    name: "DateTimePicker2",
    mounted() {

    },
    data() {
      return {
        dateTest: '',
        timeTest: '',
        btnDisabled: false,
      }
    },
    props: {
      defaultValue: String,
      popupVisible: Boolean
    },
    watch: {
      popupVisible(newVal, oldVal) {
        if (newVal) {
          console.log('时间控件打开 调整时间')
          this.test11()
          this.computedBtnDisabled()
        } else {
          console.log('时间控件关闭')
        }
      },
      // 传入时间发生改变 YYYY-MM-DD HH:mm
      defaultValue: {
        immediate: true,
        handler(newVal) {
          return;
          console.log('传入时间发生改变', newVal)
          this.test11()
          console.log('设置 时间 日期 组件', this.dateTest, this.timeTest)
          this.computedBtnDisabled()
          return
          if (newVal) {
            this.dateTest = moment(newVal).format('YYYY-MM-DD')
            this.timeTest = moment(newVal).format('HH:mm')
          } else {
            this.dateTest = moment().format('YYYY-MM-DD')
            this.timeTest = moment().format('HH:mm')
          }
          // this.dateTest = newVal ? moment(newVal).format('YYYY-MM-DD') : moment().add(0, 'days').format('YYYY-MM-DD')
          // this.timeTest = newVal ? moment(newVal).format('HH:mm') : moment().format('HH:mm')
          // this.dayPickerChange(moment(newVal).format('YYYY-MM-DD'))
        }
      }
    },
    methods: {
      filterMonth() {
        return moment(this.dateTest).format('YYYY 年 MM 月')
      },
      //判断回显时间是否在可用范围 在就回显  不在就调整
      test11() {
        const curTime = this.defaultValue ? moment(this.defaultValue) : moment()
        const hour = curTime.hour()
        const nowTime_2 = moment().add(2, 'hour')
        //时间在8点到20点之间 在当前2小时之后
        if (curTime > nowTime_2 && hour > 8 && hour < 20){
          //可用范围  不调整 直接回显
          console.log('可用范围  不调整 直接回显')
          const time_format = moment(curTime).format('YYYY-MM-DD HH:mm')
          this.dateTest = time_format.split(' ')[0]
          this.timeTest = time_format.split(' ')[1]
        }else {
          //不可用范围 调整
          console.log('不可用范围 调整')
          this.test1()
        }
      },
      //调整回显时间到可用范围
      test1() {
        // const curTime = this.defaultValue ? moment(this.defaultValue) : moment()
        const curTime = moment()
        const hour = curTime.hour()
        //18点到06点之间  调整到 下个 8点
        //18点到0点  第二天8点
        //0点到6点   今天8点
        //06点到18点之间  调整加2小时
        if (hour >= 18) {
          const time_format = moment(curTime).add(1, 'days').format('YYYY-MM-DD 08:00')
          this.dateTest = time_format.split(' ')[0]
          this.timeTest = time_format.split(' ')[1]
        } else if (hour >= 0 && hour < 6) {
          const time_format = moment(curTime).format('YYYY-MM-DD 08:00')
          this.dateTest = time_format.split(' ')[0]
          this.timeTest = time_format.split(' ')[1]
        } else if (hour >= 6 && hour <= 18) {
          const time_format = moment(curTime).add(2, 'hours').format('YYYY-MM-DD HH:mm')
          this.dateTest = time_format.split(' ')[0]
          this.timeTest = time_format.split(' ')[1]
        }
      },
      computedBtnDisabled() {
        const {dateTest, timeTest} = this
        const curTime = moment(`${dateTest} ${timeTest}`)
        const now = moment(moment('YYYY-MM-DD HH:mm')).toDate().getTime()
        const now_2 = moment(moment().add(2, 'hours').format('YYYY-MM-DD HH:mm')).toDate().getTime()
        //显示的时间  未来2小时 之前  按钮不可选
        if (curTime < now_2) {
          this.btnDisabled = true
        } else {
          this.btnDisabled = false
        }
        console.log('判断是否不可确认 btnDisabled', this.btnDisabled)
      },
      dayPickerChange(value) {
        console.log('日期选择组件  日期变化 dayPickerChange', value)
        this.dateTest = value
        this.computedBtnDisabled()
        return
        //如果 当天 && 大于当天16点 按钮不可选
        if (moment().format('YYYY-MM-DD') === value && moment() > moment(moment().format('YYYY-MM-DD 18:00'))) {
          this.timeTest = '20:00'
          // this.btnDisabled = true
        } else {
          // this.btnDisabled = false
        }
      },
      timePickerChange(value) {
        console.log('时分 组件 变化', value)
        this.timeTest = value
        this.computedBtnDisabled()
      },
      okBtnHandleClick() {
        const {dateTest, timeTest} = this
        if (dateTest && timeTest) {
          this.$emit('confirm', `${dateTest} ${timeTest}`)
        } else {
          console.log('dateTest, timeTest 为空')
        }
      }
    },

  }
</script>

<style scoped lang="sass" type="text/scss">
  @function px($px) {
    @return ($px/20)+rem;
  }

  .date-time-picker {
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

