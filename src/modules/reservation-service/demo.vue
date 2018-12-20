<template>
  <div class="index">
    <div class="wx-form">
      <wx-licen-select v-model="license"></wx-licen-select>
    </div>

    <div class="index-ft">
      <wx-button
        @click.native="testHandleClick"
      >测试按钮
      </wx-button>
      <input id="testinput" style="width: 100%;height: 40px;margin: 20px 0;border: solid 1px;" type="text">
    </div>

  </div>
</template>

<script>
  import util from '../../common/DMC.util'
  import WxLicenSelect from './../../components/WxLicenSelect'
  import WxButton from './../../components/WxButton'
  import {Popup, MessageBox} from 'mint-ui'
  import WxTimeInterval from './components/WxTimeInterval'

  export default {
    name: 'index',
    created() {
      end_time = new Date().getTime()
      console.log('index加载时间：', end_time - start_time, 'ms')
    },
    beforeDestroy() {
      clearInterval(this.timer)
    },
    data() {
      return {
        popupVisible: false,
        license: '沪C12345'
      }
    },
    directives: {},
    watch: {
      license(v) {
        console.log('watch,license', v)
      }
    },
    methods: {
      testHandleClick() {
        console.log('testHandleClick')
        $.alert({
          title: '提示',
          content: '哈哈',
        })
      },
      inputTestClick() {
        console.log(1)
      }
    },
    beforeMount() {
      $(document).attr('title', '试乘试驾车列表')
    },
    components: {
      WxLicenSelect,
      WxTimeInterval,
      WxButton,
      Popup,
      MessageBox,
    },
    mounted() {
      window.demo = this
      $('#testinput').licensePlateKeyboard()
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
