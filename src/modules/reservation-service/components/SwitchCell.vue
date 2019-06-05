<template>
  <div class="switch-cell-wrap">
    <div class="switch-cell">
      <div class="switch-cell-title">
        <div style="font-size: 16px;">{{title}}</div>
        <div class="span" v-if="label">限时免费</div>
      </div>
      <div class="switch-cell-switch">
        <mt-switch :value="value" @change="switchChange"></mt-switch>
        <div v-if="isOnClick" @click="switchHandleClick" style="position: absolute;top: 0;right: 0;bottom: 0;left: 0;"></div>
        <div v-if="disabled" style="position: absolute;top: 0;right: 0;bottom: 0;left: 0;"></div>
      </div>
    </div>
    <div class="tips">{{tips}}</div>
  </div>
</template>

<script>
  export default {
    name: "SwitchCell",
    props: {
      value: Boolean,
      title: String,  //标题
      tips: String, //提示文字
      label: { //限时免费文案
        type: Boolean,
        default: false
      },
      disabled: {
        type: Boolean,
        default: false
      },
      onClick: {  //开关点击事件(如果传入，控制开关点击打开或关闭前的逻辑)
        type: Function
      }
    },
    computed: {
      isOnClick() {
        const type = typeof this.onClick
        if (type === 'function' && !this.disabled){
          return true
        }else {
          return false
        }
      }
    },
    methods: {
      switchChange(value) {
        this.$emit('input', !value)
      },
      switchHandleClick(){
        console.log('开关点击')
        this.onClick()
      }
    }
  }
</script>

<style scoped lang="sass" type="text/scss">
  @function px($px) {
    @return ($px/20)+rem;
  }

  .switch-cell-wrap {
    /*padding-bottom: px(10);*/

    .switch-cell {
      display: flex;
      height: px(60);
      justify-content: space-between;
      align-items: center;

      .switch-cell-title {
        display: flex;
        align-items: center;

        .span {
          text-align: center;
          margin-left: px(5);
          width: 64px;
          height: 16px;
          background: rgba(255, 238, 228, 1);
          border-radius: 2px;
          font-size: 12px;
          font-weight: 400;
          color: rgba(180, 95, 26, 1);
        }
      }

      .switch-cell-switch {
        position: relative;
      }
    }

    .tips {
      font-size: 12px;
      color: #BBBBBB;
    }
  }
</style>
