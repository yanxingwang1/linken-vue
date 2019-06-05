<template>
  <div class="switch-cell-wrap">
    <div class="cell">
      <div class="switch-cell">
        <div class="switch-cell-title">
          <div style="font-size: 16px;">{{title}}</div>
        </div>
        <div class="switch-cell-switch">
          <mt-switch :value="value" @change="switchChange"></mt-switch>
          <div v-if="disabled" style="position: absolute;top: 0;right: 0;bottom: 0;left: 0;"></div>
        </div>
      </div>
      <trust-user class="trust-user" :uptrust="uptrust" v-show="value">
        <slot></slot>
      </trust-user>
    </div>
  </div>
</template>

<script>
import TrustUser from "./Trustuser.vue";
export default {
  name: "SwitchCell",
  components: {
    TrustUser
  },
  // data() {
  //   return {
  //     uptrust: this.uptrust
  //   };
  // },
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
    },
    uptrust: {
      type: Object,
      default: false
    }
  },
  methods: {
    switchChange(value) {
      this.$emit("input", !value);
    }
  },
  mounted() {}
};
</script>

<style scoped lang="sass" type="text/scss">
  @function px($px) {
    @return ($px/20)+rem;
  }

  .switch-cell-wrap {
          padding: 0 0.5rem;
  
  .cell{
       border-bottom: solid 1px #E2E2E2;
    }
    .trust-user{
         padding: 0.5rem 0;
    }
    .switch-cell {
        padding: 0.5rem 0;
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
