<!-- 页面模版 -->
<template>
    <!--container-->
    <div id="BMap">
    </div>

</template>
<script>

  export default {
    components: {
    },
    data: () => ({
      headerData: {
        title: '网点详情',
        toLink: '/SalesOutlets'
      }
    }),
    porps:[],
    created () {
      // 组件创建完后获取数据，这里和1.0不一样，改成了这个样子
      this.loadMap()
      // this.ready() // 如果在此处直接调用this.ready()方法，将无法加载地图
    },
    mounted () {
      this.ready()
    },
    methods: {
      loadMap: function () {
/*        console.log(this.$route.params.name)
        console.log(this.$route.params.addr)
        console.log(this.$route.params.phone)*/
        //setTimeout(this.ready, 0)
      },
      ready: function () {
        var map = new BMap.Map('BMap');
        var point = new BMap.Point(116.404, 39.915);  // 创建点坐标
        map.centerAndZoom(point, 10);                 // 初始化地图，设置中心点坐标和地图级别
        window.setTimeout(function(){                 // 默认平滑移动的原点
          map.panTo(new BMap.Point(116.409, 39.918));
        }, 2000);
          var marker = new BMap.Marker(point);        // 创建标注
        map.addOverlay(marker);                     // 将标注添加到地图中

        map.addControl(new BMap.NavigationControl());  // 放大缩小控件
        map.addControl(new BMap.ScaleControl());
        map.addControl(new BMap.OverviewMapControl());
        map.addControl(new BMap.MapTypeControl());    // 地图/卫星/三维
        map.enableScrollWheelZoom(true)
        console.log(map)

        var localSearch = new BMap.LocalSearch(map)
        // localSearch.enableAutoViewport() // 允许自动调节窗体大小
        map.clearOverlays() // 清空原来的标注
        localSearch.setSearchCompleteCallback(function (searchResult) {
          var poi = searchResult.getPoi(0)
          map.centerAndZoom(poi.point, 20)
          var point = new BMap.Point(poi.point.lng, poi.point.lat)
          var marker = new BMap.Marker(point) // 创建标注，为要查询的地方对应的经纬度
          map.addOverlay(marker)
        })
        //localSearch.search(this.$route.params.addr)
      }
    }
  }
</script>
<style>
  #BMap{
    width:100%;
    height:100%;
  }
  /* 去掉地图左下角的百度LOGO */
  .anchorBL {
    display:none
  }
</style>
