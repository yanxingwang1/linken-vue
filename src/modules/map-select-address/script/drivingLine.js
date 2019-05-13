let aMap
let startMarker = null  //起点
let endMarker = null   //终点
let curMarker = null   //司机点
let circleMarker = null    //司机光环
let routeLine = null  //全部路线
let routeLine2 = null  //已经过路线

export const initMap = (callback) => {
  $('#amap-container').on('touchmove',(e)=>{e.preventDefault()})
  aMap = new AMap.Map('amap-container', {
    zoom: 10,
    resizeEnable: true
  });
  aMap.on("complete", () => {
    callback()
  })
}

/**
 * 生成一条 路线
 * @param start 起点
 * @param end 终点
 * @param currents 途径点
 */
export const createLine = (start, end, currents) => {
  var driving = new AMap.Driving({
    // 驾车路线规划策略
    policy: AMap.DrivingPolicy.LEAST_TIME, //最快捷模式
  })

  var startLngLat = start
  var endLngLat = end

  driving.search(startLngLat, endLngLat, {
    waypoints: currents
  }, (status, result) => {
    console.log(status, result)
    // 未出错时，result即是对应的路线规划方案
    if (status === 'complete' && result.info === 'OK') {
      if (result.routes && result.routes.length) {
        // 绘制第一条路线，也可以按需求绘制其它几条路线
        drawRoute(result.routes[0])
      }
    }
  })

  //绘制路线
  function drawRoute(route) {
    var path = parseRouteToPath(route)
    var path2 = parseRouteToPath2(path)
    //起点标点
    if (!startMarker) {
      startMarker = new AMap.Marker({
        position: path[0],
        anchor: 'center',
        offset: new AMap.Pixel(0, -18),
        icon: 'https://zhoujie16.gitee.io/static/assets/images/lk-p1.png',
        map: aMap
      })
    }
    //终点标点
    if (!endMarker) {
      endMarker = new AMap.Marker({
        position: path[path.length - 1],
        anchor: 'center',
        offset: new AMap.Pixel(0, -18),
        icon: 'https://zhoujie16.gitee.io/static/assets/images/lk-p2.png',
        map: aMap
      })
    }
    //司机标点
    if (!curMarker) {
      curMarker = new AMap.Marker({
        position: path2[path2.length - 1],
        anchor: 'center',
        offset: new AMap.Pixel(0, -23),
        icon: 'https://zhoujie16.gitee.io/static/assets/images/lk-p3.png',
        map: aMap
      })
    } else {
      curMarker.setPosition(path2[path2.length - 1])
    }
    //司机光环
    if (!circleMarker) {
      circleMarker = new AMap.CircleMarker({
        center: path2[path2.length - 1],
        radius: 38,//3D视图下，CircleMarker半径不要超过64px
        strokeOpacity: 0,
        fillColor: '#FF7200',
        fillOpacity: 0.3,
      })
      circleMarker.setMap(aMap)
    } else {
      circleMarker.setCenter(path2[path2.length - 1])
    }

    //绘制全部路线
    if (!routeLine) {
      routeLine = new AMap.Polyline({
        path: path,
        borderWeight: 0,
        strokeWeight: 8,
        strokeColor: '#B45F1A',
        lineJoin: 'round',
        lineCap: 'round'
      })
      routeLine.setMap(aMap)
    } else {
      routeLine.setPath(path)
    }
    //绘制 已经过路线
    if (!routeLine2) {
      routeLine2 = new AMap.Polyline({
        path: path2,
        borderWeight: 0,
        strokeWeight: 8,
        strokeColor: '#ACACAC',
        lineJoin: 'round',
        lineCap: 'round'
      })
      routeLine2.setMap(aMap)
    } else {
      routeLine2.setPath(path2)
    }
    // 调整视野达到最佳显示区域
    aMap.setFitView([startMarker, endMarker, routeLine])
    // 解析DrivingRoute对象，构造成AMap.Polyline的path参数需要的格式
    // DrivingResult对象结构参考文档 https://lbs.amap.com/api/javascript-api/reference/route-search#m_DriveRoute
    function parseRouteToPath(route) {
      var path = []
      for (var i = 0, l = route.steps.length; i < l; i++) {
        var step = route.steps[i]
        for (var j = 0, n = step.path.length; j < n; j++) {
          path.push(step.path[j])
        }
      }
      // const aaa = []
      // for (let i = 0; i < 20; i++) {
      //   const {lng, lat} = path[10 * i]
      //   aaa.push([lng, lat])
      // }
      // console.log(JSON.stringify(aaa))
      return path
    }

    function parseRouteToPath2(path) {
      const aaa = path.map((item) => {
        const {lng, lat} = item
        // console.log(lng, lat)
        return geoDistance([lng, lat], currents[currents.length - 1])
      })
      const min = Math.min(...aaa)
      const minIndex = aaa.indexOf(min)
      // console.log(minIndex)
      const path2 = [...path]
      path2.length = minIndex + 1
      return path2
    }
  }

  //计算 经纬度 之间距离
  function geoDistance([lng1, lat1], [lng2, lat2]) {
    function rad(d) {
      return d * Math.PI / 180.0;
    }

    let radLat1 = rad(lat1);
    let radLat2 = rad(lat2);
    let a = radLat1 - radLat2;
    let b = rad(lng1) - rad(lng2);
    let s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)));
    s = s * 6378.137;// EARTH_RADIUS;
    s = Math.round(s * 10000) / 10; //输出为 米
    return s;
  }


}
