<template>
  <div class="dealers-info-panel">
    <img src="./../imgs/lincoln-icon@3x.png" alt="" width="10px">
    <div class="dealers-title">
      {{dealerInfo.dealerName||'选择经销商'}}
      <span>*</span>
    </div>
    <div class="dealers-address" v-if="dealerInfo.address">
      {{dealerInfo.address}}
    </div>
    <div class="dealers-phone" @click.stop="phoneHandleClick" :class="{disabled:!dealerInfo.dealerName}">
      联系经销商
    </div>
  </div>
</template>

<script>
  export default {
    name: "DealersInfoPanel",
    props: {
      dealerInfo: {
        type: Object
      }
    },
    methods:{
      phoneHandleClick(){
        if (this.dealerInfo.serviceHotline){
          console.log('打电话',this.dealerInfo.serviceHotline)
        }
      }
    },
  }
</script>

<style scoped lang="sass" type="text/scss">
  @function px($px) {
    @return ($px/20)+rem;
  }

  .dealers-info-panel {
    padding: px(15) 0;
    margin-bottom: px(10);
    display: flex;
    flex-direction: column;
    align-items: center;
    border-top: 1px solid #E2E2E2;
    border-bottom: 1px solid #E2E2E2;

    .dealers-title {
      font-size: px(18);
      font-weight: 600;
      line-height: px(30);

      span {
        color: red;
      }
    }

    .dealers-address {
      color: #3E3E3E;
      font-size: px(12);
      line-height: px(30);
    }

    .dealers-phone {
      box-sizing: content-box;
      padding-right: px(11);
      width: px(130);
      height: px(28);
      line-height: px(28);
      text-align: center;
      color: #3E3E3E;
      border: .5px solid #3E3E3E;
      margin: px(10) 0;
      background: url("./../imgs/phone@3x.png") px(106)/px(11) no-repeat;

      &.disabled {
        opacity: .4;
      }
    }
  }

</style>
