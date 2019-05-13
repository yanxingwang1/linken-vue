<template>
  <div class="full-mask" :class="{active:active}" @click="maskHandleClick">
    <div class="tips-wrap">
      <div class="gestures"></div>
      <div class="info">左右滑动查看更多</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "FullMask",
    data() {
      return {
        active: false
      }
    },
    mounted() {
      this.$nextTick(() => {
        this.active = true
      })
    },
    methods: {
      maskHandleClick() {
        this.active = false
        setTimeout(() => {
          this.$emit('click')
        }, 300)
      }
    }
  }
</script>

<style scoped lang="sass" type="text/scss">
  .full-mask {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: rgba(0, 0, 0, .5);
    z-index: 999;
    transition: opacity .3s ease;
    opacity: 0;

    &.active {
      opacity: 1;
    }

    .tips-wrap {
      position: relative;
      top: 50%;
      transform: translateY(-50%);
      text-align: center;

      .gestures {
        height: 50px;
        background: url("./../images/gestures@3x.png") center/45px no-repeat;
      }

      .info {
        height: 35px;
        line-height: 35px;
        color: #ffffff;
        font-size: 18px;
      }
    }
  }
</style>
