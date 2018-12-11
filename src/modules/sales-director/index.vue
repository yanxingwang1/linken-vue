<template>
  <div>
    <img src="./imgs/car-manage3x.png" class="index-img" @click="gotoDriveCar()"/>
    <img src="./imgs/route3x.png" class="index-img other-img" @click="gotoRoute()"/>
  </div>
</template>

<script>
  import {
  } from 'vux'
  import util from '../../common/DMC.util'
  export default {
    name: "index",
    components: {
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
      }
    },
    directives: {
    },
    watch:{
      
    },
    methods: {
      init() {
      },
      gotoRoute(){
        location.href = location.origin+'/modules/director.html#/route?mobile='+this.phone+'&userid='+this.wxUserId;
      },
      gotoDriveCar(){
        location.href = location.origin+'/modules/trydrivercar.html#/index?mobile='+this.phone+'&userid='+this.wxUserId;
      }
          
    },
    activated: function () {
      $(document).attr('title','试乘试驾资源管理');   
    },
    beforeMount() {
      $(document).attr('title','试乘试驾资源管理');
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
  .index-img {
    width:93%;
    margin-left:3.5%;
    margin-top:px(12);
  }
  .other-img {
    margin-top:px(10);
  }
  
</style>