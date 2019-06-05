<!-- 取车 司机轨迹 地图页面 下方显示 -->
<template>
  <div class="take-panel-wrap">
    <div class="take-panel-inner">
      <div class="title">
        林肯中心已接收您的爱车
      </div>
      <div class="driver-info">
        <div class="driver-icon">

        </div>
        <div class="order-info">

        </div>
        <div class="phone">

        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "TakePanel"
  }
</script>

<style scoped lang="sass" type="text/scss">
  @function px($px) {
    @return ($px/20)+rem;
  }
  .take-panel-wrap{
    position: absolute;
    padding: 0 px(15);
    bottom: px(10);
    left: px(10);
    right: px(10);
    background-color: #FFFFFF;
    border-radius: 5px;
    box-shadow: 4px 3px 5px rgba(0, 0, 0, .2);
    z-index: 9999;
  }
  .take-panel-inner{
    .title{
      text-align: center;
      height: px(50);
      line-height: px(50);
      font-size: px(14);
      border-bottom: solid 1px #E2E2E2;
    }
    .driver-info{
      display: flex;
      height: px(94);
      .driver-icon{
        flex: 0 1 px(54);
      }
      .order-info{
        display: flex;
        flex-direction: column;

      }
      .phone{
        flex: 0 1 px(50);
      }
    }
  }
</style>
