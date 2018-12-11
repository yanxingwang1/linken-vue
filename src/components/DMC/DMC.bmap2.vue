<template>
    <div class="Bmap">
      <div id="bdMap"></div>
      <i alt="定位ico" class="myLocation iconfont" @click="myLocation">&#xe601;</i>
    </div>
</template>

<script>
    import {baiduKey} from '../config/variable';
    var map
    export default {
        name: 'bdMap',
        data () {
          return {
            ak:'baiduKey',
            zoom: 10,
            center:{
              lng: 121.529869,
              lat: 31.218055
            },
            marker:{
              conter:{
                lng: 121.523644,
                lat: 31.216488
              },
              keyword:'延安西路地铁站1号口',
              location:'上海',
              isShow: false
            },
            drivingShow: true ,
            transitShow: true ,
            walkingShow: true,
            infoWindow: {
              show: false,
              contents: '某经销商',
              title:''
            }


          }
        },
        components: {},
        props:[],
        methods: {
            init(){
              //map = new BMap.Map("bdMap");          // 创建地图实例
              //let point = new BMap.Point(this.center.lng, this.center.lat);  // 创建点坐标
              //let point = new BMap.Point(121.32982258849, 31.218179895385);  // 创建点坐标

              //map.centerAndZoom(point, 15);      // 初始化地图，设置中心点坐标和地图级别
              //this.newMark()
              //map.addControl(new BMap.GeolocationControl());  // 添加定位控件

var map = new BMap.Map("bdMap");
var point = new BMap.Point(116.404, 39.915);
map.centerAndZoom(point, 15);
window.setTimeout(function(){
    map.panTo(new BMap.Point(116.409, 39.918));
}, 2000);


            },
            myLocation(callback){   // 获取当前位置
              let location = new BMap.Geolocation()
              location.getCurrentPosition((getPoint)=>{
                console.log(getPoint)
                let _this = this
                this.center = getPoint.point
                let point = new BMap.Point(this.center.lng, this.center.lat)
                map.centerAndZoom(point, 15);
                map.addOverlay(new BMap.Marker(point)); // 创建标注
                console.log(point)
                map.panTo(new BMap.Point(this.center.lng, this.center.lat));
                map.setCenter(new BMap.Point(this.center.lng, this.center.lat));


                //map.panTo(point)

              },{enableHighAccuracy:true})

            },

            newMark(pt){  // 创建坐标点
              console.log(1)
              //let point = new BMap.Marker(pt.lng,pt.lat)
              map = new BMap.Map("bdMap");          // 创建地图实例
              let p = new BMap.Point(121.42982258849, 31.218179895385);  // 创建点坐标
              map.centerAndZoom(p, 15);
              var marker = new BMap.Marker(p);        // 创建标注
              map.addOverlay(marker);                     // 将标注添加到地图中

            },

            localMark(pt){  // 定位到地图中间
              console.log(2)
              let locationP = new BMap.Point(pt.lng,pt.lat);
              map.centerAndZoom(locationP, 15);
            },


            markerClick(){
                this.infoWindow.show = true
            },
            infoWindowClose (e) {
              this.infoWindow.show = false
              this.marker.isShow = false
            },
            infoWindowOpen (e) {
              this.infoWindow.show = true
            },
            navigation () {
              this.marker.isShow = true
            },
            getScript(){
              const $script = document.createElement('script')
              document.body.appendChild($script)
              $script.src = `http://api.map.baidu.com/api?v=2.0&ak=${this.ak}&callback=_initBaiduMap`
              this.init()
            }
        },
        created(){

        },
        beforeMount(){
            //todo

        },
        mounted(){
            //todo
          this.getScript();
        }
    }

</script>

<style lang="sass" scoped>
#bdMap,{
    width:100%;
    height:100%;
    overflow:hidden;


}
.Bmap{
    width:100%;
    height:500px;
    position: relative

  }
.myLocation{
  position: absolute;
  bottom:1rem;
  right:1rem;
  background:rgba(0,0,0,.4);
  border-radius:.7rem;
  width:1rem;
  line-height:1rem;
  font-size:.8rem;
  text-align: center;
  color:white;
  padding:.2rem;
}


</style>
