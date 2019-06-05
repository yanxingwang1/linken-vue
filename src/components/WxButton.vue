<template>
  <mt-button
    type="default"
    :disabled="disabled"
  >
    <slot></slot>
  </mt-button>
</template>

<script>
  import { Button } from 'mint-ui'

  export default {
    name: 'WxButton',
    data () {
      return {}
    },
    props: {
      disabled: {
        type: Boolean,
        default: false
      }
    },
    components:{
      Button
    }
  }
</script>

<style scoped lang="sass" type="text/scss">
  .mint-button{
    position: relative;
    width: 100%;
    height: 44px;
    background-color: #B45F1A;
    color: white;
    font-size: 17px;
    &:disabled{
      background-color: #9F9F9F;
      color: #FFFFFF;
    }
    label.mint-button-text{
      margin: 0 !important;
    }
  }
</style>
