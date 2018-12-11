<template>
  <div>
    <div class="detail-header">
      <div>尊敬的王先生</div>
      <p>感谢您预约售后服务，上海永达林肯中心期待您的到访。</p>
   </div>

   <div class="detail-main">
     <div>上海永达林肯中心 
        
            <div class="right-arrow"></div>
       
     </div>
   </div>

   <div class="footer-step">
        <div class="steps">
          <div :class="step==1?'step active':'step'"  @click="change('1')"><img src="./images/delete.png" alt=""><span>已确认</span></div>
           <div class="arowright"></div>
            <div :class="step==2?'step active':'step'"  @click="change('2')"><img src="./images/delete.png" alt=""><span>已进厂</span></div>
           <div class="arowright"></div>
            <div :class="step==3?'step active':'step'"  @click="change('3')"><img src="./images/delete.png" alt=""><span>已完成</span></div>
        </div>
        <div class="step-detail" >
            <div class="info">
                <div>车型名称：MKZ</div>
                <div>车牌号：沪B87654</div>
                <div>进厂里程数：677km</div>
                <div>联系电话：13688775678</div>
                <div>代步车：申请</div>
            </div>
            <div class="info repare" v-show='step!=1'>
              <div>服务类型：维修</div>
              <div>服务工程师：张三</div>
              <div>预约交车时间：2018年9月28日 10:30</div>
              <div>备注：啦啦啦啦啦啦啦啦啦</div>
            </div>
            <div class="tips info" v-show='step==3'>
                  <div class="tip-info">
                       <div>等待维修</div>
                        <div>等待维修</div>
                        <div>等待维修</div>
                         <div>等待维修</div>
                  </div>
                  <div class="tip-line">
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                  </div>
                  <div class="tip-time">
                        <div>2018年9月28日 10:30</div>
                         <div>2018年9月28日 10:30</div>
                          <div>2018年9月28日 10:30</div>
                           <div>2018年9月28日 10:30</div>
                  </div>


            </div>
        </div>
   </div>
    <loading :show="showLoading" text=""></loading>
  </div>
</template>

<script>

  import {
    Loading
  } from 'vux'
  import util from '../../common/DMC.util'
  export default {
    name: "index",
    components: {
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
        showLoading:false,
        step:1
      }
    },
    directives: {
    },
    watch:{
      
    },
    methods: {
      init() {
   
      },
      change(value){
          this.step=value
      }
     
    },
    beforeMount() {
      $(document).attr('title','售后预约');
    },
  

    mounted() {
      this.orderId = this.$route.query.orderCode;
      this.from = this.$route.query.from;
      return this.$nextTick(() => this.init());
    }
  };

</script>

<style lang="sass" scoped>
@function px($px) {
  @return ($px/20) + rem;
}
 .detail-header{
   font-family: PingFangSC-Medium;
   font-size: 16px;
    color: #323232;
    padding:20px 15px;
    border-bottom:10px solid #f5f5f5;
    P{
      font-family: PingFangSC-Regular;
      font-size: 15px;
      color: #323232;
      letter-spacing: 0.4px;
      text-align: justify;
      line-height: 30px;
      margin-top:10px;
       margin-bottom:0px;
    }
 }

 .detail-main{
    padding:20px 15px;
    border-bottom:10px solid #f5f5f5;
    font-family: PingFangSC-Medium;
    font-size: 16px;
    color: #B45F1A;
    letter-spacing: 0;
      /*右箭头*/
     .right-arrow {
              display: inline-block;
              position: relative;
              width: 25px;
              height: 25px;
              margin-right: 20rpx;
              float: right
        }

        .right-arrow::after {
                display: inline-block;
                content: " ";
                height: 15px;
                width: 15px;
                border-width: 2px 2px 0 0;
                border-color: #B45F1A;
                border-style: solid;
                transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);
                position: absolute;
                top: 50%;
                right: 6px;
                margin-top: -9px;
        }
 }
 .footer-step{
    padding:20px 15px;
     .steps{
       display: flex;
       justify-content: space-between;
          align-items: center;
    }
    // 自定义样式
    .step{
      display:flex;
      width:px(60);
      height:px(60);
      border-radius:50%;
      border: 1px solid #B45F1A;
        background: #fff;
        color: #B45F1A;
      flex-direction: column; 
      align-items:center;
      justify-content: space-around; 
          padding: 12px 0;
      img{
        width:16px;

      }
      span{
        font-size:12px;
        // color:#fff;
      }
    }
    .active{
      background: #B45F1A;
      color:#fff;
    }
    .tips{
        display: flex;
        justify-content: start;
      .tip-info{
            display: flex;
            flex-direction: column;
             >div{
                  margin-bottom: 15px;
            }
      }
      .tip-line{
            display: flex;
            flex-direction: column;
            margin: 5px 15px;
            >div{
                  height: 30px;
                border: 1px solid #FFB57B;
            }
      }
      .tip-time{
            display: flex;
            flex-direction: column;
            >div{
                  margin-bottom: 15px;
            }
      }

    }
    .arowright{
      display:inline-block;
      border: 1px solid #A1A1A1;
      width:px(52);
      height:1px;
      // margin-top:px(30);
      align-items:center;
    }
    .step-detail{
      background: #EBEBEB;
      border-radius: 10px;
      margin-top:20px;
      padding-bottom:0.75rem;
    }
 }
  
</style>
