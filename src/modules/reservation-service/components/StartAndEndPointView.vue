<!-- 起点和终点视图 -->

<template>
  <div class="address-cel-list" ref="wrap">
    <div class="line" ref="line"></div>
    <div class="address-cell">
      <div class="address-cell-item title">
        <div class="icon">
          <img ref="start" src="./../imgs/address1@3x.png" alt>
        </div>
        <!--<div class="text">{{data.dealerName}}</div>-->
        <div class="text">{{data.startName}}</div>
      </div>
      <div class="address-cell-item desc" @click="chooseStartAddress">
        <div class="icon"></div>
        <!--<div class="text">{{data.detailAddress||data.pickupAddress}}</div>-->
        <div class="text">{{data.startAddress}}</div>
      </div>
      <div class="address-cell-item desc" v-show="data.showStartHouseNumber">
        <div class="icon"></div>
        <div class="text" style="padding: 10px 0;">
          <input v-model="data.startHouseNumber" type="text" class="house-number-input" placeholder="请输入楼号门牌">
        </div>
      </div>
    </div>
    <!-- 有地址选址 -->
    <div class="address-cell">
      <div class="address-cell-item title" @click="chooseEndAddress">
        <div class="icon">
          <img ref="end" src="./../imgs/address2@3x.png" alt>
        </div>
        <div class="text">{{data.endName}}
          <slot></slot>
        </div>
      </div>
      <div class="address-cell-item desc" v-show="data.showHouseNumber">
        <div class="icon"></div>
        <div class="text" style="padding: 10px 0;">
          <input v-model="data.houseNumber" type="text" class="house-number-input" placeholder="请输入楼号门牌">
        </div>
      </div>
      <div class="address-cell-item desc" v-show="data.endAddress">
        <div class="icon"></div>
        <div class="text">{{data.endAddress}}</div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "StartAndEndPointView",
    data() {
      return {
        adress: "我的位置"
      };
    },
    props: {
      data: {
        type: Object,
        default() {
          return {
            startName: "上海绿地林肯中心",
            startAddress: "上海市静安区康宁路956号（近场中路）",
            showStartHouseNumber: false,
            startHouseNumber: '',//门牌号
            endName: "我的位置",
            endAddress: '我的位置',
            latitude: "31.306374",
            longitude: "121.434909",
            from: '',
            houseNumber: '',//门牌号
            showHouseNumber: false
          }
        }
      },
      //可选起点
      chooseStart: {
        type: Boolean,
        default: false
      },
      //可选终点
      chooseEnd: {
        type: Boolean,
        default: false
      },
      test: Boolean,//
    },
    watch: {
      data: {
        immediate: true,
        deep: true,
        handler(newVal) {
          this.$nextTick(() => {
            console.log('line')
            this.computeStartEndPosition()
          })
        }
      },
      test(newVal) {
        if (newVal) {
          this.computeStartEndPosition()
        }
      }
    },
    methods: {
      chooseStartAddress() {
        const {chooseStart} = this
        if (!chooseStart) {
          return
        }
        app.goSelectAddressPage()
        const {from} = this.data
        window.location.href = `/modules/mapSelectAddress.html#/index?from=${from}`
      },
      chooseEndAddress() {
        // return
        const {chooseEnd} = this
        if (!chooseEnd) {
          return
        }
        app.goSelectAddressPage()
        const {from} = this.data
        window.location.href = `/modules/mapSelectAddress.html#/index?from=${from}`
      },
      //计算起点终点连线 位置
      computeStartEndPosition() {
        const $wrap = $(this.$refs.wrap)
        const $start = $(this.$refs.start)
        const $end = $(this.$refs.end)
        const top = $start.offset().top - $wrap.offset().top + $start.outerHeight()
        const bottom = ($wrap.offset().top + $wrap.outerHeight()) - $end.offset().top
        $(this.$refs.line).css({top: top, bottom: bottom})
      }
    },
    mounted() {
      this.$nextTick(() => {
        // console.log("我的位置经纬度", this.data.longitude, this.data.latitude);
        // this.$emit("change", this.adress);
        window.www = this
      });
    }
  };
</script>

<style scoped lang="sass" type="scss">
  @function px($px) {
    @return ($px/20)+rem;
  }

  .address-cel-list {
    position: relative;
    padding-bottom: px(10);

    .line {
      position: absolute;
      background-color: #E2E2E2;
      width: px(2);
      left: px(17);
      bottom: px(45);
      top: px(19);
      transform: scaleX(0.5);
    }

    .address-cell {
      padding-top: px(10);

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
            height: px(16);
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
          color: #A9A9A9;
          font-size: px(12);
        }
      }
    }
  }

  //门牌号
  .house-number-input {
    border: solid 1px #A9A9A9;
    border-radius: 3px;
    height: px(35);
    width: 95%;
    color: #323232;
    padding: 0 px(10);
    -webkit-appearance: none;
  }
</style>
