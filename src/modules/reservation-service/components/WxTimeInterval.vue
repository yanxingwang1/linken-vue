<!-- 预约试驾时间选择 -->
<template>
  <div class="wx-time-interval" @touchmove.prevent>
    <div class="wx-title">选择预约时间</div>
    <div class="wx-calendar">
      <div class="wx-month">{{nowTime.label}}</div>
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
            <!-- today: item.isToday, -->
            <div
              :class="{active: item.isActive, disabled: item.isDisabled}"
            >{{`${item.day}`}}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="morn-after">
      <div class="morn" :class="{active:hourType===0}" @click="mornAfterHandleClick(0)">上午</div>
      <div class="after" :class="{active:hourType===1}" @click="mornAfterHandleClick(1)">下午</div>
    </div>
    <div class="hour-list" :class="{'hour-list-hidden':hourListHidden}">
      <div class="hour-list-item-wrap"
           v-for="(item,i) in hourList"
           v-if="item.type===hourType">
        <div class="hour-list-item"
             :class="{active:item.isActive,disabled:item.isDisabled}"
             :style="item.style"
             @click="hourListItemHandleClick(item,i)"
        >{{item.date}}
        </div>
      </div>
    </div>
    <div class="btn-wrap">
      <wx-button @click.native="okBtnHandleClick" :disabled="!nowTime.isfull">确认</wx-button>
    </div>
  </div>
</template>

<script>
  import WxButton from './../../../components/WxButton'

  //时间字典
  const hourListArr = [
    {isActive: false, date: "08:00", code: '31001001', type: 0, isDisabled: false},
    {isActive: false, date: "08:30", code: '31001002', type: 0, isDisabled: false},
    {isActive: false, date: "09:00", code: '31001003', type: 0, isDisabled: false},
    {isActive: false, date: "09:30", code: '31001004', type: 0, isDisabled: false},
    {isActive: false, date: "10:00", code: '31001005', type: 0, isDisabled: false},
    {isActive: false, date: "10:30", code: '31001006', type: 0, isDisabled: false},
    {isActive: false, date: "11:00", code: '31001007', type: 0, isDisabled: false},
    {isActive: false, date: "11:30", code: '31001008', type: 0, isDisabled: false},
    {isActive: false, date: "12:00", code: '31001009', type: 0, isDisabled: false},
    {isActive: false, date: "12:30", code: '31001010', type: 1, isDisabled: false},
    {isActive: false, date: "13:00", code: '31001011', type: 1, isDisabled: false},
    {isActive: false, date: "13:30", code: '31001012', type: 1, isDisabled: false},
    {isActive: false, date: "14:00", code: '31001013', type: 1, isDisabled: false},
    {isActive: false, date: "14:30", code: '31001014', type: 1, isDisabled: false},
    {isActive: false, date: "15:00", code: '31001015', type: 1, isDisabled: false},
    {isActive: false, date: "15:30", code: '31001016', type: 1, isDisabled: false},
    {isActive: false, date: "16:00", code: '31001017', type: 1, isDisabled: false},
    {isActive: false, date: "16:30", code: '31001018', type: 1, isDisabled: false},
    {isActive: false, date: "17:00", code: '31001019', type: 1, isDisabled: false},
    {isActive: false, date: "17:30", code: '31001020', type: 1, isDisabled: false},
    {isActive: false, date: "18:00", code: '31001021', type: 1, isDisabled: false},
    {isActive: false, date: "18:30", code: '31001022', type: 1, isDisabled: false},
    {isActive: false, date: "19:00", code: '31001023', type: 1, isDisabled: false},
    {isActive: false, date: "19:30", code: '31001024', type: 1, isDisabled: false},
    {isActive: false, date: "20:00", code: '31001025', type: 1, isDisabled: false}
  ]
  //获取相邻日期的数据
  const getDayByNum = function (Count) {
    let dd = new Date();
    dd.setDate(dd.getDate() + Count);//获取Count天后的日期
    let year = dd.getFullYear()
    let month = dd.getMonth() + 1; //获取当前月份
    let day = dd.getDate();      //获取当前月份的日期
    let week = dd.getDay();       //获取星期几
    let isActive = false;
    let isToday = false;
    let isDisabled = false
    month = month < 10 ? '0' + month : month;
    day = day < 10 ? '0' + day : day;
    // var week;
    switch (week) {
      case 0 :
        week = '日';
        break;
      case 1 :
        week = '一';
        break;
      case 2 :
        week = '二';
        break;
      case 3 :
        week = '三';
        break;
      case 4 :
        week = '四';
        break;
      case 5 :
        week = '五';
        break;
      case 6 :
        week = '六';
        break;
    }
    return {
      year, //年
      month, //月
      day, //日
      week, //星期
      isActive, //是否 高亮
      isToday, //是否 今天
      isDisabled //是否 禁用
    }
  }
  //获取 日历显示的14天日期数据
  const getCalendarDay = function () {
    let list = [];
    let count = -new Date().getDay()
    //时间
    for (let i = count; i < count + 14; i++) {
      let day = getDayByNum(i)
      if (i == 0) {
        day.isToday = true
      }
      if (i == 1) {
        day.isActive = true
      }
      if (i >= 1 && i <= 7) {
        day.isDisabled = false
      } else {
        day.isDisabled = true
      }
      list.push(day)
    }
    return list
  }

  export default {
    name: "WxTimeInterval",
    data() {
      return {
        hourType: 0,
        hourListHidden: false,
        //一周日期 星期 列表
        calendarDays: [],
        //上午:true or 下午：false
        mornAfter: true,
        hourList: hourListArr.concat([])
      }
    },
    props: {
      dealerCode: {
        type: String
      }
    },
    computed: {
      nowTime() {
        let year, month, day, week, time = '';
        const calendar = this.calendarDays.find((item) => {
          return item.isActive
        });
        const time_t = this.hourList.find((item) => {
          return item.isActive
        });
        if (calendar) {
          year = calendar.year
          month = calendar.month
          day = calendar.day
          week = calendar.week
        }
        if (time_t) {
          time = time_t.date
        }
        return {
          year, month, day, week, time,
          format: `${year}年${month}月${day}日星期${week} ${time}`,
          value: `${year}年${month}月${day}日 ${time}`,
          label: `${year}年${month}月`,
          date: new Date(`${year}/${month}/${day} ${time}`),
          isfull: time ? true : false,
        }
      }
    },
    mounted() {
      console.log('tp mounted')
      window.tp = this
      this.calendarDays = getCalendarDay()
    },
    watch: {
      dealerCode() {
        this.calendarDays.forEach((item, i) => {
          if (item.isActive) {
            this.calendarDaysItemHandleClick(item, i)
          }
        })
      }
    },
    methods: {
      //上午 下午 切换
      mornAfterHandleClick(type) {
        this.hourType = type
      },
      calendarDaysItemHandleClick(item, i) {
        if (item.isDisabled) {
          return
        }
        this.calendarDays.forEach((item, index) => {
          if (i == index) {
            item.isActive = true
          } else {
            item.isActive = false
          }
        })
        this.hourList.forEach((item => {
          item.isActive = false
        }))
        this.hourListHidden = true
        if (!this.dealerCode) {
          return
        }
        this.testHttp(this.dealerCode, `${item.year}-${item.month}-${item.day}`)
          .then((arr) => {
            console.log(arr)
            this.hourList.forEach(item => {item.isDisabled = false})
            arr.forEach((item, i) => {
              if (Number(item.amount) === 0) {//时间段不可选
                this.hourList.forEach((item2, j) => {
                  if (item2.code === item.booking_TIME) {
                    item2.isDisabled = true
                  }
                })
              }
            })
            this.hourListHidden = false
          })
      },
      hourListItemHandleClick(item, i) {
        if (item.isDisabled) {
          return
        }
        this.hourList.forEach((item, index) => {
          if (i == index) {
            item.isActive = true
          } else {
            item.isActive = false
          }
        })
      },
      okBtnHandleClick() {
        console.log(this.nowTime.format)
        this.$emit('timeIntervalChange', this.nowTime)
      },
      testHttp(dealerCode, AppointmentDate) {
        console.log('查询时间段参数', {dealerCode, AppointmentDate})
        return new Promise((resolve, reject) => {
          this.http.get('WBO1', {dealerCode, AppointmentDate}, res => {
            console.log('查询时间段', res)
            if (res.resultCode == '1') {
              if (res.data) {
                resolve(res.data)
              }
            } else {
              console.log('查询时间段 error')
            }
          })
        })

      }
    },
    components: {WxButton}
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


    .wx-calendar {
      position: relative;

      .wx-month {
        height: px(46);
        line-height: px(46);
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
    }

    .morn-after {
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: px(12);
      color: #686868;
      height: px(50);
      box-sizing: content-box;
      border-bottom: 1px solid #E2E2E2;

      .morn, .after {
        width: px(52);
        height: px(23);
        line-height: px(23);
        border: 1px solid #686868;
        border-radius: px(14);
        margin: 0 px(15);

        &.active {
          color: #B45F1A;
          border-color: #B45F1A;
          transition: all .2s ease;
        }
      }
    }

    .hour-list {
      position: relative;
      height: px(180);
      overflow: auto;
      color: #686868;
      font-size: px(12);
      padding: px(10) 0;

      &.hour-list-hidden {
        opacity: 0;
      }

      .hour-list-item-wrap {
        float: left;
        width: 20%;
        display: flex;
        justify-content: center;
        align-items: center;

        .hour-list-item {
          align-self: flex-start;
          width: px(60);
          height: px(20);
          margin: px(8) 0;
          line-height: px(20);
          border-radius: px(2);
          background-color: #F7F7F7;

          &.disabled {
            color: #CACACA;
          }

          &.active {
            color: #ffffff;
            background-color: #B45F1A;
            transition: all .2s ease;
          }
        }
      }
    }

    .btn-wrap {
      height: px(66);
      display: flex;
      align-items: flex-start;
    }

  }
</style>
