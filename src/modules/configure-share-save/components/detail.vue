<template>
    <div class="detail-feature">
        <!-- <img /> -->
        <div v-for="(item,i) in carList" :key="i">
            <div class="detail-feature-div-style">
                <div :class="{'border-bottom-import':i==(carList.length-1)}" style="height: 54px;line-height:50px;font-size:16px;border-bottom:1px solid #E2E2E2">
                    <img style="width:24px;margin-bottom: 6px;" :src="item.url"/>
                    <span :class="{'width-sixty-five':item.price>0}" style="font-size:14px;margin-left:20px;width: 80%;overflow: hidden;text-overflow: ellipsis;white-space:nowrap;display:-moz-inline-box;display:inline-block;height: 34px;padding-top: 1px;">{{item.name}}</span>
                    <span v-show="item.price>0" style="font-size:14px;float:right;color:#B45F1A">+￥{{item.price|priceFormat}}</span>
                </div>
            </div>
        </div>
        <div style="border-bottom:10px solid #f5f5f5"></div>
        <div class="detail-feature-div-style">
            <p style="font-size: 14px;line-height: 55px;font-weight: 700;" v-show="carInfo.length>0">主要特点</p>
            <p v-for="(item,i) in carInfo" :key="i" style="margin-bottom:10px;color:#8A8A8A;font-size:12px;text-align: justify;">{{item}}</p>
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
      },
      carList:{
        type:Array,
      },
    },
    methods:{
    }
  }
</script>
 
<style lang="sass" scoped>
  .detail-feature {
    background-color: white;
    /* transform: translate(-50%,-50%); */
    overflow-y: auto;
    padding-bottom: 50px;
    &-div-style {
      width:92%;margin-left:4%;
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
  }
  
  
  </style>