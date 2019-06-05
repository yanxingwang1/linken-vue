<!-- 时间选择器 -->
<template>
  <div class="time-picker-wrap">
    <div id="demo-inline"></div>
    <!--<div v-if="disabled" class="time-picker-disabled"></div>-->
  </div>
</template>

<script>
  export default {
    name: "TimePicker",
    data() {
      return {
        timerIns: null,
      }
    },
    props: {
      defaultValue: String,
      dateValue: String,
      disabled: {
        type: Boolean,
        default: false
      },
    },
    watch: {
      dateValue: {
        immediate: false,
        handler(newVal, oldVal) {
          console.log('时分组件内 日期发生变化  dateValue', newVal)
          this.$nextTick(()=>{
            this.test1()
          })
          return
          if (moment().format('YYYY-MM-DD') === newVal) {
            if (moment() <= moment(moment().format('YYYY-MM-DD 18:00'))) {
              this.timerIns.option({
                invalid: [{start: '08:00', end: moment().add(2, 'hours').format('HH:mm')}],
              });
            }
          } else {
            this.timerIns.option({
              invalid: [],
            });
          }
        },
      },
      defaultValue(newVal) {
        console.log('时分组件 defaultValue change', newVal)
        this.timerIns.setVal(this.defaultValue)
      },
    },
    methods: {
      setVal(value) {
        console.log('设置 时分 值', value)
        this.timerIns.setVal(value)
      },
      //设置可选择的时间范围
      test1() {
        console.log('时间组件 设置可选择的时间范围')
        //今天 未来2小时 到 20点 可选
        //不是今天 08到20点
        if (moment().format('YYYY-MM-DD') === this.dateValue) {
          this.timerIns.option({
            invalid: [{start: moment().format('HH:mm'), end: moment().add(2, 'hours').format('HH:mm')}],
          });
        } else {
          this.timerIns.option({
            invalid: [],
          });
        }
      }

    },
    mounted() {
      this.timerIns = mobiscroll.time('#demo-inline', {
        display: 'inline',
        layout: 'liquid',
        rows: 3,
        height: 46,
        min: new Date(2000, 0, 1, 8, 0),
        max: new Date(2000, 0, 1, 20, 0),
        onChange: (event, inst) => {
          this.$emit('change', event.valueText)
          console.log('timerIns onChange', event.valueText)
        },
        onInit: (event, inst) => {
          const value = moment(inst.getVal(true)).format('HH:mm')
          this.$emit('change', value)
          console.log('timerIns onInit', value)
        }
      });


      return
      if (moment().format('YYYY-MM-DD') === this.dateValue) {
        if (moment() > moment(moment().format('YYYY-MM-DD 18:00'))) {
          this.timerIns.setVal('20:00')
        } else {
          this.timerIns.option({
            invalid: [{start: '08:00', end: moment().add(2, 'hours').format('HH:mm')}],
          });
        }
      } else {
        this.timerIns.setVal(this.defaultValue)
      }

      window.time = this
    }
  }
</script>

<style scoped lang="sass" type="scss">
  @function px($px) {
    @return ($px/20)+rem;
  }

  .time-picker-wrap {
    position: relative;
    height: px(230);
  }

  .time-picker-disabled {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    opacity: 0.6;
    background-color: rgba(255, 255, 255, 0.5);
  }
</style>
