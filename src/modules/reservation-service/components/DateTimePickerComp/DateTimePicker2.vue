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
        @change="timePickerChange"
      ></time-picker>
      <div class="btn-wrap">
        <wx-button @click.native="okBtnHandleClick" :disabled="false">确认</wx-button>
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
    data() {
      return {
        dateTest: this.defaultValue ? moment(this.defaultValue).format('YYYY-MM-DD') : moment().format('YYYY-MM-DD'),
        timeTest: this.defaultValue ? moment(this.defaultValue).format('HH:mm') : moment().format('HH:mm'),
      }
    },
    props: {
      defaultValue: String,
    },
    watch: {
      defaultValue(newVal) {
        this.dateTest = newVal ? moment(newVal).format('YYYY-MM-DD') : moment().add(0, 'days').format('YYYY-MM-DD')
        this.timeTest = newVal ? moment(newVal).format('HH:mm') : moment().format('HH:mm')
      }
    },
    methods: {
      filterMonth() {
        return moment(this.dateTest).format('YYYY 年 MM 月')
      },
      dayPickerChange(value) {
        console.log('dayPickerChange', value)
        this.dateTest = value
      },
      timePickerChange(value) {
        console.log('timePickerChange', value)
        this.timeTest = value
      },
      okBtnHandleClick() {
        const {dateTest, timeTest} = this
        if (dateTest && timeTest) {
          this.$emit('confirm', `${dateTest} ${timeTest}`)
        } else {
          console.log('dateTest, timeTest 为空')
        }
      }
    }
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

