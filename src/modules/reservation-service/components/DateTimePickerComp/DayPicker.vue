<!-- 日期选择器 -->
<template>
  <div class="week-days-wrap">
    <div class="week-list">
      <div class="week-day">日</div>
      <div class="week-day">一</div>
      <div class="week-day">二</div>
      <div class="week-day">三</div>
      <div class="week-day">四</div>
      <div class="week-day">五</div>
      <div class="week-day">六</div>
    </div>
    <div class="days">
      <div class="day"
           v-for="(item,i) in calendarDays"
           @click="calendarDaysItemHandleClick(item,i)"
      >
        <div
          :class="{active: item.isActive, disabled: item.isDisabled}"
        >{{`${item.day}`}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>

  //获取相邻日期的数据
  const getDayByNum = function (Count) {
    const dd = moment().add(Count, 'days')
    const date = dd.format('YYYY-MM-DD')
    const year = dd.format('YYYY')
    const month = dd.format('MM')
    const day = dd.format('D')
    const week = dd.format('dd')
    const isActive = false;
    const isToday = false;
    const isDisabled = false
    return {
      date,
      year, //年
      month, //月
      day, //日
      week, //星期,
      isActive, //是否 高亮
      isToday, //是否 今天
      isDisabled //是否 禁用
    }
  }

  export default {
    name: "DayPicker",
    data() {
      return {
        calendarDays: this.getCalendarDay()
      }
    },
    props: {
      defaultValue: {
        type: String
      },
      valid: {
        type: Array,
        default(){
          return [0, 6]
        }
      }
    },
    watch: {
      defaultValue: {
        immediate: true,
        handler(newVal) {
          this.setDate(newVal)
        }
      }
    },
    methods: {
      //获取 日历显示的14天日期数据
      getCalendarDay() {
        let list = [];
        let count = -new Date().getDay()
        //时间
        for (let i = count; i < count + 14; i++) {
          let day = getDayByNum(i)
          if (i == 0) {
            day.isToday = true
          }
          // if (i == 1) {
          //   day.isActive = true
          // }
          if (i >= this.valid[0] && i <= this.valid[1]) {
            day.isDisabled = false
          } else {
            day.isDisabled = true
          }
          list.push(day)
        }
        return list
      },
      calendarDaysItemHandleClick(item, i) {
        if (item.isDisabled) return
        const _item = this.calendarDays.find((item) => {
          return item.isActive === true
        })
        if (_item === item) return
        //console.log('calendarDaysItemHandleClick')
        this.calendarDays.forEach((item, index) => {
          if (i == index) {
            item.isActive = true
          } else {
            item.isActive = false
          }
        })
        this.$emit('change', item.date)
      },
      /**
       * 设置选中时间
       * @param date 2018-04-04
       */
      setDate(date) {
        this.calendarDays.forEach((item, index) => {
          if (item.date === date) {
            item.isActive = true
          } else {
            item.isActive = false
          }
        })
      }
    },
    mounted() {
      // this.calendarDays = getCalendarDay()
      this.setDate(this.defaultValue)
      this.$emit('change', this.defaultValue)
    }
  }
</script>

<style scoped lang="sass" type="scss">
  @function px($px) {
    @return ($px/20)+rem;
  }

  .week-days-wrap {
    background-color: #F7F7F7;
    padding: px(10) px(5);

    .week-list {
      display: flex;
      align-items: center;

      .week-day {
        width: 14.28571428571%;
        height: px(30);
        line-height: px(30);

        &:last-child {
          /*display: none;*/
        }
      }
    }

    .days {
      display: flex;
      flex-wrap: wrap;

      .day {
        width: 14.28571428571%;
        flex: 0 0 auto;
        height: px(30);
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: px(12);

        & > div {
          width: px(21);
          height: px(21);
          line-height: px(21);
          border-radius: 50%;
          box-sizing: content-box;
        }

        .disabled {
          color: #CACACA;
        }

        .today {
          color: #323232;
          border: 1px solid #323232;
        }

        .active {
          border: 1px solid #B45F1A;
          background-color: #B45F1A;
          color: #ffffff;
          transition: all .2s ease;
        }

      }
    }
  }

</style>
