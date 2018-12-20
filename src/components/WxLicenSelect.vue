<template>
  <div class="wx-input-wrap"
       :class="{disabled:disabled,'port-b':port=='b','port-c':port=='c'}"
       @touchmove.prevent
  >
    <div class="wx-label">
      {{label}}
      <span class="reqired" v-if="required">*</span></div>
    <div class="wx-content">
      <div class="license-wrap" >
        <div class="license-word" v-for="(val,i) in licenseValue">{{val}}</div>
      </div>
      <input
        ref="licenceInput"
        class="wx-input"
        :placeholder="placeholder"
      >
    </div>
  </div>
</template>

<script>
  import './../assets/style/form.scss'
  import { Popup } from 'mint-ui'
  export default {
    name: "WxLicenSelect",
    components:{
      Popup
    },
    data() {
      return {
        licenseValue:''
      }
    },
    props: {
      label: {
        type: String,
        default: '车牌号'
      },
      placeholder: {
        type: String,
        default:'请输入您的车牌号码'
      },
      value: {
        type: String,
        default: ''
      },
      required: {
        type: Boolean,
        default: false
      },
      disabled:{
        type:Boolean,
        default:false
      },
      port:{
        type:String,
        default:'b'
      }
    },
    watch:{
      value(value){
        this.$refs.licenceInput.value = value
        this.licenseValue = value
      },
      licenseValue(value){
        this.$emit('input',value)
      }
    },
    methods:{},
    mounted(){
      let self = this
      this.$refs.licenceInput.value = this.value
      this.licenseValue = this.value
      $(this.$refs.licenceInput)
        .licensePlateKeyboard({
          isChecked: true,
          onBlur(value){
            self.$emit('inputPlateBlur',value)
          }
        })
      $(this.$refs.licenceInput).on('inputplate',e=>{
        this.licenseValue = e.target.value
      })
    }
  }
</script>

<style scoped lang="sass" type="text/scss">
  @function px($px) {
    @return ($px/20)+rem;
  }
  .wx-content{
    input{
      background-color: initial;
      /*color: red;*/
      color: rgba(255,255,255,0);
      padding-left: 50px !important;
    }
  }
  .license-wrap{
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
    .license-word:nth-of-type(1){
      width: 20px;
      margin-right: 24px;
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
