<template>
  <div id="dialog">
    
  </div>
</template>
<script>
  import {
    Group,
    Cell,
    } from 'vux'
  export default {
    name: "",
    components: {
      Group,
      Cell,
    },
    data(){
      return {}
    },
    methods:{
      closeDialog(){
         //给父组件传参
         this.$emit('closeDialog',false)
      }
    }
  }
</script>
 
<style scoped>
  #dialog{
    position: fixed;
    top: 0;
    left: 0;
    background: rgba(0,0,0,0.3);
    width: 100%;
    height: 100%;
  }
  </style>