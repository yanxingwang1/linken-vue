<template>
    <div class="wx-input-wrap">
      <div class="wx-label" v-if="label">
        {{label}}
        <span class="reqired" v-if="required">*</span></div>
      <div class="wx-content" :style="{ width: label?'':'100%'}">
        <input
          class="wx-input"
          :type="type"
          :placeholder="placeholder"
          :value="value"
          @input="$emit('input', $event.target.value)"
        >
      </div>
    </div>
</template>

<script>
  export default {
    name: 'WxInput',
    data(){
      return {
        value2:this.value
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
      }
    },
    methods:{},
    mounted(){

    }
  }
</script>

<style scoped lang="sass" type="text/scss">

</style>
