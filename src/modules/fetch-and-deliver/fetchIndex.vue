<template>
  <!-- 服务总监取送车列表 -->
  <div class="fetch-deliver-index">
    <!-- <search></search> -->
    <div style="position: fixed;top: 0;left: 0;width: 100%;background: white;">
      <div style="width:100%;height:48px;background:#f8f8f8;padding:10px 0">
        <!-- <group title="1234"> -->
          <x-input v-model="queryParam.pram" style="width:64%;float:left;background:white;margin-left:4%;height: 28px;box-shadow: 0 0 3px 0 rgba(0,0,0,0.10);border-radius: 3px;" @on-blur="queryList()" placeholder="搜索">
            <img slot="label" style="display:block;" src="../../assets/img/search.png" width="15" height="15">
          </x-input>
          <n3-select v-model="queryParam.orderStatus" :cancelled="false" style="float:right;width:27%;margin-right:2%" @change='queryList()'>
            <n3-option value="">全部状态</n3-option>
            <n3-option value="90041001">待确认</n3-option>
            <n3-option value="90041002">派单中</n3-option>
            <n3-option value="90041003">已接单</n3-option>
            <n3-option value="90041004">订单开启</n3-option>
            <n3-option value="90041005">代驾中</n3-option>
            <n3-option value="90041006">已到达</n3-option>
            <n3-option value="90041007">已完成</n3-option>
            <n3-option value="90041008">已取消</n3-option>
          </n3-select>
      </div>
      <div class="fetch-deliver-main">
        <div class="scroll-view" :class="{empty:subscribeList.length==0}">
          <mescroll-vue ref="mescroll" :down="mescrollDown" :up="mescrollUp" @init="mescrollInit">
            <div id="empty-wrap"></div>
            <ListCell
              v-for="(item,i) in subscribeList"
              :key="i"
              :subscribe="item"
              :index="i"
              @click.native="gotoDetail(item.id)"
            ></ListCell>
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
  import ListCell from './components/ListCell'
  import MescrollVue from 'mescroll.js/mescroll.vue'
  import { setTimeout } from 'timers';
  // import {list} from './mock/fetchList';
  export default {
    name: "fetchIndex",
    components: {
      Loading,
      XInput,
      ListCell,
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
          orderStatus:'',
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
        if(this.queryParam.pram||this.queryParam.orderStatus){
          this.mescrollUp.empty.tip = '您还没有相关送车订单';
        }else {
          this.mescrollUp.empty.tip = '您还没有送车订单';
        }
        // 服务总监
        this.http.get('fetchAndDeliverList',this.queryParam,res=>{
          if(res.data.data){
              this.subscribeList = res.data.data;
              mescroll.endByPage(res.data.data.length,1)
              // mescroll.endSuccess(this.subscribeList.length);
          }else {
              this.subscribeList = [];
              mescroll.endByPage(0,1)
          }
          // this.subscribeList = list;
          // mescroll.endByPage(this.subscribeList.length,1);
          for(var i = 0;i<this.subscribeList.length;i++){
              if(!this.subscribeList[i].id){
                this.subscribeList[i+1]['showMarTop'] = false;
                i = i+1;
              }else {
                this.subscribeList[i]['showMarTop'] = 'show';
              }
          }
        }).catch(()=>{mescroll.endSuccess(0)});
      },
      gotoDetail(orderId){
        if(orderId){
          this.$router.push({name :'orderDetail', query: { orderId:orderId,position:'inspector'}});
        }
      },
      queryList(){
        this.scrollUpAction({num:0,size:10},this.mescroll);
      }
    },
    beforeMount() {
      $(document).attr('title','取送车服务');
    },
  

    mounted() {
      this.queryParam.moble = this.$route.query.wxPhone;
      this.queryParam.wxUserId = this.$route.query.wxUserId;


          
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
    .add-width {
      width:95%!important;
    }
    .small-select-width {
      width:0!important;
      margin-right: 0!important;
    }
  }
</style>
