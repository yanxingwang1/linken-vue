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
               v-for="(item,i) in weeksList"
               @click="weekListItemHandleClick(item,i)"
          >
            <div
              :class="{ today: item.isToday, active: item.isActive, disabled: item.isDisabled}"
            >{{`${item.day}`}}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="morn-after">
      <div class="morn" :class="{active:this.mornAfter}" @click="mornAfterHandleClick(true)">上午</div>
      <div class="after" :class="{active:!this.mornAfter}" @click="mornAfterHandleClick(false)">下午</div>
    </div>
    <div class="hour-list">
      <div class="hour-list-item"
           v-for="(item,i) in hourList"
           :class="{active:item.isActive}"
           :style="item.style"
           @click="hourListItemHandleClick(i)"
      >{{item.date}}
      </div>
    </div>
    <div class="btn-wrap">
      <wx-button @click.native="okBtnHandleClick" :disabled="!nowTime.isfull">确认</wx-button>
    </div>
  </div>
</template>

<script>
  import WxButton from './../../../components/WxButton'

  let morningArr = [
    {"isActive": false, "date": "08:00"},
    {"isActive": false, "date": "08:30"},
    {"isActive": false, "date": "09:00"},
    {"isActive": false, "date": "09:30"},
    {"isActive": false, "date": "10:00"},
    {"isActive": false, "date": "10:30"},
    {"isActive": false, "date": "11:00"},
    {"isActive": false, "date": "11:30"},
    {"isActive": false, "date": "12:00"},
    {"isActive": false, "date": "12:30", style: {visibility: 'hidden'}}
  ];
  let afternoonArr = [
    {"isActive": false, "date": "12:30"},
    {"isActive": false, "date": "13:00"},
    {"isActive": false, "date": "13:30"},
    {"isActive": false, "date": "14:00"},
    {"isActive": false, "date": "14:30"},
    {"isActive": false, "date": "15:00"},
    {"isActive": false, "date": "15:30"},
    {"isActive": false, "date": "16:00"},
    {"isActive": false, "date": "16:30"},
    {"isActive": false, "date": "17:00"},
    {"isActive": false, "date": "17:30"},
    {"isActive": false, "date": "18:00"},
    {"isActive": false, "date": "18:30"},
    {"isActive": false, "date": "19:00"},
    {"isActive": false, "date": "19:30"},
    {"isActive": false, "date": "20:00"}
  ]
  export default {
    name: "WxTimeInterval",
    data() {
      return {
        //一周日期 星期 列表
        weeksList: [],
        //上午:true or 下午：false
        mornAfter: true,
        hourList: morningArr.concat()
      }
    },
    computed: {
      nowTime() {
        let year, month, day, time = '';
        const weekday = this.weeksList.find((item) => {
          return item.isActive
        });
        const time_t = this.hourList.find((item) => {
          return item.isActive
        });
        if (weekday) {
          year = weekday.year
          month = weekday.month
          day = weekday.day
        }
        time = time_t ? time_t.date : ''
        return {
          format: `${year}-${month}-${day} ${time}`,
          value: `${year}年${month}月${day}日 ${time}`,
          label: `${year}年${month}月`,
          isfull: time ? true : false
        }
      }
    },
    mounted() {
      this.weeksList = this.getWeeksList()
    },
    methods: {
      okBtnHandleClick() {
        console.log(this.nowTime.format)
        this.$emit('timeIntervalChange', this.nowTime.format)
      },
      hourListItemHandleClick(i) {
        this.hourList.map((item, index) => {
          if (i == index) {
            item.isActive = true
          } else {
            item.isActive = false
          }
        })
      },
      //weekListItemHandleClick
      weekListItemHandleClick(item, i) {
        if (item.isDisabled) {
          return
        }
        this.weeksList.map((item, index) => {
          if (i == index) {
            item.isActive = true
          } else {
            item.isActive = false
          }
        })
      }
      ,
      mornAfterHandleClick(flag) {
        if (flag) {
          this.hourList = morningArr.concat()
        } else {
          this.hourList = afternoonArr.concat()
        }
        this.mornAfter = flag
      },
      getWeeksList() {
        let list = [];
        let count = -new Date().getDay()
        //时间
        for (let i = count; i < count + 14; i++) {
          let day = this.GetDateStr(i)
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
      },
      GetDateStr(Count) {
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
        return {year, month, day, week, isActive, isToday, isDisabled}
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
      display: flex;
      justify-content: space-between;
      align-content: flex-start;
      flex-wrap: wrap;
      height: px(140);
      overflow: auto;
      color: #686868;
      font-size: px(12);
      padding: px(10) 0;

      .hour-list-item {
        align-self: flex-start;
        width: px(60);
        height: px(20);
        margin: px(5) 0;
        line-height: px(20);
        border-radius: px(2);
        background-color: #F7F7F7;

        &.active {
          color: #ffffff;
          background-color: #B45F1A;
          transition: all .2s ease;
        }
      }
    }

    .btn-wrap {
      height: px(106);
      display: flex;
      align-items: center;
    }

  }
</style>
