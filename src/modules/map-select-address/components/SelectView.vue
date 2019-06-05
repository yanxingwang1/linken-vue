<template>
  <div class="select-address-wrap">
    <div class="select-address-inner">
      <div class="address" @click="showCityPicker">{{cityInfo.name}}</div>
      <div class="input-wrap">
        <input type="text" v-model="keyword" style="border: none;">
      </div>
      <div @click="$emit('change',keyword)" class="seach-btn">搜索</div>
    </div>
  </div>
</template>

<script>
  let cityPicker
  export default {
    name: "SelectView",
    data() {
      return {
        keyword: ''
      }
    },
    props: {
      cityInfo: {
        type: Object,
      }
    },
    watch: {
      keyword(value) {
        console.log('keyword change', value)
        if (value !== ''){
          this.$emit('change', value)
        }
      }
    },
    mounted() {
      this.initMobiCityPicker()
    },
    methods: {
      //初始化城市选择
      initMobiCityPicker() {
        AMapUI.loadUI(['misc/MobiCityPicker'], (MobiCityPicker) => {
          //加载 MobiCityPicker
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
            this.$emit('city-change', cityInfo)
            // aMap.setCity(cityInfo.adcode);
            // this.cityName = cityInfo.name
            // this.$refs.searchInput.value = ''
          });
        });
      },
      showCityPicker() {
        cityPicker.show()
      }
    }
  }
</script>

<style scoped lang="sass" type="text/scss">
  @function px($px) {
    @return ($px/20)+rem;
  }

  .select-address-wrap {
    font-size: px(16);
    position: absolute;
    top: px(20);
    width: 100%;
    height: px(50);
    padding: 0 px(15);

    .select-address-inner {
      height: px(50);
      background-color: #ffffff;
      border-radius: 3px;
      display: flex;
      align-items: center;
      box-shadow: 4px 3px 5px rgba(0, 0, 0, .2);

      > div {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
      }

      .address {
        position: relative;
        flex: 0 1 px(80);

        &::after {
          position: absolute;
          display: inline-block;
          content: '';
          right: px(5);
          width: 1px;
          height: px(20);
          background-color: black;
        }
      }

      .input-wrap {
        justify-content: left;
        flex: 1;
        padding-left: px(5);
      }

      .seach-btn {
        flex: 0 1 px(60);
      }
    }
  }
</style>
