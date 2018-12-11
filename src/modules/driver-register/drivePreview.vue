<template>
  <!--试驾协议预览-->
  <div class="page">
    <div class="index-wrap">
      <div class="index-title">上传试驾协议</div>
      <div class="index-body">
        <div class="close-btn"></div>
        <div class="img-wrap">
          <img src="" alt="">
        </div>
      </div>

       <Upload max="1" @listenToUpload="receiveUpload"/>
      <div class="index-footer">
        <wx-button
          @click.native="handleClick"
        >确认上传</wx-button>
      </div>
    </div>
  </div>
</template>

<script>
  import WxButton from './../../components/WxButton'
  import util from '../../common/DMC.util.js'
import JSSDK from '../../common/weixin.js'
import { Toast,MessageBox } from "mint-ui";
import Upload from './components/Upload'
  export default {
    name: "drivepreview",
    methods:{
      receiveUpload (data) {
        console.log(data)
      var formData = new FormData();
      formData.append("photo", data);
       var parmas={
          'wxPhone':util.getQueryValue('wxPhone'),
          'wxUserId':util.getQueryValue('wxUserId'),
          'testDriveOrderNo':util.getQueryValue('testDriveOrderNo'),
        }
         this.http.post("uploadPhoto",formData,res=>{

          parmas['testDriveUrl']=res.data

           this.http.post("updateTestDriveOrder",parmas,res=>{
                      if(res.resultCode=='1'){
                                         var query=location.href.split('?')[1]
                                         debugger
                                              this.$router.push("/drivePreview?"+query);
                    }else{
                          alert('图片保存失败')
                    }
          })

          })

      },
      handleClick(){


        // var parmas={
        //   'wxPhone':util.getQueryValue('wxPhone'),
        //   'wxUserId':util.getQueryValue('wxUserId'),
        //   'testDriveOrderNo':util.getQueryValue('testDriveOrderNo'),
        // }
        //         // debugger
        //     JSSDK.wxReady( ()=>{
        //         // 选择图片
        //         JSSDK.selectImage().then((value)=>{
        //             // 返回照片在手机系统的id
        //                 // Toast({
        //                 //             message: value,
        //                 // });
        //                 // 上传图片
        //              JSSDK.uploadImage(value).then((url)=>{
        //                 //  返回服务器给的图片URL
        //                 // Toast({
        //                 //             message: url,
        //                 // });
        //                 // 预览图片
        //                 // JSSDK.previewImage(url)
        //                 // alert(url)


        //                     this.http.get("uploadPhoto",{'mediaId':url},res=>{
        //                             if(res.resultCode=='1'){

        //                                 parmas['testDriveUrl']=res.data
        //                                 this.http.post("updateTestDriveOrder",this.parmasprop,res=>{
        //                                                     if(res.resultCode=='1'){
        //                                                          var query=location.href.split('?')[1]
        //                                                          this.$router.push("/drivePreview?"+query);
        //                                                     }else{
        //                                                         this.unpass=true

        //                                                     }
        //                                 })

        //                             }else{
        //                                 this.unpass=true
        //                             }
        //                         })

        //              })
        //         })
        //    })
      }
    },
    components:{
      WxButton,  Upload
    }
  }
</script>

<style scoped lang="sass" type="text/scss">
  @function px($px) {
    @return ($px/20)+rem;
  }

  .page {
    position: relative;
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #f5f5f5;
    .index-wrap {
      width: 100%;
      text-align: center;
      padding: 0 px(23);
      .index-title {
        text-align: center;
        font-size: 14px;
        color: #3E3E3E;
      }

      .index-body {
        position: relative;
        display: flex;
        margin: 0 auto;
        width: px(242);
        height: px(328);
        margin-top: px(35);
        margin-bottom: px(44);
        background-color: #ffffff;
        justify-content: center;
        align-items: center;
        .close-btn{
          display: inline-block;
          position: absolute;
          content: '';
          top: 0;
          right: 0;
          width: px(22);
          height: px(22);
          background-image: url("./images/close@3x.png");
          background-size: 100% 100%;
          background-repeat: no-repeat;
        }
        .img-wrap{
          width: px(200);
          height: px(290);
          background-color: lightblue;

        }
      }
      .index-footer{

      }
    }
  }
</style>
