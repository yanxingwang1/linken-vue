<template>
  <div class="vehicle-info-wrap">
    <div class="vehicle-info">
      <div>{{data.carNo||data.license}}</div>
      <!-- 新款林肯 -->
      <div>{{data.carModelName||data.model}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "VehicleInfoPanel",
  props: {
    data: Object
  }
};
</script>

<style scoped lang="sass" type="text/scss">
  @function px($px) {
    @return ($px/20)+rem;
  }

  /* 车辆信息 */
  .vehicle-info-wrap {
    padding: 0 px(10);

    .vehicle-info {
      height: px(78);
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      border-bottom: solid 1px #E2E2E2;
     

      > div {
        &:nth-of-type(1) {
          font-size: px(18);
          padding-bottom: px(5);
          font-weight: 600;
        }

        &:nth-of-type(2) {
          font-size: px(12);
          font-weight: 400;
        }
      }
    }
  }
</style>
