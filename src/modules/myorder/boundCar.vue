<template>
    <div class="bound-car-index">
        <img width="100%" :src="require('./imgs/bound-car-index.png')" />
        <div class="user-bound-car">
            用户车辆绑定
        </div>
        <div class="bound-car-form">
            <div class="name">
                <span >姓<span class="red">*</span></span><input type="text" v-model="userData.lastName" placeholder="姓" @blur="onblurBottom()"><span  style="text-align: center;">名</span><input type="text" placeholder="名" v-model="userData.firstName" @blur="onblurBottom()">
            </div>
            <div class="sex">
                <span>称呼<span class="red">*</span></span>
                <span style="padding-left:0" @click="changesex('0')">
                    <img v-show="userData.sex=='0'" src="../driver-register/images/Group@3x.png">
                    <img v-show="userData.sex!='0'" src="../driver-register/images/OvalCopy@3x.png">
                    <span>先生</span>
                </span>
                <span @click="changesex('1')">
                    <img v-show="userData.sex=='1'" src="../driver-register/images/Group@3x.png">
                    <img v-show="userData.sex!='1'" src="../driver-register/images/OvalCopy@3x.png">
                    <span>女士</span>
                </span>
            </div>
            <div class="phone">
                <wn-input v-if="newCustomer" type="tel" label="手机号码" placeholder='请输入您的手机号码' :maxlength='11' test="phone" @change="inputchange"></wn-input>
                <div style="margin-top: 20px;color:#3E3E3E;" v-else>手机号码<span class="red">*</span><span class="phone-number">{{userData.phone}}</span></div>
            </div>
            <div v-if="newCustomer" class="name vercode" v-show="newCustomer">
                <div class="label"><span >短信验证<span class="red">*</span></span></div>
                <input type="text" :class="codeunpass?'':'error'"  placeholder='请输入验证码' v-model="userData.authCode" @blur="onblurBottom()">
                <span  :class="!this.canClick?'disabled code':'code'" @click="getCode">{{content}}</span>
            </div>
            <div v-if="newCustomer" class="must-choose">
                <span @click="changeAgreeType('1')">
                    <img v-if="registerAgree" src="../driver-register/images/Group@3x.png">
                    <img v-else src="../driver-register/images/OvalCopy@3x.png">
                    <span class="span-inner">该电话号码将用于您的账户注册</span>
                </span>
            </div>
            <div v-if="newCustomer" class="must-choose" style="margin-top:8px;">
                <span @click="changeAgreeType('2')">
                    <img v-if="hasRead" src="../driver-register/images/Group@3x.png">
                    <img v-else src="../driver-register/images/OvalCopy@3x.png">
                    <span class="span-inner">我已阅读并同意 </span>
                </span>
                <span class="span-inner" style="color:#C07A40" @click="openPopup()">个人隐私条款；</span>
            </div>
            <div class="vin-input" style="display:flex;">
                <div class="vin-inner">您的车架<br/>号(VIN)<span class="red">*</span></div>
                <input type="email" :class="vinpass?'':'error'" @blur="onblur()" maxlength="17"  placeholder='请输入您的VIN码' v-model="userData.vin" />
            </div>
            <div class="vin-input">
                <div class="vin-code-type">
                    *车架号(VIN)，由字母及数字组成的17位车辆识别号，可以查询行驶证获得。
                </div>
                <div :class="{'submit':true,'can-submit':canSubmit&&registerAgree&&hasRead}" @click="submitData()">
                    提交
                </div>
            </div>
        </div>
        <mt-popup v-model="detailPopupVisible" position="bottom">
            <div class="show-privay-content">
                <privacy v-bind:show="detailPopupVisible" @closeDialog="closeDialog()"></privacy>
            </div>
        </mt-popup>
    </div>
</template>

<script>
  import {
  } from 'vux'
  import {Indicator} from 'mint-ui'
  import privacy from './components/privacy'
  import { Toast,Popup } from "mint-ui";
  import util from '../../common/DMC.util'
  import wnInput from './components/wninput'
  import { setTimeout } from 'timers';
  export default {
    name: "index",
    components: {
        wnInput,
        Toast,
        Popup,
        privacy,
        Indicator
    },
    created() {
        end_time = new Date().getTime();
        console.log("index加载时间：", end_time - start_time, "ms");
    },
    data() {
        return {
            userData:{
                lastName:'',
                firstName:'',
                sex:'',
                phone:'',
                authCode:'',
                vin:'',
            },
            registerAgree:true,
            hasRead:true,
            content: '获取验证码',
            totalTime: 60 , 
            vercode: false,
            newCustomer: false,
            canClick: true,
            codeunpass:true,
            vinpass:true,
            canSubmit:false,
            detailPopupVisible:false
      }
    },
    directives: {
    },
    watch:{
        userData:{
            handler:function() {
                        if(this.userData.lastName&&this.userData.sex){
                            if(this.userData.vin&&this.userData.vin.length==17&&/^[0-9a-zA-Z]+$/.test(this.userData.vin)){
                                this.canSubmit = true;
                                //未注册用户校验手机和验证码
                                if(this.newCustomer){
                                    if(this.userData.phone&&/^1[0-9]{10}$/.test(this.userData.phone)&&this.userData.authCode){
                                        this.canSubmit = true;
                                    }else {
                                        this.canSubmit = false;
                                    }
                                }
                            }else {
                                this.canSubmit = false;
                            }
                        }else {
                            this.canSubmit = false;
                        }
                    },
            deep: true,
        },
    },
    methods: {
        init() {
            this.getBaseInfo();
        },
        getBaseInfo() {
            this.http.get('getBaseInfo',res=>{
                if(res.data.code){
                    if(res.data.code=='1'){
                        this.newCustomer = true;
                    }else if(res.data.code=='2'){
                        this.newCustomer = false;
                        this.userData = res.data.userInfo;
                        this.userData.sex = this.userData.sex + '';
                    }
                    // this.newCustomer = true;
                    // else if(res.data.code=='3'){
                    //     // this.newCustomer = true;
                    //     location.href = location.origin+'/modules/reservationService.html#/index';
                    // }
                }
            });
        },
        changesex(val){
            this.userData.sex = val;
        },
        inputchange(val,node){
            if(node == 'phone') {
                this.userData.phone = val;
            }
            // console.log(node,val)
        },
        getCode(){
            if(this.userData.phone&&/^1[0-9]{10}$/.test(this.userData.phone)){
                //  启动定时器
                if (!this.canClick) return  //改动的是这两行代码
                this.canClick = false
                this.content = this.totalTime + 's'
                let clock = window.setInterval(() => {
                    this.totalTime--
                    this.content = this.totalTime + 's'
                    if (this.totalTime < 0) {
                        window.clearInterval(clock)
                        this.content = '获取验证码'
                        this.totalTime = 60
                        this.canClick = true  //这里重新开启
                    }
                },1000)
                this.http.get('getAuthCode',{phone:this.userData.phone},res=>{
                    if(res.resultCode=='1'){
                        if(res.data){
                            Toast({
                                message: res.data.errorMsg,
                                position: "middle",
                                duration: 1000
                            });
                        }
                    }else{
                        Toast({
                            message: res.errMsg,
                        });
                    }
                });
            }else {
                if(!this.phone){
                    Toast({
                        message: '请输入手机号',
                    });
                    return;
                }else {
                    Toast({
                        message: '请输入正确手机号',
                    });
                    return;
                }
            }
        },
        changeAgreeType(val) {
            if(val == '1'){
                this.registerAgree = !this.registerAgree;
            }else if(val == '2'){
                this.hasRead = !this.hasRead;
            }
        },
        onblur(){
            $("body").scrollTop(0);
            // $(document).scrollTop(9999)
            if(this.userData.vin){
                if(this.userData.vin.length!=17||!/^[0-9a-zA-Z]+$/.test(this.userData.vin)){
                    this.vinpass = false;
                }else {
                    this.vinpass = true;
                }
            }else {
                this.vinpass = true;
            }
        },
        onblurBottom(){
            $("body").scrollTop(0);
        },
        submitData(){
            var _this = this;
            if(this.canSubmit&&this.registerAgree&&this.hasRead){
                Indicator.open({
                    text: '提交中',
                    spinnerType: 'triple-bounce'
                });
                this.http.post('saveTieCar',this.userData,res=>{
                    Indicator.close();
                    if(res.resultCode=='1') {
                        if(this.newCustomer){
                            Toast({
                                message: '车辆绑定成功',
                            });
                            setTimeout(function(){
                                location.href = location.origin+'/modules/reservationService.html#/index';
                            },1500);
                        }else {
                            Toast({
                                message: '车辆绑定成功',
                            });
                            setTimeout(function(){
                                location.href = location.origin+'/modules/reservationService.html#/index?from=boundCar&lastName='+_this.userData.lastName+'&sex='+_this.userData.sex;
                            },1500);
                        }
                    }else {
                        Toast({
                            message: res.errMsg,
                        });
                    }
                });
            }
        },
        openPopup(){
            this.detailPopupVisible = true;
            $$.smartScroll($$('.v-modal'), '.borderInner');
            $$('html').addClass('noscroll');
        },
        closeDialog(){
            this.detailPopupVisible = false;
            $$('html').removeClass('noscroll');
        }
    },
    activated: function () {
    },
    beforeMount() {
        $(document).attr('title','林肯之道');
    },
  

    mounted() {
      return this.$nextTick(() => this.init());
    }
  };

</script>

<style lang="sass" scoped>
    @function px($px){
        @return ($px/20)+rem;
    }
    /*在IE10+浏览器中, 使用css即可隐藏input文本输入框右侧的叉号*/
    input[type=text]::-ms-clear,::-ms-reveal{display:none;}
    input::-ms-clear,::-ms-reveal{display:none;}
    input{
        /*去除点击出现轮廓颜色*/
        border: 1px solid #FBDECD;
        border-radius: 3px;
        -webkit-appearance: none;
        outline: none;
    }
    .red{
        color:red;
    }
    .error{
        border:1px solid red;
    }
    .bound-car-index {
        overflow:auto;
        height:100%;
        .user-bound-car {
            font-family: PingFangSC-Semibold;
            font-size: px(18);
            color: #323232;
            line-height:px(50);
            height:px(50);
            text-align: center;
            font-weight: 600;
            background: #F5F5F5;
        }
        .bound-car-form {
            padding:24px;
            font-size:16px;
            .name{
                height:40px;
                line-height:40px;
                span{
                    display:inline-block;
                    width:26%;
                    color: #3E3E3E;
                    .red {
                        color:red;
                    }
                }
                input{
                    max-width:24%;
                    padding-left:5px;
                }
            }
            .sex{
                margin-top:15px;
                >span:nth-child(1){
                    width:26%;
                    padding:0;
                    color: #3E3E3E;
                }
                >span{
                    display:inline-block;
                    padding:5px 10px;
                    color: #3E3E3E;
                    img{
                    width:20px;
                    vertical-align: top;
                    }
                }
            }
            .phone {
                .phone-number {
                    font-family: PingFangSC-Regular;
                    font-size: 14px;
                    color: #505050;
                    letter-spacing: -0.34px;
                    margin-left:29px;
                }
            }
            .vercode{
                input{
                    max-width:35%;
                }
                .code{
                    background: #B45F1A;
                    border-radius: 3px;
                    color:#fff;
                    // padding:0 10px;
                    width:30%;
                    float:right;
                    text-align:center;
                        // color: #bbbbbb
                }
                .disabled{
                    background: #e7e7e7 !important;
                    border: 1px solid #e7e7e7 !important;
                    color: #8c8c8c !important;
                }
                .label{
                    display:inline-block;
                    width:25%;
                    font-size: 16px;
                    color: #3E3E3E;
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
            }
            .must-choose {
                margin-top:24px;
                img {
                    width:16px;
                }
                .span-inner {
                    font-family: PingFangSC-Regular;
                    font-size: 12px;
                    color: #BBBBBB;
                    letter-spacing: -0.29px;
                    text-align: center;
                }
            }
            .vin-input {
                margin-top: 20px;
                .vin-inner {
                    font-family: PingFangSC-Regular;
                    font-size: 16px;
                    color: #3E3E3E;
                    letter-spacing: -0.39px;
                    width:26%;
                }
                input {
                    height:45px;
                    width:76%;
                    padding-left:5px;
                }
                .vin-code-type {
                    font-family: PingFangSC-Regular;
                    font-size: 14px;
                    color: #BBBBBB;
                    letter-spacing: 0;
                    text-align: justify;
                    margin:20px 0;
                }
                .submit {
                    height:45px;
                    line-height:45px;
                    background: #9F9F9F;
                    border-radius: 3px;
                    font-family: PingFangSC-Regular;
                    font-size: 17px;
                    color: #FFFFFF;
                    letter-spacing: -0.41px;
                    text-align: center;
                }
                .can-submit {
                    background: #B45F1A!important;
                }
            }
        }
        .show-privay-content {
            position: relative;
            width: 100vw;
            height: 80vh;
        }
        .mint-popup-bottom{
            border-radius: 7px 7px 0 0;
        }
    }
  
</style>
