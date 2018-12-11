<template>
  <swiper :options="swiperOption" ref="mySwiper">
    <!-- slides -->
    <swiper-slide v-for="(item,i) in imgList" :key="item">
      <div class="scroll-view-item-warp">
        <VideoImage
          :img-src="item"
          @handClick="showVideoPopup(item,videoList[i])"
        >
        </VideoImage>
      </div>
    </swiper-slide>
    <!-- Optional controls -->
    <div class="swiper-pagination" slot="pagination"></div>
  </swiper>
</template>

<script>
  import { swiper, swiperSlide } from 'vue-awesome-swiper'
  import VideoImage from './VideoImage'
  export default {
    name: 'VideoSwiper',
    data(){
      return {
        swiperOption: {
          slidesPerView: 2,
          pagination: {
            el: '.swiper-pagination',
          }
        },
        imgList:[
          'https://lincoln-mp-dev.yonyouauto.com/fs01/material/lincoln/star1.jpg',
          'https://lincoln-mp-dev.yonyouauto.com/fs01/material/lincoln/star2.jpg',
          'https://lincoln-mp-dev.yonyouauto.com/fs01/material/lincoln/star3.jpg',
          'https://lincoln-mp-dev.yonyouauto.com/fs01/material/lincoln/star4.jpg',
          'https://lincoln-mp-dev.yonyouauto.com/fs01/material/lincoln/star5.jpg',
          'https://lincoln-mp-dev.yonyouauto.com/fs01/material/lincoln/star6.jpg',
          'https://lincoln-mp-dev.yonyouauto.com/fs01/material/lincoln/star7.jpg'
        ],
        videoList: [
          'https://lincoln-mp-dev.yonyouauto.com/fs01/material/lincoln/1.mp4',
          'https://lincoln-mp-dev.yonyouauto.com/fs01/material/lincoln/2.mp4',
          'https://lincoln-mp-dev.yonyouauto.com/fs01/material/lincoln/3.mp4',
          'https://lincoln-mp-dev.yonyouauto.com/fs01/material/lincoln/4.mp4',
          'https://lincoln-mp-dev.yonyouauto.com/fs01/material/lincoln/5.mp4',
          'https://lincoln-mp-dev.yonyouauto.com/fs01/material/lincoln/6.mp4',
          'https://lincoln-mp-dev.yonyouauto.com/fs01/material/lincoln/7.mp4'
        ]
      }
    },
    props:{


    },
    methods:{
      showVideoPopup(item,video){
        this.$emit('showVideoPopup',item,video)
      }
    },
    components:{
      VideoImage
    }
  }
</script>

<style lang="sass" type="text/scss" rel="stylesheet/scss" scoped>
  .scroll-view-item-warp{
    height: 6.5rem;
  }
  .swiper-pagination{
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    bottom: 0px !important;
    margin: 0.85rem 0;
  }
</style>
