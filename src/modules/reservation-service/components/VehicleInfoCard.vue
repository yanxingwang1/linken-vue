<template>
  <div class="vehicle-card">
    <div class="vehicle">
      <div class="info">
        <div class="series">{{vechinfo.modelName}}</div>
        <div class="vin">
          <div>vin码:</div>
          <div>{{vechinfo.vin}}</div>
        </div>
      </div>
      <div class="photo">
        <img :src="vechinfo.picUrl">
      </div>
    </div>
    <div class="wx-form">
      <wx-licen-select v-model="license"></wx-licen-select>
      <div class="mileage-label">当前里程数<span>*</span></div>
      <wx-mileage-progress
        :lastMaintenanceMileage="vechinfo.lastMaintenanceMileage"
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
      WxMileageProgress
    },
    props: {
      vechinfo: {
        type: Object
      }
    },
    data() {
      return {
        modelName: '', //车型
        vin: '',//vin
        license: '',
      }
    }
  }
</script>

<style scoped lang="sass" type="text/scss">
  @function px($px) {
    @return ($px/20)+rem;
  }

  .vehicle-card {
    .vehicle {
      display: flex;
      padding: px(20) 0 px(20) px(20);
      height: px(110);
      background-color: #ffffff;

      .info {
        flex: 1 1 auto;
        display: flex;
        flex-direction: column;
        justify-content: space-around;

        .series {
          font-size: px(14);
        }

        .vin {
          font-size: px(12);
        }

      }

      .photo {
        img {
          width: px(140);
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
