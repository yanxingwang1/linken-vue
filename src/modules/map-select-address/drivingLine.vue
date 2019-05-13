<template>
  <div class="index">
    <div v-if="isDrawer" id="amap-container"></div>
    <drawer-view :is-drawer="isDrawer" title-text="哈哈哈" :body-init-height="200" @drawerStart="drawerStart" @drawerEnd="drawerEnd">
      <div style="height: 200px;background: lightblue;">1</div>
      <div style="height: 200px;background: aquamarine;">2</div>
      <div style="height: 200px;background: darkgray;">3</div>
      <div style="height: 200px;background: yellowgreen;">4</div>
    </drawer-view>
  </div>
</template>

<script>
  import DrawerView from './components/DrawerView'
  const drivingLine = require('./script/drivingLine')
  const testArr = [[121.423393, 31.211748], [121.425972, 31.210045], [121.428909, 31.210487], [121.430916, 31.212656], [121.434464, 31.214918], [121.438469, 31.217804], [121.442772, 31.219658], [121.447235, 31.221125], [121.45369, 31.223351], [121.461395, 31.223871], [121.466743, 31.223734], [121.474792, 31.226597], [121.480835, 31.2299], [121.483376, 31.230824], [121.487389, 31.230728], [121.493073, 31.233278], [121.500496, 31.238016], [121.504807, 31.236597], [121.50927, 31.236986], [121.511292, 31.235538]]

  export default {
    name: 'drivingLine',
    components: {
      DrawerView
    },
    data() {
      return {
        isDrawer: true,//是否显示抽屉
        startPos: null,//起点
        endPos: null,//终点
        currentPos: null,//途径点
        drivingPos: null,//司机坐标
      }
    },
    directives: {},
    watch: {},
    methods: {
      drawerStart(f){
        console.log('drawerStart',f)
      },
      drawerEnd(d){
        console.log('drawerEnd',d)
      },
      initData() {
        this.startPos = [121.423596, 31.211773]
        this.endPos = [121.510652, 31.235425]
        this.drivingPos = [121.423596, 31.211773]
        this.currentPos = []
      },
      //初始化地图
      initAmap() {
        drivingLine.initMap(() => {
          this.initData()
          //模拟更新数据
          let index = 1
          const timer = setInterval(() => {
            const arr = [...testArr]
            arr.length = index
            this.drivingPos = arr[arr.length - 1]
            this.currentPos = arr
            drivingLine.createLine(this.startPos, this.endPos, [...this.currentPos, this.drivingPos])
            index += 1
            if (index === 21) {
              clearInterval(timer)
            }
          }, 2000)
          drivingLine.createLine(this.startPos, this.endPos, [...this.currentPos, this.drivingPos])
        })
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
