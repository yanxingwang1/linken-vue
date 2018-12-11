<template>
    <div class="wninput">
        <span  >{{label}}<span class="red" v-show="label!='品鉴工程师'">*</span></span><n3-select :readonly='readOnly' :class="unpass?'error1':''" :cancelled="false" placeholder="请选择" menu-width="100%" width="100%" v-model="value" :options="data" style="width:74%;" @change='change'>
        </n3-select>   
        <!-- <div  v-show="unpass" class="error" >抱歉，你填写的{{label}}错误</div> -->
    </div>

</template>
<script>
import { Toast } from "mint-ui";
    export default {
        data(){
            return{
                // pvalue:this.placeholder,
                // value:'',
                unpass:false,
                // value1:594
                // value:this.value
                // datas:[],
                // choose:'',
                // width1:String(this.width?22*(1/this.width):22)+"%",
                // width2:String(this.width?78*this.width:78)+"%",
            }
        },
        props: {
            label:String,
            test:String,
            placeholder: [String, Number],
            onBlur:Function,
            data:{
                type:Array,
                required:true
            },
            width:{
                type:Number,
                default:1
            },
            parmasprop:{
                type:Object,
            },
            value:[String, Number],
            readOnly:{
                 type:Boolean,
            }
            
         },
        methods: {
            change(){
                
                // 跟后台交互保存
                // .split(",")[0]
                     this.parmasprop[this.test]=this.value
                console.log("parmas===>",this.parmasprop)
                this.http.post("updateTestDriveOrder",this.parmasprop,res=>{
                      if(res.resultCode=='1'){
                                return;
                    }else{
                        this.unpass=true
                       
                    }
                })
                
                this.$emit('change', this.value,this.test)
            },
           
        },
        watch: {
            // value(newvalue){
            //     console.log('value======>',this.value)
            // }
        },
        mounted(){
            // this.datas=this.data;
            // debugger
            console.log(value)
           
        }
    }
</script>
<style lang="sass" scoped>
    .wninput{
        margin:15px 0;
        height:40px;
        line-height:40px;
        .red{
            color:red;
            width:auto;
        }
        span{
            display:inline-block;
            width:26%;
            font-size: 16px;
            color: #000000;
                font-weight: bold;
        }
          .error1{
            border:1px solid red;
        }
        .error{
            border:1px solid red;
            font-size:12px;
            line-height:10px;
            width:74%;
            margin-left:26%;
            padding-left:5px;
            border-radius:3px;
        }
    
    }
     .n3-select-btn .inline>div{
        display:none!important;
    }
   .n3-select-btn .inline{
        max-width:200px;
        overflow: hidden!important;
        text-overflow:ellipsis!important;
        white-space: nowrap!important;
        margin-top: 3px;
        height: 18px;

    }
    .n3-btn-group {
        width: 74% !important;
    }
</style>