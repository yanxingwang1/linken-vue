<template>
  <div class="wx-mileage-progress" :class="mileageClass">
    <div class="title"
         @click="mileageHandleClick"
    >
      当前里程数{{currentMaintenanceMileage}}km
    </div>
    <div class="progress-wrap">
      <div class="progress-content">
        <div class="progress-progress" :style="{width:`${progressValue}%`}"></div>
      </div>
    </div>
    <div class="mileage-desc">
      <div class="mileage-value-pre">
        <div>上次保养里程数</div>
        <div>{{lastMaintenanceMileage}}km</div>
      </div>
      <div class="mileage-value-next">
        <div>下次保养里程数</div>
        <div>{{nextMaintenanceMileage}}km</div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "WxMileageProgress",
    props: {
      lastMaintenanceMileage: {
        type: String,
        default: '暂无'
      }
    },
    computed: {
      nextMaintenanceMileage() {
        return Number(this.lastMaintenanceMileage) + 10000
      },
      progressValue() {
        return (this.currentMaintenanceMileage - this.lastMaintenanceMileage) / (this.nextMaintenanceMileage - this.lastMaintenanceMileage) * 100
      }
    },
    watch: {
      progressValue(val) {
        if (val <= 0) {
          //进度条空
          this.mileageClass = ''
        } else if (val > 0 && val < 100) {
          //进度条有
          this.mileageClass = 'warning'
        } else {
          //进度条满了
          this.mileageClass = 'danger'
        }
        console.log('progressValue', val)
      }
    },
    data() {
      return {
        currentMaintenanceMileage: 0,
        mileageClass: ''
      }
    },
    methods: {
      mileageHandleClick() {
        var value = prompt("请输入当前里程", "");
        if (value) {
          console.log(value)
          this.currentMaintenanceMileage = value
        }
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
      height: px(20);
      line-height: px(20);
      margin-bottom: px(5);
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

      .mileage-value-pre {
      }

      .mileage-value-next {
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
