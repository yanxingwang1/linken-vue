<template>
  <div class="subscribe-index">
    <!-- <search></search> -->
    <div style="position: fixed;top: 0;left: 0;width: 100%;background: white;">
      <div style="width:100%;height:48px;background:#f8f8f8;padding:10px 0">
        <!-- <group title="1234"> -->
          <x-input id="inputChangeInput" ref="inputChange" v-model="queryParam.name" style="width:37%;transition: all 0.5s;float:left;background:white;margin-left:3%;height:28px;box-shadow: 0 0 3px 0 rgba(0,0,0,0.10);border-radius: 3px;" placeholder="搜索" :show-clear="true" @on-click-clear-icon="clearIcon()" @on-focus="changeLength()" @on-blur="onBlur()">
            <img slot="label" style="display:block;" src="../../assets/img/search.png" width="15" height="15">
          </x-input>
          <n3-select ref="selectFirst" v-model="queryParam.serviceType" :cancelled="false" style="float:right;width:27%;margin-right:2%;transition: all 0.5s;" @change='queryList()'>
            <n3-option value="">全部预约</n3-option>
            <n3-option value="1">维修</n3-option>
            <n3-option value="2">保养</n3-option>
            <n3-option value="3">检查</n3-option>
            <n3-option value="4">其他</n3-option>
          </n3-select>
          <n3-select ref="selectSecond" v-model="queryParam.status" :cancelled="false" style="float:right;width:27%;margin-right:2%;transition: all 0.5s;" @change='queryList()'>
            <n3-option value="">全部状态</n3-option>
            <n3-option v-if="type=='director'" value="10661003">已确认</n3-option>
            <n3-option value="10661000">已进厂</n3-option>
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
              :profession="type"
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

  // import {subscribeListMock} from './mock/register.data'

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
          htmlNodata: '<p class="upwarp-nodata">— —END— —</p>'
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
        if(this.queryParam.name||this.queryParam.status||this.queryParam.serviceType){
          this.mescrollUp.empty.tip = '您还没有相关预约订单';
        }else {
          this.mescrollUp.empty.tip = '您还没有预约订单';
        }
        // 服务工程师
        if(this.type=='service'){
          this.http.get('getAftersaleList',this.queryParam,res=>{
            if(res.data){
              this.subscribeList = res.data;
              mescroll.endByPage(res.data.length,1)
              //方法一(推荐): 后台接口有返回列表的总页数 totalPage
              //self.mescroll.endByPage(curPageData.length, totalPage); //必传参数(当前页的数据个数, 总页数)
          
              //方法二(推荐): 后台接口有返回列表的总数据量 totalSize
              //self.mescroll.endBySize(curPageData.length, totalSize); //必传参数(当前页的数据个数, 总数据量)
                        
              //方法三(推荐): 您有其他方式知道是否有下一页 hasNext
              //self.mescroll.endSuccess(curPageData.length, hasNext); //必传参数(当前页的数据个数, 是否有下一页true/false)
                        
              //方法四 (不推荐),会存在一个小问题:比如列表共有20条数据,每页加载10条,共2页.如果只根据当前页的数据个数判断,则需翻到第三页才会知道无更多数据,如果传了hasNext,则翻到第二页即可显示无更多数据.
              //self.mescroll.endSuccess(curPageData.length)

            }else {
              this.subscribeList = [];
              mescroll.endByPage(0,1)
            }

            // mock 数据开始
            // this.subscribeList = subscribeListMock;
            // mescroll.endByPage(this.subscribeList.length,1);
            // mock 数据结束

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
            }else {
              this.subscribeList = [];
              mescroll.endByPage(0,1)
            }

            // mock 数据开始
            // this.subscribeList = subscribeListMock;
            // mescroll.endByPage(this.subscribeList.length,1);
            // mock 数据结束

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
          this.$router.push({name :'subscribeDetail', query: { orderCode:orderId,profession:this.type}});
        }
      },
      clearIcon(){
      },
      onBlur(){
        this.$refs.inputChange.$el.className = 'vux-x-input weui-cell';
        this.$refs.selectFirst.$el.className = 'n3-btn-group n3-select-group';
        this.$refs.selectSecond.$el.className = 'n3-btn-group n3-select-group';
        this.scrollUpAction({num:0,size:10},this.mescroll);
      },
      queryList(){
        this.scrollUpAction({num:0,size:10},this.mescroll);
      },
      changeLength(){
        this.$refs.inputChange.$el.className = 'vux-x-input weui-cell add-width';
        this.$refs.selectFirst.$el.className = 'n3-btn-group n3-select-group small-select-width';
        this.$refs.selectSecond.$el.className = 'n3-btn-group n3-select-group small-select-width';
      }
    },
    beforeMount() {
      $(document).attr('title','售后预约');
    },
  

    mounted() {
      this.queryParam.phone = this.$route.query.wxPhone;
      this.queryParam.wxUserId = this.$route.query.wxUserId;
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
    .small-select-width {
      width:0!important;
      margin-right: 0!important;
    }
  }
</style>
