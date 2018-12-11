<template>
  <div @click="handleClick" class="warp">
    <div class="vedio-img-content">
      <img class="bg" :src="imgSrc" alt="">
    </div>
    <div v-if="mask" class="video-img-mask"></div>
    <div class="video-img-icon">
      <img class="icon" src="./../imgs/play.png" alt="">
    </div>
  </div>
</template>

<script>
  export default {
    name: "VideoImage",
    data() {
      return {}
    },
    props: {
      imgSrc: {
        type: String,
        default: 'https://s1.ax1x.com/2018/11/12/iLrxCq.jpg',
      },
      mask:{
        type:Boolean,
        default: false,
      }
    },
    mounted() {
      console.log('VideoImage mounted')

    },
    methods: {
      handleClick(){
        this.$emit('handClick')
      }
    }
  }
</script>

<style lang="sass" type="text/scss" rel="stylesheet/scss" scoped>
  .warp {
    position: relative;
    width: 100%;
    height: 100%;
    .vedio-img-content {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      img.bg {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
    .video-img-mask {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: rgba(0,0,0,.5);
    }
    .video-img-icon{
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      img.icon {
        position: absolute;
        width: 4.75rem;
        height: 4.75rem;
        top: 50%;
        left: 50%;
        margin-left: -2.375rem;
        margin-top: -2.375rem;
      }
    }
  }

</style>
