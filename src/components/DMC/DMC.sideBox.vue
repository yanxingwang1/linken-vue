<template>
	<div class="side-box-wrapper" v-on:click.self="close($event)" :class="{'side-in':isShow}" :style="'top:'+location[0]||0+';bottom:'+location[1]||0">

    <div class="side-modal">
      <slot></slot>
    </div>

	</div>
</template>

<script>
    export default {
        name: 'sideBox',
        data() {
            return {
              'isShow':false,
              'location':[]
            }
        },
      props:{
        isVisible:{
          type:Boolean,
          default:false
        },
        position:{
          type:String,
          default:'0 0'
        }
      },
      watch: {
        isVisible() {
          this.isShow = !this.isShow;
          let ele = document.body
          if(this.isShow){
            ele.style.height = '100%'
            ele.style.overflow = 'hidden'
          }else{
            ele.style.height = 'auto'
            ele.style.overflow = 'scroll'
          }
        }
      },
        methods: {
            init(){
              this.location = this.position.split(' ');
            },
            close(event) {

              let className = event.target.className;
              if(className.indexOf('wrapper')>-1) this.isShow = false;

            }

        },
        beforeMount() {
            //todo

        },
        mounted() {
            //todo
          this.init();
        }
    }

</script>

<style lang="sass" scoped>
.side-box-wrapper{
  position: fixed;
  box-sizing: content-box;
  top:24px;
    bottom: 0;
    left: 0;
    right: 0;
  margin: 0;
  padding: 0;
 background:transparent;
  opacity: 0;
  z-index: -1;
  -webkit-transition: opacity .2s ease-in-out;
    -webkit-transition-delay:.2s;
  &.side-in{
    opacity: 1;
    z-index: 1000;
    -webkit-transition: opacity .2s ease-in-out;
     .side-modal{
       -webkit-transition: left .2s ease-in-out;
         -webkit-transition-delay:.1s;
        left:40%;
    }
  }
}



.side-modal{
  position: absolute;
    top: 44px;
    bottom: 0;
    left: 100%;
    right: 0;
    background-color: #fff;
    z-index:1001;
    -webkit-transition: left .2s ease-in-out;
    overflow: scroll;

  }

</style>
