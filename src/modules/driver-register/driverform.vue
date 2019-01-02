<template>
    <div class="addfrom">
        <div class="baseinfo"  style="padding:20px">
            <div class="name">
                <!-- :class="unpass?'error1':''":class="unpass?'error1':''" -->
                <span >姓<span class="red">*</span></span><input type="text" v-model="lastName" :readOnly='readOnly' placeholder="姓"  @blur="onblur('lastName')" ><span  style="text-align: center;">名</span><input type="text" placeholder="名" v-model="firstName" :readOnly='readOnly' @blur="onblur('firstName')">
            </div>
            <div class="sex">
                    <span>称呼<span class="red">*</span></span>
                    <span style="padding-left:0" @click="changesex('0')">
                        <img v-show="sex=='0'" src="./images/Group@3x.png">
                        <img v-show="sex!='0'" src="./images/OvalCopy@3x.png">
                        <span>先生</span>
                    </span>
                    <span @click="changesex('1')">
                        <img v-show="sex=='1'" src="./images/Group@3x.png">
                        <img v-show="sex!='1'" src="./images/OvalCopy@3x.png">
                        <span>女士</span>
                    </span>
            </div>
            <div class="phone">
                <wn-input label="手机号码" :readOnly='readOnly' :style="!vercode?'margin-bottom:0':'margin-bottom:15px'" :parmasprop="parmasprop"  test="phone"  :placeholder='defaultphone'   @change="inputchange"></wn-input>
             <!-- <span >手机号码<span class="red">*</span></span><input type="number" :readOnly='readOnly'  :placeholder='defaultphone'  @blur="onblur('phone')" > -->
             </div>
             <!-- v-show="vercode"> -->
             <div class="name vercode" v-show="vercode">
                  <span >验证码<span class="red">*</span></span><input type="text" :readOnly='readOnly' :class="codeunpass?'':'error1'"  placeholder='请输入验证码' v-model="verificationCode" @blur="onblur('verificationCode')" >
                  <span  :class="!this.canClick?'disabled code':'code'" @click="getCode">{{content}}</span>
                  <!-- <span class="code">60s</span> -->
             </div>

        </div>
        <div class="driverinfo" style="border-top:10px solid #F5F5F5;padding:20px;">
            <div class="order clearfix">表单编号：{{testDriveOrderNo}}</div>
            <div class="driver"  >
                <span :class="isTestRide?'active':''"  @click="isTestRides">试乘</span>
                <span :class="isTestDrive?'right active':'right'" @click="isTestDrives">试驾</span>
            </div>
              <div class="sex" v-show="driveType">
                    <span style="font-weight: bold;">试驾车型</span>
                    <span  style="padding-left:0"  v-for="(item,i) in intentionCarModel" :key='i'> {{carsize[item]}}</span>
                    <!-- <span  style="padding-left:0"  v-show="intentionCarModel[0]=='10881001'" :key='i'> MKZ</span>
                    <span  style="padding-left:0"  v-show="intentionCarModel[0]=='10881002'" :key='i'> MKC</span> -->
              </div>
              <div class="sex"  v-show="driveType">
                    <span style="font-weight: bold;">试驾类型</span>
                    <span style="padding-left:0">{{driveType=="1"?'入店试驾':'上门试驾'}}</span>
              </div>
            <div class="sex" v-show="!driveType">
                    <span style="font-weight: bold;">试驾类型<span class="red">*</span></span>

                    <span style="padding-left:0" @click="changedriver('1')" >
                        <img v-show="testDrivePlace==1" src="./images/Group@3x.png">
                        <img v-show="testDrivePlace==2||testDrivePlace==0" src="./images/OvalCopy@3x.png">
                        <span>入店试驾</span>
                    </span>
                    <span @click="changedriver('2')" >
                        <img v-show="testDrivePlace==2" src="./images/Group@3x.png">
                        <img v-show="testDrivePlace==1||testDrivePlace==0" src="./images/OvalCopy@3x.png">
                        <span>上门试驾</span>
                        <!-- isTestDrive -->
                    </span>
            </div>
            <div class="name upload">
                 <div  style="width:26%;display:inline-block;vertical-align: middle;">
                     <span style="font-weight: bold;">上传试驾</span>
                     <span style="float:left;margin-left: 12px;font-weight: bold;">协议<span class="red">*</span></span>
                     </div><div class="input " @click="upload"   >
                         <!-- 前端显示 -->
                            <div class="noupload" style="float:right;">
                                <span>{{hasupload?'已上传':'未上传'}}</span>
                                <div  class="nouploadbg"  v-show="!hasupload">
                                    <!-- <img :src="hasupload?require('./images/Bitmap.png'):require('./images/noupload.png')" style="width:20px;margin:5px 10px 10px;" alt=""> -->
                                     <!-- 实际调相机控件 -->
                                     <label for="upload"></label>
                                     <input type="file" accept="image/*" id="upload" @change="imgChange" style="display:none" capture="camera">
                                 </div>
                                <img v-show="hasupload" :src="testDriveUrl" style="width:20px;margin:5px 10px 10px;"  alt="">

                            </div>

                         </div>
            </div>
                <wn-select label="试驾车"  :readOnly='readOnly' :parmasprop="parmasprop" test="testDriveCar" :data="optis2" v-model="testDriveCar" @change="inputchange"></wn-select>
                <wn-select label="试驾路线" :readOnly='readOnly' :parmasprop="parmasprop" test="testDriveRoute" :data="optis1" v-model="testDriveRoute" @change="inputchange"></wn-select>
               <wn-select label="品鉴工程师" :readOnly='readOnly' style="margin-bottom:0" :parmasprop="parmasprop" test="tastingEngineer" v-model="tastingEngineer" :data="optis"  @change="inputchange"></wn-select>
        </div>
        <div class="begindriver" style="border-top:10px solid #F5F5F5;padding:20px">
            <div class="bgdriver"
            :style="listenwar?'':'background: #9f9f9f;color:#FFF;border-color:#9f9f9f'"

            @click="driver">
                <span v-show="firstclick">开始试驾</span>
                 <span v-show="!firstclick">结束试驾</span>
            </div>
              <cn-input label="开始试驾时间" v-model="starttime"    ></cn-input>
              <cn-input label="开始试驾里程数" v-model="startMileage"    ></cn-input>
               <cn-input label="结束试驾时间" v-model="endtime"    ></cn-input>
               <cn-input label="结束试驾里程数" style="margin-bottom:0" v-model="endMileage"    ></cn-input>
   </div>


    </div>
</template>
<script>
import { Toast,MessageBox,Indicator } from "mint-ui";
import wnInput from './components/wninput'
import cnInput from './components/cninput'
import wnSelect from "./components/wnselect"
import util from '../../common/DMC.util.js'
import JSSDK from '../../common/weixin.js'
import jqalert from './common/popups'
import './common/style.scss'

export default {
  data() {

    return {
        wxPhone:util.getQueryValue('wxPhone'),//用户手机号
        wxUserId:util.getQueryValue('wxUserId'),//用户id
        testDriveOrderNo:'',//订单号
        firstName:'',//姓
        lastName:'',//名
        phone:'',//手机号
        unpass:'',//后台保存错误通过动态控制class
        codeunpass:true,//监听提示
        listencode:false,//监听闲色
        hasupload:false,//显示未上传，true显示已经上传
        testDriveUrl:'',//协议地址
        intentionCarModel:[],
        defaultphone:util.getQueryValue('phone')?util.getQueryValue('phone'):'请输入您的手机号码',//非空手机号
        // sex:'',//性别
        drivertype:'',
        id:'',//订单ID编号
        verificationCode:'',//验证码
        isTestRide:false,//试乘2否12781002
        isTestDrive:false,//试驾2否12781002
        testDrivePlace:1,//1入店 2上门（试驾试乘）
        vercode:false,//控制验证码是否显示
        rightphone:false,//手机号是否正确
        content: '发送验证码',  // 按钮里显示的内容
        totalTime: 60 ,    //记录具体倒计时时间
        content: '发送验证码',
        canClick: true, //添加canClick
        parmasprop:{},//保存传递的
        carnumber:'',
       passlook:false,//验证通过
        arraytime:[],
        tastingEngineer:'',//品鉴工程师
        testDriveCar:'',//试驾车型
         testDriveRoute:'',//试驾路线
        optis:[//存储品鉴工程师列表
            // {value:'1',label:'宝马'},
            // {value:'2',label:'兰博'}
        ],
         optis1:[//存储试驾路线列表
            // {value:'1',label:'宝马'},
            // {value:'2',label:'兰博'}
        ],
         optis2:[//存储试驾车列表
            // {value:'1',label:'宝马'},
            // {value:'2',label:'兰博'}
        ],
        starttime:'',//开始时间
        startMileage:'',//开始里程
        firstclick:true,//开始试驾第一次点击
        endtime:'',
        endMileage:'',
        value:'',
        sex:'',
        // sex1:'',
        begindriver:false,
        driveType:'',
        carsize:{
            "10881001":"MKZ",
            "10881002":"MKC",
            "10881003":"MKS",
            "10881004":"MKX",
            "10881005":"Navigator",
            "10881006":"Continental",
        },
        imgSrc: '',
        imgFile: null,
        readOnly:false,
    };
  },
  methods:{
    //   创建新的空白表单
      getdriverorder(){
          return new Promise((resolve,reject)=>{
                     // 初始化查询订单号
                    var parmas={
                        'wxPhone':this.wxPhone,
                        'wxUserId':this.wxUserId,
                         'phone':this.defaultphone=='请输入您的手机号码'?'':this.defaultphone,
                         'testDrivePlace': 1,
                        //  'isVerifySuccess':0,
                    }
                    this.http.post('createTestDriveOrder',parmas,res=>{
                        if(res.resultCode=='1'){
                            if(res.data){
                                this.testDriveOrderNo=res.data.testDriveOrderNo;
                                this.id=res.data.id;
                                resolve(res.data.testDriveOrderNo)
                                //   传递到组件用来保存的参数
                                this.parmasprop={
                                    'testDriveOrderNo':this.testDriveOrderNo,

                                    'wxPhone':this.wxPhone,
                                    'wxUserId':this.wxUserId,
                                    'phone':this.defaultphone=='请输入您的手机号码'?'':this.defaultphone,
                                }

                            }
                        }else{
                            Toast({
                                message: res.errMsg,
                            });
                        }
                    })
          })
      },
    //   表单数据回显
      infoback(){

             this.http.get('todayTestDriveDetail',{id:util.getQueryValue('id')},res=>{

                if(res.resultCode=='1'){

                    if(res.data){
                        var list=res.data;
                          this.parmasprop={
                                    'testDriveOrderNo':list.testDriveOrderNo,
                                    'wxPhone':this.wxPhone,
                                    'wxUserId':this.wxUserId,
                         }
                    this.firstName=list.firstName
                    this.lastName=list.lastName?list.lastName:util.getQueryValue('lastName');

                    if(list.sex=='先生'){
                        this.sex=0;
                    }
                    else if(list.sex=='女士'){
                        this.sex=1;
                    }else{//后台为空
                        this.sex=util.getQueryValue('sex');
                    }

                    if(list.isTestRide=="试乘"){
                        this.isTestRide=true;
                    }else if(list.isTestDrive=="试驾"){
                         this.isTestDrive=true;
                    }
                    this.defaultphone=list.phone?list.phone:util.getQueryValue('phone');
                    this.testDriveOrderNo=list.testDriveOrderNo;
                    this.testDrivePlace=list.testDrivePlace;
                    this.testDriveCar=Number(list.testDriveCarId);
                    this.testDriveRoute=list.testDriveRoute;
                    this.tastingEngineer=list.tastingEngineer;
                    this.driveType=list.isWrite;
                    this.intentionCarModel=list.intentionCarModel?list.intentionCarModel.split(','):'';
                    this.id=list.id;
                    //已经上传成功
                    if(list.testDriveUrl){
                        this.hasupload=true
                        this.testDriveUrl=list.testDriveUrl//协议地址

                    }

                    }
                }else{
                    Toast({
                        message: res.errMsg,
                    });
                }
            })
      },
      async init(){
        //   this.wxPhone=util.getQueryValue('wxPhone');
        //   this.wxUserId=util.getQueryValue('wxUserId');
        if(util.getQueryValue('driveType')){//C端预约进入的进行回显和创建订单
        // debugger
            this.getdriverorder().then(()=>{
                this.parmasprop['lastName']=util.getQueryValue('lastName')
                this.parmasprop['sex']=util.getQueryValue('sex')
                this.parmasprop['testDrivePlace']=util.getQueryValue('driveType')
                this.parmasprop['isWrite']=1;//C端进来标记
                this.parmasprop['firstName']=util.getQueryValue('firstName')
                 this.parmasprop['intentionCarModel']=util.getQueryValue('intentionCarModel')//试驾车型字符串
                //   this.parmasprop['isVerifySuccess']=1;//验证码通过

               this.http.post("updateTestDriveOrder",this.parmasprop,res=>{
                      if(res.resultCode=='1'){
                                return;
                    }else{
                        this.unpass=true

                    }
                })
            })
            this.lastName=util.getQueryValue('lastName')
            this.sex=util.getQueryValue('sex')
            this.driveType=util.getQueryValue('driveType')
             this.firstName=util.getQueryValue('firstName')=='null'?'':util.getQueryValue('firstName')
            this.intentionCarModel=util.getQueryValue('intentionCarModel').split(',')
            // debugger

        }
        if(util.getQueryValue('id')){
            this.infoback()//点击当日试成表回显表格
        }
        if(util.getQueryValue('driveType')==null&&util.getQueryValue('id')==null){
            //初始化生成订单号 //点击空白创建表单创建表
             this.getdriverorder().then(()=>{
                    this.parmasprop['testDrivePlace']=1
                this.http.post("updateTestDriveOrder",this.parmasprop,res=>{
                        if(res.resultCode=='1'){
                                    return;
                        }else{
                            this.unpass=true

                        }
                })
             })


        }



        //   初始化查询工程师
        var parmas={
            'wxUserId':this.wxUserId,
            'phone':this.wxPhone
        }
        this.http.get('updateCancelTime',parmas,res=>{
             if(res.resultCode=='1'){
                    if(res.data){
                        //对后台数据进行过滤
                        this.filterdata(res.data)
                            console.log('callback',this.optis)

                    }
            }else{
                  Toast({
                    message: res.errMsg,
                });
              }
        }),
        // 初始化查询路线
        this.http.get('getManageList',parmas,res=>{
            if(res.resultCode=='1'){
                    if(res.data){
                        var  newarray=res.data;
                        newarray.forEach((item,index)=>{
                            if(item.planCode=='10011004'){
                             delete  newarray[index];
                            }

                        })
                        //对后台数据进行过滤
                        this.filterdata1(newarray)
                            console.log('callback',this.optis)

                    }
            }else{
                  Toast({
                    message: res.errMsg,
                });
              }

        })
        // 初始化查询车型
          this.http.get('getVehicleList',parmas,res=>{
            if(res.resultCode=='1'){
                    if(res.data){
                        //对后台数据进行过滤
                        this.filterdata2(res.data.list)
                            console.log('callback',this.optis)

                    }
            }else{
                  Toast({
                    message: res.errMsg,
                });
              }

        })
      },
    //   过滤工程师
       filterdata(data){
            return new Promise((resolve, reject)=>{
                var arraytime=[];
                // this.optis=[];
                data.forEach((item,index)=>{

                var obj={};
                obj['value']=item['counselorCode'];
                obj['label']=item['counselorName'];
                arraytime.push(obj)
                });
                this.optis=arraytime;
                resolve();
                // return arraytime;
            })
        },
        // 过滤路线
        filterdata1(data){

            return new Promise((resolve, reject)=>{
                var arraytime=[];
                // this.optis=[];
                data.forEach((item,index)=>{
                var obj={};
                obj['value']=item['planCode'];
                if(item.planSeq==1){
                      obj['label']='路线一：<div></div>'+item['description'];
                }
                else if(item.planSeq==2){
                      obj['label']='路线二：<div></div>'+item['description'];
                }
                else if(item.planSeq==3){
                      obj['label']='路线三：<div></div>'+item['description'];
                }

                arraytime.push(obj)
                });
                this.optis1=arraytime;
                resolve();
                // return arraytime;
            }
            )
        },
        // 过滤试驾车
           filterdata2(data){

            return new Promise((resolve, reject)=>{
                var arraytime=[];
                // this.optis=[];
                data.forEach((item,index)=>{
                       if(item.isValue=='1'){
                        return;
                    }
                var obj={};
                obj['value']=item['id'];
                obj['label']=item['license'];
                arraytime.push(obj)
                });
                this.optis2=arraytime;
                resolve();
                // return arraytime;
            })
        },
      inputchange(value,node){
          this._data[node]=value;
        console.log(node,value)
      },
      changesex(value){
          if(this.readOnly){
              return;
          }

          if(value=='0'){
               this.sex=0;
               this.parmasprop['sex']=0
               this.http.post("updateTestDriveOrder",this.parmasprop,res=>{
                      if(res.resultCode=='1'){
                                return;
                    }else{
                        this.unpass=true

                    }
                })

          }else{
              this.sex=1;
              this.parmasprop['sex']=1
               this.http.post("updateTestDriveOrder",this.parmasprop,res=>{
                      if(res.resultCode=='1'){
                                return;
                    }else{
                        this.unpass=true

                    }
                })

          }
      },

      changedriver(value){//修改试驾类型
          if(this.readOnly){
              return;
          }
        if(value=='1'){
            this.testDrivePlace=1//视图状态切换
            this.parmasprop['testDrivePlace']=1
               this.http.post("updateTestDriveOrder",this.parmasprop,res=>{
                      if(res.resultCode=='1'){
                                return;
                    }else{
                        this.unpass=true

                    }
                })

        }else{
            this.testDrivePlace=2//视图状态切换
             this.parmasprop['testDrivePlace']=2
               this.http.post("updateTestDriveOrder",this.parmasprop,res=>{
                      if(res.resultCode=='1'){
                                return;
                    }else{
                        this.unpass=true

                    }
                })
        }
      },
        //   姓名失去焦点后台保存
        onblur(value){
            if(value=='firstName'){
                if(!this.firstName){//不输入不验证
                    return;
                }
                this.parmasprop['firstName']=this.firstName;
                   this.http.post("updateTestDriveOrder",this.parmasprop,res=>{
                      if(res.resultCode=='1'){
                          this.unpass=false;
                                return;
                    }else{
                        this.unpass=true

                    }
                })
            }else if(value=="lastName"){
                if(!this.lastName){//不输入不验证
                    return;
                }
                this.parmasprop['lastName']=this.lastName;
                   this.http.post("updateTestDriveOrder",this.parmasprop,res=>{
                      if(res.resultCode=='1'){
                          this.unpass=false;
                                return;
                    }else{
                        this.unpass=true
                    }
                })
            }else if(value=="verificationCode"){
                 if(!this.verificationCode){//不输入不验证
                    return;
                }
                this.parmasprop['verificationCode']=this.verificationCode;
                   this.http.post("updateTestDriveOrder",this.parmasprop,res=>{
                      if(res.resultCode=='1'){
                          this.codeunpass=true;
                          this.listencode=true;

                    }else{
                        this.codeunpass=false
                         this.listencode=false;
                    }
                })
            }
        },
        //获取验证码
        getCode(){

            //  启动定时器
            if (!this.canClick) return  //改动的是这两行代码
            this.canClick = false
            this.content = this.totalTime + 's'
            let clock = window.setInterval(() => {
                this.totalTime--
                this.content = this.totalTime + 's'
                if (this.totalTime < 0) {
                    window.clearInterval(clock)
                    this.content = '发送验证码'
                    this.totalTime = 60
                    this.canClick = true  //这里重新开启
                }
            },1000)
            var parmas={
                'phone':this.phone,
                 'wxPhone':this.wxPhone,
                 'wxUserId':this.wxUserId,
                  'orderNo':this.testDriveOrderNo
            }
            // 请求后台接口
            this.http.get('getIdfyCode',parmas,res=>{
             if(res.resultCode=='1'){
                  if(res.data){
                    //   this.verificationCode=res.data.verificationCode;

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
            })
        },
        // 试乘逻辑
        isTestRides(){
              if(this.readOnly){
                    return;
                }

            this.isTestDrive=false;//试驾取消
            this.isTestRide=true;//试乘启动
               this.parmasprop['isTestRide']=12781001
               this.parmasprop['isTestDrive']=12781002
                //  debugger
               this.http.post("updateTestDriveOrder",this.parmasprop,res=>{
                    //  debugger
                      if(res.resultCode=='1'){
                                return;
                    }else{
                        this.unpass=true

                    }
                })
        },
        // 试驾逻辑
        isTestDrives(){
             if(this.readOnly){
                    return;
                }
            this.isTestRide=false;//试乘关闭
            this.isTestDrive=true;
            this.parmasprop['isTestRide']=12781002
            this.parmasprop['isTestDrive']=12781001
               this.http.post("updateTestDriveOrder",this.parmasprop,res=>{
                      if(res.resultCode=='1'){
                                return;
                    }else{
                        this.unpass=true

                    }
                })
        },
        // 开始试驾逻辑
        driver(){

            // 前端对必填项校验
            if(!this.lastName){
                Toast({
                     message: '请填写姓',
                });
            }
            else if(this.sex===''){
                // debugger
                Toast({
                     message: '请选择性别',
                });
            }else if(!this.defaultphone&&!this.phone){
                // debugger
                Toast({
                     message: '请输入手机号',
                });
            }else if(this.vercode&&!this.listencode){
                // debugger
                  Toast({
                     message: '验证码错误',
                });
            }

            else if(!this.isTestDrive&&!this.isTestRide){
                Toast({
                     message: '请选择试驾类型',
                });
            }else if(this.testDrivePlace=='0'){

                 Toast({
                     message: '请选择试驾地址',
                });
            }else if(!this.testDriveCar){
                 Toast({
                     message: '请选择试驾车型',
                });
            }else if(!this.testDriveRoute){
                 Toast({
                     message: '请选择试驾路线',
                });
            }else if(!this.hasupload){
                 Toast({
                     message: '请选择上传试驾协议',
                });
            }


            // if(false){

            // }


            else{
            // 开始试驾
            var _this=this;

            if(this.firstclick){//开始试驾状态
                // MessageBox.prompt('请确认开始试驾','提示',{inputType:'number',inputPlaceholder:'请记录开始里程数(KM)',confirmButtonText:'确认'}).then(({ value, action }) => {
                //     if(parseFloat(value).toString() == "NaN") {
                //
                //         Toast({
                //             message: '请输入数字',
                //         });
                //         return;
                //     }
                //     if(value>0){
                //         value=value.replace(/[^0-9]/ig, ' ').trim().split(/\s+/)[0]
                //     }else {
                //         Toast({
                //             message: '开始里程不能小于零',
                //         });
                //         return;
                //     }
                //     _this.parmasprop['startMileage']=value
                //      _this.parmasprop['testDriveCar']=this.testDriveCar
                //     this.http.post('startTestDriveOrder',_this.parmasprop,res=>{
                //         if(res.resultCode=='1'){
                //             if(res.data){
                //             // _this.starttime=_this.formatDate(res.data.startTime);
                //             _this.starttime=res.data.startTime
                //
                //             _this.startMileage=res.data.startMileage+' KM';
                //             //   状态切换为结束试驾
                //                 _this.firstclick=false;
                //
                //                 this.readOnly=true;
                //                 if(res.data.returnMsg){
                //                     Toast({
                //                         message: res.data.returnMsg,
                //                     });
                //                 }
                //
                //             }
                //         }else{
                //             Toast({
                //                 message: res.errMsg,
                //             });
                //         }
                //     })
                // });
              jqalert({
                title:'提示',
                prompt:'请确认开始试驾',
                yestext:'确认',
                notext:'取消',
                placeholder:'请记录开始里程数',
                yesfn:function () {

                            _this.parmasprop['startMileage']=$('.jq-alert input[type=text]').val()
                            _this.parmasprop['testDriveCar']=_this.testDriveCar
                            _this.http.post('startTestDriveOrder',_this.parmasprop,res=>{
                                if(res.resultCode=='1'){
                                    if(res.data){
                                    // _this.starttime=_this.formatDate(res.data.startTime);
                                    _this.starttime=res.data.startTime
                                    _this.startMileage=res.data.startMileage+' KM';
                                    //   状态切换为结束试驾
                                        _this.firstclick=false;
                        
                                        _this.readOnly=true;
                                        if(res.data.returnMsg){
                                            Toast({
                                                message: res.data.returnMsg,
                                            });
                                        }
                                        nofn()//模态框隐藏
                        
                                    }
                                }else{
                                    Toast({
                                        message: res.errMsg,
                                    });
                                }
                            })

         
                    
                },
                nofn:function () {
                  jqtoast('你点击了取消');
                }
              })
              $('.jq-alert  input[type=text]').attr('pattern','[0-9]*')
                .on('input',(e)=>{e.target.value=e.target.value.replace(/[^\d]/g,'')})


            }else{//结束试驾
                // MessageBox.prompt('请确认结束试驾','提示',{inputType:'number',inputPlaceholder:'请记录结束里程数(KM)',confirmButtonText:'确认'}).then(({ value, action }) => {
                //     if(parseFloat(value).toString() == "NaN") {
                //         Toast({
                //             message: '请输入数字',
                //         });
                //         return;
                //     }
                //     if(Number(value)< Number(_this.parmasprop['startMileage'])||Number(value)== Number(_this.parmasprop['startMileage']) ){
                //         Toast({
                //             message: '结束里程不能小于开始里程',
                //         });
                //         return;
                //     }
                //     if( value){
                //         // value=value.replace(/[^0-9]/ig, ' ').trim().split(/\s+/)[0]
                //     }
                //     _this.parmasprop['endMileage']=value
                //     this.http.post('endTestDriveOrder',_this.parmasprop,res=>{
                //         if(res.resultCode=='1'){
                //             if(res.data){
                //             _this.endtime=_this.formatDate(res.data.endTime);
                //             //  _this.endtime=res.data.endTime;
                //             _this.endMileage=res.data.endMileage+' KM';
                //             // debugger
                //                 setTimeout(()=>{
                //                     // alert("生成二维码跳转")
                //                     _this.$router.push("/qrCode?qrCodeUrl="+encodeURIComponent(res.data.qrCodeUrl));
                //                 },1500)

                //             }
                //         }else{
                //             Toast({
                //                 message: '异常',
                //             });
                //         }
                //     })
                // });

                 jqalert({
                title:'提示',
                prompt:'请确认结束试驾',
                yestext:'确认',
                notext:'取消',
                placeholder:'请记录结束里程数',
                yesfn:function () {
                        if(Number($('.jq-alert input[type=text]').val())< Number(_this.parmasprop['startMileage'])||Number($('.jq-alert input[type=text]').val())== Number(_this.parmasprop['startMileage']) ){
                                Toast({
                                    message: '结束里程不能小于开始里程',
                                });
                                return;
                        }
                        _this.parmasprop['endMileage']=$('.jq-alert input[type=text]').val()
                        _this.http.post('endTestDriveOrder',_this.parmasprop,res=>{
                        if(res.resultCode=='1'){
                                if(res.data){
                                _this.endtime=_this.formatDate(res.data.endTime);
                                //  _this.endtime=res.data.endTime;
                                _this.endMileage=res.data.endMileage+' KM';
                                    setTimeout(()=>{
                                        _this.$router.push("/qrCode?qrCodeUrl="+encodeURIComponent(res.data.qrCodeUrl));
                                    },1500)

                                }
                            }else{
                                Toast({
                                    message: '异常',
                                });
                            }
                        })



                
                },
                nofn:function () {
                //   jqtoast('你点击了取消');
                }
              })
               $('.jq-alert  input[type=text]').attr('pattern','[0-9]*')
                .on('input',(e)=>{e.target.value=e.target.value.replace(/[^\d]/g,'')})
            }
            // 结束试驾
            // setTimeout(()=>{//解决ios可以输入中文问题
            //
            //   $('input[type=number]').attr('pattern','[0-9]*')
            // //   .on('input',(e)=>{e.target.value=e.target.value.replace(/[^\d]/g,'')})
            // //   debugger
            // },200)
            }


        },
        // 时间过滤函数
        formatDate(date) {
               date = new Date(date);
                const pad = n => n < 10 ? `0${n}` : n;
                const dateStr1 = `${date.getFullYear()}年${pad(date.getMonth() + 1)}月${pad(date.getDate())}日 ${pad(date.getHours())}:${pad(date.getMinutes())}`;
                const dateStr = `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
                const timeStr = `${pad(date.getHours())}:${pad(date.getMinutes())}`;
                var weekDay = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
                // var dateStr = "2008-08-08";
                var myDate = new Date(Date.parse(dateStr.replace(/-/g, "/")));
                var weekday=weekDay[myDate.getDay()];
                return `${dateStr1}`;
        },

        imgChange(){
            var _this=this;
            console.log(_this)
            if (!event.target.files[0]) {
                 return false
            }
            let file = event.target.files[0]
            let reader = new FileReader()
            if (file.size > 18293270) {
                     alert('图片太大啦！')
            } else {
                reader.readAsDataURL(file)
                reader.onload =function(e){
                    _this.imgFile = file
                    _this.imgSrc = e.target.result
                    var formData = new FormData();
                    formData.append("photo", _this.imgFile);
                    formData.append('phone',_this.wxPhone);
                    formData.append('wxUserId',_this.wxUserId);
                    formData.append('orderNo',_this.testDriveOrderNo);
                    console.log('上传的图片', formData)

                    _this.uploadfile(formData)
                }
            }

        },
        // 上传图片
        uploadfile(formData){
            // debugger
               Indicator.open({
                    text: '载入中...',
                    spinnerType: 'fading-circle'
                });
             this.http.post("uploadPhoto", formData, res => {
                    var url = res.data
                    Indicator.close();
                    this.$router.push("/driveagreement?id="+this.id+'&wxPhone='+this.wxPhone+'&wxUserId='+this.wxUserId+'&testDriveUrl='+encodeURIComponent(res.data)+'&testDriveOrderNo='+this.testDriveOrderNo+'&hasupload='+this.hasupload);
             })
        },
        //上传试驾协议
        upload(){
            if(this.readOnly){
                    return;
             }

            if(this.hasupload){//已经上传
                 this.$router.push("/driveagreement?id="+this.id+'&wxPhone='+this.wxPhone+'&wxUserId='+this.wxUserId+'&testDriveOrderNo='+this.testDriveOrderNo+'&testDriveUrl='+encodeURIComponent(this.testDriveUrl)+'&hasupload='+this.hasupload);
            }
        }
  },
  watch:{
      //监听性别变化保存到后台

     //   监听手机号符合规则显示验证码
     phone(newphone){
         if(newphone==""){
             this.vercode=false;
             return;
         }
        if(/^1[0-9]{10}$/.test(newphone)){//手机号显示正确
            if(this.defaultphone==newphone){
                 this.vercode=false;

            }else{
                this.vercode=true;
            }
            this.rightphone=true;//手机号正确
        }else{
            this.rightphone=false;//手机号bu正确
        }
     },
    testDriveRoute(newplanCode){
         console.log(newplanCode)
     },
    //   _$data(value){
    //      debugger
    //  }

  },
   beforeMount() {
    $(document).attr("title", "试乘试驾登记");
  },
  components: {
      wnInput,wnSelect,cnInput
  },
  computed: {
      listenwar:function(){
          //this.defaultphone默认读取phone手机号 C端和 今天=试驾
          //this.phone新手机号
          //this.vercode 输入正确的手机号和之前的手机号不一致//出现验证码框子
          //this.rightphone输入正确手机号
          //this.listencode 验证码输入正确
        //   新注册没有手机号
        // 已经注册 有默认手机号（请输入您的手机号码或者1988165459003）不修改 修改
        var has=Boolean(this.defaultphone?this.defaultphone.length>10:false)//已经注册监听
        this.rightphone?has=false:''//输入新号码，已注册逻辑取消

        //   this.defaultphone==this.phone||this.defaultphone!='请输入您的手机号码&'&!this.vercode||this.vercode&&this.listencode、

          if(this.lastName&&(this.sex=='0'||this.sex=='1')&&(this.isTestDrive||this.isTestRide)&&(this.testDrivePlace!='0')&&(this.testDriveCar)&&this.testDriveRoute&&this.hasupload){
        //    新注册 已经注册
//
                if((this.rightphone&&this.listencode)||(has||(this.rightphone&&this.listencode))){//验证通过

                    return(
                        true
                    )
                }else if(this.defaultphone==this.phone){
                        return(
                               true
                        )
                }
            }

            else{

                return(
                 false
                )
           }
      }
  },
  mounted() {
      this.init()


  },
};
</script>
<style lang="sass">
    .register-container{
        background: #fff!important;
    }
     // select组件样式自定义
        .n3-select-group .n3-select-btn{
            min-height: 40px!important;
            span:nth-child(1){
                color:#E5e6e6;
            }
            .inline{
                color:#000;
            }
        }
</style>
<style lang="sass" scoped>

    /*在IE10+浏览器中, 使用css即可隐藏input文本输入框右侧的叉号*/
    input[type=text]::-ms-clear,::-ms-reveal{display:none;}
    input::-ms-clear,::-ms-reveal{display:none;}
    input{
        /*去除点击出现轮廓颜色*/
        border: 1px solid #E5E5E5;
        border-radius: 3px;
        -webkit-appearance: none;
        outline: none;
    }
    .input{
        border-radius:3px;
    }
    .red{
        color:red;
    }
       .error1{
            border:1px solid red;
        }
        // .phone{
        //     height: 40px;
        //      line-height: 40px;
        //      margin-top:15px;
        // }
        // .phone input {
        //         width: 74%;
        //         padding-left: 5px;
        //         float: right;
        //         border: 1px solid rgba(150, 160, 180, 0.3);
        //         height: 40px;
        //         line-height: 40px;
        // }
    .addfrom{
        // padding:20px;
        .baseinfo{

            .name{
                height:40px;
                line-height:40px;
                span{
                    display:inline-block;
                    width:26%;
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
                }
                >span{
                    display:inline-block;
                    padding:5px 10px;

                    img{
                    width:20px;
                    vertical-align: top;
                    }
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
            }
        }
        .driverinfo{

            .clearfix{
                overflow:auto;
                z-index:1;
            }
            .order{
                font-size: 10px;
                color: #323232;
                text-align:right;
                padding-bottom:8px;
                border-bottom:1px solid #E2E2E2;
            }
            .driver{
                margin:20px 0 10px;
                span{
                    background: #EBEBEB;
                    border-radius: 3px;
                    padding:12px 0;
                    display:inline-block;
                    width:40%;
                    text-align:center;
                }
                .right{
                    float:right;
                }
                .active{
                    background: #B45F1A;
                    border-radius: 3px;
                    color:#fff;
                }

            }
              .sex{//试驾类型
                margin-top:15px;
                >span:nth-child(1){
                    width:26%;
                    padding:0;
                }
                >span{
                    display:inline-block;
                    padding:5px 10px;

                    img{
                    width:20px;
                    vertical-align: top;
                    }
                }

            }
        }
        .begindriver{

            .bgdriver{

                    // display:inline-block
                    padding:10px 0;
                    background: #B45F1A;
                    border: 1px solid #B45F1A;
                    border-radius: 3px;
                    font-size: 17px;
                    color: #FFFFFF;
                    text-align: center;
                    

            }
        }
        .upload{
           margin-top:20px;
                height:40px;
                .nouploadbg{
                    position:relative;
                    width: 27px;
                    height: 22px;
                    margin:9px;
                    background:url('./images/noupload.png') no-repeat;
                    background-size:100% 100%;
                    float:right;

                    label{
                            position: absolute;
                            width:100%;
                            height:100%;
                            // display:block;
                    }
                }
                .uploadbg{
                     background:url('./images/Bitmap.png') no-repeat;
                    background-size:100% 100%;
                }
                input{
                    height:40px;
                    width:74%;
                }
               .input{
                    width:74%;
                    padding-left:5px;
                    float:right;
                    border:1px solid  rgba(150,160,180,.3);
                    height:40px;
                    line-height:40px;
                }
        }

    }

</style>
