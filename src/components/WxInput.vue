<template>
    <div class="wx-input-wrap" :class="{disabled:disabled,'port-b':port=='b','port-c':port=='c'}">
      <div class="wx-label" v-if="label">{{label}}<span class="reqired" v-if="required">*</span></div>
      <div class="wx-content" :style="{ width: label?'':'100%'}">
        <textarea
          v-if="type==='textarea'"
          class="wx-input wx-textarea"
          rows="3"
          :disabled="disabled"
          :placeholder="placeholder"
          :value="value"
          :maxlength="maxlength"
          @input="$emit('input', $event.target.value)"
          @blur="inputBlur"
          @focus="inputFocus"
        ></textarea>
        <input
          v-else
          class="wx-input"
          :disabled="disabled"
          :type="type"
          :placeholder="placeholder"
          :value="value"
          :maxlength="maxlength"
          @input="$emit('input', $event.target.value)"
          @blur="inputBlur"
          @focus="inputFocus"
        >
      </div>
    </div>
</template>

<script>
  export default {
    name: 'WxInput',
    data(){
      return {
        scrollTop:0,
        classNames:{

        }
      }
    },
    props:{
      label:{
        type:String,
        default:''
      },
      type:{
        type:String,
        default:'text'
      },
      placeholder:{
        type:String
      },
      value:{
        type:String,
        default:''
      },
      required:{
        type:Boolean,
        default:false
      },
      disabled:{
        type:Boolean,
        default:false
      },
      port:{
        type:String,
        default:'b'
      },
      maxlength:{
        type:Number
      }
    },
    methods:{
      inputFocus(){

      },
      inputBlur(){

      }
    },
    mounted(){

    }
  }
</script>

<style scoped lang="sass" type="text/scss">

</style>
