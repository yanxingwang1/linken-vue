<template>
  <div class="index" @touchmove.prevent>
    <div id="amap-container"></div>
    <select-view v-show="show" @change="searchActive" @city-change="cityChange" :city-info="cityInfo"></select-view>
    <search-list :search-list="searchList" @list-cell-on-click="listCellOnClick"></search-list>
    <address-panel :address-info="addressInfo" @confirm="confirmBtnHandleClick"></address-panel>
  </div>
</template>

<script>

  import SelectView from './components/SelectView'
  import SearchList from './components/SearchList'
  import AddressPanel from './components/AddressPanel'
  import {Indicator, Toast} from "mint-ui"

  let aMap, autocomplete, positionPicker

  export default {
    name: 'map-select-address',
    components: {
      AddressPanel,
      SelectView, SearchList, Indicator, Toast
    },
    data() {
      return {
        show: false,
        searchList: [],//搜索结果列表
        addressInfo: {},//拖拽选址结果
        cityInfo: { //城市选择结果
          adcode: "110000",
          areaCode: "010", //控制搜索查询范围
          lat: 39.904989,
          lng: 116.405285,
          name: "北京市", //控制搜索查询范围
          spell: "Beijing",
        },
      }
    },
    directives: {},
    watch: {},
    methods: {
      //确定地址事件
      confirmBtnHandleClick() {
        const {addressInfo} = this
        console.log('确定地址', addressInfo)
        //保存 到sessionStorage
        sessionStorage.setItem(`${this.$route.query.from}SelectAddress`, addressInfo.address)
        this.$router.back(-1)
      },
      //搜索地址按钮点击
      searchActive(keyword) {
        if (!keyword) {
          Toast('请输入搜索内容');
          return
        }
        Indicator.open({
          spinnerType: "triple-bounce"
        });
        const {areaCode, name} = this.cityInfo
        autocomplete = new AMap.Autocomplete({
          city: areaCode || name,
          citylimit: true
        });
        autocomplete.search(keyword, (status, result) => {
          setTimeout(() => {
            Indicator.close()
            if (status === 'complete') {
              console.log('搜索结果', status, result)
              result.tips.length = 5
              this.searchList = result.tips

            } else if (status === 'no_data') {
              console.log('搜索没有匹配到结果', status, result)
              Toast('没有搜索到相关地址')
            } else {
              console.log('搜索出错', status, result)
              Toast('服务器开小差了');
            }
          }, 300)
        })
      },
      //城市选择发生改变
      cityChange(cityInfo) {
        console.log('城市选择发生改变')
        this.searchList = []
        this.cityInfo = cityInfo
        aMap.setCity(cityInfo.adcode)
      },
      //搜索结果 列表点击事件
      listCellOnClick(tip) {
        this.searchList = []
        console.log('list-cell-on-click', tip)
        if (tip.location) {
          const {lng, lat} = tip.location
          console.log('经纬度', lng, lat)
          aMap.setZoomAndCenter(16, [lng, lat])
        } else {
          const {adcode} = tip
          console.log('行政区', adcode)
          aMap.setCity(adcode)
        }
      },
      //初始化地图
      initAmap() {
        const {cityInfo} = this
        aMap = new AMap.Map('amap-container', {
          zoom: 10,
          resizeEnable: true
        });
        aMap.on("complete", () => {
          aMap.getCity(({province, city, citycode, district}) => {
            const {lat, lng} = aMap.getCenter()
            this.cityInfo = {
              adcode: '',
              areaCode: citycode,
              lat,
              lng,
              name: province,
              spell: "",
            }
            this.show = true
            this.aMapGeolocation()
          })
          this.initPositionPicker()
        })


      },
      //精确定位  预留的
      aMapGeolocation() {
        AMap.plugin('AMap.Geolocation', () => {
          var geolocation = new AMap.Geolocation({
            enableHighAccuracy: true,
            buttonOffset: new AMap.Pixel(10, 20),
            zoomToAccuracy: true,
            buttonPosition: 'RB'
          })
          geolocation.getCurrentPosition()
          AMap.event.addListener(geolocation, 'complete', onComplete)
          AMap.event.addListener(geolocation, 'error', onError)

          function onComplete(data) {
            // data是具体的定位信息
            console.log('具体的定位信息', data)
            // $.toast('定位成功')
            //设置中心点
            const {lat, lng} = data.position
            const {citycode, adcode, province} = data.addressComponent
            // aMap.setCenter(data.position)
            // aMap.setZoom(16)
            aMap.setZoomAndCenter(16, data.position)
            this.cityInfo = {
              adcode: adcode,
              areaCode: citycode,
              lat,
              lng,
              name: province,
              spell: "",
            }
          }

          function onError(data) {
            // 定位出错
            console.log('定位出错', data)
            // $.toast('定位出错')
          }
        })
      },
      //输入提示功能
      initAutocomplete() {
        autocomplete = new AMap.Autocomplete();
      },
      //拖拽选址
      initPositionPicker() {
        AMapUI.loadUI(['misc/PositionPicker'], (PositionPicker) => {
          positionPicker = new PositionPicker({
            mode: 'dragMap',//设定为拖拽地图模式，可选'dragMap'、'dragMarker'，默认为'dragMap'
            map: aMap//依赖地图对象
          });
          positionPicker.start();
          positionPicker.on('success', (positionResult) => {
            console.log('拖拽选址 当前地址', positionResult)
            this.addressInfo = positionResult
          });
          positionPicker.on('fail', (positionResult) => {
            // 海上或海外无法获得地址信息
            console.log('拖拽选址 无法获得当前地址')
          });

        });
      },
    },
    beforeMount() {
      $(document).attr('title', '地图选址')
    },
    mounted() {
      window.app = this
      this.initAmap()
      //
      const from = this.$route.query.from
      console.log('来自', from)
    }
  }
</script>

<style lang="sass" type="text/scss" rel="stylesheet/scss" scoped>
  .index {
    width: 100%;
    height: 100%;
  }

  #amap-container {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }
</style>
