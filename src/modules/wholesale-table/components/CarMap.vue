<template>
  <!-- 销售车型 -->
  <div class="car-type">
    <div class="carli-f"></div>
    <div v-for="(item,index) in cars" :key="index" class="carli">
      <div class="imgli">
        <img :src="item.url" alt>
      </div>
      <div class="carname">{{carNameDict[item.seriesGroup]}}</div>
    </div>

    <div class="carli" :style="{visibility:timetype==3||timetype==4||weekno?'visible':'hidden'}">
      <div style="font-size: 10px;text-align: center;">达成率</div>
      <div class="pass" @click="tiggle" style="text-align: center;">
        <img v-if="percent" src="../images/open.png">
        <img v-else src="../images/close.png">
      </div>
    </div>
  </div>
</template>
<script>
const carNameDict = {
  CONTINENTAL: "CONT",
  MKC: "MKC",
  MKX: "MKX",
  MKZ: "MKZ",
  NAUTILUS: "NAU",
  NAVIGATOR: "NAV"
};
export default {
  props: {
    cars: Array,
    timetype: Number,
    saletype: Number,
    percent: Boolean
  },
  data() {
    return {
      // persent: false
      carNameDict
    };
  },
  computed: {
    weekno: function() {
      if (this.timetype == 2 && this.saletype !== 4) {
        return true;
      } else {
        return false;
      }
    }
  },
  // watch: {
  //   saletype(val, oldVal) {
  //     this.saletype = val;
  //     console.log("saletype", this.saletype);
  //   }
  // },
  methods: {
    tiggle() {
      // this.persent = !this.persent;
      this.$emit("percents", !this.percent);
    }
  },
  mounted() {}
};
</script>
<style lang="sass" scope type="text/scss">
  .car-type {
    display: flex;
    height: 45px;
    justify-content: center;
    /*margin: 15px 0 5px;*/
    margin-bottom: 5px;
    font-size: 12px;
    .carli-f{
      width: 90px;
    }
    .carli {
      flex: 1;
      overflow: hidden;
      font-size: 10px;

      .imgli {
        /*margin-bottom: 4px;*/
      }

      img {
        width: 100%;
        // height: 27px;
      }

      .carname {
        overflow: hidden; //隐藏文字
        text-overflow: ellipsis; //显示...
        white-space: nowrap; //不换行
        text-align: center;
        // width:50px;//超过100px就截取
      }
    }

    .pass {
      img {
        width: 60%;
        height: initial;
        /*margin-top: 5px;*/
      }
    }
  }
</style>
