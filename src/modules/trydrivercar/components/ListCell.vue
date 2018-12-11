<template>
  <div
    class="cell-wrap">
    <div class="cell-item">
      <div class="cell-inner">
        <div class="item item-0">
          <div class="item-label">车牌号<span>：</span></div>
          <div class="item-content">{{vehicle.license}}</div>
          <div class="switch-wrap">
            <mt-switch v-model="switchValue"></mt-switch>
            <div @click.stop.prevent="switchHandClick" class="switch-mask"></div>
          </div>
        </div>
        <div class="item item-1">
          <div class="item-label">车型<span>：</span></div>
          <div class="item-content">{{vehicle.modelName}}</div>
        </div>
        <div class="item item-2">
          <div class="item-label">里程数<span>：</span></div>
          <div class="item-content">{{vehicle.mileage==null?'':vehicle.mileage+ ' km'}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {Switch} from 'mint-ui'

  export default {
    name: 'ListCell',
    data() {
      return {
        // switchValue: false
      }
    },
    computed: {
      //开关的值 有效为0  无效为1
      switchValue: {
        get: function () {
          return this.vehicle.isValue == 0 ? true : false
        },
        set: function (v) {
          this.vehicle.isValue = v ? 0 : 1
        }
      }
    },
    watch: {
      switchValue(val, oldVal) {
        //this.$emit('updateVehicleList', this.vehicle, this.index)
      }
    },
    props: {
      vehicle: {
        type: Object
      },
      index: {
        type: Number
      }
    },
    methods: {
      switchHandClick() {
        console.log('cell switchHandClick',this.vehicle)
        this.$emit('updateVehicleList', this.vehicle, this.index)
        //this.$emit('click')
      },
      //状态改变（开关变化）
      switchChangeAction() {

      }
    },
    components: {
      MtSwitch: Switch
    }
  }
</script>

<style scoped lang="sass" type="text/scss">
  $lab-color: #a9a9a9;

  .cell-wrap {
    background-color: white;
    padding: 0 23px;
    font-size: 15px;
    border-bottom: solid 10px #f5f5f5;

    .cell-item {
      padding: 15px 0;

      .cell-inner {
        .item {
          display: flex;
          height: 30px;
          align-items: center;
          color: $lab-color;
          .item-label{
            width: 60px;
            display: flex;
            justify-content: space-between;
          }
          .item-content{
            flex: 1 1 auto;
            color: #3E3E3E;
          }

          .switch-wrap {
            position: relative;

            .switch-mask {
              position: absolute;
              top: 0;
              left: 0;
              right: 0;
              bottom: 0;
            }
          }

          .mint-switch {
            height: 40px;
          }
        }
      }
    }
  }

</style>
