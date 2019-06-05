<template>
 <mt-popup v-model="popupValue" >
    <div class="toasts">
        <div class="title">代驾专员信息</div>
        <div class="line"></div>
        <div class="msg">
            <div class="icon"><img src="../imgs/driver.png" alt=""></div>
            <div class="detail">
                <div>郑师傅</div>
                <div class="detail-work-no">工号：9098</div>
                 <div class="star detail-work-no">
                    <img v-for="i in starFullRate" :key="'full'+i" src="../imgs/star-full.png"/>
                    <img v-if="starFalfRate" src="../imgs/star-half.png"/>
                    <img v-for="j in starEmptyRate" :key="'empty'+j" src="../imgs/star-empty.png"/>
                </div>
            </div>
            <div class="phone" @click="phone">
                <img src="../imgs/phone-o@3x.png" alt="">
            </div>
        </div>
    </div>
 </mt-popup>
</template>
<script>
import { Popup, Indicator } from "mint-ui";
export default {
    data(){
        return{
            // popupVisible:true
            popupValue: this.value,
        }
    },
    props:{
        user:Object,
        // popupVisible:Boolean,
         driverStar: {
            type: [Number,String]
        },
        value:Boolean,
    },
    watch:{
        // popupVisible(val,old){
        //     if(val){
        //         this.stop()
        //     }else{
        //         this.move()
        //     }
        // },
        //监听prop传的value，如果父级有变化了，将子组件的myValue也跟着变，达到父变子变的效果
        value(newVal) {
            this.popupValue = newVal
            if(newVal){
                this.stop()
            }else{
                this.move()
            }
        },
        //监听myValue，如果子组件中的内容变化了，通知父级组件，将新的值告诉父级组件，我更新了，父级组件接受到值后页就跟着变了
        popupValue(newVal) {
            this.$emit('input', newVal)
        }
    },
    computed: {
        starFullRate() {
            if(this.driverStar){
                return parseInt(this.driverStar);
            }
        },
        starFalfRate() {
            if(this.driverStar){
                if((parseFloat(this.driverStar)-parseInt(this.driverStar))>0){
                    return true;
                }
                return false;
            }
        },
        starEmptyRate() {
            if(this.driverStar){
                if((parseFloat(this.driverStar)-parseInt(this.driverStar))>0){
                    return parseInt(4-parseInt(this.driverStar));
                }
                return parseInt(5-parseInt(this.driverStar));
            }
        }
    },
    methods:{
        /***禁止滑动***/
       stop(){
            document.body.style.overflow='hidden';
            document.addEventListener("touchmove",(e)=>{
                    e.preventDefault()
            },false);//禁止页面滑动
        },
        /***取消滑动限制***/
        move(){
            document.body.style.overflow='';//出现滚动条
            document.removeEventListener("touchmove",(e)=>{
                    e.preventDefault()
            },false);
        },
        phone(){
              window.location.href = `tel:${'110'}`;
        }
    }
}
</script>
<style lang="sass" scoped>
    .mint-popup{
        background:rgba(255,255,255,1);
        border-radius:10px;
        opacity:0.96;
    }
    .toasts{
        display: flex;
        flex-direction: column;
        padding:20px;
        // height:178px;
      
        .title{
            font-size:18px ;
            font-weight: 500;
            color:#323232;
            padding-bottom: 20px;
            justify-content: center;
            display: flex;
            align-content: center;
        }
        .line{
            width:100%;
            height:1px;
            background:rgba(226,226,226,1);
        }
        .msg{
            display: flex;
            flex-direction: row;
            margin: 30px 0 10px 0;
            font-size:14px;
            align-items: center;
            .icon{
                display: flex;
                width: 50px;
                height: 50px;
                overflow: hidden;
                border-radius: 50%;
                align-items: center;
                margin-right: 10px;
                img{
                    width: 50px;
                }
            }
            .detail{
                display: flex;
                flex:3;
                flex-direction: column;
                min-width: 130px;
                .detail-work-no {
                    font-size: 12px;
                    transform: scale(.9);
                    transform-origin: 0 50% 0;
                }
                .star{
                    display: flex;
                    align-items: center;
                    img{
                        width: 12px;
                        height: 12px;
                        margin-left: 1px;
                        border-radius: 0;
                    }
                }
            }
            .phone{
                border-left:1px  solid rgba(226,226,226,1);
                height: fit-content;
                width:40px;
                padding-left: 18px;
                img{
                    width: 20px;
                    height: 20px;
                }
            }
        }
    }
</style>