<template>
  <div class="page">
    <div class="index">
     
    <h1 @click="tip">跳转到demo1</h1>
    </div>
  </div>
</template>

<script>
  import util from '../../common/DMC.util.js'
  import JSSDK from  '../../common/weixin.js'
  export default {
    name: "qrCode",
    data() {
      return {
        
      }
    },
    methods: {
      tip(){
          this.$router.push('/demo1')
      }  
    },
    mounted() {
      //  JSSDK.onHistoryBack(()=>{

      //  })
    //  JSSDK.wxReady(()=>{
      
    //  })
    }
  }
</script>

<style scoped lang="sass" type="text/scss">
  @function px($px) {
    @return ($px/20)+rem;
  }

  .page {
    height: 100vh;
    background-color: #ffffff;
    
    
  }
</style>
