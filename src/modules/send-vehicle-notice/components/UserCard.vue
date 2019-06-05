<template>
  <div>
    <div class="address-cells">
      <div class="address-cell-item title">
        <div class="icon">
          <img src="../imgs/time1@2x.png" alt>
        </div>
        <div class="text">预计送达时间</div>
      </div>
      <div class="address-cell-item desc" style="color:rgba(180,95,26,1)">
        <div class="icon"></div>
        <div class="text">{{sendtime}}</div>
      </div>
    </div>
    <div class="address-cells">
      <div class="address-cell-item title">
        <div class="icon">
          <img src="../imgs/uncustom.png" alt>
        </div>
        <div class="text">车主信息</div>
      </div>
      <div class="address-cell-item desc">
        <div class="icon"></div>
        <div
          class="text"
        >{{data.lastName}}{{data.sex=='1'?'女士':'先生'}}&nbsp;&nbsp;&nbsp;&nbsp;{{data.phone}}</div>
      </div>
    </div>
    <div class="address-cells" v-show="data.pickerPhone">
      <div class="address-cell-item title">
        <div class="icon">
          <img src="../imgs/custom.png" alt>
        </div>
        <div class="text">委托接车人</div>
      </div>
      <div class="address-cell-item desc">
        <div class="icon"></div>
        <div
          class="text"
        >{{data.pickerLastName}}{{data.pickerFirstName}}{{data.pickerSex=='1'?'女士':'先生'}}&nbsp;&nbsp;&nbsp;&nbsp;{{data.pickerPhone}}</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    data: Object
  },
  computed: {
    sendtime: function() {
      return moment(this.data.arrivalTime).format(
        "YYYY年MM月DD日 星期dd HH:mm"
      );
    }
  }
};
</script>
<style lang="sass" scope>
 @function px($px) {
    @return ($px/20)+rem;
  }

    .address-cells {
      margin-top: px(10);

      .address-cell-item {
        display: flex;
        align-items: center;
        color: #323232;
        min-height: px(25);

        .icon {
          width: px(35);
          height: 100%;
          flex: 0 0 auto;
          display: flex;
          justify-content: center;
          align-items: center;

          img {
            width: px(12);
            // height: px(16);
          }
        }

        .text {
          flex: 1 1 auto;
          padding-left: px(5);
          padding-right: px(10);
        }

        &.title {
          font-size: px(14);
        }

        &.desc {
        //   color: #A9A9A9;
         color: #323232;
          font-size: px(12);
        }
      }
    }
</style>