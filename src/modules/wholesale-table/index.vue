<template>
  <div class="wholesaleTable">
    <!-- 展示类型 -->
    <div class="datetype">
      <div class="active">日</div>
      <div class="active">周</div>
      <div class="active">年</div>
    </div>
    <!-- 展示控件 -->
    <date-picker></date-picker>

    <!-- 订单类型 -->
    <div class="saletype">
      <div class="active">零售</div>
      <div class="mid">订单</div>
      <div>批售</div>
    </div>
    <div>
      <sale-big-map></sale-big-map>
    </div>
  </div>
</template>

<script>
import DatePicker from "./components/DatePicker";
import SaleBigMap from "./components/SaleBigMap";
import SaleMidMap from "./components/SaleBigMap";
import SaleSmallMap from "./components/SaleBigMap";
export default {
  data() {
    return {};
  },
  components: {
    DatePicker,
    SaleBigMap
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
          div{
          //  border: 1px solid red;
           width: 33%;
           
           text-align: center;
           padding:5px 5px;
          }
      .mid{
          border-left:1px solid #BABABA;
           border-right:1px solid #BABABA;
           width: 34%;
      }
      .active{
        background: #B45F1A;
        color:#fff;
      }
   }
  
 }
</style>
