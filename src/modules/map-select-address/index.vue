<template>
  <div class="index">
    <div class="address-wrap">
      <div @click="showCityPickerView" class="address-txt">
        <span>{{cityName}}</span>
      </div>
      <div class="address-input-wrap">
        <input ref="searchInput" type="text" id="searchInput" placeholder="请输入地址">
        <div id="searchResults"></div>
      </div>
      <div @click="okBtnHandleClick" class="ok-wrap">
        确定
      </div>
    </div>
    <div id="amap-container">

    </div>

  </div>
</template>

<script>
  import util from '../../common/DMC.util'
  // import {Popup, MessageBox} from 'mint-ui'
  //http://localhost:8000/modules/trydrivercar

  let aMap, cityPicker, positionPicker, poiPicker, infoWindow

  export default {
    name: 'map-select-address',

    components: {},
    created() {
      end_time = new Date().getTime()
      console.log('index加载时间：', end_time - start_time, 'ms')
    },
    beforeDestroy() {
      clearInterval(this.timer)
    },
    data() {
      return {
        cityName: '',
        resAddress: ''
      }
    },
    directives: {},
    watch: {},
    methods: {
      okBtnHandleClick() {
        const {resAddress} = this
        alert(`你选择的地点是：${resAddress}`)
      },
      initAmap() {
        aMap = new AMap.Map('amap-container', {
          zoom: 10,
          resizeEnable: true
        });
        aMap.on("complete", () => {
          aMap.getCity(result => {
            this.cityName = result.province
          })
          this.initAMapUI()
        })
      },
      //初始化高德 UI
      initAMapUI() {
        //设置DomLibrary
        AMapUI.setDomLibrary(jQuery);
        //AMapUI
        AMapUI.loadUI(['misc/MobiCityPicker', 'misc/PositionPicker', 'overlay/SimpleInfoWindow'], (MobiCityPicker, PositionPicker, SimpleInfoWindow) => {
          //加载PositionPicker
          positionPicker = new PositionPicker({
            mode: 'dragMap',//设定为拖拽地图模式，可选'dragMap'、'dragMarker'，默认为'dragMap'
            map: aMap//依赖地图对象
          });
          //TODO:事件绑定、结果处理等
          positionPicker.on('success', (positionResult) => {
            console.log('PositionPicker success', positionResult)
            const {position, address, nearestJunction, nearestRoad, nearestPOI} = positionResult
            this.resAddress = address
            infoWindow = new SimpleInfoWindow({
              infoTitle: '<strong>目标地点</strong>',
              infoBody: `<div>${address}</div>`,
              //基点指向marker的头部位置
              offset: new AMap.Pixel(0, -31)
            });
            infoWindow.open(aMap, position);
          });
          positionPicker.on('fail', (positionResult) => {
            console.log('PositionPicker fail', positionResult)
          });
          positionPicker.start();

          //加载MobiCityPicker
          cityPicker = new MobiCityPicker({
            //topGroups: ..., // 顶部城市列表
          });
          //监听城市选中事件
          cityPicker.on('citySelected', (cityInfo) => {
            //隐藏城市列表
            cityPicker.hide();
            //选中的城市信息
            console.log(cityInfo);
            //地图显示到当前城市
            aMap.setCity(cityInfo.adcode);
            this.cityName = cityInfo.name
            this.$refs.searchInput.value = ''
          });


          //搜索 输入提示
          var auto = new AMap.Autocomplete({
            input: "searchInput"
          });

          var placeSearch = new AMap.PlaceSearch({
            map: aMap
          });
          //构造地点查询类
          //注册监听，当选中某条记录时会触发
          AMap.event.addListener(auto, "select", e => {
            console.log('placeSearch select', e)
            const {location, adcode, name} = e.poi
            if (location) {
              aMap.setCenter(e.poi.location);
              aMap.setZoom(17)
            } else {
              aMap.setCity(adcode)
            }
          });

        });
      },
      //显城市选择组件
      showCityPickerView() {
        cityPicker.show()
      }
    },
    beforeMount() {
      $(document).attr('title', '地图选址')
    },
    mounted() {
      window.app = this
      this.initAmap()

    }
  }
</script>

<style lang="sass" type="text/scss" rel="stylesheet/scss" scoped>
  /*.index {*/
  /*position: absolute;*/
  /*top: 0;*/
  /*right: 0;*/
  /*bottom: 0;*/
  /*left: 0;*/
  /*}*/
  .address-wrap {
    height: 50px;
    display: flex;

    .address-txt {
      display: flex;
      justify-content: center;
      align-items: center;
      flex: 1;
    }

    .address-input-wrap {
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      flex: 3;

      #searchInput {
        width: 95%;
        height: 100%;
        border: none;
      }

      #searchResults {
        display: none;
      }
    }

    .ok-wrap {
      display: flex;
      justify-content: center;
      align-items: center;
      flex: 1;
    }
  }

  #amap-container {
    position: absolute;
    top: 50px;
    right: 0;
    bottom: 0;
    left: 0;
  }
</style>
