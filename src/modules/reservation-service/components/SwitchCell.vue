<template>
  <div class="switch-cell-wrap">
    <div class="switch-cell">
      <div class="switch-cell-title">
        <div style="font-size: 16px;">{{title}}</div>
        <div class="span" v-if="label">限时免费</div>
      </div>
      <div class="switch-cell-switch">
        <mt-switch :value="value" @change="switchChange"></mt-switch>
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
      title: String,
      tips: String,
      label: {
        type: Boolean,
        default: false
      },
      disabled: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      switchChange(value) {
        this.$emit('input', !value)
      }
    }
  }
</script>

<style scoped lang="sass" type="text/scss">
  @function px($px) {
    @return ($px/20)+rem;
  }

  .switch-cell-wrap {
    padding-bottom: px(10);

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
