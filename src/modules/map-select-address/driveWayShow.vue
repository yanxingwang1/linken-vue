<template>
  <div class="drive-way-show-index" @touchmove.prevent>
    <div id="amap-container-test"></div>
    <drawer-view>
      <div>测试</div>
    </drawer-view>
  </div>
</template>

<script>

  import DrawerView from './components/DrawerView'

  let aMap

  export default {
    name: 'map-show-way',
    components: {
        DrawerView
    },
    props: {
        pointList:{
            type: Array,
            default: () => {
                var list = [{longitude:121.104558,latitude:31.151762},
                            {longitude:121.105019,latitude:31.151172},
                            {longitude:121.105993,latitude:31.150203},
                            {longitude:121.107766,latitude:31.151507},
                            {longitude:121.108168,latitude:31.151479},
                            {longitude:121.109576,latitude:31.151493},
                            {longitude:121.109893,latitude:31.151286},
                            {longitude:121.111025,latitude:31.152440},
                            {longitude:121.111191,latitude:31.152573},
                            {longitude:121.111360,latitude:31.152623},
                            {longitude:121.112996,latitude:31.152545},
                            {longitude:121.113264,latitude:31.152500},
                            {longitude:121.114769,latitude:31.151787},
                            {longitude:121.114168,latitude:31.150970},
                            {longitude:121.115179,latitude:31.150901},
                            {longitude:121.117008,latitude:31.150598},
                            {longitude:121.116628,latitude:31.148858},
                            {longitude:121.116544,latitude:31.148530},
                            {longitude:121.116526,latitude:31.148355},
                            {longitude:121.119087,latitude:31.148549},
                            {longitude:121.119757,latitude:31.148618},
                            {longitude:121.122155,latitude:31.149073},
                            {longitude:121.124038,latitude:31.149487},
                            {longitude:121.124918,latitude:31.149735},
                            {longitude:121.126538,latitude:31.150460},
                            {longitude:121.125873,latitude:31.131038},
                            // {longitude:121.124038,latitude:31.149487},
                            // {longitude:121.124038,latitude:31.149487},
                            {longitude:121.423682,latitude:31.211682}]
                return list;
            }
        }
    },
    data() {
      return {
      }
    },
    directives: {},
    watch: {},
    methods: {
      //初始化地图
      initAmap() {
        aMap = new AMap.Map('amap-container-test', {
          zoom: 10,
          resizeEnable: true,
          autoFitView: true
        });
        aMap.plugin('AMap.Driving', () => {
            var driving = new AMap.Driving({
                // map: aMap,
                // 驾车路线规划策略，AMap.DrivingPolicy.LEAST_TIME是最快捷模式
                policy: AMap.DrivingPolicy.LEAST_TIME,
                // panel: 'panel-test'
            })

            var startLngLat = [this.pointList[this.pointList.length-2].longitude,this.pointList[this.pointList.length-2].latitude];
            var endLngLat = [this.pointList[this.pointList.length-1].longitude,this.pointList[this.pointList.length-1].latitude];

            driving.search(startLngLat, endLngLat,
                (status, result) => {
                    if (status === 'complete') {
                        if (result.routes && result.routes.length) {
                            // 绘制第一条路线，也可以按需求绘制其它几条路线
                            this.drawRoute(result.routes[0])
                        }
                    } else {
                        console.log('获取驾车数据失败：' + result)
                    }
                }
            )
        })
        AMapUI.load(['ui/misc/PathSimplifier', 'lib/$'], (PathSimplifier, $) => {
            if (!PathSimplifier.supportCanvas) {
                alert('当前环境不支持 Canvas！');
                return;
            }

            var defaultRenderOptions = {
                renderAllPointsIfNumberBelow: -1, //绘制路线节点，如不需要可设置为-1
                pathTolerance: 0,
                pathLineSelectedStyle: {
                    lineWidth: 5,
                    strokeStyle: '#ACACAC',
                    borderWidth: 3,
                    borderStyle: '#ACACAC',
                    dirArrowStyle: false
                },
                startPointStyle: {
                    radius: 0,
                    fillStyle: '#109618',
                    lineWidth: 0,
                    strokeStyle: '#eeeeee'
                },
                endPointStyle: {
                    radius: 5,
                    fillStyle: '#B45F1A',
                    lineWidth: 1,
                    strokeStyle: '#B45F1A'
                },
            }

            var pathSimplifierIns = new PathSimplifier({
                zIndex: 100,
                //autoSetFitView:false,
                map: aMap, //所属的地图实例

                getPath: (pathData, pathIndex) => {

                    var points = pathData.points,
                        lnglatList = [];

                    for (var i = 0, len = points.length; i < len; i++) {
                        lnglatList.push(points[i].lnglat);
                    }

                    return lnglatList;
                },
                getHoverTitle: (pathData, pathIndex, pointIndex) => {
                    return null;
                    // if (pointIndex >= 0) {
                    //     //point
                    //     return pathData.name + '，' + pathData.points[pointIndex].name;
                    // }

                    // return pathData.name + '，点数量' + pathData.points.length;
                },
                renderOptions: defaultRenderOptions
            });

            window.pathSimplifierIns = pathSimplifierIns;

            var pointsList = []
            for(var i = 0;i<this.pointList.length-1;i++) {
                var item = {lnglat:[this.pointList[i].longitude,this.pointList[i].latitude]};
                pointsList.push(item);
            }
            //设置数据
            pathSimplifierIns.setData([{
                points: pointsList
            }]);
             //选中路线0
            pathSimplifierIns.setSelectedPathIndex(0);


            aMap.setCenter([this.pointList[this.pointList.length-2].longitude,this.pointList[this.pointList.length-2].latitude]); //设置地图中心点
            // pathSimplifierIns.on('pointClick', function(e, info) {

            //     console.log('Click: ' + info.pathData.points[info.pointIndex].name);
            // });
        })

        AMapUI.loadUI(['overlay/SimpleMarker'], (SimpleMarker) => {


            new SimpleMarker({
                // iconLabel: '1',
                //自定义图标地址
                iconStyle: 'https://webapi.amap.com/theme/v1.3/markers/n/start.png',

                //设置基点偏移
                // offset: new AMap.Pixel(-19, -60),

                map: aMap,

                showPositionPoint: false,
                position: [this.pointList[0].longitude,this.pointList[0].latitude],
                zIndex: 100
            });
        })

      },
      drawRoute(route) {
            var path = this.parseRouteToPath(route)

            var startMarker = new AMap.Marker({
                position: path[0],
                icon: 'https://webapi.amap.com/theme/v1.3/markers/n/start.png',
                map: aMap
            })

            var endMarker = new AMap.Marker({
                position: path[path.length - 1],
                icon: 'https://webapi.amap.com/theme/v1.3/markers/n/end.png',
                map: aMap
            })

            var routeLine = new AMap.Polyline({
                path: path,
                isOutline: true,
                outlineColor: '#B45F1A',
                borderWeight: 3,
                strokeWeight: 5,
                strokeColor: '#B45F1A',
                lineJoin: 'round'
            })

            routeLine.setMap(aMap)

            // 调整视野达到最佳显示区域
            aMap.setFitView([ startMarker, endMarker, routeLine ])
        },
        parseRouteToPath(route) {
            var path = []

            for (var i = 0, l = route.steps.length; i < l; i++) {
                var step = route.steps[i]

                for (var j = 0, n = step.path.length; j < n; j++) {
                path.push(step.path[j])
                }
            }

            return path
        }
    },
    beforeMount() {
      $(document).attr('title', '地图选址')
    },
    mounted() {
      window.app = this
      this.initAmap()
      //
    }
  }
</script>

<style lang="sass" type="text/scss" rel="stylesheet/scss" scoped>
  .drive-way-show-index {
    width: 100%;
    height: 100%;
  }

  #amap-container-test {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }
</style>
