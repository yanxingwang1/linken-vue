<template>
  <div id="time-page" class="index">
    <div class="section">
      <div class="h3">星动大家庭</div>
    </div>
    <div class="section">
      <div class="vedio-img-warp">
        <VideoImage
          img-src="https://lincoln-mp-dev.yonyouauto.com/fs01/material/lincoln/0.jpg"
          @handClick="showVideoPopup('https://lincoln-mp-dev.yonyouauto.com/fs01/material/lincoln/0.jpg','https://lincoln-mp-dev.yonyouauto.com/fs01/material/lincoln/0.mp4')"
        >
        </VideoImage>
      </div>
    </div>
    <div class="section">
      <div class="rich-text">
        <div class="title">
          林肯时刻 星动大家庭
        </div>
        <div class="text">
          <span>林肯车主俱乐部活动 联结你我的精彩瞬间</span>
        </div>
      </div>
    </div>
    <div class="section">
      <div class="h3 bg-dack">林肯之星</div>
    </div>
    <!--轮播-->
    <div class="section">
      <div class="scroll-view">
        <VideoSwiper
          @showVideoPopup="showVideoPopup"
        ></VideoSwiper>
      </div>
    </div>
    <div class="section">
      <div class="rich-text">
        <div class="title">
          林肯时刻
        </div>
        <div class="text">
          <span>林肯时刻，串联起林肯体验的感人瞬间。</span>
          <span>以上一系列的视频，用真心为你演绎属于林肯的故事，</span>
          <span>真实的感动惟你鉴赏。</span>
        </div>
      </div>
    </div>
    <mt-popup
      v-model="popupVisible">
      <div class="video-play-warp">
        <VideoPlay
          :poster="posterUrl"
          :src="videoSrc"
        ></VideoPlay>
      </div>
    </mt-popup>
  </div>
</template>

<script>
  import util from '../../common/DMC.util'
  import { swiper, swiperSlide } from 'vue-awesome-swiper'
  import {Popup} from 'mint-ui'
  import VideoImage from './components/VideoImage'
  import VideoPlay from './components/VideoPlay'
  import VideoSwiper from './components/VideoSwiper'
  import 'video.js/dist/video-js.css'
  import 'vue-video-player/src/custom-theme.css'
  import 'swiper/dist/css/swiper.css'

  export default {
    name: 'index',
    created () {
      end_time = new Date().getTime()
      console.log('index加载时间：', end_time - start_time, 'ms')
    },
    beforeDestroy () {
      clearInterval(this.timer)
    },
    data () {
      return {
        popupVisible: false,
        swiperOption: {
          slidesPerView: 2,
          pagination: {
            el: '.swiper-pagination',
          }
        },
        posterUrl: '',
        videoSrc: '',

      }
    },
    directives: {},
    watch: {
      popupVisible (val, oldVal) {
        if (!val) {
          //播放停止，视频源清空
          this.posterUrl = ''
          this.videoSrc = ''
        }
      }
    },
    methods: {
      detail () {
        var orderCode = util.getQueryValue('orderCode')
        // this.$router.push({name :'detail', query: { orderCode:orderId }});
        location.href = location.origin + '/modules/myorder.html#/detail?orderCode=' + orderCode
      },
      showVideoPopup (poster, video) {
        this.posterUrl = poster
        this.videoSrc = video
        console.log('显示视频组件')
        console.log('封面',poster)
        console.log('视频地址',video)
        this.popupVisible = !this.popupVisible
      }
    },
    beforeMount () {
      $(document).attr('title', '林肯时刻')
    },

    mounted () {
      // console.log(this.$route.query.mobile);
      // this.$route.query.userid
      // return this.$nextTick(() => this.init());
    },
    components: {
      VideoImage,
      VideoPlay,
      VideoSwiper,
      Popup,
      swiper,
      swiperSlide
    }
  }
</script>

<style lang="sass" type="text/scss" rel="stylesheet/scss" scoped>
  .index {
    position: relative;
    width: 100vw;
    .section {
      .h3 {
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 1rem;
        height: 4.75rem;
        margin: 0;
        font-weight: bold;
        &.bg-dack {
          background-color: rgb(247, 247, 247);
        }
      }
      .vedio-img-warp {
        position: relative;
        height: 9.5rem;
      }
      .scroll-view {
        background-color: rgb(247, 247, 247);
      }
      .rich-text {
        display: flex;
        flex-direction: column;
        padding: 1rem 0.5rem;
        .title {
          font-size: 1rem;
          text-align: center;
          margin: 0.5rem 0;
          font-weight: bold;
        }
        .text {
          font-size: 0.6rem;
          margin-bottom: 0.625rem;
          span {
            display: block;
            text-align: center;
          }
        }
      }
    }
  }

  .video-play-warp {
    width: 100vw;
    height: auto;
  }

</style>
