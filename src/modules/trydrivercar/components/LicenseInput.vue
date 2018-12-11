<template>
  <div class="input-wrap">
    <div class="lk-label">
      {{label}}
      <span class="reqired" v-if="required">*</span></div>
    <div class="lk-content">
      <cph-input :value="num" @input="setPlateNumber"></cph-input>
    </div>
  </div>

</template>

<script>

  import CphInput from './VehicleKeyboard'

  export default {
    name: "LicenseInput",
    data() {
      return {
        num: []
      }
    },
    props: {
      label: {
        type: String,
        default: '车牌号码'
      },
      placeholder: {
        type: String
      },
      value: {
        type: String,
        default: ''
      },
      required: {
        type: Boolean,
        default: false
      }
    },
    watch: {
      value(val) {
        if (val==''){
          this.num = []
        }else {
          this.num = val.split(',')
        }
      }
    },
    methods: {
      setPlateNumber: function (arr) {
        // alert(arr.join(''))
        console.log(arr.join(''))
        this.$emit('input', arr.join(''))
      },
    },
    components: {
      CphInput
    }
  }
</script>

<style scoped lang="sass" type="text/scss">
  $nomal-color: #3E3E3E;
  $disabled-color: #E2E2E2;
  .input-wrap {
    position: relative;
    width: 100%;
    display: flex;
    align-items: center;
    font-size: 16px;
    color: $nomal-color;

    .lk-label {
      width: 26%;
      font-weight: 500;

      .reqired {
        color: red;
      }
    }

    .lk-content {
      position: relative;
      width: 74%;
      display: flex;
      align-items: center;
      height: 60px;
      z-index: 999;
    }

    &.disabled {
      .lk-label {
        color: $disabled-color;

        .reqired {
          color: $disabled-color;
        }
      }
    }

  }
</style>

