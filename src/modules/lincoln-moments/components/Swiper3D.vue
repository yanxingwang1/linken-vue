<template>
  <div class="scroll-view" :class="{active:scrollActive}">
    <div class="left-mask"></div>
    <div class="right-mask"></div>
    <swiper
      :options="swiperOption"
      ref="mySwiper"
      @slideChange="test"
      @touchStart="touchStart"
      @touchMove="touchMove"
      @touchEnd="touchEnd"
    >
      <!-- slides -->
      <swiper-slide>
        <div class="scroll-view-item-warp">
          <img :src="imgList[0]">
          <!--<div class="scroll-view-item-bg">百年荣耀</div>-->
        </div>
      </swiper-slide>
      <swiper-slide>
        <div class="scroll-view-item-warp">
          <img :src="imgList[1]">
          <!--<div class="scroll-view-item-bg">林肯时刻</div>-->
        </div>
      </swiper-slide>
      <swiper-slide>
        <div class="scroll-view-item-warp">
          <img :src="imgList[2]">
          <!--<div class="scroll-view-item-bg">林肯服务</div>-->
        </div>
      </swiper-slide>
      <swiper-slide>
        <div class="scroll-view-item-warp">
          <img :src="imgList[3]">
          <!--<div class="scroll-view-item-bg">林肯团队</div>-->
        </div>
      </swiper-slide>
      <!-- Optional controls -->
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
  </div>
</template>

<script>
  import {swiper, swiperSlide} from 'vue-awesome-swiper'
  import 'swiper/dist/css/swiper.css'

  export default {
    name: 'Swiper3D',
    data () {
      return {
        scrollActive:false,
        swiperOption: {
          loop: true,
          effect: 'coverflow',
          grabCursor: true,
          centeredSlides: true,
          slidesPerView: 'auto',
          coverflowEffect: {
            rotate: 0,//slide做3d旋转时Y轴的旋转角度。默认50。
            stretch: 5,//每个slide之间的拉伸值，越大slide靠得越紧。 默认0。
            depth: 100,//slide的位置深度。值越大z轴距离越远，看起来越小。 默认100。
            modifier: 2,//depth和rotate和stretch的倍率，相当于depth*modifier、rotate*modifier、stretch*modifier，值越大这三个参数的效果越明显。默认1。
            slideShadows: false
          },
          pagination: {
            el: '.swiper-pagination'
          }
        },
        imgList: [
          'https://lincoln-mp-dev.yonyouauto.com/fs01/pjlk/11@2x.png',
          'https://lincoln-mp-dev.yonyouauto.com/fs01/pjlk/22@2x.png',
          'https://lincoln-mp-dev.yonyouauto.com/fs01/pjlk/33@2x.png',
          'https://lincoln-mp-dev.yonyouauto.com/fs01/pjlk/44@2x.png',
        ]
      }
    },
    props: {},
    methods: {
      test (e) {
        let index = this.$refs.mySwiper.swiper.snapIndex - 4
        console.log('滑动切换', index)
        if (index == 4) {
          index = 0
        } else if (index == -1) {
          index = 3
        }
        this.$emit('indexChange', index)
      },
      touchStart(){
        console.log('touchStart')
        this.scrollActive = true
      },
      touchMove(){
        console.log('touchMove')
      },
      touchEnd(){
        console.log('touchEnd')
        this.scrollActive = false
      }
    },
    components: {
      swiper,
      swiperSlide
    }
  }
</script>

<style lang="sass" type="text/scss" rel="stylesheet/scss" scoped>
  .scroll-view {
    position: relative;
    & .left-mask,& .right-mask{
      position: absolute;
      top: 0;
      bottom: 0;
      width: 5%;
      z-index: 999;
      opacity: 1;
      background-color: rgba(255,255,255,0.6);
      transition: opacity .3s linear;
    }
    & .left-mask{
      left: 0;
    }
    & .right-mask{
      right: 0;
    }
    &.active .left-mask,&.active .right-mask{
      opacity: 0;
      transition: opacity 0s linear;
    }

    .swiper-container {
      position: relative;
      width: 90vw;
      height: 150vw;
      .swiper-wrapper {
        .swiper-slide {
          width: 90%;
          height: 100%;
          margin: 0 auto;
        }
        .scroll-view-item-warp {
          position: relative;
          width: 100%;
          height: 100%;
          img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            /*filter: blur(10px);*/
          }
          .scroll-view-item-bg {
            position: absolute;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            /*background-color: rgba(255,255,255,.6);*/
            background-image: url("./../imgs/guangxian@3x.png");
            background-size: 191px*0.8 7px*0.8;
            background-repeat: no-repeat;
            background-position-x: center;
            background-position-y: 55%;
            display: flex;
            justify-content: center;
            align-items: center;
            color: white;
            font-size: 32px;
          }
        }
      }

    }
  }
</style>
