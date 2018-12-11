<template>
  <div>
    <!-- <search></search> -->
    <div style="position: fixed;top: 0;left: 0;width: 100%;background: white;">
      <div style="width:100%;height:48px;background:#f8f8f8;padding:10px 0;">
        <!-- <group title="1234"> -->
          <x-input v-model="queryParam.name" style="width:64%;float:left;background:white;margin-left:4%;height: 28px;box-shadow: 0 0 3px 0 rgba(0,0,0,0.10);border-radius: 3px;" @on-blur="queryList()" placeholder="搜索">
            <img slot="label" style="display:block;" src="../../assets/img/search.png" width="15" height="15">
          </x-input>
          <n3-select v-model="queryParam.tradeStatus" :cancelled="false" style="float:right;width:27%;margin-right:2%" @change='queryList()'>
            <n3-option value="0">全部状态</n3-option>
            <n3-option value="1">已支付</n3-option>
            <n3-option value="2">已取消</n3-option>
            <n3-option value="3">已退款</n3-option>
          </n3-select>
        <!-- </group> -->
      </div>
    </div>
    <div style="margin-top:48px">
      <mt-loadmore :top-method="loadTop" :bottom-all-loaded="allLoaded" ref="loadmore" :topDistance="10"
      @top-status-change="handleTopChange">
        <div slot="top" class="mint-loadmore-top" style="margin-top:-50px;">
          <span v-show="topStatus !== 'loading'" :class="{ 'rotate': topStatus === 'drop' }" style="font-size: 12px;color: #555">刷新中...</span>
          <span v-show="topStatus === 'loading'" style="font-size: 12px;color: #555">刷新中...</span>
        </div>
        <div v-infinite-scroll="getNextList" infinite-scroll-disabled="loadingBottom" infinite-scroll-distance="80">
          <ul>
            
            <li :class="['clearfix']" v-for="(item,i) in orderList" :key="i" @click="gotoDetail(item.id)">
              <section>
                <div >
                    <div>
                        <!-- <img :src="item.iconsPhoto" alt=""> -->
                         <!-- <img src="../../assets/img/introduce/icon.png" alt=""> -->
                    </div>
                    <div style="line-height:45px;border-bottom: 1px solid #E2E2E2;">
                        <span style="font-size:12px;padding: 2px;border-radius: 2px;" 
                          :class="{'border-color-blue':item.orderType=='售后服务','border-color-grey':item.orderType=='维修订单','border-color-navy':item.orderType=='保养订单'}">{{item.orderType}}</span>
                       
                    </div>
                    <div style="font-size:15px;margin-top:20px;margin-bottom:4px;">
                        <span >客户称谓：{{item.dealerName}}</span>
                        <span style="float:right;margin-right:1%;line-height: 60px;margin-top: -17px;font-size:14px;" >{{item.tradeStatus}}</span>
                    </div>
                    <div style="font-size:15px;margin:4px 0;">
                         <span >预约时间：{{item.createTime}}</span>
                    </div>

                  
                </div>
                <div style="font-size:15px;margin-bottom:20px">
                  <div >服务类型：￥{{item.deposit}}</div>
                </div>
              </section>
              <div style="border-bottom:4px solid #f5f5f5"></div>
            </li>
            <div style="color:#9A9A9A;font-size:15px;text-align:center;padding:10px 0">{{bottomContent}}</div>
          </ul>
        </div>
      </mt-loadmore>

    </div>
    <loading :show="showLoading" text=""></loading>
  </div>
</template>

<script>
  import {
    Loading,
    XInput,
  } from 'vux'
  import util from '../../common/DMC.util'
  export default {
    name: "index",
    components: {
      Loading,
      XInput,
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
        orderList:[],
        queryParam:{
          name:'',
          tradeStatus:'0',
          page:1,
          size:8
        },
        bottomContent:'暂无订单记录',
        showLoading:true,
        topStatus:'',
        loadEnd: true,
        allLoaded:false,
        loadingBottom:false
      }
    },
    directives: {
    },
    watch:{
      
    },
    methods: {
      init() {
        this.queryOrder();
      },
      queryOrder(){
        this.showLoading = true;
        this.queryParam.page = 1;

        this.loadEnd = false;
        this.loadingBottom = true;

        this.http.get("customerQueryOrder",this.queryParam,res=>{
          this.showLoading = false;
          this.loadingBottom = false;
          this.orderList = res.data.list;
          
          if(res.data.list.length>0){
            if (res.data.total <= this.queryParam.size) {
              this.loadEnd = true;
              this.allLoaded = true;
              this.bottomContent = '--END--';
            }else {
              this.bottomContent = '';
            }
          }else {
            if(this.queryParam.tradeStatus!='0'||this.queryParam.name){
              this.bottomContent = '您还没有相关订单';
            }else {
              this.bottomContent = '暂无订单记录';
            }
          }
        });
      },
      loadBottom() {
        this.allLoaded = true; // 若数据已全部获取完毕
      },
      //资讯刷新翻页
      getNextList(){
        // this.queryOrder();
        if (this.loadEnd) {
          this.loadBottom();
          return;
        }
        this.loadEnd = true;
        this.queryParam.page++;
        // this.http.get("customerQueryOrder",this.queryParam,res=>{
          this.loadEnd = false;
          this.orderList = this.orderList.concat(res.data.list);
          var allPages = Math.ceil(res.data.total / this.queryParam.size);
          if (allPages <= this.queryParam.page) {
            this.loadingBottom = true;
            this.allLoaded = true;
            this.loadEnd = true;
            this.bottomContent = '--END--';
          }
          if(res.data.list.length>0){
          }else {
            this.bottomContent = '您还没有相关订单';
          }
        // })

      },
      gotoDetail(orderId){
        this.$router.push({name :'detail', query: { id:orderId }});
      },
      queryList(){
        this.queryOrder();
      },
      loadTop(){
        event.preventDefault();
        event.stopPropagation();
        this.queryOrder();
        this.$refs.loadmore.onTopLoaded();
      },
      handleTopChange(status){
        this.topStatus = status;
      }
          
    },
    activated: function () {
      // if(this.$route.query.type=='preview'){
      //   this.init();// this.carOwnerDto.totalPrice = (this.$route.query.money || 81500);
      //   this.configId = this.$route.query.id;
      // }
    },
    beforeMount() {
      $(document).attr('title','我的预约');
    },
  

    mounted() {
      this.orderList = [
          {
            "id": "10010102",
            "salesCaseId": "jmmr6l4oiy5gjcvryhwj47xd",
            "seriesName": "车型",
            "dealerCode": "LK180101",
            "dealerName": "王先生",
            "delearAdress": "长宁",
            "delearPhone": "121212",
            "deposit": "维修服务",
            "lastName": "姓",
            "firstName": "名",
            "phoneNum": "15201875715",
            "tradeStatus": "待确认",
            "orderType": "售后服务",
            "payTime": null,
            "createTime": "2018年10月22日 16:29",
            "remark": "备注",
            "refundTime": null,
            "openId": "omLPIwJR79Ox0a-1z1YLm8c-zOoQ",
            "orderCode": "lDoE20181022162907578",
            "cancelCime": null
          },
          {
            "id": "10010101",
            "salesCaseId": "jmmr6l4oiy5gjcvryhwj47xd",
            "seriesName": "车型",
            "dealerCode": "LK180101",
            "dealerName": "王先生",
            "delearAdress": "长宁",
            "delearPhone": "121212",
            "deposit": "维修服务",
            "lastName": "姓",
            "firstName": "名",
            "phoneNum": "15201875715",
            "tradeStatus": "待确认",
            "orderType": "售后服务",
            "payTime": null,
            "createTime": "2018年10月22日 16:27",
            "remark": "备注",
            "refundTime": null,
            "openId": "omLPIwJR79Ox0a-1z1YLm8c-zOoQ",
            "orderCode": "8Fho20181022162706731",
            "cancelCime": null
          },
      ];
      this.showLoading=false;
      // return this.$nextTick(() => this.init());
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
  
</style>
