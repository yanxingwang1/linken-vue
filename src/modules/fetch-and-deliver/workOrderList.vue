<template>
  <!-- 工单列表 -->
  <div class="fetch-deliver-index">
    <!-- <search></search> -->
    <div style="position: fixed;top: 0;left: 0;width: 100%;background: white;">
      <div style="width:100%;height:48px;background:#f8f8f8;padding:10px 0">
        <!-- <group title="1234"> -->
          <x-input v-model="queryParam.pram" style="width:64%;float:left;background:white;margin-left:4%;height: 28px;box-shadow: 0 0 3px 0 rgba(0,0,0,0.10);border-radius: 3px;" @on-blur="queryList()" placeholder="搜索">
            <img slot="label" style="display:block;" src="../../assets/img/search.png" width="15" height="15">
          </x-input>
          <n3-select v-model="queryParam.prams" :cancelled="false" style="float:right;width:27%;margin-right:2%" @change='queryList()'>
            <n3-option value="">全部工单</n3-option>
            <n3-option value="12781001">送车服务</n3-option>
          </n3-select>
      </div>
      <div class="fetch-deliver-main">
        <div class="scroll-view" :class="{empty:subscribeList.length==0}">
          <mescroll-vue ref="mescroll" :down="mescrollDown" :up="mescrollUp" @init="mescrollInit">
            <div id="empty-wrap"></div>
            <list-cell-work-order
              v-for="(item,i) in subscribeList"
              :key="i"
              :subscribe="item"
              :index="i"
              @click.native="gotoDetail(item)"
            ></list-cell-work-order>
          </mescroll-vue>
        </div>
      </div>
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
  import ListCellWorkOrder from './components/ListCellWorkOrder'
  import MescrollVue from 'mescroll.js/mescroll.vue'
  import { setTimeout } from 'timers';
  // import {workOrderList} from './mock/fetchList';
  export default {
    name: "fetchIndex",
    components: {
      Loading,
      XInput,
      ListCellWorkOrder,
      MescrollVue
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
        mescrollDown: {
          // use: false
        },
        mescrollUp: {
          page: {
            num: 0, //当前页 默认0,回调之前会加1; 即callback(page)会从1开始
            size: 10 //每页数据条数,默认10
          },
          callback: this.scrollUpAction,
          noMoreSize: 5,
          empty: {
            //列表第一页无任何数据时,显示的空提示布局; 需配置warpId才显示
            warpId: 'empty-wrap', //父布局的id (1.3.5版本支持传入dom元素)
            // icon: require('./imgs/dd@3x.png'),//"../imgs/dd@3x.png", //图标,默认null,支持网络图
            tip: '您还没有预约订单' //提示
          },
          htmlNodata: '<p class="upwarp-nodata">— —END— —</p>'
        },
        subscribeList:[],
        queryParam:{
          pram:'',
          prams:'',
          moble:'',
          wxUserId:'',
        },
        topStatus:'',
        showLoading:false,
        type:''
      }
    },
    directives: {
    },
    watch:{

    },
    methods: {
      init() {
      },
      mescrollInit(mescroll) {
        this.mescroll = mescroll
      },

      scrollUpAction(page,mescroll) {
        if(this.queryParam.pram||this.queryParam.prams){
          this.mescrollUp.empty.tip = '您还没有相关工单';
        }else {
          this.mescrollUp.empty.tip = '您还没有工单';
        }
        // 工单列表
        this.http.get('workOrderList',this.queryParam,res=>{
          if(res.data.data){
              this.subscribeList = res.data.data;
              mescroll.endByPage(res.data.data.length,1)
              // mescroll.endSuccess(this.subscribeList.length);
          }else {
              this.subscribeList = [];
              mescroll.endByPage(0,1)
          }
          // this.subscribeList = workOrderList;
          // mescroll.endByPage(this.subscribeList.length,1);
        }).catch(()=>{mescroll.endSuccess(0)});
      },
      gotoDetail(orderItem){
        if(orderItem){
          // this.$router.push({name :'createSendOrder', query: orderItem}); this.$route.params;
          if(this.$route.query.id){//修改或者从新下单
            // this.$router.push({path :`createSendOrder?id=${this.$route.query.id}`});
            this.$router.push({name :'createSendOrder',query:{id:this.$route.query.id,way:'list',roNo:orderItem.roNo,dealerCode:orderItem.dealerCode}});
          }else{//第一次进入创建
           
            this.$router.push({name :'createSendOrder', query:{way:'list',roNo:orderItem.roNo,dealerCode:orderItem.dealerCode}});
          }
         
        }
      },
      queryList(){
        this.scrollUpAction({num:0,size:10},this.mescroll);
      }
    },
    beforeMount() {
      $(document).attr('title','工单列表');
    },


    mounted() {
      var wxUserIdMoble = JSON.parse(window.sessionStorage.getItem("wxUserIdMoble"));
      this.queryParam.moble = wxUserIdMoble.moble;
      this.queryParam.wxUserId = wxUserIdMoble.wxUserId;

      return this.$nextTick(() => this.init());
    }
  };

</script>

<style lang="sass" scoped>
  .fetch-deliver-index {
    .fetch-deliver-main {
      position: relative;
      height: calc(100vh - 48px);
      width: 100vw;
      overflow: auto;

      .scroll-view {
        height: 100%;
        background-color: #F5F5F5;

        &.empty {
          background-color: white;
        }

        #empty-wrap {
          display: flex;
          justify-content: center;
          align-items: center;
        }
      }
    }
  }
</style>
