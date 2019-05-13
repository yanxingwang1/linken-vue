<template>
  <!-- 服务工程师送车订单明细 -->
  <div>
    <div class="flex">
      <div class="box">
        <span class="item"></span>
      </div>
    </div>
    <div @click="open()">评价服务</div>
    <div @click="openReason()">取消订单</div>
    <mt-popup v-model="popupVisible" position="bottom">
      <fetch-and-deliver-rate
        :hasRated="hasRated"
        :rateValue="rateValue"
        @userRate="submitUserRate"
      ></fetch-and-deliver-rate>
    </mt-popup>
    <mt-popup v-model="reasonVisible" position="bottom">
      <cancel-reason
        :reasonChoose="reasonChoose"
        @cancel="submitCancel"
      ></cancel-reason>
    </mt-popup>
  </div>
</template>

<script>
import fetchAndDeliverRate from "./components/FetchAndDeliverRate";
import cancelReason from "../fetch-and-deliver/components/CancelReason";
import { Popup, Indicator } from "mint-ui";
import { setTimeout } from "timers";

export default {
  name: "test",
  components: {
    fetchAndDeliverRate,
    Popup,
    cancelReason
  },
  created() {
    end_time = new Date().getTime();
    console.log("index加载时间：", end_time - start_time, "ms");
  },
  beforeDestroy() {
    clearInterval(this.timer);
  },
  data() {
    return {
      popupVisible: false,
      hasRated: false,
      rateValue: {
        rate: "90061001",
        text:
          "阿道夫拉时代峻峰拉水电费阿斯蒂芬姐啦时代峻峰拉可适当阿斯蒂芬静安寺都快疯了阿萨德发生大幅阿萨德发送到",
        date: "2019年3月10日 20:30"
      },
      reasonVisible: false,
      reasonChoose:[{id:'1001',value:'客户原因取消'},
                    {id:'1002',value:'客户修改信息（时间、地点）'},
                    {id:'1003',value:'工单关联错误'},
                    {id:'1004',value:'其他'}],
    };
  },
  directives: {},
  watch: {},
  methods: {
    init() {},
    open() {
      this.popupVisible = !this.popupVisible;
    },
    submitUserRate: function(val) {
      Indicator.open({
        spinnerType: "triple-bounce"
      });
      console.log(val);
      this.popupVisible = false;
      this.hasRated = true;
      this.rateValue.assStatus = val.assStatus;
      this.rateValue.eAssStatus = val.eAssStatus;
      this.rateValue.remark = val.remark;
      this.rateValue.date = moment().format("YYYY年MM月DD日 HH:mm");
      setTimeout(function() {
        Indicator.close();
      }, 1000);
    },
    openReason() {
      this.reasonVisible = true;
    },
    submitCancel(val) {
      this.reasonVisible = false;
      console.log(val);
    }
  },
  beforeMount() {
    $(document).attr("title", "售后预约");
  },

  mounted() {
    //   return this.$nextTick(() => this.init());
  }
};
</script>

<style lang="sass" scoped>
</style>
