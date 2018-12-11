<template>
    <div id="bdMap">
      <baidu-map class="map" ak="ak" :center="center" @ready="mapReady" :zoom="zoom" :scroll-wheel-zoom="false" :continuous-zoom="true" :auto-resize="true">

<!--/*** 标记点 *****/-->
        <bm-marker @click="onPosition" :position="markerCenter.marker" :dragging="false" animation="BMAP_ANIMATION_DROP" >
         <bm-label
         :content="'<p class=marderContent>'+markerCenter.name1+'<span class=blue>'+markerCenter.name2+'</span></p>'"
          :offset="{width:-30,height:-38}"
          :position="markerCenter.marker === true ? markerCenter.marker : false"
          :labelStyle="{color: 'gray', fontSize : '.7rem', border:'none',borderRadius:'.2rem'}"
          title="Hover me"/>
        </bm-marker>

<!--/*** 定位 *****/-->
        <bm-geolocation
          anchor="BMAP_ANCHOR_BOTTOM_RIGHT"
          :locationIcon="locationIcon"
          :showAddressBar="true"
          :autoLocation="autoLocation"
          @locationError="locationError"
          @locationSuccess="locationSuccess">
        </bm-geolocation>

<!--/*** 导航 *****/-->
        <bm-view class="map">
        </bm-view>
        <bm-driving
          :start="initialCenter.marker"
          :end="nav.marker"
          :startCity="markerCenter.cityName"
          :endCity="markerCenter.cityName"
          :panel="false"
          :auto-viewport="true">
        </bm-driving>

      </baidu-map>
    </div>
</template>

<script>
  import {baiduKey} from '../config/variable';
  import {BaiduMap,BmGeolocation,BmMarker,BmLabel,BmInfoWindow,BmDriving,BmView} from 'vue-baidu-map';
    export default {
        name: 'bdMap',
        data () {
          return {
            ak:baiduKey,
            autoLocation:true,
            locationIcon:{
              url: "http://i-club.gmmc.com.cn/fs01/assets/v2/img/rescue/marker_red_sprite.png",
              size: {
                  width:20,
                  height:20
                }
            },
            zoom: 12,
            initialize: {
              lng: 121.42,
              lat: 31.21
            },
            center:{
              lng: 0,
              lat: 0
            },
            infoWindow: {
              show: false ,
              title:''
            },
            vary: true ,
            driving:{
              startName:"",
              endName:"",
              start: '',
              end: ''
            },
            initialCenter:{
              marker:{
                  lng: 0,
                  lat: 0
                },
              name:"我的位置",
            },
            dian:1
          }
        },
        components: {BaiduMap,BmGeolocation,BmMarker,BmLabel,BmInfoWindow,BmDriving,BmView },
        /*markerCenter:标记坐标点、nav:导航坐标点*/
        props:[ "markerCenter","sshow", "windowShow","nav"],
        methods: {
          mapReady () {
            const geolocation = new BMap.Geolocation();
            const that = this;
            geolocation.getCurrentPosition(function (location) {
              console.log(location);
              //Object.assign(that.center,location['point']);
              //Object.assign(that.center,location['point']);
              //Object.assign(that.initialize,location['point']);
              that.center = location['point']
              that.$emit('get-Data',location)
              that.initialCenter.marker = location['point']
            })
          },
          aa(){
            alert(11)
          },
          locationSuccess(geo){ // 重新定位
            let _this = this
            this.$emit('location-Data',geo)
            Object.assign(this.center,geo['point']);
            Object.assign(this.initialCenter.marker,geo['point']);
          },
          locationError(StatusCode){
            console.log(StatusCode);
          },
          onPosition(event){
            //console.log(event)
            //Object.assign(this.center,this.markerCenter.marker);
            console.log(11111111111)
          },
          infoWindowClose (e) {
          },
          infoWindowOpen (e) {
            //this.infoWindow.show = !this.infoWindow.show
          },
          navigation (){
            this.driving = this.nav
            console.log(this.driving)
          },

        },
        watch:{
          sshow:function(newValue, oldValue){
            //console.log(newValue, oldValue)
            //this.vary = !this.vary
            this.center=this.markerCenter.marker
            //this.zoom = this.zoom++
          },
        }

    }

</script>

<style lang="sass" scoped>
#bdMap{
  width:100%;
  height:100%;
  overflow:hidden;
  .map{
    width:100%;
    height:100%;
  }
}

.marderContent{
  padding:.2rem .5rem;
  border-radius:.2rem;
  background-color:white;
  font-size:.7rme;
  color:gray;
  display:block;
}


</style>
