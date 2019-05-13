<template>
  <div class="daqutotal">
    <div class="row0" v-if="percent">
      <div class="area">
        <span>合计</span>
      </div>
      <div class="num" v-for="(num,index) in data.series_DATA_LIST" :key="index">{{num.rate}}</div>
      <div class="num">{{data.total_RATE}}</div>
    </div>
    <div class="row0" v-else>
      <div class="area">
        <span>合计</span>
      </div>
      <div class="num" v-for="(num,index) in data.series_DATA_LIST" :key="index">{{num.amount}}</div>
      <div class="num">{{data.total_AMOUNT}}</div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    data: Object,
    percent: Boolean
  },
  data() {
    return {};
  },
  mounted() {
    const { data } = this;
    console.log(JSON.stringify(data));
  }
};
</script>
<style lang="sass" scope type="text/scss">
.daqutotal .row0 {
  display: flex;
  background: #f6f6f6;
  height: 50px;
  align-items: center;
  font-size: 14px;
  color: #444344;
  margin-top: 4px;
  background: #fff0e3;

  .area {
    display: flex;
    justify-content: center;
    text-align: center;
    align-items: center;
    color: #444344;
    /*width: 100px;*/
    flex: 0 1 90px;
    position: relative;
    font-size: 12px;
    padding: 0 20px 0 5px;
  }

  .num,
  .total {
    text-align: center;
    flex: 1;
    font-size: 12px;
  }
  .num {
    font-size: 14px;
  }
  .num:last-child {
    font-family: PingFangSC-Semibold;
    font-size: 14px;
    color: #444344;
  }
}
</style>
