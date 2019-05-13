<template>
  <div ref="drawerwarp" @touchmove.prevent>
    <div v-if="isDrawer" ref="drawer-view-wrap" class="drawer-view-wrap" :style="wrapStyle" :class="{open:isOpen}">
      <div ref="drawer-title" class="drawer-title" @touchstart="touchStart" @touchmove="touchMove" @touchend="touchEnd">
        <img ref="arrow" class="arrow" src="./../imgs/up.png" alt="">
        <div class="title-text">{{titleText}}</div>
      </div>
      <div ref="drawer-view-body" class="drawer-view-body">
        <div>
          <slot></slot>
        </div>
      </div>
    </div>
    <div v-else class="drawer-false" ref="wrapper" style="height: 100vh;overflow: hidden;">
      <div>
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'

  export default {
    components: {},
    name: "DrawerView",
    data() {
      return {
        isOpen: false,
        state: 'close',
        scroll: null,
        wrapStyle: {
          top: `calc(100vh - ${this.bodyInitHeight + 50}px)`,
          transition: 'initial'
        },
        startY: 0,
        warpTop: 0,
        drawerStartFlag: false
      }
    },
    props: {
      isDrawer: {
        type: Boolean,
        default: false
      },
      titleText: {
        type: String,
        default: '开启'
      },
      bodyInitHeight: {
        type: Number,
        default: 100
      }
    },
    watch: {
      isDrawer: {
        immediate: true,
        handler(newVal) {
          this.$nextTick(() => {
            if (newVal) {
              this.scroll = new BScroll(this.$refs['drawer-view-body'])
              this.scroll.disable()
            } else {
              this.scroll = new BScroll(this.$refs['wrapper'])
            }
          })
        }
      },
    },
    mounted() {

    },
    methods: {
      onBounce(flag) {
        // console.log('onBounce', flag)
        if (flag) {
          this.scroll.enable()
        } else {
          this.scroll.scrollTo(0, 0, 200)
          this.scroll.disable()
        }
        this.$emit('drawerEnd', this.isOpen ? 'open' : 'close')
      },
      touchStart(e) {
        console.log('touchStart', e.targetTouches[0].clientY)
        this.startY = e.targetTouches[0].clientY
        this.warpTop = parseInt($(this.$refs['drawer-view-wrap']).css('top'))
        this.wrapStyle.transition = 'initial'
      },
      touchMove(e) {
        const cY = e.targetTouches[0].clientY
        const moveY = this.startY - cY
        if (moveY > 10 && this.warpTop !== 60) {
          if (!this.drawerStartFlag) {
            this.$emit('drawerStart', 'up')
            this.drawerStartFlag = true
          }
        }
        if (moveY < -10 && this.warpTop === 60) {
          if (!this.drawerStartFlag) {
            console.log(-1)
            this.$emit('drawerStart', 'down')
            this.drawerStartFlag = true
          }
        }
        let topV = this.warpTop - moveY
        if (topV < 60) {
          topV = 60
        }
        if (topV > window.innerHeight - (this.bodyInitHeight + 50)) {
          topV = window.innerHeight - (this.bodyInitHeight + 50)
        }
        if (topV < 250) {
          this.isOpen = true
        } else {
          this.isOpen = false
        }
        this.wrapStyle.top = topV + 'px'
      },
      touchEnd(e) {
        // console.log('touchEnd')
        this.wrapStyle.transition = 'top .2s ease'
        if (parseInt(this.wrapStyle.top) < 250) {
          this.wrapStyle.top = 60 + 'px'
        } else {
          this.wrapStyle.top = `calc(100vh - ${this.bodyInitHeight + 50}px)`
        }
        this.drawerStartFlag = false
        setTimeout(() => {
          this.onBounce(this.isOpen)
        }, 200)
      },
    }
  }
</script>

<style lang="sass" type="text/scss" scoped>
  @function px($px) {
    @return ($px/20)+rem;
  }

  .drawer-view-wrap {
    position: fixed;
    /*top: calc(100vh - 150px);*/
    left: 0;
    /*padding: 0 px(15);*/
    z-index: 999;
    width: 100%;
    height: calc(100vh - 60px);
    background-color: #FFFFFF;
    overflow: hidden;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;

    .drawer-title {
      position: relative;
      height: 50px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      transition: all .3s ease;

      &::after {
        position: absolute;
        content: '';
        bottom: 0;
        left: px(10);
        right: px(10);
        height: 1px;
        background-color: #E2E2E2;;
        transition: all .3s ease;
      }

      .arrow {
        width: 10px;
        height: 8px;
        margin-bottom: 2px;
        transition: all .3s ease;
      }

      .title-text {
        font-size: 12px;
        color: #707070;
        transition: all .3s ease;
      }
    }
  }

  .drawer-view-wrap.open {
    /*top: 60px;*/

    .drawer-title {
      background-color: #FFF8F3;
      border-bottom: none;

      &::after {
        opacity: 0;
      }

      .arrow {
        transform: rotate(180deg);
      }

      .title-text {
        font-size: 16px;
        color: #B45F1A;
      }
    }
  }

  .drawer-view-wrap .drawer-view-body {
    /*padding: px(15);*/
    /*height: 50px;*/
    height: calc(100vh - 110px);
    overflow: hidden;
  }
</style>
