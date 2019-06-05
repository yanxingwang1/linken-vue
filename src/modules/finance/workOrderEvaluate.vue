<template>
  <div class="work-order-evaluate-index">
      <div class="work-order-evaluate-index-title">
        <div class="work-order-evaluate-index-title-user">尊敬的王先生</div>
        <div class="work-order-evaluate-index-title-text">{{welcomeWord}}</div>
      </div>
      <work-order-title title="工单号：">RO1904120005</work-order-title>
      <div class="work-order-evaluate-index-order">
          <work-order-detail title="车型名称：" detail="MKZ"></work-order-detail>
          <work-order-detail title="车牌号：" detail="沪B87654"></work-order-detail>
          <work-order-detail title="送修问题：" detail="车主手册增补"></work-order-detail>
          <work-order-detail title="检查结果：" detail="已发放车主手册增补活动相关内容"></work-order-detail>
          <work-order-detail title="生成时间：" detail="2019年5月17日 15:30"></work-order-detail>
      </div>
      <work-order-title title="项目及报价"></work-order-title>
      <work-project-detail name="后保险杠喷漆" number="1" price="2" :borderBottom="true"></work-project-detail>
      <work-project-detail name="后保险杠下端更换" number="1" price="2.2" :borderBottom="true"></work-project-detail>
      <work-project-detail name="后保险杠包围" number="1" price="1395.96" :borderBottom="false"></work-project-detail>
      <div class="work-order-evaluate-index-total">
          <div class="work-order-evaluate-index-total-inner">
              <work-total-price title="工时费：" detail="0"></work-total-price>
              <work-total-price title="维修零件费：" detail="1395.96"></work-total-price>
              <work-total-price title="附加费：" detail="0"></work-total-price>
              <div class="work-order-evaluate-index-total-inner-border"></div>
              <work-total-price title="合计金额：" detail="1395.96" :black="true"></work-total-price>
              <work-total-price title="优惠金额：" detail="0" :black="true">-</work-total-price>
              <work-total-price title="付费金额：" detail="1395.96" :black="true" :brown="true"></work-total-price>
          </div>
      </div>
      <!-- 用户确认 -->
      <div class="work-order-evaluate-index-button">
        <wx-button @click.native="submitOrder">确认报价</wx-button>
        <div class="work-order-evaluate-index-button-height"></div>
        <div class="work-order-evaluate-index-button-inner">
            <wx-button @click.native="submitOrder">联系服务工程师</wx-button>
        </div>
      </div>
  </div>
</template>

<script>

  import { Indicator } from "mint-ui";
  import WxButton from "./../../components/WxButton"
  import WorkOrderTitle from "./components/workOrderTitle"
  import WorkOrderDetail from "./components/workOrderDetail"
  import WorkProjectDetail from "./components/workProjectDetail"
  import WorkTotalPrice from "./components/workTotalPrice"
  export default {
    name: "workOrderEvaluate",
    components: {
      Indicator,
      WxButton,
      WorkOrderTitle,
      WorkOrderDetail,
      WorkProjectDetail,
      WorkTotalPrice
    },
    created() {
      end_time = new Date().getTime();
      console.log("workOrderEvaluate加载时间：", end_time - start_time, "ms");
    },
    beforeDestroy() {
      clearInterval(this.timer)
    },
    data() {
      return {
          welcomeWord: "请确认以下售后服务报价信息。",
      }
    },
    directives: {
    },
    watch:{
      
    },
    methods: {
      init() {
        // Indicator.open({
        //     spinnerType: "triple-bounce"
        // });
        Indicator.close();
      },
      submitOrder() {

      }
    },
    beforeMount() {
      $(document).attr('title','售后服务报价');
    },
  

    mounted() {
      return this.$nextTick(() => this.init());
    }
  };

</script>

<style lang="sass" scoped>
    @function px($px) {
        @return ($px/20) + rem;
    }
    .work-order-evaluate-index {
        &-title {
            padding: px(25) px(20);
            color: #1A1919;
            &-user {
                font-size:16px;
                font-family:PingFangSC-Medium;
                font-weight:bold;
            }
            &-text {
                font-size:14px;
                font-family:PingFangSC-Regular;
                font-weight:400;
                margin-top: px(15);
            }
        }
        &-order {
            padding: px(27) px(20);
        }
        &-total {
            padding: px(17) px(20) px(28);
            background: #F2F1ED;
            display: flex;
            flex-flow: row-reverse;
            &-inner {
                width:45%;
                &-border {
                    height: 1px;
                    background: #E4E4E4;
                    margin: px(8) 0;
                }
            }
        }
        &-button {
            padding: px(22);
            background-color: #FFFFFF;
            &-height {
                height: px(20);
            }
            &-inner {
                .mint-button{
                    background-color: #FFFFFF;
                    color: #b45f1a;
                    border: 1px solid #b45f1a;
                }
            }
        }
    }
  
</style>
