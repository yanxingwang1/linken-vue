<template>
  <div class="page">
    <div class="index">
      <div class="title">该试乘试驾已完成</div>
      <div class="desc">
        <div>
          <span>邀请客户扫码</span>
        </div>
        <div>
          <span>在线填写试乘试驾反馈表</span>
        </div>
      </div>
      <div class="qr-code-wrap">
        <img :src="src" alt="" class="qr-code"/>
      </div>
    </div>
  </div>
</template>

<script>
  import util from '../../common/DMC.util.js'
  export default {
    name: "qrCode",
    data() {
      return {
        src: ''
      }
    },
    mounted() {
      const url = util.getQueryValue('qrCodeUrl') || '';
      this.src = decodeURIComponent(url)
    }
  }
</script>

<style scoped lang="sass" type="text/scss">
  @function px($px) {
    @return ($px/20)+rem;
  }

  .page {
    height: 100vh;
    background-color: #ffffff;
    .index {
      width: 100%;
      padding-top: 30%;
      text-align: center;
      .title {
        margin-bottom: px(25);
        font-size: px(18);
        color: #3E3E3E;
      }

      .desc {
        margin-bottom: px(25);
        font-size: px(14);
        color: #3E3E3E;
        span{
          display: inline-block;
          background-color: rgba(0,0,0,.15);
          margin-bottom: px(4);
          padding: 0 5px;
        }
      }

      .qr-code-wrap {
        position: relative;
        display: inline-block;
        width: px(165);
        height: px(165);
        img{
          width: 100%;
          height: 100%;
        }
      }
    }
  }
</style>
