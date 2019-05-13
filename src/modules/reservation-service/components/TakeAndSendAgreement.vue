<!-- 取送车协议 -->
<template>
  <span class="take-and-send-agreement">
    <span @click="popupVisible=true">《上门取送车服务协议》</span>
    <mt-popup
      v-model="popupVisible"
      position="bottom">
      <div class="agreement" @touchmove.prevent>
        <div class="close-btn" @click="popupVisible=false"></div>
        <div class="title">上门取送车协议</div>
        <div class="text">
          上门取送车协议上门取送车协议上门取送车协议上门取送车协议上门取送车协议上门取送车协议上门取送车协议上门取送车协议
          上门取送车协议上门取送车协议上门取送车协议上门取送车协议上门取送车协议上门取送车协议上门取送车协议上门取送车协议
          上门取送车协议上门取送车协议上门取送车协议上门取送车协议上门取送车协议上门取送车协议上门取送车协议上门取送车协议
          上门取送车协议上门取送车协议上门取送车协议上门取送车协议上门取送车协议上门取送车协议上门取送车协议上门取送车协议
          上门取送车协议上门取送车协议上门取送车协议上门取送车协议上门取送车协议上门取送车协议上门取送车协议上门取送车协议
          上门取送车协议上门取送车协议上门取送车协议上门取送车协议上门取送车协议上门取送车协议上门取送车协议上门取送车协议
          上门取送车协议上门取送车协议上门取送车协议上门取送车协议上门取送车协议上门取送车协议上门取送车协议上门取送车协议
          上门取送车协议上门取送车协议上门取送车协议上门取送车协议上门取送车协议上门取送车协议上门取送车协议上门取送车协议
          上门取送车协议上门取送车协议上门取送车协议上门取送车协议上门取送车协议上门取送车协议上门取送车协议上门取送车协议
          上门取送车协议上门取送车协议上门取送车协议上门取送车协议上门取送车协议上门取送车协议上门取送车协议上门取送车协议
          上门取送车协议上门取送车协议上门取送车协议上门取送车协议上门取送车协议上门取送车协议上门取送车协议上门取送车协议
          上门取送车协议上门取送车协议上门取送车协议上门取送车协议上门取送车协议上门取送车协议上门取送车协议上门取送车协议
        </div>
      </div>
    </mt-popup>
  </span>
</template>

<script>
  export default {
    name: "TakeAndSendAgreement",
    data() {
      return {
        popupVisible: false
      }
    }
  }
</script>

<style scoped lang="sass" type="text/scss">
  @function px($px) {
    @return ($px/20)+rem;
  }

  .take-and-send-agreement {
    span {
      font-size: 0.6rem;
      color: rgb(129, 199, 251);
    }

    .agreement {
      position: relative;
      color: #323232;
      width: 100vw;
      height: px(500);

      .title {
        font-size: px(18);
        padding-top: px(10);
        height: px(70);
        display: flex;
        justify-content: center;
        align-items: center;
      }

      .text {
        height: px(420);
        overflow: auto;
        font-size: px(14);
        padding: 0 px(24);
        line-height: 2;
      }

      .close-btn {
        position: absolute;
        display: inline-block;
        right: px(20);
        top: px(10);
        width: px(24);
        height: px(24);
        background: url("./../imgs/close@2x.png") center/100% no-repeat;
      }
    }
  }
</style>
