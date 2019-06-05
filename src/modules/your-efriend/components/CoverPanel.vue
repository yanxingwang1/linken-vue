<template>
  <div style="position: relative">
    <!-- 头部林肯标志 -->
    <div class="bg-02">
      <div v-show="showStatus" class="user-info" :style="{'background-image':userImg}" :class="{regist :isRegist,android:isAndroid}" @click="login">
        <span v-if="username">欢迎,{{username}}</span>
        <span v-else>注册</span>
      </div>
    </div>
    <!-- 美女图片 -->
    <div class="bg-03"></div>
    <!-- 意在为你 -->
    <div class="bg-04"></div>
  </div>
</template>

<script>
  const isAndroid = navigator.userAgent.indexOf('Android') > -1 || navigator.userAgent.indexOf('Adr') > -1;

  export default {
    name: "CoverPanel",
    data() {
      return {
        isAndroid,
      }
    },
    props: {
      username: {
        type: String,
      },
      headImgurl: {
        type: String,
      },
      loginurl:{
        type: String,
      },
      showStatus: {
        type: Boolean,
      }
    },
    methods:{

      login(){
        if(this.username){
            return;
        }
        if(this.loginurl){
          window.location.href=this.loginurl
              // window.open (this.loginurl)
        }
      }
    },
    computed: {
      //是否 显示 未注册
      isRegist() {
        // const {username} = this
        return this.username ? false : true
      },
      userImg() {
        if(this.username) {
          return `url(${this.headImgurl})`;
        }
      }
    }
  }
</script>

<style lang="sass" type="text/scss" rel="stylesheet/scss" scoped>
  @function px($px) {
    @return ($px/20)+rem;
  }

  .bg-02 {
    position: relative;
    height: px(56);
    background: url("./../imgs/logo.png") px(36)/px(88) no-repeat;

    .user-info {
      position: absolute;
      line-height: px(56);
      top: 0;
      right: 0;
      bottom: 0;
      border-radius: 50%;
      padding-left: px(24);
      padding-right: px(10);
      background-size: px(16);
      background-position: px(4);
      background-repeat: no-repeat;
      &.android {
        padding-top: px(3);
      }

      &.regist {
        background: url("./../imgs/icon_regist.png") px(4)/px(16) no-repeat;
      }
    }
  }

  .bg-03 {
    height: px(376);
    background: url("./../imgs/bg_03.png") center/100% no-repeat;
  }

  .bg-04 {
    height: px(156);
    background: url("./../imgs/bg_04.png") center/60% no-repeat;
  }
</style>
