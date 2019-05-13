<template>
  <div class="datepicker date-time-wrap">
    <div :class="{'arrow arrow-l':timetype != 1}" @click="arrowLeftHandleClick(timetype)"></div>
    <!-- 日 -->
    <div v-if="timetype == 1" class="date-time-inner">
      <div @click="test_001" class="date-time-text">
        <div>{{date.format('YYYY-MM-DD')}}</div>
      </div>
    </div>
    <!-- 周 -->
    <div v-else-if="timetype == 2" class="date-time-inner">
      <div @click="test_002" class="date-time-text">
        <div>{{week_s.format('YYYY-MM-DD')}}</div>
        <div>至</div>
        <div>{{week_e.format('YYYY-MM-DD')}}</div>
      </div>
    </div>
    <!-- 月 -->
    <div v-else-if="timetype == 3" class="date-time-inner">
      <div @click="test_003" class="date-time-text">
        <div>{{month.format('YYYY-MM')}}</div>
      </div>
    </div>
    <!-- 季度 -->
    <div v-else-if="timetype == 4" class="date-time-inner">
      <div @click="test_003" class="date-time-text">
        <div>{{quarter_s.format('YYYY-MM')}}</div>
        <div>至</div>
        <div>{{quarter_e.format('YYYY-MM')}}</div>
      </div>
    </div>
    <div
      ref="arrowRight"
      :class="{'arrow':timetype != 1,'arrow-r':forward}"
      @click="arrowRightHandleClick(timetype)"
    ></div>
  </div>
</template>
<script>
import { debug } from "util";
//计算下个或上个 自然周
function nextWeek(_now, addNum) {
  const now = moment(_now);
  let s, e, s_, e_;
  do {
    const thisWeek = naWeek(now);
    s = thisWeek[0];
    e = thisWeek[1];
    const nestWeek = naWeek(now.add(addNum, "d"));
    s_ = nestWeek[0];
    e_ = nestWeek[1];
  } while (dateFormat(s) == dateFormat(s_) && dateFormat(e) == dateFormat(e_));
  // console.log("nextWeek", s_, e_);
  return [s_, e_];

  function dateFormat(m) {
    return m.format("YYYY-MM-DD 星期dd");
  }
}
// 计算当前周
function thisWeek(_now, addNum) {
  const now = moment(_now);
  let s, e, s_, e_;
  do {
    const thisWeek = naWeek(now);
    s = thisWeek[0];
    e = thisWeek[1];
    const nestWeek = naWeek(now.add(addNum, "d"));
    s_ = nestWeek[0];
    e_ = nestWeek[1];
  } while (dateFormat(s) == dateFormat(s_) && dateFormat(e) == dateFormat(e_));
  // console.log("nextWeek", s_, e_);
  return [s, e];

  function dateFormat(m) {
    return m.format("YYYY-MM-DD 星期dd");
  }
}

//计算当前时间的自然周
function naWeek(now) {
  const week_start = moment(now).startOf("week");
  const week_end = moment(now).endOf("week");
  const month_start = moment(now).startOf("month");
  const month_end = moment(now).endOf("month");
  let s, e;
  if (week_start.month() === week_end.month()) {
    s = week_start;
    e = week_end;
  } else if (week_start < month_start) {
    s = month_start;
    e = week_end;
  } else if (week_end > month_end) {
    s = week_start;
    e = month_end;
  }
  return [s, e];
}

export default {
  props: {
    timetype: Number
  },
  data() {
    const date = moment();
    var spectial = false;
    var weekFlagDate;
    if (moment().format("E") == "7" && moment().format("HH") >= "20") {
      spectial = true; //标记周日八点以后可以查看当周报表
      weekFlagDate = thisWeek(moment(), -1)[0];
    } else {
      spectial = false;
      weekFlagDate = nextWeek(moment(), -1)[0];
    }

    const week_s = naWeek(weekFlagDate)[0];
    const week_e = naWeek(weekFlagDate)[1];

    // const month = moment().add(-1, "M");
    const month = moment();
    return {
      date,
      weekFlagDate,
      week_s,
      week_e,
      month,
      month_t: month.format("MM"),
      quarter_count: 0,
      spectial: spectial
      // quarter_s: moment().startOf("quarter")
    };
  },
  watch: {
    timetype(val, oldVal) {
      console.log(
        "timetype change",
        this.quarter_s.startOf("quarter").format("YYYY-MM-DD")
      );
      this.emitdate();
    }
  },
  computed: {
    forward() {
      //timetype  week_e  month
      let flag = false;
      if (this.timetype === 2) {
        //周
        if (this.spectial) {
          if (
            this.week_e.format("YYYY-MM-DD") ===
            thisWeek(moment(), -1)[1].format("YYYY-MM-DD")
          ) {
            flag = true;
          }
        } else {
          if (
            this.week_e.format("YYYY-MM-DD") ===
            nextWeek(moment(), -1)[1].format("YYYY-MM-DD")
          ) {
            flag = true;
          }
        }
      } else if (this.timetype === 3) {
        //月
        if (this.month_t === moment().format("MM")) {
          flag = true;
        }
      } else if (this.timetype === 4) {
        //季度
        if (
          this.quarter_e.format("YYYY-MM-DD") ===
          moment()
            .endOf("quarter")
            .format("YYYY-MM-DD")
        ) {
          flag = true;
        }
      }
      return flag;
    },
    //季度范围
    quarter_s() {
      return moment()
        .add(this.quarter_count, "quarters")
        .startOf("quarter");
    },
    quarter_e() {
      return moment(this.quarter_s).endOf("quarter");
    }
  },
  methods: {
    // 选中日期
    emitdate() {
      var parmas = {
        timetype: this.timetype,
        date: this.date.format("YYYY-MM-DD"),
        week_s: this.week_s.format("YYYY-MM-DD"),
        week_e: this.week_e.format("YYYY-MM-DD"),
        month_s: this.month.startOf("month").format("YYYY-MM-DD"),
        month_e: this.month.endOf("month").format("YYYY-MM-DD"),
        quarter_s: this.quarter_s.format("YYYY-MM-DD")
      };

      this.$emit("updatetime", parmas);
    },
    //时间减
    arrowLeftHandleClick(timetype) {
      if (timetype == 1) {
      } else if (timetype == 2) {
        this.week_s = nextWeek(this.weekFlagDate, -1)[0];
        this.week_e = nextWeek(this.weekFlagDate, -1)[1];
        this.weekFlagDate = this.week_s;
      } else if (timetype == 3) {
        this.month.add(-1, "M");
        this.month_t = this.month.format("MM");
      } else if (timetype == 4) {
        this.quarter_count -= 1;
      }
      //强制刷新页面
      this.$forceUpdate();
      //广播数据
      this.emitdate();
    },
    //时间加
    arrowRightHandleClick(timetype) {
      if (timetype == 1) {
        if (this.date.format("YYYY-MM-DD") == moment().format("YYYY-MM-DD")) {
          return;
        }
        this.date.add(1, "d");
      } else if (timetype == 2) {
        if (this.spectial) {
          if (
            this.week_e.format("YYYY-MM-DD") ===
            thisWeek(moment(), -1)[1].format("YYYY-MM-DD")
          ) {
            return;
          }
        } else {
          if (
            this.week_e.format("YYYY-MM-DD") ===
            nextWeek(moment(), -1)[1].format("YYYY-MM-DD")
          ) {
            return;
          }
        }
        this.week_s = nextWeek(this.weekFlagDate, 1)[0];
        this.week_e = nextWeek(this.weekFlagDate, 1)[1];
        this.weekFlagDate = this.week_s;
      } else if (timetype == 3) {
        if (this.month.format("MM") === moment().format("MM")) {
          return;
        }

        this.month.add(1, "M");
        this.month_t = this.month.format("MM");
      } else if (timetype == 4) {
        if (
          this.quarter_e.format("YYYY-MM-DD") ===
          moment()
            .endOf("quarter")
            .format("YYYY-MM-DD")
        ) {
          return;
        }
        this.quarter_count += 1;
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
    this.emitdate();
  }
};
</script>
<style lang="sass" scope type="text/scss">


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
         background: url("./../images/unforward.png") center/8px no-repeat;
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
