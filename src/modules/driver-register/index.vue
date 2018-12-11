<template>
  <div class="register1">
    <div class="today" @click="tiggle">
      <!--<img src="./images/add.png" style="width:18px;vertical-align: sub;">-->
      <div>当日试乘试驾登记表</div>
      <div class="number" v-show="total!='0'">{{total}}</div>
    </div>

    <list-car :datas="list" @addform="addform"></list-car>

    <div class="createtable" @click="addformnull">创建空白登记表</div>
  </div>
</template>

<script>
  import {Toast, MessageBox} from "mint-ui";
  import util from '../../common/DMC.util.js'
  import listCar from "./components/listcar.vue";

  export default {
    name: "register1",
    components: {
      listCar
    },
    created() {
      end_time = new Date().getTime();
      console.log("index加载时间：", end_time - start_time, "ms");
    },
    beforeDestroy() {
      clearInterval(this.timer);
    },
    data() {
      return {
        wxPhone: util.getQueryValue('wxPhone'),//用户手机号
        wxUserId: util.getQueryValue('wxUserId'),//用户id
        total: 0,
        list: [
          // {
          //   name: "王  先生",
          //   type: "预约入店试驾",
          //   phone: "13677990765",
          //   time: "2018年9月20日  13:00"
          // }
        ]
      };
    },
    directives: {},
    watch: {},
    methods: {
      tiggle() {
        this.$router.push("/dailyregister?wxPhone=" + this.wxPhone + "&wxUserId=" + this.wxUserId);
      },
      addform(item) {
        this.$router.push("/driverform?wxPhone=" + this.wxPhone + "&wxUserId=" + this.wxUserId + "&phone=" + item.appointmentPhone + '&driveType=' + item.driveType + '&sex=' + item.sex + '&lastName=' + item.lastName + '&intentionCarModel=' + item.intentionCarModel + '&firstName=' + item.firstName);
      },
      addformnull() {
        this.$router.push("/driverform?wxPhone=" + this.wxPhone + "&wxUserId=" + this.wxUserId)
      },
      init() {
        var parmas1 = {
          'phone': this.wxPhone,
          'wxUserId': this.wxUserId,
          'page': 1,
          'limit': 10
        }
        this.http.post('queryTodayTestDrive', parmas1, res => {
          if (res.resultCode == '1') {
            this.total = res.data.total;
          }
        })
        // 请求c端预约进入的
        var parmas = {
          'phone': this.wxPhone,
          'wxUserId': this.wxUserId,
          // 'pageNum':1,
          // 'pageSize':10
        }
        this.http.get('queryAppointment', parmas, res => {
          if (res.resultCode == '1') {
            if (res.data) {
              this.list = res.data.list;
              // this.total=res.data.total;
            }
          } else {
            Toast({
              message: res.errMsg,
            });
          }
        })
      }
    },
    beforeMount() {
      $(document).attr("title", "试乘试驾登记");
    },

    mounted() {
      this.init()
    }
  };
</script>

<style lang="sass" scoped type="text/scss">
  @function px($px) {
    @return ($px/20)+rem;
  }

  .right {
    float: right !important;
  }

  .left {
    float: left !important;
  }

  .clearfix {
    overflow: auto;
    zoom: 1;
  }

  .register1 {
    height: 100vh;

    .today {
      height: px(54);
      /*line-height:px(54);*/
      margin-left: 23px;
      display: flex;
      align-items: center;
      background: url("./images/add.png") left/18px no-repeat;
      padding-left: 24px;

      .number {
        margin-left: 5px;
        border-radius: 50%;
        height: 18px;
        width: 18px;
        color: #fff;
        font-size: 12px;
        line-height: 18px;
        background: #B45F1A;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }

    .listcar {
      height: calc(100vh - 100px);
      overflow: auto;
    }

    .createtable {
      background: #B45F1A;
      border: 1px solid #B45F1A;
      border-radius: 3px;
      width: calc(100vw - 46px);
      font-size: 17px;
      color: #FFFFFF;
      padding: 10px 0;
      text-align: center;
      margin: 0 23px;
      position: absolute;
      bottom: 20px;
    }

  }

</style>
