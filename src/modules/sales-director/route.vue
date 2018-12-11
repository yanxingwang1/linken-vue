<template>
  <div class="main">
    <div v-if="hackReset" v-for="(item,i) in manageList" :key="i" @click="chooseRouteChange(item.planSeq,item.id)">
      <route-title :title='item.planSeq==1?routeOne:item.planSeq==2?routeTwo:routeThree'></route-title>
      <route-select class="sales-director-route" @changeValue="changeFirstValue" :list='routeList' :selectItem='item.planCode'></route-select>
    </div>
  </div>
</template>

<script>
  import {
  } from 'vux'
  import { Toast } from "mint-ui";
  import util from '../../common/DMC.util'
  import routeTitle from './components/routeTitle'
  import routeSelect from './components/routeSelect'
  export default {
    name: "index",
    components: {
        routeTitle,
        routeSelect
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
          phone:'',
          wxUserId:'',
          routeOne:'路线一',
          routeTwo:'路线二',
          routeThree:'路线三',
          chooseRoute:0,
          planId:0,
          routeList:[],
          manageList:[],
          hackReset:true
      }
    },
    directives: {
    },
    watch:{
      
    },
    methods: {
      init() {
        //获取路线管理列表
        this.getManageList();
        //获取路线方案列表
        this.getPlanList();
        
      },
      getManageList(){
          this.http.get('getManageList',{phone:this.phone,wxUserId:this.wxUserId},res=>{
            if(res.data.length==3){
              this.manageList = res.data;
            }else if(res.data.length==2){
              if(res.data[0].planSeq==1&&res.data[1].planSeq==2){
                this.manageList = res.data;
                this.manageList.push({planSeq:3,planCode:''});
              }else if(res.data[0].planSeq==1&&res.data[1].planSeq==3){
                this.manageList.push(res.data[0]);
                this.manageList.push({planSeq:2,planCode:''});
                this.manageList.push(res.data[1]);
              }else if(res.data[0].planSeq==2&&res.data[1].planSeq==3){
                this.manageList.push({planSeq:1,planCode:''});
                this.manageList.push(res.data[0]);
                this.manageList.push(res.data[1]);
              }
            }else if(res.data.length==1){
              if(res.data[0].planSeq==1){
                this.manageList = res.data;
                this.manageList.push({planSeq:2,planCode:''});
                this.manageList.push({planSeq:3,planCode:''});
              }else if(res.data[0].planSeq==2){
                this.manageList.push({planSeq:1,planCode:''});
                this.manageList.push(res.data[0]);
                this.manageList.push({planSeq:3,planCode:''});
              }else if(res.data[0].planSeq==3){
                this.manageList.push({planSeq:1,planCode:''});
                this.manageList.push({planSeq:2,planCode:''});
                this.manageList.push(res.data[0]);
              }
            }else {
              this.manageList.push({planSeq:1,planCode:''});
              this.manageList.push({planSeq:2,planCode:''});
              this.manageList.push({planSeq:3,planCode:''});
            }
            this.hackReset = false
            this.$nextTick(() => {
              this.hackReset = true
            })
          });
      },
      getPlanList(){
          this.http.get('getPlanList',res=>{
            if(res.data){
              for(var i=0;i<res.data.length;i++){
                this.routeList.push({value:res.data[i].planCode,label:res.data[i].description});
              }
            }
          });
      },
      chooseRouteChange(val,id){
          this.chooseRoute = val;
          this.planId = id;
      },
      // 保存更新试驾路线
      changeFirstValue(val){
          let planManageData = {id:this.planId,phone:this.phone,planCode:val,planSeq:this.chooseRoute,wxUserId:this.wxUserId};
          this.http.post('planManage',planManageData,res=>{
            if(!res.success){
              Toast({
                  message: res.errMsg,
              });
              this.getManageList();
            }
          });
          // console.log(val+'---------'+this.chooseRoute+'------'+this.planId);
      }
          
    },
    activated: function () {
      $(document).attr('title','试乘试驾路线');   
    },
    beforeMount() {
      $(document).attr('title','试乘试驾路线');
    },
  

    mounted() {
      this.phone = this.$route.query.mobile;
      this.wxUserId = this.$route.query.userid;


      return this.$nextTick(() => this.init());
    }
  };

</script>

<style lang="sass" scoped>
  @function px($px){
    @return ($px/20)+rem;
  }
  .main {
      width:90%;
      margin-left:5%;
  }
  
</style>