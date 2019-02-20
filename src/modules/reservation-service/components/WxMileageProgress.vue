<template>
  <div class="wx-mileage-progress" :class="mileageClass">
    <div class="title"
         @click="mileageHandleClick"
    >
      <div v-if="Number(vechinfo.currentMaintenanceMileage)">
        {{vechinfo.currentMaintenanceMileage}} KM
      </div>
      <div v-else="">请输入当前里程数</div>
    </div>
    <div class="progress-wrap">
      <div class="progress-content">
        <div class="progress-progress" :style="{width:`${progressValue}%`}"></div>
      </div>
    </div>
    <div class="mileage-desc" :class="{gray: lastMileage===null}">
      <div class="mileage-value-pre">
        <div>上次保养里程数</div>
        <div v-if="lastMileage===null">&nbsp;</div>
        <div v-else>{{ lastMileage }} KM</div>
      </div>
      <div class="mileage-value-next">
        <div>下次保养里程数</div>
        <div v-if="lastMileage===null">&nbsp;</div>
        <div v-else>{{nextMileage}} KM</div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "WxMileageProgress",
    props: {
      vechinfo: {
        type: Object
      },
    },
    computed: {
      lastMileage() {
        const mileage = this.vechinfo.lastMaintenanceMileage
        if (mileage === null || mileage === '') {
          return null
        } else {
          return parseInt(Number(mileage))
        }
      },
      nextMileage() {
        let nextMileage = Number(this.lastMileage) + 10000
        if (this.lastMileage === null) {
          nextMileage = Number.POSITIVE_INFINITY
        }
        return nextMileage
      },
      progressValue() {
        const currentMileage = Number(this.vechinfo.currentMaintenanceMileage)
        const lastMileage = Number(this.lastMileage)
        const nextMileage = Number(this.nextMileage)
        let value = (currentMileage - lastMileage) / (nextMileage - lastMileage) * 100
        if (value < 0) {
          value = 0
        } else if (value > 100) {
          value = 100
        }
        console.log('computed progress', value)
        return value
      },
      mileageClass() {
        let progressValue = this.progressValue
        let className = ''
        if (progressValue <= 0) {
          //进度条空
          if (Number(this.vechinfo.currentMaintenanceMileage)) {
            className = 'warning'
          }
        } else if (progressValue > 0 && progressValue < 100) {
          //进度条有
          className = 'warning'
        } else {
          //进度条满了
          className = 'danger'
        }
        return className
      }
    },
    data() {
      return {}
    },
    methods: {
      mileageHandleClick() {
        let self = this
        let hideNumKeyBoard = function () {
          let $numKeyBoardWrap = $('.wx-number-keyboard-wrap')
          $numKeyBoardWrap.removeClass('active')
          setTimeout(() => {
            $numKeyBoardWrap.remove()
          }, 300)
        }
        $.dialog({
          title: '请输入当前里程数',
          html: `
            <div style="display: flex;justify-content: space-between;align-items: center;margin-top: 15px;">
              <input id="mileage-input" type="text" style="width: 100%"/>
              <div style="padding-left: 10px;flex: 0 0 auto;">KM</div>
            </div>
          `,
          buttons: [
            {
              title: '取消',
              callback: hideNumKeyBoard
            },
            {
              title: '确认',
              isBold: true,
              callback() {
                hideNumKeyBoard()
                let mileage = document.getElementById('mileage-input').value
                const lastMileage = self.lastMileage
                if (mileage !== '') {
                  if (lastMileage === null) {
                    if (mileage == '0') {
                      $.toast('当前里程数不可为 0')
                      return
                    }
                  } else {
                    if (Number(mileage) <= lastMileage) {
                      $.toast('您输入的当前里程数小于上次保养里程数，请重新输入')
                      return
                    }
                  }
                  self.vechinfo.currentMaintenanceMileage = mileage
                } else {
                  $.toast('当前里程不能为空')
                }
              }
            }
          ],
          maskOnClick() {
            hideNumKeyBoard()
          }
        })
        $('#mileage-input').numberKeyBorad({
          maxSize:8,
          isMask: false
        })
        $('#mileage-input').trigger('click')
      }
    }
  }
</script>

<style scoped lang="sass" type="text/scss">
  @function px($px) {
    @return ($px/20)+rem;
  }

  .wx-mileage-progress {
    position: relative;
    font-size: px(13);

    .title {
      text-align: center;
      color: #BBBBBB;
      height: px(30);
      line-height: px(20);
      margin-bottom: px(0);
    }

    .progress-wrap {
      position: relative;
      padding: px(3) 0;

      .progress-content {
        display: flex;
        width: 100%;
        height: px(6);
        background-color: #D8D8D8;
        border-radius: px(39);

        .progress-progress {
          height: 100%;
          border-radius: px(39);
          transition: width .8s ease;
        }
      }
    }

    .mileage-desc {
      color: #323232;
      display: flex;
      justify-content: space-between;
      line-height: px(20);
      text-align: center;
      font-size: px(13);
      margin-top: px(5);

      &.gray {
        color: #BBBBBB;
      }
    }

    &.warning {
      .title {
        text-align: center;
        color: #B45F1A;
      }

      .progress-wrap .progress-progress {
        background: #FD7100;
        /*background: linear-gradient(to right, #FFAA00, #FD7100);*/
      }
    }

    &.danger {
      .title {
        /*text-align: right;*/
        text-align: center;
        color: #E92C2C;
      }

      .progress-wrap .progress-progress {
        background: #BA0000;
        /*background: linear-gradient(to right, #FF3F00, #BA0000);*/
      }
    }
  }
</style>
