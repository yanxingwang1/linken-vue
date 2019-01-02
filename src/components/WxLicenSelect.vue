<template>
  <div class="wx-input-wrap"
       :class="{disabled:disabled,'port-b':port=='b','port-c':port=='c'}"
       @touchmove.prevent
  >
    <div class="wx-label">{{label}}<span class="reqired" v-if="required">*</span></div>
    <div class="wx-content">
      <input
        readonly
        ref="licenceInput"
        class="wx-input"
        :placeholder="licenseLetter.length===0?placeholder:''"
      >
      <div class="license-wrap">
        <div class="license-provincial-wrap" @click="licenseProvincialHandleClick">
          <div class="license-word provincial-word">{{licenseProvincial}}</div>
          <div v-if="provincialFocus" class="license-word-cursor"></div>
        </div>
        <div class="license-letter-wrap" @click="licenseLetterHandleClick">
          <div class="license-word" v-for="item in licenseLetter">{{item}}</div>
          <div v-if="letterIsFocus" class="license-word-cursor"></div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
  import './../assets/style/form.scss'
  import {Popup} from 'mint-ui'

  export default {
    name: "WxLicenSelect",
    components: {
      Popup
    },
    data() {
      return {
        provincialFocus: false,
        letterIsFocus: false,
        licenseProvincial: '',
        licenseLetter: [],
      }
    },
    props: {
      label: {
        type: String,
        default: '车牌号'
      },
      placeholder: {
        type: String,
        default: '请输入您的车牌号码'
      },
      value: {
        type: String,
        default: ''
      },
      required: {
        type: Boolean,
        default: false
      },
      disabled: {
        type: Boolean,
        default: false
      },
      port: {
        type: String,
        default: 'b'
      }
    },
    computed: {
      licenseValue: {
        get: function () {
          return this.licenseProvincial + this.licenseLetter.join('')
        },
        set: function (value) {
          let arr = value.split('')
          this.licenseProvincial = arr[0] || ''
          arr.shift()
          this.licenseLetter = arr.concat([])
        }
      }
    },
    watch: {
      value(value) {
        console.log('props value', value)
      },
      licenseValue(value) {
        console.log('licenseValue', value)
        this.$emit('input', value)
      }
    },
    methods: {
      licenseProvincialHandleClick() {
        let self = this
        $.showKeyboard({
          onClick(value) {
            self.licenseProvincial = value === 'del' ? '' : value
          },
          onFocus() {
            // self.provincialFocus = true
          },
          onBlur(value) {
            if (!self.licenseProvincial && self.licenseLetter.length > 0) {
              $.toast('请输入车牌号所在省简称')
              return false
            }
            // self.provincialFocus = false
            if (self.licenseLetter.length>0){
              self.$emit('inputPlateBlur', self.licenseValue)
            }
          },
        })
      },
      licenseLetterHandleClick() {
        let self = this
        if (!self.licenseProvincial) {
          $.toast('请先输入车牌号所在省简称')
          return
        }
        $.showKeyboard({
          type: 'license-letter',
          onClick(value) {
            if (value === 'del') {
              self.licenseLetter.pop()
            } else {
              if (self.licenseLetter.length <= 6) {
                self.licenseLetter.push(value)
              }
            }
          },
          onFocus() {
            self.letterIsFocus = true
          },
          onBlur() {
            const len = self.licenseLetter.length
            if (len < 6 && len > 0) {
              $.toast('请输入正确的车牌号')
              return false
            }
            self.letterIsFocus = false
            if (self.licenseLetter.length>0){
              self.$emit('inputPlateBlur', self.licenseValue)
            }
          },
        })
      }
    },
    mounted() {
      let self = this
      console.log('mounted cph value', this.value)
      this.licenseValue = this.value
      // this.$refs.licenceInput.value = this.value
      // this.licenseValue = this.value
      // $(this.$refs.licenceInput)
      //   .licensePlateKeyboard({
      //     isChecked: true,
      //     onBlur(value) {
      //       self.isFocus = false
      //       self.$emit('inputPlateBlur', value)
      //     },
      //     onFocus() {
      //       self.isFocus = true
      //     }
      //   })
      // $(this.$refs.licenceInput).on('inputplate', e => {
      //   this.licenseValue = e.target.value
      // })
    }
  }
</script>

<style scoped lang="sass" type="text/scss">
  @function px($px) {
    @return ($px/20)+rem;
  }

  .wx-content {
    input {
      background-color: initial;
      /*color: red;*/
      color: rgba(255, 255, 255, 0);
      padding-left: 60px !important;
    }
  }

  .license-wrap {
    position: absolute;
    top: 50%;
    left: 10px;
    right: 10px;
    height: 40px;
    margin-top: -20px;
    display: flex;
    align-items: center;
    overflow: hidden;
    background: url("./../assets/img/bottom-arrow-one.png") 23px/13px no-repeat;
    font-weight: normal;

    .license-provincial-wrap {
      display: flex;
      width: 45px;
      flex-shrink: 0;
    }

    .license-letter-wrap {
      width: 100%;
      height: 40px;
      display: flex;
    }

    .license-word {
      height: 40px;
      line-height: 40px;
    }

    .license-word-cursor {
      margin-top: 11px;
      height: 18px;
      width: 1px;
      background-color: #333;
      margin-left: 2px;
      animation: cursor 1.1s infinite;
    }
  }

  @keyframes cursor {
    0% {
      opacity: 0;
    }
    25% {
      opacity: 0;
    }
    50% {
      opacity: 1;
    }
    75% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }

  /*
  .cph-key-board-wrap {
    position: relative;
    width: 100vw;
    color: #323232;
    .key-board-0{
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      background-color: #EEEEEE;
      padding: 10px;

      .keyword {
        background-color: #ffffff;
        width: px(34);
        height: px(40);
        line-height: px(40);
        font-size: 18px;
        text-align: center;
        border-radius: 5px;
        margin: 5px;
        &:last-child{
          background: #DEDEDE url("./imgs/key-delete.png") center/18px no-repeat;
        }
      }
    }
  }
  */
</style>
