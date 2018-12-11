<template>
  <div id="dialog">
    <div class="border">
      <div style="text-align:center;font-size: 18px;margin-top: 20px;margin-left:25px;height:212px">
        <span style="border-bottom:2px solid #EBEBEB;padding-bottom: 3px;">{{model}}</span>
        <img style="width:25px;margin-right:10px;float:right" @click="closeDialog" src="../assets/img/dialog-close.png"/>
        <img style="margin-right:25px;height:150px;margin-top:3px" :src="imgUrl"/>
      </div>
      
    </div>
    <div class="borderInner">
        <!-- <img /> -->
        <div v-for="(item,i) in carList" :key="i">
          <div class="detail-div-style">
            <div :class="{'border-bottom-import':i==(carList.length-1)}" style="height: 54px;line-height:50px;font-size:16px;border-bottom:1px solid #E2E2E2">
              <img style="width:24px;margin-bottom: 6px;" :src="item.url"/>
              <span :class="{'width-sixty-five':item.price>0}" style="font-size:14px;margin-left:20px;width: 80%;overflow: hidden;text-overflow: ellipsis;white-space:nowrap;display:-moz-inline-box;display:inline-block;height: 34px;padding-top: 1px;">{{item.name}}</span>
              <span v-show="item.price>0" style="font-size:14px;float:right;color:#B45F1A">+￥{{item.price|priceFormat}}</span>
            </div>
          </div>
        </div>
        <div style="border-bottom:10px solid #f5f5f5"></div>
        <div class="detail-div-style">
          <p style="font-size: 14px;line-height: 55px;font-weight: 700;">主要特点</p>
          <p v-for="(item,i) in carInfo" :key="i" style="margin-bottom:10px;color:#8A8A8A;font-size:12px">{{item}}</p>
        </div>
      </div>
  </div>
</template>
<script>
  import {
    Group,
    Cell,
    } from 'vux'
  export default {
    name: "",
    components: {
      Group,
      Cell,
    },
    data(){
      return {}
    },
    props:{
      carInfo:{
        type:Array,
        required:true
      },
      carList:{
        type:Array,
        required:true
      },
      model:{
        type:String,
        required:true
      },
      imgUrl:{
        type:String,
        required:true
      }
    },
    methods:{
      closeDialog(){
         //给父组件传参
         this.$emit('closeDialog',false)
      }
    }
  }
</script>
 
<style scoped>
  #dialog{
    position: fixed;
    top: 0;
    left: 0;
    background: rgba(0,0,0,0);
    width: 100%;
    height: 100%;
  }
  .message{
    text-align: center;
    position: absolute;
    top: 50%;
  }
  .closeImg{
    width: 20px;
    height: 20px;
    float: right;
    margin-right: 5px;
    margin-top: 5px;
    cursor: pointer;
    /* background-image: url(../../assets/close.png); */
    background-size: cover;
    background-repeat: no-repeat;
    /* position: absolute;
    top:26%;
    left: 99%; */
  }
  .border{
    /* text-align: center; */
    background-color: white;
    /* border-radius: 20px; */
    width: 100%;
    height: 95%;
    position: absolute;
    top:35px;
    /* transform: translate(-50%,-50%); */
  }
  .borderInner {
    background-color: white;
    width: 100%;
    height: 95%;
    top:240px;
    position: absolute;
    /* transform: translate(-50%,-50%); */
    overflow-y: auto;
    border-top:10px solid #F5F5F5;
    padding-bottom: 250px;
  }
  .detail-div-style {
    width:94%;margin-left:3%
  }
  p {
    margin: 0;
  }
  .border-bottom-import {
    border-bottom: unset!important;
  }
  .width-sixty-five {
    width: 65%!important;
  }
  </style>