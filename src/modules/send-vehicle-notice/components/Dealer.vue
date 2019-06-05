<template>
    <div class="dealer" @click="onDealer">
        <div>{{dealer.dealerName}}</div>
        <div class="img">
             <img src="../imgs/arrow-r2@3x.png" alt="">
        </div>
       
    </div>
</template>
<script>
export default {
    data(){
        return {

        }
    },
    props:{
       dealer:{
           type:Object,
           require:true
       }
    },
    methods:{
        onDealer(){
            document.location.href ='/wchat/adetail?longitude=' + 0 + '&latitude=' + 0 + '&dealerCode=' + this.dealer.dealerName + '&di=' + 110;
        }
    }
}
</script>
<style lang="sass" scoped>
   .dealer{
       border-top:10px solid #f5f5f5;
        border-bottom:10px solid #f5f5f5;
        color:#B45F1A;
        font-size:16px;
        display:flex;
        padding:20px;
        .img{
            display:flex;
            flex:1;
            justify-content: flex-end;
            align-items: center;
            img{
                height:20px;
            }
        }

   }
    
</style>

