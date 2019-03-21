<template>
  <div class="wholesaleTable">
    <!-- 展示类型 -->
    <div class="datetype">
      <div :class="{'active':timetype==1}" @click="touchfix('1')">日</div>
      <div :class="{'active':timetype==2}" @click="touchfix('2')">周</div>
      <div :class="{'active':timetype==3}" @click="touchfix('3')">月</div>
    </div>
    <!-- 展示控件 -->
    <date-picker @updatetime="updatetime" :timetype="Number(timetype)"></date-picker>

    <!-- 订单类型 -->
    <div class="saletype">
      <div :class="{'active':saletype==1}" @click="touchsale('1')">
        <div>零售</div>
      </div>
      <div class="mid" :class="{'active':saletype==2}" @click="touchsale('2')">
        <div>订单</div>
      </div>
      <div :class="{'active':saletype==3}" @click="touchsale('3')">
        <div>批售</div>
      </div>
    </div>
    <div>
      <car-map :cars="cars" v-if="JSON.stringify(cars)!='[]'"></car-map>
      <sale-map :item="treeData" v-if="JSON.stringify(treeData)!='{}'"></sale-map>
    </div>
  </div>
</template>

<script>
import DatePicker from "./components/DatePicker";
import CarMap from "./components/CarMap";
import SaleMap from "./components/SaleMap";

export default {
  data() {
    return {
      timetype: 1,
      startTime: new Date().toLocaleDateString(),
      endTime: new Date().toLocaleDateString(),
      saletype: 1,
      treeData: {},
      cars: [
        { img: "../images/car.png", name: "MKZ" },
        { img: "../images/car.png", name: "MKZ" },
        { img: "../images/car.png", name: "MKZ" },
        { img: "../images/car.png", name: "MKZ" },
        { img: "../images/car.png", name: "MKZ" }
      ]
    };
  },
  components: {
    DatePicker,
    CarMap,
    SaleMap
  },
  methods: {
    // 更新日期控件
    touchfix(value) {
      if (value == this.timetype) {
        //防止重复请求
        return;
      }
      this.timetype = value;
      // 初始化时间
      if (value == 1) {//日
        this.startTime = moment().format("YYYY-MM-DD");
        this.endTime = moment().format("YYYY-MM-DD");
      } else if (value == 2) {//周
        this.startTime = moment()
          .startOf("week")
          .format("YYYY-MM-DD");
        this.endTime = moment()
          .endOf("week")
          .format("YYYY-MM-DD");
      } else {//月
        this.startTime = moment()
          .startOf("month")
          .format("YYYY-MM-DD");
        this.endTime = moment()
          .endOf("month")
          .format("YYYY-MM-DD");
      }
      //  更新后台
      this.updatemsg();
    },
    // 更新零售方式
    touchsale(value) {
      if (value == this.saletype) {
        //防止重复请求
        return;
      }
      // 切换组件
      this.saletype = value;
      //  更新后台
      this.updatemsg();
    },
    // 修改日历控件触发回调
    updatetime(parmas) {
      if (parmas.timetype == 1) {
        //日
        this.startTime = parmas.date;
        this.endTime = parmas.date;
      } else if (parmas.timetype == 2) {
        //周
        this.startTime = parmas.week_s;
        this.endTime = parmas.week_e;
      } else {
        //月
        this.startTime = parmas.month_s;
        this.endTime = parmas.month_e;
      }
      //  更新后台
      this.updatemsg();
    },
    // 触发后台接口更新销售信息
    async updatemsg() {
      var parmas = {
        startTime: this.startTime,
        endTime: this.endTime,
        saletype: this.saletype,
        time: moment().format("YYYY-MM-DD HH时mm分ss秒")
      };
      console.log("===>请求后台", JSON.stringify(parmas));
      let res = await fetch("http://localhost:3003/info");
      let result = await res.json();
      this.treeData = result;
    }
  },
  mounted() {
    this.$nextTick(() => {
      //  更新后台
      setTimeout(() => {
        this.updatemsg();
      }, 1000);
    });
  }
};
</script>

<style lang="sass" type="text/scss"  scoped>

 .wholesaleTable{
   .datetype{
      display: flex;
      justify-content:space-around;
      height:44px;
      background: #F6F6F6;
      align-items:center;
     
      div{
           position: relative;
           color: #909090;
      }
      .active{
        color: #444344;
      }
      .active:after{
            content: '';
            position: absolute;
            left: -3px;
            bottom: -12px;
            width: 20px;
            height: 3PX;
            background-color: #B45F1A;

      }
   }
   

   .saletype{
       display: flex;
      justify-content:space-around;
      align-items:center;
      margin: 0 25px;
      border: 1px solid #979797;
      height:32px;
          >div{
           width: 34%;
           text-align: center;
           padding:5px 5px;
          }
      .mid {
        padding:5px 0;
          > div{
              border-left:1px solid #BABABA;
              border-right:1px solid #BABABA;
                  margin: 0 -1px;
          }
      }
      
      .active{
        background: #B45F1A;
        color:#fff;
        z-index: 1;
      }
      .mid.active > div{
         border-color: transparent;
      }
   }
  
 }
</style>
