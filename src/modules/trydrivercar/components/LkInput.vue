<template>
    <div class="input-wrap">
      <div class="lk-label">
        {{label}}
        <span class="reqired" v-if="required">*</span></div>
      <div class="lk-content">
        <input
          class="lk-input"
          :type="type"
          :placeholder="placeholder"
          :value="value"
          @input="$emit('input', $event.target.value)"
          :maxlength="maxlength"
        >
      </div>
    </div>
</template>

<script>
  export default {
    name: 'LkInput',
    data(){
      return {
        value2:this.value
      }
    },
    props:{
      label:{
        type:String,
        default:'文本框'
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
      maxlength:{
        type:Number | String
      }
    },
    methods:{},
    mounted(){

    }
  }
</script>

<style scoped lang="sass" type="text/scss">
  $nomal-color : #3E3E3E;
  $disabled-color : #E2E2E2;
  .input-wrap{
    position: relative;
    width: 100%;
    display: flex;
    align-items: center;
    font-size: 16px;
    color: $nomal-color;
    .lk-label{
      width: 26%;
      font-weight: 500;
      .reqired{
        color: red;
      }
    }
    .lk-content{
      width: 74%;
      .lk-input{
        width: 100%;
        height: 40px;
        border-radius: 3px;
        border: 1px solid rgb(230,230,230);
        padding: 0 10px;
        -webkit-appearance: none;
      }
    }
    &.disabled{
      .lk-label {
        color: $disabled-color;
        .reqired{
          color: $disabled-color;
        }
      }
    }

  }
</style>
