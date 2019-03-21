<template>
  <div class="datepicker date-time-wrap">
    <div class="arrow arrow-l" @click="arrowLeftHandleClick(timetype)"></div>
    <!-- 日 -->
    <div v-if="timetype == 1" class="date-time-inner">
      <div @click="test_001" class="date-time-text">
        <div>{{date.format('YYYY-MM-DD')}}</div>
      </div>
    </div>
    <!--<el-date-picker-->
    <!--v-model="date"-->
    <!--:picker-options="startDatePicker"-->
    <!--type="date"-->
    <!--placeholder="选择日期"-->
    <!--@change="getdate(date)"-->
    <!--v-if="timetype == 1"-->
    <!--&gt;</el-date-picker>-->
    <!-- 周 -->
    <div v-else-if="timetype == 2" class="date-time-inner">
      <div @click="test_002" class="date-time-text">
        <div>{{week_s.format('YYYY-MM-DD')}}</div>
        <div>至</div>
        <div>{{week_e.format('YYYY-MM-DD')}}</div>
      </div>
    </div>
    <!--<el-date-picker-->
    <!--v-model="week"-->
    <!--:picker-options="startDatePicker"-->
    <!--type="week"-->
    <!--format="yyyy 第 WW 周"-->
    <!--placeholder="选择周"-->
    <!--@change="getdate(week)"-->
    <!--v-else-if="timetype == 2"-->
    <!--&gt;</el-date-picker>-->
    <!-- 月 -->
    <div v-else class="date-time-inner">
      <div @click="test_003" class="date-time-text">
        <div>{{month.format('YYYY-MM')}}</div>
      </div>
    </div>
    <div class="arrow arrow-r" @click="arrowRightHandleClick(timetype)"></div>
    <!--<el-date-picker v-model="month" type="month" placeholder="选择月" @change="getdate(month)" v-else></el-date-picker>-->
  </div>
</template>
<script>
  //计算下个或上个 自然周
  function nextWeek(_now, addNum) {
    const now = moment(_now)
    let s, e, s_, e_
    do {
      const thisWeek = naWeek(now)
      s = thisWeek[0]
      e = thisWeek[1]
      const nestWeek = naWeek(now.add(addNum, 'd'))
      s_ = nestWeek[0]
      e_ = nestWeek[1]
    }
    while (dateFormat(s) == dateFormat(s_) && dateFormat(e) == dateFormat(e_))
    console.log('nextWeek', s_, e_)
    return [s_, e_]

    function dateFormat(m) {
      return m.format('YYYY-MM-DD 星期dd')
    }
  }

  //计算当前时间的自然周
  function naWeek(now) {
    const week_start = moment(now).startOf('week')
    const week_end = moment(now).endOf('week')
    const month_start = moment(now).startOf('month')
    const month_end = moment(now).endOf('month')
    let s, e
    if (week_start.month() === week_end.month()) {
      s = week_start
      e = week_end
    } else if (week_start < month_start) {
      s = month_start
      e = week_end
    } else if (week_end > month_end) {
      s = week_start
      e = month_end
    }
    return [s, e]
  }

  export default {
    props: {
      timetype: Number
    },
    data() {
      return {
        startDatePicker: {
          disabledDate(time) {
            return time.getTime() > Date.now(); //不可选日期大于当天
          }
        },
        date: moment(),
        weekFlagDate: moment(),
        week_s: naWeek(this.weekFlagDate)[0],
        week_e: naWeek(this.weekFlagDate)[1],
        month: moment(),
      };
    },
    methods: {
      //计算自然周问题
      normalweek(start, end) {
        var month_s = moment(start).startOf("month"); //月初
        let week_s = start.diff(month_s, "days"); //当前时间到月初时间差
        let week_e = end.diff(month_s, "days"); //当前时间到月初时间差
        let diff = week_e - week_s;
        if (week_s > 7 && week_e > 7 && diff == 6) {
          //4-11
          this.week_s.add(-1, "w");
          this.week_e.add(-1, "w");
        } else if (week_s < 7 && week_e > 7) {
          //1-3
          this.week_s.add(`-${week_s}`, "d");
          this.week_e.add(-1, "w");
        } else if (week_s < 7 && week_e < 7) {
          //week_s<7&&week_e<7
          this.week_e.add(`-${week_e + 1}`, "d");
          let weekOfday = moment(this.week_d).format("E");
          this.week_s.add(`-${weekOfday}`, "d");
        } else {
          let weekOfday = moment(this.week_e).format("E");
          this.week_s.add(-1, "w");
          this.week_e.add(`-${weekOfday}`, "d");
        }
      },
      // 选中日期
      emitdate() {
        var parmas = {
          timetype: this.timetype,
          date: this.date.format("YYYY-MM-DD"),
          week_s: this.week_s.format("YYYY-MM-DD"),
          week_e: this.week_e.format("YYYY-MM-DD"),
          month_s: this.month.startOf("month").format("YYYY-MM-DD"),
          month_e: this.month.endOf("month").format("YYYY-MM-DD")
        };
        this.$emit("updatetime", parmas);
      },
      //时间减
      arrowLeftHandleClick(timetype) {
        // console.log("timetype", timetype);
        if (timetype == 1) {
          this.date.add(-1, "d");
        } else if (timetype == 2) {
          // this.normalweek(this.week_s, this.week_e);
          this.week_s = nextWeek(this.weekFlagDate, -1)[0]
          this.week_e = nextWeek(this.weekFlagDate, -1)[1]
          this.weekFlagDate = this.week_s
        } else if (timetype == 3) {
          this.month.add(-1, "M");
        }
        //强制刷新页面
        this.$forceUpdate();
        //广播数据
        this.emitdate();
      },
      //时间加
      arrowRightHandleClick(timetype) {
        // console.log("timetype", timetype);
        if (timetype == 1) {
          if (this.date.format("YYYY-MM-DD") == moment().format("YYYY-MM-DD")) {
            //如果显示时间大于等于当前时间
            return;
          }
          this.date.add(1, "d");
        } else if (timetype == 2) {
          if (this.week_e > moment()) {
            //如果显示当前周最后一天大于等于当前时间
            return;
          }
          this.week_s = nextWeek(this.weekFlagDate, 1)[0]
          this.week_e = nextWeek(this.weekFlagDate, 1)[1]
          this.weekFlagDate = this.week_s
        } else if (timetype == 3) {
          if (this.month.endOf("month") > moment()) {
            //如果显示当前月最后一天大于等于当前时间
            return;
          }
          this.month.add(1, "M");
        }
        //强制刷新页面
        this.$forceUpdate();
        //广播数据
        this.emitdate();
      },
      //日期选择（选一天）
      test_001() {
        /* const _this = this
           const defaultValue = this.date.toDate()
           $.calendar({
             defaultValue,
             controls: ['calendar'],
             callback: function (date) {
               console.log(date, $.type(date))
               if (date) {
                 _this.date = moment(date)
               } else {
                 //取消选择
               }
             }
           })*/
      },
      //日期选择 （选一周）
      test_002() {
        /*const _this = this
          const defaultValue = []
          for (let i = 0; i < 7; i++) {
            const currentValue = moment(this.week_s)
            defaultValue.push(currentValue.add(i, 'days').toDate())
          }
          $.calendar({
            controls: ['calendar'],
            selectType: 'week',
            defaultValue,
            firstSelectDay: 1,
            callback: function (date) {
              console.log(date, $.type(date))
              if (date) {
                _this.week_s = moment(date.shift())
                _this.week_s = moment(date.pop())
              } else {
                //取消选择
              }
            }
          })*/
      },
      //日期选择 （选月）
      test_003() {
        /*const _this = this
          const defaultValue = this.month.toDate()
          $.date({
            defaultValue,
            callback: function (date) {
              console.log(date, $.type(date))
              if (date) {
                _this.month = moment(date)
              } else {
                //取消选择
              }
            }
          })*/
      }
    },
    mounted() {
      window.app = this;
    }
  };
</script>
<style lang="sass" scope type="text/scss">
  /*.datepicker {*/
  /*text-align: center;*/
  /*background: #F6F6F6;*/
  /*margin: 5px 0;*/

  /*.el-input__inner {*/
  /*background-color: #F6F6F6;*/
  /*background-image: none;*/
  /*border: 1px solid #F6F6F6;*/
  /*}*/

  /*.el-date-editor.el-input {*/
  /*width: 100%;*/
  /*}*/
  /*}*/

  .date-time-wrap {
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 50px;

    .arrow {
      flex: 0 0 auto;
      width: 50px;
      height: 100%;
      background: url("./../images/forward.png") center/8px no-repeat;

      &.arrow-l {
        transform: rotate(180deg);
      }

      &.arrow-r {

      }
    }

    .date-time-inner {
      display: flex;
      position: relative;
      height: 100%;
      flex: 1 1 auto;
      justify-content: space-between;
      align-items: center;

      .date-time-text {
        width: 100%;
        display: flex;
        justify-content: space-around;
        align-items: center;
      }

    }
  }
</style>
