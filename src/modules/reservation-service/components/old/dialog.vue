<template>
  <div class="index">
    <div class="index-ft">
      <wx-button @click.native="testHandleClick">测试按钮</wx-button>
      <wx-button @click.native="testHandleClick2">测试按钮</wx-button>
    </div>



  </div>
</template>

<script>
  import WxButton from './../../components/WxButton'

  export default {
    name: 'index',
    data() {
      return {}
    },
    methods: {
      testHandleClick() {
        console.log('testHandleClick')
//         $.alert({
//           title: '提示',
//           content: '哈哈',
//         })
// return
        $.dialog({
          title:'提示',
          message:'你好 林肯',
          html:'<input id="testtest" type="text" />',
          buttons:[{
            title:'取消'
          },{
            title:'确认',
            isBold:true,
            callback:function () {
              console.log('点击确认',$('#testtest').val())
            }
          }]
        })
        $('#testtest').numberKeyBorad()
      },
      testHandleClick2(){
        $.dialog({
          type:'wx-alert',
          title:'提示',
          message:'你好 林肯',
          buttons:[{
            title:'确认',
            callback:function () {
              console.log('点击确认')
            }
          }]
        })
      }
    },
    components: {
      WxButton,
    },
    mounted() {

    }
  }
</script>

<style lang="sass" type="text/scss" rel="stylesheet/scss" scoped>
  @function px($px) {
    @return ($px/20)+rem;
  }

  .index {
    padding: 20px;
  }



</style>
