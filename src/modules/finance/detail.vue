<template>
  <div style="position: absolute;top: 0;width: 100%;height:100%">
    <div style="width:100%;height:60px;background:#e9e9e9;line-height:60px;padding:0 20px;">
        <div style="float:left;font-size:16px">{{orderDetail.tradeStatus}}</div>
        <div class="color-brown" style="float:right;font-size:24px;">￥{{orderDetail.deposit|priceFormat}}</div>
    </div>
    <div class="main-div-style" style="line-height:65px;font-size:16px">
      <span class="color-brown">{{orderDetail.lastName}}&nbsp;&nbsp;<span v-show="orderDetail.sex==0">先生</span><span v-show="orderDetail.sex==1">女士</span></span>&nbsp;&nbsp;&nbsp;&nbsp;<a :href="'tel:' + orderDetail.phoneNum"><span style="color:#0BABFE;font-size:15px">{{orderDetail.phoneNum}}</span></a>
    </div>
    <div style="border:5px solid #f5f5f5"></div>
    <div class="main-div-style">
      <div style="margin-top:10px"><span class="detail-title-style">订单编号：</span><span class="detail-right">{{orderDetail.orderCode}}</span></div>
      <div @click="open()"><span class="detail-title-style">订单车型：</span><span class="detail-right color-brown">{{orderDetail.model}}</span><img v-show="orderDetail.model" style="margin-left: 5px;margin-bottom: 3px;width:20px" src="../../assets/img/jingtanhao.png"/></div>
      <div><span class="detail-title-style">创建时间：</span><span class="detail-right">{{orderDetail.createTime}}</span></div>
      <div><span class="detail-title-style">支付时间：</span><span class="detail-right">{{orderDetail.payTime}}</span></div>
      <div><span class="detail-title-style">订单备注：</span><span class="detail-right">{{orderDetail.remark}}</span></div>
    </div>
    <div v-show="orderDetail.tradeStatus&&!showReturnBotton">
      <div style="border:5px solid #f5f5f5;margin-top:10px"></div>
      <div class="main-div-style" style="margin-top:10px;"><span class="detail-title-style">退款时间：</span><span class="detail-right">{{orderDetail.refundTime}}</span></div>
    </div>
    <div v-show="orderDetail.tradeStatus&&showReturnBotton&&returnBotton">
      <div style="border:1px solid #e2e2e2;width:90%;margin-left:5%;margin-top:15px"></div>
      <div class="tui-kuan-style" @click="returnMoney()">退款</div>
    </div>
    <div class="main-div-style"></div>
    <confirm
      id="backMoneyCon"
      v-model="showConfirm"
      title="提示"
      @on-confirm="onConfirm"
      confirm-text="确认"
      cancel-text="取消">
        <p>是否确认退款？</p>
    </confirm>
    <!--  -->
    <transition name="back">
      <DialogBack v-show="vm.showDialog"></DialogBack>
    </transition>
    <transition name="fade">
      <DialogImg
        @closeDialog="closeDialog"
        v-show="vm.showDialog"
        v-bind:carInfo="carInfo"
        v-bind:carList="carList"
        v-bind:model="modelName"
        v-bind:imgUrl="imgUrl">
      </DialogImg>
    </transition>
    <alert v-model="showAlert" 
      :content="alertTitle" >
    </alert>
    <loading :show="showLoading" text=""></loading>
  </div>
</template>

<script>
  import {
    Confirm,
    Alert,
    Loading
  } from 'vux'
  import util from '../../common/DMC.util'
import { setTimeout } from 'timers';
  export default {
    name: "index",
    components: {
      Confirm,
      Alert,
      Loading
    },
    created() {
      end_time = new Date().getTime();
      console.log("index加载时间：", end_time - start_time, "ms");
    },
    beforeDestroy() {
      clearInterval(this.timer)
    },
    data() {
      return {
        orderDetail:{},
        orderId:'',
        vm: {
              showDialog: false,
            },
        carInfo:[],
        carList:[],
        modelName:'',
        imgUrl:'',
        showConfirm:false,
        showAlert:false,
        alertTitle:'',
        showReturnBotton:true,
        returnBotton:false,
        showLoading:true
      }
    },
    directives: {
    },
    watch:{
      
    },
    methods: {
      init() {
        this.http.get("financeQueryOrderDetail",{orderCode:this.orderId},res=>{
          this.showLoading = false;
          this.orderDetail = res.data[0];
          this.carInfo = res.data[0].features;
          this.carList = res.data[0].list[0].list;
          this.modelName = res.data[0].model;
          this.imgUrl  = res.data[0].thumbnail;
          if(this.orderDetail.tradeStatus=='已退款'){
            this.showReturnBotton = false;
          }else {
            this.showReturnBotton = true;
          }
        });
      },
      open() {
          this.vm.showDialog = true;
          $$.smartScroll($$('.borderInner').parent(), '.borderInner');
          $$('html').addClass('noscroll');
      },
      closeDialog(val) {
          this.vm.showDialog = val;
          $$('html').removeClass('noscroll');
      },
      returnMoney(){
        this.showConfirm = true;
      },
      onConfirm(){
        this.showLoading = true;
        this.http.get("cancelTrans",{orderCode:this.orderId},res=>{
          this.showLoading = false;
          this.showAlert = true;
          if(res.resultCode=='1'){
            this.alertTitle = '退款成功';
            this.init();
          }else {
            this.alertTitle = '退款失败';
          }
        },err=>{
          this.showLoading = false;
        });
      }
    },
    beforeMount() {
      $(document).attr('title','订单信息');
    },
  

    mounted() {
      try {
        this.orderId = this.$route.query.orderCode;
        this.returnBotton = this.$route.query.returnBotton;
      }catch(err) {

      }
      return this.$nextTick(() => this.init());
    }
  };

</script>

<style lang="sass" scoped>
  section {
    width:92%;
    margin-left:4%;
  }
  .border-color-blue {
    color:#18B0FF;
    border: 1px solid #18B0FF;
  }
  .border-color-grey {
    color:#CA8C5C;
    border: 1px solid #CA8C5C;
  }
  .border-color-navy {
    color:#505890;
    border: 1px solid #505890;
  }
  .detail-title-style {
    line-height: 35px;
    font-size: 15px;
    color:#808080;
  }
  .detail-right {
    line-height: 35px;
    font-size: 15px;
  }
  .main-div-style {
    width:90%;margin-left:5%;
  }
  .color-brown {
    color:#B45F1A;
  }
  .tui-kuan-style {
    font-size:17px;
    cololr:#ffffff;
    background:#B45F1A;
    color:#ffffff;
    line-height:45px;
    height:45px;
    width:84%;
    margin-left:8%;
    margin-top:30px;
    border-radius: 5px;
    text-align:center;
  }
  .fade-enter,.fade-leave-to {
    transform: translateY(100%);
    opacity: 0;
  }
  .fade-enter-active {
    transition:all 1s;
  }
  .fade-leave-active {
    transition: all 1s;
  }
  .back-enter,.back-leave-to {
    opacity: 0;
  }
  .back-enter-active {
    transition:all 1s;
  }
  .back-leave-active {
    transition: all 1s;
  }
  
</style>
