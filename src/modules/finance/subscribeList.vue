<template>
  <div class="subscribe-index">
    <!-- <search></search> -->
    <div style="position: fixed;top: 0;left: 0;width: 100%;background: white;">
      <div style="width:100%;height:48px;background:#f8f8f8;padding:10px 0">
        <!-- <group title="1234"> -->
          <x-input ref="inputChange" v-model="queryParam.name" style="width:37%;transition: all 0.5s;float:left;background:white;margin-left:3%;height:28px;box-shadow: 0 0 3px 0 rgba(0,0,0,0.10);border-radius: 3px;" placeholder="搜索" :show-clear="false" @on-click-clear-icon="clearIcon()" @on-focus="changeLength()" @on-blur="onBlur()">
            <img slot="label" style="display:block;" src="../../assets/img/search.png" width="15" height="15">
          </x-input>
          <n3-select v-show="!focusInput" v-model="queryParam.serviceType" :cancelled="false" style="float:right;width:27%;margin-right:2%" @change='queryList()'>
            <n3-option value="">全部预约</n3-option>
            <n3-option value="1">维修服务</n3-option>
            <n3-option value="2">保养服务</n3-option>
            <n3-option value="3">检查服务</n3-option>
            <n3-option value="4">其他服务</n3-option>
          </n3-select>
          <n3-select v-show="!focusInput" v-model="queryParam.status" :cancelled="false" style="float:right;width:27%;margin-right:2%" @change='queryList()'>
            <n3-option value="">全部状态</n3-option>
            <n3-option v-if="type=='director'" value="10661003">已确认</n3-option>
            <n3-option value="10661000">已进场</n3-option>
            <n3-option value="10661004">已完成</n3-option>
            <n3-option v-if="type=='director'" value="10661006">已取消</n3-option>
          </n3-select>
      </div>
      <div class="subscribe-main">
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
  export default {
    name: "index",
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
          htmlNodata: '<p class="upwarp-nodata">——END——</p>'
        },
        subscribeList:[],
        queryParam:{
          name:'',
          status:'',
          serviceType:'',
          phone:'',
          wxUserId:'',
        },
        topStatus:'',
        showLoading:false,
        focusInput:false,
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
        
        // 服务工程师
        if(this.type=='service'){
          this.http.get('getAftersaleList',this.queryParam,res=>{
            if(res.resultCode==1){
              this.subscribeList = res.data;
              mescroll.endByPage(res.data.length,1)
              // mescroll.endSuccess(this.subscribeList.length);
            }else {

            }
            for(var i = 0;i<this.subscribeList.length;i++){
              if(!this.subscribeList[i].id){
                this.subscribeList[i+1]['showMarTop'] = false;
                i = i+1;
              }else {
                this.subscribeList[i]['showMarTop'] = 'show';
              }
            }
          }).catch(()=>{mescroll.endSuccess(0)});
        }
        // 服务总监
        else if(this.type=='director'){
          this.http.get('getAftersaleAllList',this.queryParam,res=>{
            if(res.data){
              this.subscribeList = res.data;
              mescroll.endByPage(res.data.length,1)
              // mescroll.endSuccess(this.subscribeList.length);
            }
            for(var i = 0;i<this.subscribeList.length;i++){
              if(!this.subscribeList[i].id){
                this.subscribeList[i+1]['showMarTop'] = false;
                i = i+1;
              }else {
                this.subscribeList[i]['showMarTop'] = 'show';
              }
            }
          }).catch(()=>{mescroll.endSuccess(0)});
        }
      },
      gotoDetail(orderId){
        if(orderId){
          this.$router.push({name :'subscribeDetail', query: { orderCode:orderId}});
        }
      },
      clearIcon(){
        var _this = this;
        // this.$refs.inputChange.$el.className = 'vux-x-input weui-cell';
        setTimeout(function(){
          _this.onBlur();
        }
        ,100);
      },
      onBlur(){
        var _this = this;
        this.$refs.inputChange.$el.className = 'vux-x-input weui-cell';
        setTimeout(function(){
          _this.focusInput = false;
        }
        ,500);
        this.scrollUpAction({num:0,size:10},this.mescroll);
      },
      queryList(){
        this.scrollUpAction({num:0,size:10},this.mescroll);
      },
      changeLength(){
        this.focusInput = true;
        this.$refs.inputChange.$el.className = 'vux-x-input weui-cell add-width';
      }
    },
    beforeMount() {
      $(document).attr('title','售后预约');
    },
  

    mounted() {
      this.queryParam.phone = this.$route.query.mobile;
      this.queryParam.wxUserId = this.$route.query.userid;
      this.type = this.$route.query.type;


          
    //   return this.$nextTick(() => this.init());
    }
  };

</script>

<style lang="sass" scoped>
  .subscribe-index {
    .subscribe-main {
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
  }
</style>
