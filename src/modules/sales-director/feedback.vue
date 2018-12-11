<template>
  <div class="index-div">
    <div class="step-width">
      <el-steps space="63px" :active="active" class="step-main" direction="vertical">
        <el-step>
          <i class="step-icon" slot="icon"></i>
        </el-step>
        <el-step>
          <i class="step-icon" slot="icon"></i>
        </el-step>
        <el-step>
          <i class="step-icon" slot="icon"></i>
        </el-step>
        <el-step>
          <i class="step-icon" slot="icon"></i>
        </el-step>
        <el-step>
          <i class="step-icon" slot="icon"></i>
        </el-step>
      </el-steps>
    </div>
    <div style="height:100vh;overflow:hidden;" ref="tabMainFirst">
      <div class="main-form">
        <div class="tab-main-outer">
          <div class="tab-main" >
            <div class="tab-main-inner">
              <div class="user-name-inner">尊敬的{{feedbackData.name}}</div>
              <div class="user-name-desc">感谢您莅临{{feedbackData.dealerName}}，试驾{{feedbackData.modelName}}。</div>
              <div class="user-name-desc-detail">首席顾问师：{{feedbackData.counselorName}}</div>
              <div class="user-name-desc-detail" style="margin-top:6px">试驾时间：{{feedbackData.time}}</div>
            </div>
            <div class="tab-main-border"></div>
            <div class="tab-main-inner question-title">动力性</div>
            <div class="tab-main-border-thin"></div>
            <div class="tab-main-inner">
              <question title="起步动力" @changeSelect="val=>{this.startingPower=val}"></question>
              <question title="中途加速动力" @changeSelect="val=>{this.midwayAcceleration=val}"></question>
              <question title="动力输出平顺性" @changeSelect="val=>{this.powerOutputRideComfort=val}"></question>
              <question title="变速的顿挫感" @changeSelect="val=>{this.theFrustrationOfSpeedChange=val}"></question>
            </div>
          </div>
          <div class="tab-other">
            <img @click="downClick(1)" class="down-img" :src="require('./imgs/down.png')" />
          </div>
        </div>
        <div class="tab-main-outer">
          <div class="tab-main">
            <div class="tab-main-inner question-title">操控性</div>
            <div class="tab-main-border-thin"></div>
            <div class="tab-main-inner">
              <question title="悬挂的软硬度" @changeSelect="val=>{this.softHardnessOfSuspension=val}"></question>
              <question title="方向盘的轻重" @changeSelect="val=>{this.steeringWheelWeight=val}"></question>
              <question title="转向时车辆的循迹性" @changeSelect="val=>{this.performance=val}"></question>
              <question title="制动的平顺性" @changeSelect="val=>{this.rideComfortOfBraking=val}"></question>
              <question title="制动性能" @changeSelect="val=>{this.brakingPerformance=val}"></question>
            </div>
          </div>
          <div class="tab-other">
            <img @click="downClick(2)" class="down-img" :src="require('./imgs/down.png')" />
          </div>
        </div>
        <div class="tab-main-outer">
          <div class="tab-main">
            <div class="tab-main-inner question-title">舒适性</div>
            <div class="tab-main-border-thin"></div>
            <div class="tab-main-inner">
              <question title="座椅质感的舒适性" @changeSelect="val=>{this.comfortOfSeatTexture=val}"></question>
              <question title="音响带给您的听觉效果" @changeSelect="val=>{this.audioBrings=val}"></question>
              <question title="内部空间" @changeSelect="val=>{this.internalSpace=val}"></question>
            </div>
          </div>
          <div class="tab-other">
            <img @click="downClick(3)" class="down-img" :src="require('./imgs/down.png')" />
          </div>
        </div>
        <div class="tab-main-outer">
          <div class="tab-main">
            <div class="tab-main-inner question-title">静谧性</div>
            <div class="tab-main-border-thin"></div>
            <div class="tab-main-inner">
              <question title="低速时发动机的噪音" @changeSelect="val=>{this.lowSpeed=val}"></question>
              <question title="行驶时的风噪及胎噪" @changeSelect="val=>{this.windNoise=val}"></question>
              <question title="车辆异响情况" @changeSelect="val=>{this.abnormalSound=val}"></question>
            </div>
          </div>
          <div class="tab-other">
            <img @click="downClick(4)" class="down-img" :src="require('./imgs/down.png')" />
          </div>
        </div>
        <div class="tab-main-outer">
          <div class="tab-main-last">
            <div class="tab-main-inner question-title">试驾服务品质</div>
            <div class="tab-main-border-thin"></div>
            <div class="tab-main-inner">
              <question title="陪同试驾人员的服务" @changeSelect="val=>{this.accompanyTest=val}"></question>
              <question title="经销商的试驾服务" @changeSelect="val=>{this.driveService=val}"></question>
              <question title="陪同试驾人员讲解的专业性" @changeSelect="val=>{this.professionalism=val}"></question>
              <group>
                <x-textarea v-model="remark" placeholder="其他意见" @on-blur="onblur()"></x-textarea>
              </group>
            </div>
          </div>
          <div class="tab-other" style="padding-bottom: 36px;" @click="submit()">
            <div class="tab-main-inner submit-feedback">
              提交反馈
            </div>
          </div>
        </div>
      </div>
    </div>
    <x-dialog v-model="showDialog">
      <div class="dialog-div-main">
        <div>
          <div class="dialog-div-main-title">{{title}}</div>
          <img class="dialog-div-main-img" src="./imgs/border-close.png" @click="closeDialog()"/>
          <div class="dialog-div-main-line"></div>
          <div class="dialog-div-main-border">“林肯之道服务号”将为您带来更多优享服务</div>
        </div>
      </div>
    </x-dialog>
  </div>
</template>

<script>
  import {
    Group,
    XTextarea,
    XDialog
  } from 'vux'
  import { Toast } from "mint-ui";
  import util from '../../common/DMC.util'
  import question from './components/question'
  import JSSDK from '../../common/weixin.js'
  import { swiper, swiperSlide } from "vue-awesome-swiper";
  import BScroll from "better-scroll";
  import "swiper/dist/css/swiper.css";

  export default {
    name: "feedback",
    components: {
      question,
      Group,
      XTextarea,
      XDialog,
      swiper,
      swiperSlide,
      BScroll
    },
    created() {
      end_time = new Date().getTime();
      console.log("index加载时间：", end_time - start_time, "ms");
    },
    beforeDestroy() {
      clearInterval(this.timer)
    },
    data() {
      return {
        title:'感谢您的反馈',
	      feedbackNo:'',//单号
        dealerCode:'',
        active:0,
        activePre:0,
        showDialog:false,
	      startingPower:'',//起步动力
	      midwayAcceleration:'',//中途加速动力
	      theFrustrationOfSpeedChange:'',//变速的顿挫感
	      powerOutputRideComfort:'',//动力输出平顺性
	      softHardnessOfSuspension:'',//悬挂的软硬度
	      steeringWheelWeight:'',//方向盘的轻重
	      performance:'',//转向时车辆的循迹性
	      rideComfortOfBraking:'',//制动的平顺性
	      brakingPerformance:'',//制动性能
        comfortOfSeatTexture:'',//座椅质感的舒适性
	      audioBrings:'',//音响带给您的听觉效果
	      internalSpace:'',//内部空间
	      lowSpeed:'',//低速时发动机的噪音
	      windNoise:'',//行驶时的风噪及胎噪
	      abnormalSound:'',//车辆异响情况
	      accompanyTest:'',//陪同试驾人员的服务
	      driveService:'',//经销商的试驾服务
	      professionalism:'',//陪同试驾人员讲解的专业性
        remark:'',//意见
        feedbackData:{
          id:'',
          modelName:'',//试乘试驾车型名称
          model:'',//试乘试驾车型代码
	        name:'',//客户姓名
          dealerCode:'',//经销商编码
          dealerName:'',//经销商名称
          counselorName:'',//顾问姓名
          counselorCode:'',//顾问代码
          sex:'',//性别（0:男；1：女）
          time:''
        },
        fullHeight: document.documentElement.clientHeight,
        gundongDistance:0,
        scrollY:0,
        scrollYOld:0,
        listHeight:[],
      }
    },
    directives: {
    },
    methods: {
      init() {
        // var _this = this;
        this.http.get('getVehicleFeedback',{id:this.feedbackNo,code:this.dealerCode},res=>{
          if(res.data[0].isSend==1){
            this.feedbackData = res.data[0];
            this.feedbackData.time = res.data[0].time.split(" ")[0];
            this.$nextTick(()=>{
              this.initScroll();
              this._calculateHeight();
            })
          }else {
            this.showDialog = true;
            this.feedbackData = res.data[0];
            this.feedbackData.time = res.data[0].time.split(" ")[0];
            this.title = "您已完成反馈";
            $$.smartScroll($$('.weui-mask'), '.dialog-div-main');
            $$.smartScroll($$('.dialog-div-main'), '.dialog-div-main');
            $$('html').addClass('noscroll');
          }
        });
      },
      initScroll(){
        this.tabMainFirst = new BScroll(this.$refs.tabMainFirst, {
          // scrollX: true,
          // eventPassthrough: 'vertical',
          probeType: 3,
          // momentum: false,
          // bounce: false,
          click:true,
        })
        this.tabMainFirst.on('scroll', (pos) => {
          // console.log(_this.gundongDistance);
          this.scrollY = Math.abs(Math.round(pos.y));

        })
        this.tabMainFirst.on('touchEnd', () => {
          if(this.active==0){
            this.activePre = 1;
          }
        })
        this.tabMainFirst.on('scrollStart', () => {
          if(this.active>0){
            this.activePre = this.active + 1;
          }
        })
      },
      _calculateHeight() {
        let foodList = this.$refs.tabMainFirst.getElementsByClassName('tab-main-outer');
        let height = 0;
        //把第一个高度送入数组
        this.listHeight.push(height);
        //通过循环foodList下的dom结构，将每一个li的高度依次送入数组
        for(let i = 0; i < foodList.length; i++) {
            let item = foodList[i]
            height += item.clientHeight
            this.listHeight.push(height);
        }
      },
      submit() {
        if(this.accompanyTest==''||
            this.driveService==''||
            this.professionalism==''){
          Toast({
            message: '请完成当页评价'
          });
          return;
        }
        let param = {
          id:this.feedbackData.id,
          feedbackNo:this.feedbackNo,
          dealerCode:this.dealerCode,

          startingPower:this.startingPower,//起步动力
          midwayAcceleration:this.midwayAcceleration,//中途加速动力
          theFrustrationOfSpeedChange:this.theFrustrationOfSpeedChange,//变速的顿挫感
          powerOutputRideComfort:this.powerOutputRideComfort,//动力输出平顺性
          softHardnessOfSuspension:this.softHardnessOfSuspension,//悬挂的软硬度
          steeringWheelWeight:this.steeringWheelWeight,//方向盘的轻重
          performance:this.performance,//转向时车辆的循迹性
          rideComfortOfBraking:this.rideComfortOfBraking,//制动的平顺性
          brakingPerformance:this.brakingPerformance,//制动性能
          comfortOfSeatTexture:this.comfortOfSeatTexture,//座椅质感的舒适性
          audioBrings:this.audioBrings,//音响带给您的听觉效果
          internalSpace:this.internalSpace,//内部空间
          lowSpeed:this.lowSpeed,//低速时发动机的噪音
          windNoise:this.windNoise,//行驶时的风噪及胎噪
          abnormalSound:this.abnormalSound,//车辆异响情况
          accompanyTest:this.accompanyTest,//陪同试驾人员的服务
          driveService:this.driveService,//经销商的试驾服务
          professionalism:this.professionalism,//陪同试驾人员讲解的专业性
          remark:this.remark,//意见

        }
        this.http.post('updateVehicleFeedback',param,res=>{
          if(res.data.errCode==200){
            $$.smartScroll($$('.weui-mask'), '.dialog-div-main');
            $$.smartScroll($$('.dialog-div-main'), '.dialog-div-main');
            $$('html').addClass('noscroll');
            this.showDialog = true;
          }else {
            Toast({
              message: '保存失败！'
            });
          }
        });
      },
      closeDialog(){
        // this.showDialog = false;
        JSSDK.closeWindow1();
      },
      downClick(i){
        if (i==1){
          this.tabMainFirst.scrollTo(0,0-this.listHeight[1],1000);
        } else if (i==2){
          this.tabMainFirst.scrollTo(0,0-this.listHeight[2],1000);
        } else if (i==3){
          this.tabMainFirst.scrollTo(0,0-this.listHeight[3],1000);
        } else if (i==4){
          this.tabMainFirst.scrollTo(0,0-this.listHeight[4],1000);
        }
      },
      onblur(){
        $("body").scrollTop(0);
        // setTimeout(() => {
        //   const scrollHeight = document.documentElement.scrollTop || document.body.scrollTop || 0;
        //   body.scrollTo(0, Math.max(scrollHeight - 1, 0));
        // }, 100);
      }
    },
    activated: function () {
      $(document).attr('title','试乘试驾反馈表');
    },
    beforeMount() {
      $(document).attr('title','试乘试驾反馈表');
    },
    watch: {
      scrollY:function(){
        let heightTop = this.listHeight[1] - this.fullHeight;
        //console.log(`scrollY=${this.scrollY};heightTop=${heightTop}`)
        if(this.scrollY>heightTop&&this.scrollY<this.listHeight[1]){
            this.active = 0;
            if(this.startingPower==''||
                this.midwayAcceleration==''||
                this.powerOutputRideComfort==''||
                this.theFrustrationOfSpeedChange==''){
              // console.log(this.active!=this.activePre)
              if(this.active<this.activePre) {
                Toast({
                  message: '请完成当页评价'
                });
              }
              let distance = this.fullHeight-this.listHeight[1]-5;
              this.tabMainFirst.scrollTo(0,distance,1000);
              return;
            }
        }else if(this.scrollY>this.listHeight[1]&&this.scrollY<this.listHeight[2]){
          this.active = 1;
          if(this.softHardnessOfSuspension==''||
                this.steeringWheelWeight==''||
                this.performance==''||
                this.rideComfortOfBraking==''||
                this.brakingPerformance==''){
              if(this.active<this.activePre) {
                Toast({
                  message: '请完成当页评价'
                });
              }
              let distance = 0-this.listHeight[1];
              this.tabMainFirst.scrollTo(0,distance,1000);
              return;
          }
        }else if(this.scrollY>this.listHeight[2]&&this.scrollY<this.listHeight[3]){
          this.active = 2;
          if(this.comfortOfSeatTexture==''||
              this.audioBrings==''||
              this.internalSpace==''){
            if(this.active<this.activePre) {
              Toast({
                message: '请完成当页评价'
              });
            }
            let distance = 0-this.listHeight[2];
            this.tabMainFirst.scrollTo(0,distance,1000);
            return;
          }
        }else if(this.scrollY>this.listHeight[3]&&this.scrollY<this.listHeight[4]){
          this.active = 3;
          if(this.lowSpeed==''||
              this.windNoise==''||
              this.abnormalSound==''){
            if(this.active<this.activePre) {
              Toast({
                message: '请完成当页评价'
              });
            }
            let distance = 0-this.listHeight[3];
            this.tabMainFirst.scrollTo(0,distance,1000);
            return;
          }
        }else if(this.scrollY>this.listHeight[4]){
          this.active = 4;
          let distance = 0-this.listHeight[4];
          this.tabMainFirst.scrollTo(0,distance,1000);
          return;
        }
        for(var i = 1;i<5;i++){
          if(this.scrollY==this.listHeight[i]){
            this.active = i;
          }
        }
      }
    },


    mounted() {
      window.app = this
      this.feedbackNo = this.$route.query.id;
      this.dealerCode = this.$route.query.code;

      return this.$nextTick(() => this.init());
    }
  };

</script>

<style lang="sass" scoped>
  @function px($px){
    @return ($px/20)+rem;
  }
  .index-div {
    display:flex;
    // overflow: auto;
    // -webkit-overflow-scrolling: auto;
    // height: 100vh;
  }
  .step-width {
    position: fixed;
    height: 100vh;
    width:42px;
    background:#F5F5F5;
  }
  .step-main {
    margin-left:14px;
    padding-top:29px;
  }
  .step-icon{
    width:9px;
    height:9px;
    display: inline-block;
    background-repeat: no-repeat;
    background: #BDBDBD;
    border-radius: 50%;
  }
  .is-finish .step-icon {
    background: #FFB57B;
  }
  .is-process .step-icon {
    width:13px;
    height:13px;
    border:2px solid #B45F1A;
    background: #FFB57B;
  }
  .main-form {
    margin-left:42px;
    width:100vw;
    // overflow:auto;
    .swiper-slide {
      // display:none;
    }
    .swiper-slide-active {
      // display:block;
    }
  }
  .down-img {
    width:22px;
  }
  .tab-main {
    width:calc(100vw - 42px);
    min-height:calc(100vh - 44px);
    overflow-y: auto;
    padding-bottom: 20px;
  }
  .tab-other {
    text-align:center;
    padding-right: 42px;
  }
  .tab-main-inner {
    width:86%;
    margin-left:7%;
    .weui-cells {
      margin-top:1px!important;
    }
  }
  .user-name-inner {
    padding-top:25px;
    font-family: PingFangSC-Medium;
    font-size: 16px;
    color: #323232;
    letter-spacing: 0;
    font-weight: 600;
  }
  .user-name-desc {
    font-family: PingFangSC-Regular;
    font-size: 15px;
    color: #323232;
    letter-spacing: 0.4px;
    text-align: justify;
    line-height: px(24);
    margin-top:px(17);
  }
  .user-name-desc-detail {
    font-family: PingFangSC-Regular;
    font-size: px(14);
    color: #323232;
    letter-spacing: -0.45px;
    margin-top:px(13);
  }
  .tab-main-border {
    width:95%;
    height:px(8);
    background: #F5F5F5;
    margin-left:5%;
    margin-top:px(20);
  }
  .tab-main-border-thin {
    width:95%;
    height:px(1);
    background: #E2E2E2;
    margin-left:5%;
  }
  .question-title {
    font-family: PingFangSC-Medium;
    font-size: 16px;
    color: #3E3E3E;
    letter-spacing: 0;
    font-weight:600;
    margin-top:px(20);
    margin-bottom:px(8);
  }
  .tab-main-last {
    width:calc(100vw - 42px);
    height:calc(100vh - 80px);
    overflow-y: auto;
    margin-bottom: 20px;
  }
  .submit-feedback {
    background: #B45F1A;
    border: 1px solid #B45F1A;
    border-radius: 3px;
    font-family: PingFangSC-Regular;
    font-size: 17px;
    color: #FFFFFF;
    letter-spacing: -0.41px;
    text-align: center;
    height:44px;
    line-height:44px;
  }
  .dialog-div-main {
    height:150px;
    .dialog-div-main-title {
      font-family: PingFangSC-Medium;
      font-size: 18px;
      color: #323232;
      text-align: center;
      line-height: 18px;
      padding-top: 29px;
      font-weight:600;
    }
    .dialog-div-main-img {
      position: absolute;
      top: 16px;
      right: 16px;
      width: 22px;
    }
    .dialog-div-main-line {
      border-bottom:1px solid #E2E2E2;
      margin: 18px 25px 15px 25px;
    }
    .dialog-div-main-border {
      font-family: PingFangSC-Regular;
      font-size: 16px;
      color: #323232;
      letter-spacing: 0;
      text-align: center;
      width: 82%;
      margin-left: 9%;
    }
  }
</style>
