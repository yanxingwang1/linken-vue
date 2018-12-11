<template>
  <div>
    <div style="width:100%;height:60px;background:#e9e9e9;line-height:60px;padding:0 20px;">
        <div style="float:left;font-size:17px">{{orderDetail.tradeStatus}}</div>
        <div style="float:right;font-size:24px;color:#B96B2D">￥{{orderDetail.deposit|priceFormat}}</div>
    </div>
    <div>
        <div style="font-size:18px;text-align:center;color:#323232;padding:15px 0 0">
            <span style="padding-bottom: 10px;border-bottom: 1px solid #ebebeb;">
                {{orderDetail.model}}
            </span>
        </div>
        <img style="width:80%;margin-left:10%;margin-top:10px;" :src="orderDetail.thumbnail"/>
        <div @click="open()" style="font-size:14px;text-align:center;color:#323232;padding:5px 0 0">查看配置详情</div>
        <div style="text-align:center"><img style="width:18px;" src="../../assets/img/bottom-arrow-one.png" @click="open()"/></div>
        <div style="font-size:18px;margin-top:20px;margin-bottom:4px;">
        </div>
    
    </div>
    <div style="border:5px solid #f5f5f5"></div>
    <div style="width:90%;margin-left:5%;">
      <div style="font-size:16px;line-height:80px;border-bottom: 1px solid #A1A1A1;font-weight:700">
        <img style="width: 35px;" :src="require('assets/img/lincoln.png')"/>
        {{orderDetail.dealerName}}</div>
      <div style="margin-top:10px"><span class="detail-title-style">订单类型：</span><span class="detail-right">{{orderDetail.orderType}}</span></div>
      <div><span class="detail-title-style">订单编号：</span><span class="detail-right">{{orderDetail.orderCode}}</span></div>
      <div><span class="detail-title-style">订单时间：</span><span class="detail-right">{{orderDetail.createTime}}</span></div>
      <div v-show="orderDetail.tradeStatus=='已退款'"><span class="detail-title-style">退款时间：</span><span class="detail-right">{{orderDetail.refundTime}}</span></div>
      <div v-show="orderDetail.tradeStatus=='已取消'"><span class="detail-title-style">取消时间：</span><span class="detail-right">{{orderDetail.cancelTime}}</span></div>
      <div v-show="orderDetail.tradeStatus=='已支付'"><span class="detail-title-style">支付时间：</span><span class="detail-right">{{orderDetail.payTime}}</span></div>
    </div>
    <div v-show="orderDetail.tradeStatus=='已支付'" style="padding:0 5%;background:#F5F5F5;font-size:12px;color:#BA6F31;margin-top:10px;line-height: 45px;">您已成功支付订金，首席顾问师将会在24小时内与您联系</div>
    <transition name="back">
      <DialogBack v-show="vm.showDialog"></DialogBack>
    </transition>
    <transition name="fade">
      <Dialog
        @closeDialog="closeDialog"
        v-show="vm.showDialog"
        v-bind:carInfo="carInfo"
        v-bind:carList="carList"
        v-bind:model="modelName">
      </Dialog>
    </transition>
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
        orderDetail:{},
        orderId:'',
        from:'',
        vm: {
              showDialog: false,
            },
        carInfo:[],
        carList:[],
        modelName:'',
        showLoading:true
      }
    },
    directives: {
    },
    watch:{
      
    },
    methods: {
      init() {
        this.http.get("customerQueryOrderDetail",{orderCode:this.orderId,from:this.from},res=>{
          // res = {
          //       "resultCode": 1,
          //       "data": [
          //         {
          //           "series": "WSPAD-CC9-2018-LincolnMKZCHN",
          //           "model": "MKZ 尊雅版",
          //           "basePrice": "308,800",
          //           "optionTotalPrice": "2,000",
          //           "taxPrice": "26,564",
          //           "price": "337,364",
          //           "createDate": null,
          //           "thumbnail": "http://qa.wechat.lincoln.imagination-dev.cn/cms/api/thumb_images/jcljcypahxe8jm54yx6ky5pt/attachments/jcljlioshxe8jm54ybmc77yr",
          //           "list": [
          //             {
          //               "list": [
          //                 {
          //                   "name": "18\"高级铝合金轮毂",
          //                   "url": "http://qa.wechat.lincoln.imagination-dev.cn/cms/api/features/jcivjawbhxe8jm54y0sodyho/attachments/jcivkc0rhxe8jm54yhtqwfaj"
          //                 },
          //                 {
          //                   "name": "曜岩黑Deepsoft高级真皮打孔座椅",
          //                   "url": "http://qa.wechat.lincoln.imagination-dev.cn/cms/api/features/jcivjawthxe8jm54y8d4w8oq/attachments/jcivkc34hxe8jm54yg3m40ow"
          //                 },
          //                 {
          //                   "name": "抛光铝",
          //                   "url": "http://qa.wechat.lincoln.imagination-dev.cn/cms/api/features/jcivjb1bhxe8jm54y4zptwvn/attachments/jcivkcc8hxe8jm54yo1aew45"
          //                 },
          //                 {
          //                   "name": "电动单片天窗，带手动遮阳帘",
          //                   "url": "http://qa.wechat.lincoln.imagination-dev.cn/cms/api/features/jcivjb6nhxe8jm54y9knkkwh/attachments/jcivkclvhxe8jm54y1e4p7p5"
          //                 },
          //                 {
          //                   "name": "林肯高级音响系统（11个扬声器）",
          //                   "url": "http://qa.wechat.lincoln.imagination-dev.cn/cms/api/features/jcivjb70hxe8jm54yru6fazu/attachments/jcivkcmzhxe8jm54y7cjuqg1"
          //                 },
          //                 {
          //                   "name": "铂钻白",
          //                   "url": "http://qa.wechat.lincoln.imagination-dev.cn/cms/api/features/jcivjaskhxe8jm54ylkwofqh/attachments/jcivkbrfhxe8jm54ysphf1w9"
          //                 }
          //               ]
          //             }
          //           ],
          //           "features": [
          //             "星芒式LED前大灯",
          //             "电动单片天窗，带手动遮阳帘（标准配置）",
          //             "一体式设计电动全景天窗（可选配置）",
          //             "CCD连续可调阻尼悬挂系统",
          //             "ANC增强式主动噪音控制系统",
          //             "EPAS电子助力转向系统",
          //             "LED内舱氛围灯光（七色可选）",
          //             "苏格兰Bridge of Weir®出品Deepsoft高级真皮座椅",
          //             "特殊打孔纹样",
          //             "前排座椅加热功能",
          //             "林肯高级音响系统（11个扬声器）",
          //             "第三代SYNC® with MyLincoln Touch 多媒体通讯娱乐互动系统",
          //             "后排娱乐系统 (中央扶手)",
          //             "林肯车主应用",
          //             "主动泊车及驶离辅助系统",
          //             "Auto Hold自动驻车系统",
          //             "Personal Safety System 个人安全系统",
          //             "后排气囊式安全带",
          //             "BLIS®盲区监测系统，带两侧来车预警技术"
          //           ],
          //           "salesCaseID": "jn1cja0fiy5gjcvryti490hw",
          //           "priceSe": "2000",
          //           "tradeStatus": "已取消",
          //           "deposit": "0.01",
          //           "orderType": "订金订单",
          //           "orderCode": "B61o20181017155407519",
          //           "createTime": "2018年10月17日 15:54",
          //           "payTime": null,
          //           "dealerName": "林肯中心",
          //           "cancelTime": null
          //         }
          //       ],
          //       "errMsg": "",
          //       "time": "2018-10-22 16:31:14",
          //       "elapsedMilliseconds": 0,
          //       "success": true
          //     }
          this.showLoading = false;
          this.orderDetail = res.data[0];
          this.carInfo = res.data[0].features;
          this.carList = res.data[0].list[0].list;
          this.modelName = res.data[0].model;
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
      }
    },
    beforeMount() {
      $(document).attr('title','订单页面');
    },
  

    mounted() {
      this.orderId = this.$route.query.orderCode;
      this.from = this.$route.query.from;
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
    font-size: 14px;
    color:#A1A1A1;
  }
  .detail-right {
    line-height: 35px;
    font-size: 14px;
    float:right;
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
