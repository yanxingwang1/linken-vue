<template>
    <div class="carinfo">
        <div class="arror" >
            <img :class="diff==1?'':diff==2?'img1':'img2'" src="../imgs/jiantouup.png" alt="">
        </div>
        <div class="detail" :style='{paddingBottom:carinfo.status==10661006?"20px":"0"}'>
            <div class="mian" v-show="!fold">
                <div class="group">
                    <div class="lab">车型名称：</div>
                    <div class="content">{{carinfo.carModelName}}</div>
                </div>
                <div class="group">
                    <div class="lab">车牌号：</div>
                    <div class="content">{{carinfo.plateNumber}}</div>
                </div>
                <div class="group">
                    <div class="lab">当前里程数：</div>
                    <div class="content">{{carinfo.currMileage}}</div>
                </div>
                <div class="group">
                    <div class="lab">联系电话：</div>
                    <div class="content">{{carinfo.appointmentPhone}}</div>
                </div>
                <div class="group" v-if="carinfo.status==10661000||carinfo.status==10661004">
                    <div class="lab">待步车：</div>
                    <div class="content">{{carinfo.scootor}}</div>
                </div>


                <div class="line"></div>


                <div class="group">
                    <div class="lab">服务类型：</div>
                    <div class="content">{{carinfo.serviceType}}</div>
                </div>
                <div class="group" v-if="carinfo.status==10661003">
                    <div class="lab">预约服务时间：</div>
                    <div class="content">{{carinfo.appointmentDate}}</div>
                </div>
                  <div class="group" v-if="carinfo.status==10661003&&carinfo.listStatus!=7">
                    <div class="lab">取车订单编号：</div>
                    <div class="content">{{carinfo.appointmentDate}}</div>
                </div>
               
                <div class="group" v-if="carinfo.status==10661003">
                    <div class="lab">预约取车时间：</div>
                    <div class="content">{{carinfo.plateNumber}}</div>
                </div>
                <div class="group"  v-if="carinfo.status==10661003">
                    <div class="lab">预约取车地址：</div>
                    <div class="content">{{carinfo.plateNumber}}</div>
                </div>
                <div class="group"  v-if="carinfo.status==10661003" >
                    <div class="lab">送车服务：</div>
                    <div class="content">{{carinfo.plateNumber}}</div>
                </div>

                 <div class="group" v-if="carinfo.status==10661000||carinfo.status==10661004||carinfo.status==10661006">
                    <div class="lab">服务工程师：</div>
                    <div class="content">{{carinfo.serviceEnginnerName}}</div>
                </div>
                 <div class="group" v-if="carinfo.status==10661000||carinfo.status==10661004">
                    <div class="lab">预计交车时间：</div>
                    <div class="content">{{carinfo.serviceEnginnerName}}</div>
                </div>

                 <div class="group" v-if="carinfo.status==10661006" >
                    <div class="lab">预约服务时间：</div>
                    <div class="content">{{carinfo.cancleTime}}</div>
                </div>

                 <div class="group" v-if="carinfo.status==10661006" >
                    <div class="lab">取消服务时间：</div>
                    <div class="content">{{carinfo.cancleTime}}</div>
                </div>

                <div class="group">
                    <div class="lab">备注：</div>
                    <div class="content">{{carinfo.remark}}</div>
                </div>
                <div style="height: 1.25rem;"></div>
            </div>
            
            <!-- 隐藏 -->
            <div class="fold" @click="()=>{ this.fold=!this.fold}" v-if="carinfo.status!=10661006">
                <div v-show="!fold">
                    <div class="close1">隐藏预约信息</div>
                        <img style="transform: rotate(180deg);" src="../imgs/333.png" alt="">
                </div>
                <div v-show="fold">
                        <div  class="close1">查看预约信息</div>
                            <img src="../imgs/333.png" alt="">
                </div>
            </div>
          
              <!-- 进厂状态进度 -->
            <progress-step  :step="carinfo.step" :showProgress="showProgress" v-if="carinfo.status!=10661006"></progress-step>
           
         <div class="line" v-if="carinfo.listStatus==10||carinfo.listStatus==11||carinfo.listStatus==12" style="background:rgba(226,226,226,1);margin-top:0"></div>
              <!-- 订单开启状态可以查看代驾 -->
            <div class="driver" v-if="carinfo.listStatus==10||carinfo.listStatus==11||carinfo.listStatus==12">
                
                <div class="lefts">
                    <div>有问题请拨打代驾服务电话</div>
                    <div class="time">代驾客服服务时间 7:00-21:00</div>
                </div>
                <div class="rights" @click="phoneClick('110')">
                    <img src="../imgs/phoneBrown.png" alt="">
                </div>
            </div>
        </div>
       
    </div>
</template>
<script>
import ProgressStep from "./Progress"
export default {
    data(){
        return {
            fold:false,
            diff:null,
        }
    },
     components: {
         ProgressStep
     },
    watch:{
        carinfo:{
             handler: function (val, oldVal) { 
                 this.diff=val.diff;
              },
             deep: true,
            immediate: true
        },
        

    },
    props:{
       carinfo:{
           type:Object,
           require:true
       },
       showProgress: {
           type:Number
       }
    },
    created(){
         this.$Bus.$on("diff", data => {
                this.diff=data
         })
    },
    methods:{
       phoneClick(phone){
         window.location.href = `tel:${phone}`;
       }
    }
}
</script>
<style lang="sass" scoped>
 .carinfo{
     padding: 20px;
     padding-top:0;
     .arror{
         img{
            width: 20px;
            margin-bottom: -5px;
            margin-left: 18px;
         }
         img.img1{
            margin-left: 47%;
         }
        img.img2{
            margin-left: 88%;
         }
     }
     .detail{
        background: #EBEBEB;
        border-radius: 10px;
        padding: 20px;
        padding-bottom:0;
        color: #1A1919;
        font-size:12px;
        .group {
            display: flex;
            line-height: 22px;
            .lab {
                width: 35%;
                color: #676767;
            }
            .content {
                width: 65%;
            }
        }
        .line{
            height:1px;
            background:rgba(174,174,174,1);
            margin: 15px 0;
        }
        .fold{
            >div{
              display: flex;
              font-weight:600;
              img{
                width: 8px;
                height: 5px;
                margin-left: 10px;
                margin-top: 6px;
              }
            }
        }
        .driver{
             display: flex;
            padding-bottom: 20px;
          
             .lefts{
                    display: flex;
                    flex: 4;
                    flex-direction: column;
                 .time{
                      color: #BFBFBF;
                      margin-top: 10px;
                 }
             }
             .rights{
                justify-content: center;
                align-items: center;
                display: flex;
                flex: 1;
                min-width: 50px;
                border-left: 1px solid #ccc;
                 img{
                     width:20px;
                     height:20px;
                 }
             }
        }
     }
       
 }
    
</style>
