<template>
  <div id="index-page" class="index">
    <!--轮播-->
    <div class="scroll-view-warp" @click="changebg">
      <Swiper3D @indexChange="swiper3DIndexChange"></Swiper3D>
    </div>
    <!-- 封面 -->
    <transition
      name="fade"
      enter-active-class="animated zoomIn"
      leave-active-class="animated zoomOut"
      :duration="900">
      <div class="cover-warp"
           @click="changebg"
           v-show="!firstclick"
      >
        <Cover :coverIndex="swiper3DIndex" @goNewPage="goNewPage"></Cover>
      </div>
    </transition>
  </div>
</template>

<script>
import Swiper3D from "./components/Swiper3D";
import Cover from "./components/Cover";

export default {
  name: "index",

  created() {
    end_time = new Date().getTime();
    console.log("index加载时间：", end_time - start_time, "ms");
  },
  beforeDestroy() {
    clearInterval(this.timer);
  },
  data() {
    return {
      firstclick: false,
      swiper3DIndex: 0
    };
  },
  components: {
    Swiper3D,
    Cover
  },
  directives: {},
  watch: {},
  methods: {
    changebg() {
      this.firstclick = !this.firstclick;
    },
    swiper3DIndexChange(index) {
      // console.log('swiper3DIndexChange',index)
      this.swiper3DIndex = index;
    },
    goNewPage(coverIndex) {
      console.log("跳转页面");
      setTimeout(() => {
        if (coverIndex == 0) {
          //百年荣耀
          location.href =
            "http://lincoln-mp-dev.yonyouauto.com/fs01/web/heritage_iphone.html";
        } else if (coverIndex == 1) {
          // 林肯时刻
          this.$router.push("/time");
          // location.href = location.origin + '/modules/moment.html#/'
        } else if (coverIndex == 2) {
          //林肯服务
          this.$router.push("/service");
        } else if (coverIndex == 3) {
          // 林肯团队
          this.$router.push("/people");
        }
      }, 200);
    }
  },
  activated: function() {
    $(document).attr("title", "品鉴林肯");
    // if(this.$route.query.type=='preview'){
    //   this.init();// this.carOwnerDto.totalPrice = (this.$route.query.money || 81500);
    //   this.configId = this.$route.query.id;
    // }
  },
  beforeMount() {
    $(document).attr("title", "品鉴林肯");
  },

  mounted() {
    // return this.$nextTick(() => this.init());
  }
};
</script>

<style lang="sass" type="text/scss" rel="stylesheet/scss" scoped>
  @function px($px){
    @return ($px/20)+rem;
  }
  .index{
    position: relative;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    .scroll-view-warp{
      display: flex;
      justify-content: center;
      align-items: center;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
    }
    .cover-warp{
      position: absolute;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      z-index: 999;
      background-color: white;
    }
  }
</style>
