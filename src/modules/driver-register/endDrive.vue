<template>
    <div class="endform">
        <div style="padding:20px">
            <div class="name-font-style">{{driveInfo.lastName}} {{driveInfo.sex}}</div>
            <div class="time-font-style">试驾时间：<span style="font-family: PingFangSC-Regular;">{{driveInfo.testDriveDate}}</span></div>
            <a :href="'tel:' + driveInfo.phone"><div class="phone-font-style">联系电话：<span style="color:#0BABFE">{{driveInfo.phone}}</span></div></a>
        </div>
        <div class="driverinfo" style="border-top:10px solid #F5F5F5;padding:20px;">
            <div class="order clearfix">表单编码：{{driveInfo.testDriveOrderNo}}</div>
            <div class="driver">{{driveInfo.isTestDrive?driveInfo.isTestDrive:driveInfo.isTestRide}}</div>
            <div class="driver-other" style="margin-top:23px"><div class="driver-other-width">上传试驾协议：</div><div class="driver-other-color">{{driveInfo.testDriveUrl?'已上传':'未上传'}}</div></div>
            <div class="driver-other"><div class="driver-other-width">试驾车：</div><div class="driver-other-color">{{driveInfo.testDriveCarName}}</div></div>
            <div class="driver-other"><div class="driver-other-width">试驾路线：</div><div class="driver-other-color">{{driveInfo.planSeqName}}{{driveInfo.testDriveRouteName}}</div></div>
            <div class="driver-other"><div class="driver-other-width">品鉴工程师：</div><div class="driver-other-color">{{driveInfo.tastingEngineerName}}</div></div>
        </div>
        <div class="begindriver" style="border-top:10px solid #F5F5F5;padding:20px">
            <div class="bgdriver" @click="driver">
                <span>结束试驾</span>
            </div>
            <cn-input label="开始试驾时间" v-model="driveInfo.startTime"></cn-input>
            <cn-input label="开始试驾里程数" v-model="driveInfo.startMileagekm"></cn-input>
            <cn-input label="结束试驾时间" v-model="driveInfo.endTime"></cn-input>
            <cn-input label="结束试驾里程数" v-model="driveInfo.endMileagekm"></cn-input>
        </div>
    </div>
</template>
<script>
import { Toast,MessageBox } from "mint-ui";
import cnInput from './components/cninput';
import util from '../../common/DMC.util.js'
import jqalert from './common/popups'
import './common/style.scss'
export default {
    components: {
        cnInput
    },
    data() {
        return {
            driveInfo:{
                lastName:'',
                sex:'',
                testDriveDate:'',
                testDriveOrderNo:'',
                phone:'',
                isTestDrive:'',
                isTestRide:'',
                testDriveUrl:'',
                testDriveRouteName:'',
                testDriveCarName:'',
                tastingEngineerName:'',
                startTime:'',
                startMileage:'',
                endTime:'',
                endMileage:'',
                startMileagekm:'',
                endMileagekm:'',
                planSeq:'',
                planSeqName:''
            }
        };
    },
    methods:{
        init(){
            this.http.get('todayTestDriveDetail',{id:util.getQueryValue('id')},res=>{
                if(res.resultCode=='1'){
                    if(res.data){
                        this.driveInfo=res.data;
                        if(this.driveInfo.planSeq == '1'){
                            this.driveInfo.planSeqName = '路线一：';
                        }else if(this.driveInfo.planSeq == '2'){
                            this.driveInfo.planSeqName = '路线二：';
                        }else if(this.driveInfo.planSeq == '3'){
                            this.driveInfo.planSeqName = '路线三：';
                        }
                        this.driveInfo.startMileagekm = this.driveInfo.startMileage + ' km';
                        if(this.driveInfo.endMileage){
                            this.driveInfo.endMileagekm = this.driveInfo.endMileage + ' km';
                        }
                    }
                }else{
                    Toast({
                        message: res.errMsg,
                    });
                }
            })
        },
        driver(){
            var _this=this;
            // let startMileageCom = this.driveInfo.startMileage;
            // MessageBox.prompt('请确认结束试驾','提示',{inputType:'number',inputPlaceholder:'请记录结束里程数(km)',confirmButtonText:'确认',
            //     // inputValidator: (val) => {
            //     //     if (val === null) {
            //     //     return true;//初始化的值为null，不做处理的话，刚打开MessageBox就会校验出错，影响用户体验
            //     //     }
            //     //     console.log($('input[type=number]')[0].value);
                    
            //     //     $('input[type=number]')[0].value = '11111';
            //     //     // return !(val.length < 6 || val.length > 8)
            //     // }
            // }).then(({ value, action }) => {
            //     if(parseFloat(value).toString() == "NaN") {
            //         Toast({
            //             message: '请输入数字',
            //         });
            //         return;
            //     }
            //     if(Number(value)<Number(startMileageCom)||Number(value)==Number(startMileageCom)){
            //         Toast({
            //             message: '结束里程不能小于开始里程',
            //         });

            //         return;
            //     }
            //     console.log(value + '-------' + startMileageCom);
            //     let param = {
            //         wxPhone:util.getQueryValue('wxPhone'),
            //         wxUserId:util.getQueryValue('wxUserId'),
            //         testDriveOrderNo:this.driveInfo.testDriveOrderNo,
            //         endMileage:value,
            //     }
            //     this.http.post('endTestDriveOrder',param,res=>{
            //         if(res.resultCode=='1'){
            //             if(res.data){
            //             _this.driveInfo.endTime=_this.formatDate(res.data.endTime);
            //             _this.driveInfo.endMileage=res.data.endMileage;
            //             _this.driveInfo.endMileagekm = res.data.endMileage + ' km';
            //             setTimeout(()=>{
            //                 // alert("生成二维码跳转")
            //                 _this.$router.push("/qrCode?qrCodeUrl="+encodeURIComponent(res.data.qrCodeUrl));
            //             },4000)

            //             }
            //         }else{
            //             Toast({
            //                 message: res.errMsg,
            //             });
            //         }
            //     })
            // });
            // setTimeout(()=>{
            //   $('input[type=number]').attr('pattern','[0-9]*')
            // },200)
            jqalert({
                title:'提示',
                prompt:'请确认结束试驾',
                yestext:'确认',
                notext:'取消',
                placeholder:'请记录结束里程数(km)',
                yesfn:function () {
                    if(Number($('.jq-alert input[type=text]').val())< Number(_this.driveInfo.startMileage)||Number($('.jq-alert input[type=text]').val())== Number(_this.driveInfo.startMileage) ){
                        Toast({
                            message: '结束里程不能小于开始里程',
                        });
                        return;
                    }
                    let param = {
                        wxPhone:util.getQueryValue('wxPhone'),
                        wxUserId:util.getQueryValue('wxUserId'),
                        testDriveOrderNo:_this.driveInfo.testDriveOrderNo,
                        endMileage:$('.jq-alert input[type=text]').val(),
                    }
                    _this.http.post('endTestDriveOrder',param,res=>{
                        if(res.resultCode=='1'){
                            if(res.data){
                                _this.driveInfo.endTime=_this.formatDate(res.data.endTime);
                                _this.driveInfo.endMileage=res.data.endMileage;
                                _this.driveInfo.endMileagekm = res.data.endMileage + ' km';
                                setTimeout(()=>{
                                    // alert("生成二维码跳转")
                                    _this.$router.push("/qrCode?qrCodeUrl="+encodeURIComponent(res.data.qrCodeUrl));
                                },1500)
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
    },
    watch:{

    },
    beforeMount() {
        $(document).attr("title", "试乘试驾登记");
    },
    mounted() {
        this.init()
    }
};
</script>
<style lang="sass">
    .register-container{
        background: #fff!important;
    }
</style>
<style lang="sass" scoped>
    .endform{
        .name-font-style {
            font-family: PingFangSC-Medium;
            font-size: 18px;
            color: #B45F1A;
            letter-spacing: 0;
            font-weight:600;
        }
        .time-font-style {
            margin-top: 23px;
            font-family: PingFangSC-Medium;
            font-size: 15px;
            color: #323232;
            letter-spacing: -0.48px;
        }
        .phone-font-style {
            margin-top: 12px;
            font-family: PingFangSC-Medium;
            font-size: 15px;
            color: #323232;
            letter-spacing: -0.48px;
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
                margin-top:26px;
                font-size: 18px;
                color: #B45F1A;
                letter-spacing: 0;
            }
            .driver-other {
                display:flex;
                margin-top:13px;
                font-family: PingFangSC-Regular;
                font-size: 15px;
                color: #7F7F7F;
                letter-spacing: -0.48px;
                .driver-other-color{
                    color:#141414;
                    width:60%;
                    text-align: justify;
                }
                .driver-other-width {
                    width:40%;
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
    }
</style>
