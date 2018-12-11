<template>
    <div class="wninput">
        <!-- :class="(label.length>4)?'label label3':'label'" -->
        <div  class="label">
           <!-- <span class="label1">{{label.substring(0,4)}}</span> -->
            <!-- <span :class="(label.length>4)?'label2':'label1'" :style="label.length==6?'margin-left: 12px;':''">{{label.substring(4)}} </span> -->
           <span >{{label}}</span>
        </div><div class="input">{{value}}</div>
        <!-- <div  v-show="unpass" class="error" >抱歉，你填写的{{label}}错误</div> -->
    </div>

</template>
<script>
import { Toast } from "mint-ui";
    export default {
        data(){
            return{
               
            }
        },
        props: {
            label:String,
            value:String,
           
            
         },
        methods: {
            
        },
        watch: {
           
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
        border: 1px solid #E5E5E5;
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
            width:36%;
            font-size: 15px;
            color: #000000;
            text-align:left;
            font-weight: normal;
            padding:0;
            span{
                font-weight: bold;
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
        .input{

            width:64%;
            padding-left:5px;
            float:right;
            // border:1px solid  rgba(150,160,180,.3);
            height:40px;
            line-height:40px;
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