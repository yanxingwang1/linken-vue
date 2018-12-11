<template>
  <div class="tag">
    <div class="window">
    <scroller lock-x height="200px" >
      <div class="box2">
        <p v-for="(v,i) in data" @click="change(i)">{{v}}</p>
      </div>
    </scroller>
    </div>
    <p v-text="val"></p>
  </div>
</template>

<script>
import { Scroller } from 'vux'
  export default {
    name: 'tag',
    data () {
      return {
        val:""
      }
    },
    methods:{
      init(){
      },
      change(i){
        this.val = i
      },
    },
    computed: {},
    components:{
      Scroller
    },
    props:['data'],
    beforeMount(){},
    mounted(){
        return this.$nextTick(()=>this.init())
    }

  }
</script>

<style lang="sass" scoped>
  .tag{
    position: absolute;
    top:0;
    left:0;
    right:0;
    bottom:0;
    background-color:rgba(0,0,0,.3);
    .window{
      width:80%;
      height:60%;
      background-color:white;
      border-radius:.5rem;
      position: absolute;
      top:50%;
      left:50%;
      transform: translate(-50%,-50%);
      padding:.5rem;

    }
  }
</style>
