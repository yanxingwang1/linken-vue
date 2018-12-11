<template>
  <div class="page">
    <div class="index">
     
    <h1 @click="tip">测试监听返回关闭</h1>
    </div>
  </div>
</template>

<script>
  import util from '../../common/DMC.util.js'
  import JSSDK from  '../../common/weixin1.js'
  export default {
    name: "qrCode",
    data() {
      return {
        
      }
    },
    methods: {
      tip(){
              JSSDK.closeWindow1()
      },
        
    },
    mounted() {
      JSSDK.wxReady((value)=>{
//         debugger
//             JSSDK.onback1((res)=>{
// debugger
//             })
      })
           
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
