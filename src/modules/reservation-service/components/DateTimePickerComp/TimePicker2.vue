<!-- 时间选择器 -->
<template>
  <div class="time-picker-wrap">
    <div id="demo-inline"></div>
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
    },
    watch: {
      dateValue: {
        immediate: false,
        handler(newVal, oldVal) {
          console.log('dateValue', newVal)
          if (moment().format('YYYY-MM-DD') === newVal) {
            this.timerIns.option({
              invalid: [{start: '08:00', end: moment().add(2, 'hours').format('HH:mm')}],
            });
          } else {
            this.timerIns.option({
              invalid: [],
            });
          }
        },
      },

      defaultValue(newVal) {
        this.timerIns.setVal(this.defaultValue)
      },
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
          console.log('timerIns', event.valueText)
          this.$emit('change', event.valueText)
        },
        onInit: (event, inst) => {
          const value = moment(inst.getVal(true)).format('HH:mm')
          this.$emit('change', value)
          console.log('timerIns onInit',value)
        }
      });
      if (moment().format('YYYY-MM-DD') === this.dateValue) {
        this.timerIns.option({
          invalid: [{start: '08:00', end: moment().add(2, 'hours').format('HH:mm')}],
        });
      }else {
        this.timerIns.setVal(this.defaultValue)
      }
    }
  }
</script>

<style scoped lang="sass" type="scss">
  @function px($px) {
    @return ($px/20)+rem;
  }

  .time-picker-wrap {
    height: px(230);
  }
</style>
