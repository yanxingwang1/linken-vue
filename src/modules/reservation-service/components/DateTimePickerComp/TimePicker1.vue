<template>
  <div>
    <div class="morn-after">
      <div class="morn" :class="{active:hourType===0}" @click="hourType=0">上午</div>
      <div class="after" :class="{active:hourType===1}" @click="hourType=1">下午</div>
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
  </div>
</template>

<script>
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

  export default {
    name: "TimePicker1",
    data() {
      return {
        hourType: 0,
        hourListHidden: false,
        hourList: [...hourListArr]
      }
    },
    props: {
      defaultValue: String,
      dealerCode: String, //查询参数：经销商代码
      AppointmentDate: String //查询参数：查询时间段 日期
    },
    computed: {},
    mounted() {

    },
    watch: {
      defaultValue(newVal) {
        this.setTime(newVal)
      },
      dealerCode(dealerCode) {
        const {AppointmentDate} = this
        if (dealerCode && AppointmentDate) {
          this.setEnabledTimer()
        }
      },
      AppointmentDate(AppointmentDate) {
        const {dealerCode} = this
        if (dealerCode && AppointmentDate) {
          this.setEnabledTimer()
        }
      }
    },
    methods: {
      /**
       * 设置选中 时间
       * @param date 09:00
       */
      setTime(time) {
        this.hourList.forEach((item, index) => {
          if (item.date === time) {
            item.isActive = true
          } else {
            item.isActive = false
          }
        })
      },
      test() {
        //全部取消选择
        this.hourList.forEach((item => {
          item.isActive = false
        }))
      },
      calendarDaysItemHandleClick(item, i) {
        this.hourListHidden = true
        this.testHttp().then((arr) => {
          this.hourList.forEach(item => {
            item.isDisabled = false
          })
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
        this.$emit('change', item.date)
      },
      setEnabledTimer() {
        this.hourListHidden = true
        this.testHttp().then((arr) => {
          this.hourList.forEach(item => {
            item.isDisabled = false
          })
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
      //查询时间段
      testHttp() {
        const {dealerCode, AppointmentDate} = this
        console.log('查询时间段参数', {dealerCode, AppointmentDate})
        return new Promise((resolve, reject) => {
          this.http.get('WBO1', {dealerCode, AppointmentDate}, res => {
            console.log('查询时间段结果', res)
            if (res.resultCode == '1') {
              if (res.data) {
                setTimeout(() => {
                  resolve(res.data)
                }, 1000)
              } else {
                console.log('查询时间段 error')
              }
            } else {
              console.log('查询时间段 error')
            }
          })
        })
      }
    },
  }
</script>

<style scoped lang="sass" type="scss">
  @function px($px) {
    @return ($px/20)+rem;
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
</style>
