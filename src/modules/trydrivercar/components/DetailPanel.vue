<template>
  <div class="detail-panel-wrap">
    <div class="detail-panel">
      <div class="title">
        <div class="detail-cell">
          <div class="t">车牌号<span>：</span></div>
          <div class="c">{{vehicleInfo.license}}</div>
        </div>
      </div>
      <div class="content">
        <div class="detail-cell">
          <div class="t">车系<span>：</span></div>
          <div class="c">{{vehicleInfo.seriesName}}</div>
        </div>
        <div class="detail-cell">
          <div class="t">车型<span>：</span></div>
          <div class="c">{{vehicleInfo.modelName}}</div>
        </div>
        <div class="detail-cell">
          <div class="t">VIN码<span>：</span></div>
          <div class="c">{{vehicleInfo.vin}}</div>
        </div>
        <div class="detail-cell">
          <div class="t">里程数<span>：</span></div>
          <div class="c">{{vehicleInfo.mileage==null?'':vehicleInfo.mileage+ ' km'}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'DetailPanel',
    props: {
      vehicleInfo: {
        type: Object,
        default: {
          license: '',
          seriesName: '',
          modelName: '',
          vin: '',
          mileage: ''
        }
      }
    },
    methods: {
      test () {
        this.http.get('getVehicle', {id: 586}, res => {
          console.log('查询试乘试驾车 getVehicle', res)
          var arr = []
          if (res.resultCode == '1' && res.data) {
            console.log('添加试乘试驾车 成功')
          } else {
            alert(res.errMsg)
          }
        })
      }
    },
    mounted () {
      //this.test()
    }
  }
</script>

<style scoped lang="sass" type="text/scss">
  .detail-panel-wrap {
    position: relative;
    background-color: white;
    width: 80vw;
    border-radius: 8px;
    overflow: hidden;
    padding: 25px 25px;
    .detail-panel {
      font-size: 15px;
      color: #808080;
      .title {
        padding-bottom: 20px;
        border-bottom: 1px solid #E2E2E2;
      }
      .content {
        padding-top: 10px;
      }
      .detail-cell{
        display: flex;
        line-height: 27px;
        .t{
          width: 60px;
          display: flex;
          flex: 0 0 auto;
          justify-content: space-between;
        }
        .c{
          flex: 1 1 auto;
          color: #3E3E3E;
        }
      }
    }
  }

</style>
