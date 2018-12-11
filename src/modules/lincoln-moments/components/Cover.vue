<template>
  <swiper
    :options="swiperOpt1"
    ref="mySwiper1"
    @slideChange="goNewPage"
  >
    <swiper-slide>
      <div class="bg-img-warp">
        <img v-show="coverIndex==0||coverIndex==4" class="bg-img" :src="bgImgList[0]" alt="">
        <img v-show="coverIndex==1" class="bg-img" :src="bgImgList[1]" alt="">
        <img v-show="coverIndex==2" class="bg-img" :src="bgImgList[2]" alt="">
        <img v-show="coverIndex==3||coverIndex==-1" class="bg-img" :src="bgImgList[3]" alt="">
        <div class="bg-img-bg">
          <img class="drop" src="./../imgs/down@3x.png" alt="">
        </div>
        <div
          @click.stop="fingerClick"
          ref="finger"
          class="bg-img-bg finger-mask">
          <img class="finger" src="./../imgs/finger-gif1.gif" alt="">
        </div>
      </div>
    </swiper-slide>
    <swiper-slide>
      <div class="bg-img-warp2"></div>
    </swiper-slide>

  </swiper>
</template>

<script>
import { swiper, swiperSlide } from "vue-awesome-swiper";
import "swiper/dist/css/swiper.css";

export default {
  name: "Cover",
  data() {
    return {
      swiperOpt1: {
        direction: "vertical"
      },
      bgImgList: [
        "https://lincoln-mp-dev.yonyouauto.com/fs01/pjlk/1@2x.png",
        "https://lincoln-mp-dev.yonyouauto.com/fs01/pjlk/2@2x.png",
        "https://lincoln-mp-dev.yonyouauto.com/fs01/pjlk/3@2x.png",
        "https://lincoln-mp-dev.yonyouauto.com/fs01/pjlk/4@2x.png"
      ]
      // titleList: [
      //   '百年荣耀',
      //   '林肯时刻',
      //   '林肯服务',
      //   '林肯团队',
      //   '百年荣耀'
      // ]
    };
  },
  props: {
    coverIndex: {
      type: Number
    }
  },
  methods: {
    goNewPage() {
      this.$emit("goNewPage", this.coverIndex);
      setTimeout(() => {
        this.$refs.mySwiper1.swiper.slideTo(0);
      }, 1000);
    },
    fingerClick() {
      $(".bg-img-bg.finger-mask").fadeOut(500);
    }
  },
  components: {
    swiper,
    swiperSlide
  }
};
</script>

<style lang="sass" type="text/scss" rel="stylesheet/scss" scoped>
  .bg-img-warp {
    position: relative;
    width: 100vw;
    height: 100vh;
    .bg-img-bg {
      position: absolute;
      top: 0;
      right: 0;
      left: 0;
      bottom: 0;
      /*display: flex;*/
      /*justify-content: center;*/
      /*align-items: center;*/
      /*color: white;*/
      /*font-size: 40px;*/
      /*background-image: url("./../imgs/guangxian@3x.png"), url("./../imgs/xiala@3x.png");*/
      /*background-size: 191px 7px, 22px 22px;*/
      /*background-repeat: no-repeat;*/
      /*background-position-x: center;*/
      /*background-position-y: 55%, 95%;*/
      img.drop {
        position: absolute;
        bottom: 33px;
        width: 22px;
        left: 50%;
        margin-left: -11px;
        animation: arrow-annimate 1.3s infinite;
      }
      img.finger {
        position: absolute;
        top: 50%;
        left: 50%;
        width: auto;
        height: 108px;
        margin-left: -32px;
        margin-top: -150px;
        /*animation:finger-annimate 1.3s infinite;*/
      }
      &.finger-mask{
        background: radial-gradient(rgba(0,0,0,.6), rgba(0,0,0,.2));
        /*background-color: rgba(0,0,0,.3);*/
      }
    }
  }

  .bg-img-warp2 {
    position: relative;
    width: 100vw;
    height: 100vh;
  }

  img.bg-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  @keyframes arrow-annimate {
    0% {
      opacity: 0;
      transform: translateY(0%);
    }
    50% {
      opacity: 1;
    }
    100% {
      opacity: 0;
      transform: translateY(-120%);
    }
  }

  @keyframes finger-annimate {
    0% {
      opacity: 1;
      transform: scale(1.3);
    }
    50% {
      opacity: 1;
    }
    100% {
      opacity: 0;
      transform: scale(0.9);
    }
  }
</style>
