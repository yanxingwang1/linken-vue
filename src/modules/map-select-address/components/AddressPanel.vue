<template>
  <div class="address-panel-wrap" v-show="addressInfo.address">
    <div class="address-panel-title">
      <div class="address-text">{{filteAddressText(addressInfo)}}</div>
      <div class="address-btn" @click="$emit('confirm')">确定</div>
    </div>
    <div class="address-panel-desc">{{filteAddressDesc(addressInfo)}}</div>
  </div>
</template>

<script>
  export default {
    name: "AddressPanel",
    props: {
      addressInfo: Object
    },
    methods: {
      filteAddressText(addressInfo) {
        const {regeocode} = addressInfo
        if (!regeocode) {
          return addressInfo.address
        }
        const {pois} = regeocode
        if (!pois) {
          return addressInfo.address
        }
        const [poi] = pois
        if (!poi) {
          return addressInfo.address
        }
        return poi.name
      },
      filteAddressDesc(addressInfo) {
        return addressInfo.address
      }
    }
  }
</script>

<style scoped lang="sass" type="text/scss">
  @function px($px) {
    @return ($px/20)+rem;
  }

  .address-panel-wrap {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    background-color: #FFFFFF;
    z-index: 999;
    padding: 0 px(20);

    .address-panel-title {
      display: flex;
      align-items: center;
      min-height: px(60);
      padding: px(10) 0;

      .address-text {
        padding-right: px(10);
        font-size: 16px;
        flex: 1 1 auto;
      }

      .address-btn {
        flex: 0 0 px(70);
        /*width: px(70);*/
        height: px(30);
        background-color: #B45F1A;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 2px;
        color: white;
      }
    }

    .address-panel-desc {
      color: #8A8A8A;
      font-size: 12px;
      min-height: px(40);
      padding-bottom: px(10);
    }
  }
</style>
