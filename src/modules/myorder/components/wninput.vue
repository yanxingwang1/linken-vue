<template>
    <div class="wninput">
        <div  :class="(label.length>4)?'label label3':'label'">
            <span class="label1">{{label.substring(0,4)}}</span>
            <!-- <span :class="(label.length>4)?'label2':'label1'">{{label.substring(4)}}</span> -->
            <span class="red">*</span>
           
        </div><input type="text" :placeholder="placeholder" @blur="onblur" :maxlength="maxlength" :class="unpass?'error1':''" v-model="value"  >
        <!-- <div  v-show="unpass" class="error" >抱歉，你填写的{{label}}错误</div> -->
    </div>

</template>
<script>
import { Toast } from "mint-ui";
    export default {
        data(){
            return{
                // pvalue:this.placeholder,
                value:'',
                unpass:false,
                // width1:String(this.width?22*(1/this.width):22)+"%",
                // width2:String(this.width?78*this.width:78)+"%",
            }
        },
        props: {
            label:String,
            test:String,
            placeholder:[String,Number],
            onBlur:Function,
            width:{
                type:Number,
                default:1
            },
            maxlength:Number,
            parmasprop:{
                type:Object,
            }
            
         },
        methods: {
            onblur(){
                // 跟后台交互保存
                if(!this.value){//用户默认手机号，验证不输入
                    return;
                }
                if(this.test=='vin') {
                    if(!this.value||!/^1[0-9]{10}$/.test(this.value)){
                        Toast({
                                message: '请输入正确手机号',
                            });
                        return;
                    }
                }
               
            },
        },
        watch: {
            value(newVal) {
                this.$emit('change', newVal,this.test)
            },
        },
        mounted(){
        }
    }
</script>
<style lang="sass" scoped>
    input[type=text]::-ms-clear,::-ms-reveal{display:none;}
    input::-ms-clear,::-ms-reveal{display:none;}
    input{
        /*去除点击出现轮廓颜色*/
        border: 1px solid #FBDECD;
        border-radius: 3px;
        -webkit-appearance: none;
        outline: none;
    }
    
    .wninput{
        margin:15px 0;
        height:40px;
        line-height:40px;
        .label{
            display:inline-block;
            width:26%;
            font-size: 16px;
            color: #000000;
            text-align:left;
            font-weight: normal;
            padding:0;
            span{
                    // font-weight: bold;
                .red{
                    color:red;
                }
            }
            .label2{
                float: left;
                margin-top: 5px;
            }
        }
        .label3{
            margin-top: 0px;
            float: left;
        }
        input{
            width:74%;
            padding-left:5px;
            
        }
        .error1{
            border:1px solid red;
        }
        .error{
            font-size:12px;
            line-height:10px;
            width:74%;
            margin-left:26%;
        }
    }
</style>