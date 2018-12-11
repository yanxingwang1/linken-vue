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
    <!--<div class="wx-dialog-mask">-->
    <!--<div class="wx-dialog-wrap">-->
    <!--<div class="wx-dialog-content">-->
    <!--<div class="wx-dialog-title">提示</div>-->
    <!--<div class="wx-dialog-body">-->
    <!--您在该经销商有预约售后未完成-->
    <!--</div>-->
    <!--<div class="wx-dialog-footer">-->
    <!--<div class="wx-dialog-btn">确定</div>-->
    <!--</div>-->
    <!--</div>-->
    <!--</div>-->
    <!--</div>-->
    <div class="jq-alert" id="jq-alert">
      <div class="alert"><h2 class="title">提示</h2>
        <div class="content">自定义弹窗内容，居左对齐显示，告知需要确认的信息等</div>
        <div class="fd-btn"><a href="javascript:void(0);" data-role="cancel" class="cancel">取消</a><a
          href="javascript:void(0);" class="confirm" id="yes_btn">知道了</a></div>
      </div>
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
      // console.log(this.$route.query.mobile);
      // this.$route.query.userid
      // return this.$nextTick(() => this.init());
      // this.getVehicle()
      // console.log(this.$vux)
      // this.$vux.confirm.prompt('禁用原因', {
      //   title: '禁用原因',
      //   hideOnBlur:true,
      //   onCancel () {
      //     console.log('取消')
      //   },
      //   onConfirm (value) {
      //     console.log('确定')
      //   }
      // })
      $('#testinput').numberKeyBorad()
      // setTimeout(()=>{
      //   $('.wx-number-keyboard-wrap').addClass('active')
      // },1000)
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
