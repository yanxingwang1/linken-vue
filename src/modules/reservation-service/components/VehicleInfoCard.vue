<template>
  <div class="vehicle-card">
    <div class="vehicle">
      <div class="info">
        <div class="series">{{vechinfo.modelName || '无法识别车型'}}</div>
        <div class="vin">
          <div>VIN码:</div>
          <div>{{vechinfo.vin}}</div>
        </div>
      </div>
      <div class="photo" :class="{'has-photo': vechinfo.picUrl}">
        <img :src="vechinfo.picUrl||require('./../imgs/vehicle-no@2x.png')">
      </div>
    </div>
    <div class="wx-form">
      <wx-licen-select
        :required="true"
        class="lk-vechinfo-plate-number"
        port="c"
        v-model="vechinfo.plateNumber"
        @inputPlateBlur="inputPlateBlur"
      ></wx-licen-select>
      <div class="mileage-label">当前里程数<span>*</span></div>
      <wx-mileage-progress
        :vechinfo="vechinfo"
      ></wx-mileage-progress>
    </div>
    <div style="height: 36px;"></div>
  </div>
</template>

<script>
  import WxLicenSelect from './../../../components/WxLicenSelect'
  import WxMileageProgress from './WxMileageProgress'

  export default {
    name: "VehicleInfoCard",
    components: {
      WxLicenSelect,
      WxMileageProgress,
    },
    props: {
      vechinfo: {
        type: Object
      }
    },
    data() {
      return {}
    },
    methods: {
      inputPlateBlur(value) {
        this.$emit('inputPlateBlur', {
          vin: this.vechinfo.vin,
          license: value
        })
      }
    },
    mounted(){
      $('.lk-vechinfo-plate-number .wx-label').css('font-size','0.8rem')
    }
  }
</script>

<style scoped lang="sass" type="text/scss">
  @function px($px) {
    @return ($px/20)+rem;
  }

  .vehicle-card {
    position: relative;
    text-align: initial;
    .vehicle {
      position: relative;
      display: flex;
      padding: px(20);
      background-color: #ffffff;
      border-bottom: solid 1px #E2E2E2;
      .info {
        flex: 1 1 auto;
        display: flex;
        flex-direction: column;
        justify-content: space-around;

        .series {
          font-size: px(15);
          font-weight: 500;
        }

        .vin {
          font-size: px(13);
        }

      }

      .photo {
        width: px(140);
        height: px(78);
        overflow: hidden;
        img {
          width: px(140);
          height: px(78);
          object-fit: cover;
        }
        &.has-photo img{
          transform: scale(1.3) translateX(px(13));
        }
      }
    }

    .wx-form {
      padding: px(20);
      background-color: #ffffff;
      .mileage-label {
        font-size: px(16);
        line-height: px(40);

        span {
          color: red;
        }
      }
    }
  }
</style>
