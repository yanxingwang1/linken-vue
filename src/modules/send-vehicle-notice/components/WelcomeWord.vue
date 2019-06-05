<template>
    <div class="welcome">
        <div class="username">尊敬的{{welcome.name}}</div>
        <div v-if="welcome.listStatus==7">感谢您预约售后服务，{{welcome.dealerName}}会尽快确认上门取车接单信息。</div>
        <div v-if="welcome.listStatus==8">感谢您预约售后服务，代驾服务方正在为您派单。</div>
        <div v-if="welcome.listStatus==9">感谢您预约售后服务，司机郑师傅（工号9098）已接单。</div>
        <div v-if="welcome.listStatus==10">感谢您预约售后服务，司机郑师傅（工号9098）出发前往取车地址。</div>
        <div v-if="welcome.listStatus==11">感谢您预约售后服务，司机郑师傅（工号9098）正护送爱车驶向林肯中心。</div>
        <div v-if="welcome.listStatus==12">感谢您预约售后服务，林肯中心已接收您的爱车。</div>
   
        <div v-if="welcome.listStatus==13&&welcome.status==10661000">感谢您预约售后服务，{{welcome.dealerName}}期待您的到访。</div>
       <!-- 正常 -->
        <div v-if="welcome.listStatus==1||welcome.listStatus==2||welcome.listStatus==3||welcome.listStatus==4">欢迎您莅临{{welcome.dealerName}}，我们将竭诚为您服务。</div>
        <div v-if="welcome.listStatus==5&&welcome.ass.length==0">您的售后预约已完成，{{welcome.dealerName}}欢迎您对本次服务进行评价。</div>
        <div v-if="welcome.listStatus==5&&welcome.ass.length>0">您的售后预约已完成，您同时提交了送车服务意向，请保持手机畅通，上海永达林肯中心会尽快与您联系确认送车信息。</div>
        <div v-if="welcome.listStatus==14">您的售后预约已取消，{{welcome.dealerName}}期待下次为您服务。</div>
    </div>
</template>
<script>
export default {
    data(){
        return {

        }
    },
    props:{
       welcome:{
           type:Object,
           require:true
       }
    }
}
</script>
<style lang="sass" scoped>
 .welcome{
     padding: 20px;
     div{
        font-size:14px;
        line-height:24px;
    }
     .username{
        font-size: 16px;
        font-weight:600;
        line-height: 40px;
    }
 }


    
</style>
