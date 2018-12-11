<template>
  <div>
    <!--上传试驾协议-->
    <div v-if="!imgSrc" class="page">
      <div class="index-wrap">
        <div class="index-title">上传试驾协议</div>
        <div class="index-body">
          <div class="body-hd">
            <div></div>
          </div>
          <div class="body-fd">
            <div class="camera">
              <input type="file" @change="imgChange" accept="image/png,image/jpeg,image/gif"/>
            </div>
            <div class="tip">点击拍摄/上传照片</div>
          </div>
        </div>
      </div>
    </div>
    <!--试驾协议预览-->
    <div v-else class="page2">
      <div class="index-wrap">
        <div class="index-title">试驾协议预览</div>
        <div class="index-body">
          <div class="close-btn" @click="deleteImg"></div>
          <div class="img-wrap">
            <img :src="imgSrc" alt="">
          </div>
        </div>

        <div class="index-footer">

          <wx-button
            :disabled="false"
            @click.native="uploadImg"
          >{{imgFile=='false'?'确认上传':'重新上传替换原试驾协议'}}
          <!-- <label for="upload"  v-show="imgFile=='true'" ></label> -->
            <input type="file" accept="image/*" id="upload" @change="imgChange"  v-show="imgFile=='true'"  capture="camera">
          </wx-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import WxButton from './../../components/WxButton'
  import util from '../../common/DMC.util.js'
import { Indicator } from "mint-ui";
  export default {
    name: "driveagreement",
    data() {
      return {
        imgSrc: '',
        imgFile: null,
        wxUserId:util.getQueryValue('wxUserId'),
        wxPhone:util.getQueryValue('wxPhone'),
        testDriveOrderNo:util.getQueryValue('testDriveOrderNo'),
      }
    },
    methods: {
      deleteImg() {
        // this.imgSrc = ''
        // this.imgFile = null
      },

        imgChange(){
          debugger
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
        uploadfile(formData){
          
               Indicator.open({
                    text: '载入中...',
                    spinnerType: 'fading-circle'
                });
             this.http.post("uploadPhoto", formData, res => {
                    var url = res.data
                    Indicator.close();
                    this.imgSrc =url;
                    this.imgFile ='false';
                    
             })
        },
      uploadImg() {
        if(this.imgFile=='false'){
              this.$router.push("/driverform?id="+this.$route.query.id+'&wxPhone=' + this.$route.query.wxPhone+'&wxUserId=' + this.$route.query.wxUserId+'&hasupload='+this.$route.query.hasupload);
      }
      },
    },
    components: {
      WxButton
    },
    mounted() {
      if (this.$route.query.testDriveUrl) {
        this.imgSrc = decodeURIComponent(this.$route.query.testDriveUrl)
        this.imgFile = this.$route.query.hasupload
        // debugger
      }
    }
  }
</script>

<style scoped lang="sass" type="text/scss">
  @function px($px) {
    @return ($px/20)+rem;
  }
  #upload{
    opacity: 0;
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    z-index:1;
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
      .index-title {
        text-align: center;
        font-size: 14px;
        color: #3E3E3E;
        margin-bottom: px(30);
      }

      .index-body {
        position: relative;
        width: px(320);
        height: px(380);
        background-color: #ffffff;

        .body-hd {
          position: relative;
          height: px(248);
          display: flex;
          justify-content: center;
          align-items: center;

          div {
            width: px(236);
            height: px(204);
            background-color: #F9F9F9;
          }
        }

        .body-fd {
          height: px(134);
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;

          .camera {
            position: relative;
            width: px(55);
            height: px(55);
            background-image: url("./images/camera-btn.png");
            background-size: 100% 100%;

            input {
              position: absolute;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
              opacity: 0;
            }
          }

          .tip {
            margin-top: px(15);
            margin-bottom: px(5);
            font-size: 14px;
            color: #3E3E3E;
          }
        }
      }
    }
  }

  .page2 {
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
        width: px(300);
        height: px(378);
        margin-top: px(35);
        margin-bottom: px(44);
        background-color: #ffffff;
        justify-content: center;
        align-items: center;

        .close-btn {
          display: inline-block;
          position: absolute;
          content: '';
          top: 0;
          right: 0;
          width: px(22);
          height: px(22);
          // background-image: url("./images/close@3x.png");
          background-size: 100% 100%;
          background-repeat: no-repeat;
        }

        .img-wrap {
          // width: px(200);
          // height: px(290);
          /*background-color: lightblue;*/
          img {
            width: px(260);
            height: px(350);
            object-fit: contain;
          }
        }
      }

      .index-footer {
        label.mint-button-text{
          margin-bottom:0;
        }

      }
    }
  }
</style>
