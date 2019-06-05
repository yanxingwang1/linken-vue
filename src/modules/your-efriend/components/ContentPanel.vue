<template>
  <div class="content-panel">
    <!-- 动态车书 -->
    <div class="e-btn-l dtcs"></div>
    <!-- 女性尊享活动预约 -->
    <div class="e-btn-l hdyy" @click="showDetail()"></div>


    <!-- 女性关爱计划 -->
    <div class="e-btn gajh" v-show="showImg"></div>
    <!-- 欢迎回家 -->
    <div class="e-btn hyhj" v-show="showImg"></div>
    <!-- 展厅活动 -->
    <div class="e-btn zthd" v-show="showImg"></div>
    <!-- 精品指南 -->
    <div class="e-btn jpzn" v-show="showImg"></div>


    <!-- 底部 -->
    <div class="e-footer"></div>
  </div>
</template>

<script>
  export default {
    name: "ContentPanel",
    data() {
      return {
        showImg: false,
      }
    },
    methods:{
      showDetail() {
        this.showImg = !this.showImg;
      }
    }
  }
</script>

<style lang="sass" type="text/scss" rel="stylesheet/scss" scoped>
  @function px($px) {
    @return ($px/20)+rem;
  }

  .content-panel {
    .e-btn-l {
      height: px(135);
      margin: px(22) px(10);
    }

    .e-btn {
      height: px(85);
      margin: 0 px(18);
      margin-bottom: px(8);
    }

    /*<!-- 动态车书 -->*/
    .dtcs {
      background: url("./../imgs/bg_dtcs.png") center/100% no-repeat;
    }

    /*<!-- 女性尊享活动预约 -->*/
    .hdyy {
      background: url("./../imgs/bg_hdyy.png") center/100% no-repeat;
    }


    /*<!-- 女性 关爱计划 -->*/
    .gajh {
      background: url("./../imgs/bg_gajh.png") center/100% no-repeat;
    }

    /*<!-- 欢迎回家 -->*/
    .hyhj {
      background: url("./../imgs/bg_hyhj.png") center/100% no-repeat;
    }

    /*<!-- 展厅活动 -->*/
    .zthd {
      background: url("./../imgs/bg_zthd.png") center/100% no-repeat;
    }

    /*<!-- 精品指南 -->*/
    .jpzn {
      background: url("./../imgs/bg_jpzn.png") center/100% no-repeat;
    }



    /* 底部 */
    .e-footer{
      height: px(85);
    }
  }

</style>
