<template>
  <div class="dealers-info-panel" :class="{'dealers-info-ready':dealerInfo.dealerCode}">
    <div class="dealers-info-l">
      <div class="dealers-title">
        {{dealerInfo.dealerName||'选择经销商'}}
        <span>*</span>
      </div>
      <div class="dealers-address" v-show="dealerInfo.address">{{dealerInfo.address}}</div>
    </div>
    <div class="dealers-info-r">
      <div class="dealers-phone" @click.stop="phoneHandleClick"></div>
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
  methods: {
    phoneHandleClick() {
      if (this.dealerInfo.serviceHotline) {
        console.log("打电话", this.dealerInfo.serviceHotline);
        window.location.href = `tel:${this.dealerInfo.serviceHotline}`;
      }
    }
  }
};
</script>

<style scoped lang="sass" type="text/scss">
  @function px($px) {
    @return ($px/20)+rem;
  }

  .dealers-info-panel {
    padding: px(25) 0;
    margin-bottom: px(10);
    display: flex;
    flex-direction: row;
    align-items: center;
    border-top: 1px solid #E2E2E2;
    border-bottom: 1px solid #E2E2E2;

    .dealers-info-l {
      width: 100%;

      .dealers-title {
        font-size: px(18);
        font-weight: 600;
        min-height: px(40);
        line-height: px(40);
        background: url("./../imgs/lincoln-icon@3x.png") px(10)/px(10) no-repeat;
        padding-left: px(35);

        span {
          color: red;
        }
      }

      .dealers-address {
        color: #3E3E3E;
        font-size: px(12);
        min-height: px(30);
        line-height: px(30);
      }
    }

    .dealers-info-r {
      position: relative;
      width: px(50);
      height: px(40);
      flex: 0 0 auto;
      margin-right: px(10);
      background: url("./../imgs/arrow-r2@3x.png") right/px(10) no-repeat;

      .dealers-phone {
        display: none;
      }
    }

    &.dealers-info-ready {
      .dealers-info-r {
        background: initial;

        .dealers-phone {
          display: block;
          border-left: 1px solid #E2E2E2;
          width: 100%;
          height: px(40);
          background: url("./../imgs/phone-o@3x.png") 70%/px(20) no-repeat;
        }
      }
    }
  }

</style>
