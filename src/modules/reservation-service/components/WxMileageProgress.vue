<template>
  <div class="wx-mileage-progress" :class="mileageClass">
    <div class="title"
         @click="mileageHandleClick"
    >
      <div v-if="Number(vechinfo.currentMaintenanceMileage)">
        当前里程数{{vechinfo.currentMaintenanceMileage}}km
      </div>
      <div v-else="">请输入当前里程数</div>
    </div>
    <div class="progress-wrap">
      <div class="progress-content">
        <div class="progress-progress" :style="{width:`${progressValue}%`}"></div>
      </div>
    </div>
    <div class="mileage-desc" :class="{gray: vechinfo.lastMaintenanceMileage===null}">
      <div class="mileage-value-pre">
        <div>上次保养里程数</div>
        <div v-if="vechinfo.lastMaintenanceMileage===null">暂无</div>
        <div v-else>{{parseInt(vechinfo.lastMaintenanceMileage)}}km</div>
      </div>
      <div class="mileage-value-next">
        <div>下次保养里程数</div>
        <div v-if="vechinfo.lastMaintenanceMileage===null">暂无</div>
        <div v-else>{{nextMaintenanceMileage}}km</div>
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
      nextMaintenanceMileage() {
        let nextMileage = Number(this.vechinfo.lastMaintenanceMileage) + 10000
        if (this.vechinfo.lastMaintenanceMileage === null) {
          nextMileage = Number.POSITIVE_INFINITY
        }
        return nextMileage
      },
      progressValue() {
        const currentMileage = Number(this.vechinfo.currentMaintenanceMileage)
        const lastMileage = Number(this.vechinfo.lastMaintenanceMileage)
        const nextMileage = Number(this.nextMaintenanceMileage)
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
          title: '请输入当前里程数(km)',
          html: `<input id="mileage-input" type="text" />`,
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
                const lastMileage = Number(self.vechinfo.lastMaintenanceMileage)
                if (mileage !== '') {
                  if (Number(mileage) <= lastMileage) {
                    $.toast('您输入的当前里程数小于上次保养里程数，请重新输入')
                    return
                  }
                  self.vechinfo.currentMaintenanceMileage = mileage
                } else {
                  $.toast('当前里程不能为空')
                }
              }
            }
          ],
          maskOnClick(){
            hideNumKeyBoard()
          }
        })
        $('#mileage-input').numberKeyBorad({
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
    font-size: px(12);

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
      font-size: px(12);
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
        background: linear-gradient(to right, #FFAA00, #FD7100);
      }
    }

    &.danger {
      .title {
        text-align: right;
        color: #E92C2C;
      }

      .progress-wrap .progress-progress {
        background: linear-gradient(to right, #FF3F00, #BA0000);
      }
    }
  }
</style>
