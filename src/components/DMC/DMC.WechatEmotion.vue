<template>
  <div class="WechatEmotion" v-show="isShow" @click.self="close">
    <div>
        <i v-for="(item,index) in list" @click="check(index)" v-html="item"></i>
    </div>
  </div>
</template>

<script>
import { WechatEmotion as Emotion } from 'vux'
  export default {
    name: 'WechatEmotion',
    data () {
      return {
        list:[
        "😩","😲","😞","😵","😰","😒","😍","😤","😜","😝","😋","😘","😚","😷","😳","😃","😆","😁","😂","😄","😢","😭","😨","😣","😡","😌","😖","😔","😱","😪","😏","😓","😥","😫","😉","😺","😸","😹","😽","😻","😿","😼","🙀","🙋","🙌","🙍","🙏","🔥","🎁","🎄","🎅","🎈","🎉","👮","👱","👲","👳","👴","👵","👶","👷","👸","👯","👻","👼","👽","👾","👿","💀","💂","💃","🌻","🌴","🌵","🌾","🍎","🍊","🍓","👀","👂","👃","👄","👅","💅","👦","👧","👨","👩","👫","🎍","🎎","🎓","🎏","🎐","🎃","📞","📱","📲","📠","💻","💽","💾","💿","📀","🎵","🎶","🎼","💜","💝","💢","💤","💦","💨","💩","💪","✨","🔔","✊","👊","👍","☝","👆","👇","👈","👉","👋","👏","👌","👎","👐","🌀","🌂","🌙","🌟","🍀","🌷","🌱","🍁","🌸","🌹","🍂","🍃","🌺"
        ]
      }
    },
    methods:{
      init(){},
      close(){
        this.$emit('selectEmotion',false)
      },
      check(i){
        //console.log(i)
        this.close()
        this.$emit('checkVal',[this.list[i],i])
      },
    },
    computed: {},
    components:{Emotion},
    beforeMount(){},
    props:['isShow'],
    mounted(){
        return this.$nextTick(()=>this.init())
    }

  }
</script>

<style lang="sass" scoped>
  .WechatEmotion{
    background-color:rgba(0,0,0,.2)!important;
    position: absolute;
    top:0;
    left:0;
    right:0;
    bottom:0;
    z-index:911;
    >div{
        margin-top:50%;
        transform:translateY(-26%);
        padding-left:.3rem;
        i{
          width:1.4rem;
          font-size:1rem;
          font-style:inherit;
          text-align:center;
          display: inline-block;
        }
    }
  }
</style>
