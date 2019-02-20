<template>
  <div>
    <!-- <search></search> -->
    <div style="position: fixed;top: 0;left: 0;width: 100%;background: white;z-index: 999;">
      <div style="height:43.5px;line-height:43.5px;font-size:16px;">
        <div class="tag-choose-style" @click="changeStatus(1)">
          <span :class="{'choose-select-style':chooseStatus==1}">已支付</span>
          <!-- <span v-if="chooseStatus==1&&listLength>0" class="tag-number-style">{{listLength}}</span> -->
        </div>
        <div class="tag-choose-style" @click="changeStatus(3)">
          <span :class="{'choose-select-style':chooseStatus==3}">已退款</span>
          <!-- <span v-if="chooseStatus==3&&listLength>0" class="tag-number-style">{{listLength}}</span> -->
        </div>
      </div>
      <div style="width:100%;height:48px;background:#f8f8f8;padding:10px 0">
        <!-- <group title="1234"> -->
          <x-input v-model="queryParam.name" style="width:64%;float:left;background:white;margin-left:4%;height:28px;box-shadow: 0 0 3px 0 rgba(0,0,0,0.10);border-radius: 3px;" placeholder="搜索" @on-blur="queryList()">
            <img slot="label" style="display:block;" src="../../assets/img/search.png" width="15" height="15">
          </x-input>
          <n3-select v-model="queryParam.orderType" :cancelled="false" style="float:right;width:27%;margin-right:2%" @change='queryList()'>
            <n3-option value="1">全部</n3-option>
            <n3-option value="90031001">订金支付</n3-option>
          </n3-select>
        <!-- </group> -->
      </div>
    </div>
    <div style="margin-top:91.5px">
      <mt-loadmore :top-method="loadTop" :bottom-all-loaded="allLoaded" ref="loadmore" :topDistance="10"
      @top-status-change="handleTopChange">
        <div slot="top" class="mint-loadmore-top" style="margin-top:-50px;">
          <span v-show="topStatus !== 'loading'" :class="{ 'rotate': topStatus === 'drop' }" style="font-size: 12px;color: #555">刷新中...</span>
          <span v-show="topStatus === 'loading'" style="font-size: 12px;color: #555">刷新中...</span>
        </div>
        <div v-infinite-scroll="getNextList" infinite-scroll-disabled="loadingBottom" infinite-scroll-distance="80">
          <ul>
            
            <li :class="['clearfix']" v-for="(item,i) in orderAllList" :key="i" @click="gotoDetail(item.orderCode)">
              <section >
                <div >
                    <div>
                    </div>
                    <div style="line-height:45px;border-bottom: 1px solid #E2E2E2;">
                        <span style="font-size:14px;padding: 2px;border-radius: 2px;" 
                          :class="{'border-color-blue':'订金支付','border-color-grey':item.orderType=='维修订单','border-color-navy':item.orderType=='保养订单'}">{{item.orderType}}</span>
                        <span style="color:#C5824D;float:right;font-size:14px;">￥{{item.deposit|priceFormat}}</span>
                    </div>
                    <div style="font-size:15px;margin-top:10px;margin-bottom:4px;">
                        <span >客户称谓：{{item.lastName}}&nbsp;&nbsp;<span v-show="item.sex==0">先生</span><span v-show="item.sex==1">女士</span></span>
                        <!-- <span style="float:right;margin-right:1%;line-height: 60px;margin-top: -17px;" >{{item.tradeStatus}}</span> -->
                    </div>
                  
                </div>
                <div style="font-size:15px;margin-bottom:4px">
                  <div >订单车型：{{item.seriesName}}</div>
                </div>
                <div style="font-size:15px;margin-bottom:20px">
                  <div >支付时间：{{item.payTime}}</div>
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
    Tab,
    TabItem,
    Cell,
    Range,
    Rater,
    Toast,
    Alert,
    Group,
    CellFormPreview,
    XAddress,
    Loading,
    XInput,
    XButton,
    Confirm,
    Search
  } from 'vux'
  import util from '../../common/DMC.util'
  export default {
    name: "index",
    components: {
      Tab,
      TabItem,
      Cell,
      Range,
      Rater,
      Toast,
      Alert,
      Group,
      CellFormPreview,
      XAddress,
      Loading,
      XInput,
      XButton,
      Confirm,
      Search
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
        orderAllList:[],
        queryParam:{
          name:'',
          tradeStatus:'1',
          orderType:'1',
          phone:'',
          wxUserId:'',
          page:1,
          size:8
        },
        chooseStatus:'1',
        listLength:0,
        bottomContent:'暂无相关订单',
        topStatus:'',
        showLoading:true,
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
      //获取列表第一页
      queryOrder(){
        this.listLength=0;
        this.showLoading = true;
        this.queryParam.page = 1;

        this.loadEnd = false;
        this.loadingBottom = true;

        this.http.get("financeQueryOrder",this.queryParam,res=>{
          this.showLoading = false;
          this.loadingBottom = false;
          this.orderAllList = res.data.list;
          this.listLength =res.data.list.length;
          if(res.data.list.length>0){
            if (res.data.total <= this.queryParam.size) {
              this.loadEnd = true;
              this.allLoaded = true;
              this.bottomContent = '--END--';
            }else {
              this.bottomContent = '';
            }
          }else {
            this.bottomContent = '暂无相关订单';
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
        this.http.get("financeQueryOrder",this.queryParam,res=>{
          this.loadEnd = false;
          this.orderAllList = this.orderAllList.concat(res.data.list);
          var allPages = Math.ceil(res.data.total / this.queryParam.size);
          if (allPages <= this.queryParam.page) {
            this.loadingBottom = true;
            this.allLoaded = true;
            this.loadEnd = true;
            this.bottomContent = '--END--';
          }
          if(res.data.list.length>0){
          }else {
            this.bottomContent = '暂无相关订单';
          }
        })

      },
      gotoDetail(orderId){
        this.$router.push({name :'detail', query: { orderCode:orderId,returnBotton:true }});
      },
      queryList(){
        this.queryOrder();
      },
      changeStatus(status){
        this.chooseStatus = status;
        this.queryParam.tradeStatus = status+'';
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
      if(this.$route.query.type=='preview'){
        this.init();// this.carOwnerDto.totalPrice = (this.$route.query.money || 81500);
        this.configId = this.$route.query.id;
      }
    },
    beforeMount() {
      $(document).attr('title','订单');
    },
  

    mounted() {
      this.queryParam.phone = this.$route.query.mobile;
      this.queryParam.wxUserId = this.$route.query.userid;
      
          
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
  .choose-select-style {
    color:#B45F1A;
    border-bottom:2px solid #B45F1A;
    padding-bottom:8px;
  }
  .tag-choose-style {
    width:50%;float:left;
    text-align:center;
  }
  .tag-number-style {
    margin-left:5px;
    background:#B45F1A;
    border-radius: 40px;
    padding: 0px 5px;
    color:#ffffff;
    font-size:14px;
  }
</style>
