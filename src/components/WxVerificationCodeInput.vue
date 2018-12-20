<template>
  <div class="wx-input-wrap" :class="{'port-b':port=='b','port-c':port=='c'}">
    <div class="wx-label" v-if="label">
      {{label}}
      <span class="reqired" v-if="required">*</span></div>
    <div class="wx-content wx-validation" :style="{ width: label?'':'100%'}">
      <input
        class="wx-input"
        type="text"
        :placeholder="placeholder"
        :value="value"
        @input="$emit('input', $event.target.value)"
      />
      <wx-button
        @click.native="validationBtnHandleClick"
        :disabled="btnDisabled"
      >{{btnText}}
      </wx-button>
    </div>
  </div>
</template>

<script>
  import WxButton from './WxButton';

  export default {
    name: "WxMessageInput",
    components: {WxButton},
    data() {
      return {
        btnText: '发送验证码',
        btnDisabled: false
      }
    },
    props: {
      label: {
        type: String,
        default: ''
      },
      placeholder: {
        type: String
      },
      value: {
        type: String,
        default: ''
      },
      phone: {
        type: String,
        default: ''
      },
      required: {
        type: Boolean,
        default: true
      },
      port:{
        type:String,
        default:'b'
      }
    },
    methods: {
      validationBtnHandleClick() {
        this.getIdfyCode()
        this.btnDisabled = true
        let t = 60
        this.btnText = `${t}s`
        let timer = setInterval(() => {
          t = t - 1
          this.btnText = `${t}s`
          if (t == -1) {
            clearInterval(timer)
            this.btnText = '发送验证码'
            this.btnDisabled = false
          }
        }, 1000)
      },
      getIdfyCode(){
        console.log('发送短信验证码',this.phone)
        this.http.get('getMessageCode',{
          phone:this.phone
        },res=>{
          if (res.resultCode == 1) {
            const data = res.data
            if(data){
              $.toast(res.data.errorMsg)
            }
          } else {
            console.log('getIdfyCode error')
            $.toast(res.errMsg)
          }
        })
      }
    }
  }
</script>

<style scoped>

</style>
