/**
 * Created by wdf on 2017/6/5.
 * 常用工具类
 */

class Util {
  constructor() {
    const VERSION = "v1.0.1";
  }

  transGetParams(_params) {
    //OBEJCT格式处理成get方式所需要的数据格式，统一传递的参数都为JSON对象
    let _resultParams = "?";
    let _count = 0;
    for (let _key in _params) {
      _resultParams += (_count === 0 ? '' : '&') + _key + '=' + _params[_key];
      ++_count;
    }
    return _resultParams;
  }

  getQueryValue(name) {
    let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    let subString = location.href.split('?')[1] || '';
    let r = subString.match(reg);
    if (r != null) return decodeURI(r[2]);
    return null;
  }

  getQueryWeChatValue(name) {
    let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    let subString = location.href.split('#/index?')[1] || '';
    let r = subString.match(reg);
    if (r != null) return decodeURI(r[2]);
    return null;
  }

  getMutiQueryValue(_arr = []) {
    let resultObj = {};
    _arr.forEach((item, index) => {
      resultObj[item] = this.getQueryValue(item);
    })

    return resultObj;
  }

  getRootPath(_substring) {
    let currentPath = window.document.location.href;
    let pathName = window.document.location.pathname;
    let pos = currentPath.indexOf(pathName);
    let localhostPaht = currentPath.substring(0, pos);
    return (localhostPaht + '/' + _substring + '/');
  }

  // 对webview进行区别
  isAPP(device) { // Android or IOS
    var u = navigator.userAgent,
      app = navigator.appVersion;
    var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1;
    var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
    var result;
    device === "Android" ? result = isAndroid : !1;
    device === "IOS" ? result = isIOS : !1;
    !device ? result = !isIOS && !isAndroid : !1;
    return result;
  }
  //进行经纬度转换为距离的计算

  rad(d) {
    return d * Math.PI / 180.0; //经纬度转换成三角函数中度分表形式。
  }
  //计算距离，参数分别为第一点的纬度，经度；第二点的纬度，经度
  getDistance(lat1, lng1, lat2, lng2) {

    var radLat1 = this.rad(lat1);
    var radLat2 = this.rad(lat2);
    var a = radLat1 - radLat2;
    var b = this.rad(lng1) - this.rad(lng2);
    var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) +
      Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)));
    s = s * 6378.137; // EARTH_RADIUS;
    s = Math.round(s * 10000) / 10000; //输出为公里
    //s=s.toFixed(4);
    return s;
  }


  siledelate() {

    //侧滑显示删除按钮
    var expansion = null; //是否存在展开的list
    var container = document.querySelectorAll('.siledelate');
    // var container = this.$refs.siledelate;
    for (var i = 0; i < container.length; i++) {
      var x, y, X, Y, swipeX, swipeY;
      container[i].addEventListener('touchstart', function (event) {
        x = event.changedTouches[0].pageX;
        y = event.changedTouches[0].pageY;
        swipeX = true;
        swipeY = true;
        if (expansion) { //判断是否展开，如果展开则收起
          // debugger
          setTimeout(()=>{
            expansion.className = "list siledelate";
          },200)
        }
      });
      container[i].addEventListener('touchmove', function (event) {
        X = event.changedTouches[0].pageX;
        Y = event.changedTouches[0].pageY;
        // 左右滑动
        if (swipeX && Math.abs(X - x) - Math.abs(Y - y) > 0) {
          // 阻止事件冒泡
          event.stopPropagation();
          if (X - x > 10) { //右滑

            event.preventDefault();
            this.className = "list siledelate"; //右滑收起
          }
          if (x - X > 10) { //左滑

            event.preventDefault();
            this.className = "list siledelate swipeleft"; //左滑展开
            expansion = this;
          }
          swipeY = false;
        }
        // 上下滑动
        if (swipeY && Math.abs(X - x) - Math.abs(Y - y) < 0) {
          swipeX = false;
        }
      });
    }
  }
}


export default new Util();
