<template>
  <div class="vehicles-swipe-wrap">
    <swiper
      :options="swiperOption"
      @slideChange="slideChange"
      ref="mySwiper">
      <swiper-slide
        v-for="(vechinfo, i) in vechinfos"
        :key="i">
        <vehicle-info-card
          :vechinfo="vechinfo"
          @inputPlateBlur="inputPlateBlur">
        </vehicle-info-card>
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
  </div>
</template>

<script>
  import {swiper, swiperSlide} from 'vue-awesome-swiper'
  import 'swiper/dist/css/swiper.css'
  import VehicleInfoCard from './VehicleInfoCard'

  export default {
    name: "VehiclesSwipe",
    components: {
      swiper,
      swiperSlide,
      VehicleInfoCard
    },
    data() {
      return {
        swiperOption: {
          spaceBetween: 15,
          centeredSlides: true,
          pagination: {
            el: '.swiper-pagination'
          }
        }
      }
    },
    props: {
      vechinfos: {
        type: Array
      }
    },
    methods: {
      inputPlateBlur({vin, license}) {
        this.$emit('inputPlateBlur', {vin, license})
      },
      slideChange() {
        const activeIndex = this.$refs.mySwiper.swiper.activeIndex
        this.$emit('slideChange', activeIndex)
      },
      slideTo(index) {
        this.$refs.mySwiper.swiper.slideTo(index, 0)
      }
    },
    mounted() {
      window.swiper = this.$refs.mySwiper.swiper
    }
  }
</script>

<style scoped lang="sass" type="text/scss">
  @function px($px) {
    @return ($px/20)+rem;
  }

  .vehicles-swipe-wrap {
    position: relative;
    overflow: hidden;
    width: 100%;
    text-align: center;
    padding: 0 px(20);
  }

  .swiper-container {
    overflow: initial;
  }


</style>
