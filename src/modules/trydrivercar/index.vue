<template>
  <div class="index">
    <div class="index-bd">
      <div class="scroll-view" :class="{empty:vehicleList.length==0}">
        <mescroll-vue ref="mescroll" :down="mescrollDown" :up="mescrollUp" @init="mescrollInit">
          <div id="empty-wrap"></div>
          <ListCell
            v-for="(item,i) in vehicleList"
            :key="i"
            :vehicle="item"
            :index="i"
            @click.native="cellHandClick(item)"
            @updateVehicleList="updateVehicleList"
          ></ListCell>
        </mescroll-vue>
      </div>
    </div>
    <mt-popup v-model="addPopupVisible" position="bottom">
      <div class="add-car-panel-wrap" @touchmove="touchmovetest">
        <add-car-panel @saveVehicleListSuccess="saveVehicleListSuccess"></add-car-panel>
      </div>
    </mt-popup>
    <div class="index-ft">
      <wx-button @click.native="addCarHandClick">添加试乘试驾车</wx-button>
    </div>
    <mt-popup v-model="detailPopupVisible">
      <div class="car-detail-panel">
        <detail-panel :vehicleInfo="vehicleInfo"></detail-panel>
      </div>
    </mt-popup>
  </div>
</template>

<script>
import util from "../../common/DMC.util";
import { Popup, MessageBox } from "mint-ui";
import { Confirm } from "vux";
import ListCell from "./components/ListCell";
import AddCarPanel from "./components/AddCarPanel";
import DetailPanel from "./components/DetailPanel";
import WxButton from "./../../components/WxButton";
import MescrollVue from "mescroll.js/mescroll.vue";
//http://localhost:8000/modules/trydrivercar.html#/index?mobile=13156671556&userid=QianKun

export default {
  name: "index",
  created() {
    end_time = new Date().getTime();
    console.log("index加载时间：", end_time - start_time, "ms");
  },
  beforeDestroy() {
    clearInterval(this.timer);
  },
  data() {
    return {
      mescroll: null,
      mescrollDown: {
        // use: false
      },
      mescrollUp: {
        page: {
          num: 0, //当前页 默认0,回调之前会加1; 即callback(page)会从1开始
          size: 10 //每页数据条数,默认10
        },
        callback: this.scrollUpAction,
        noMoreSize: 5,
        empty: {
          //列表第一页无任何数据时,显示的空提示布局; 需配置warpId才显示
          warpId: "empty-wrap", //父布局的id (1.3.5版本支持传入dom元素)
          icon: require("./imgs/dd@3x.png"), //"../imgs/dd@3x.png", //图标,默认null,支持网络图
          tip: "您还没有添加试乘试驾车" //提示
        },
        htmlNodata: '<p class="upwarp-nodata">——END——</p>'
      },
      addPopupVisible: false,
      detailPopupVisible: false,
      //列表数据源
      vehicleList: [],
      //车辆信息 弹窗数据源
      vehicleInfo: {}
    };
  },
  directives: {},
  watch: {},
  methods: {
    cellHandClick(item) {
      console.log("handClick", item);
      this.vehicleInfo = item;
      this.detailPopupVisible = !this.detailPopupVisible;
    },
    addCarHandClick() {
      this.addPopupVisible = !this.addPopupVisible;
    },
    scrollUpAction(page, mescroll) {
      console.log("scrollUpAction", page);
      this.getVehicle(page)
        .then(arr => {
          if (page.num == 1) this.vehicleList = [];
          this.vehicleList = this.vehicleList.concat(arr);
          mescroll.endSuccess(arr.length);
        })
        .catch(() => {
          mescroll.endSuccess(0);
        });
    },
    //查询
    getVehicle(page) {
      var params = {
        phone: this.$route.query.mobile,
        wxUserId: this.$route.query.userid,
        pageNum: page.num,
        pageSize: page.size
      };
      return new Promise((resolve, reject) => {
        this.http.get("getVehicleList", params, res => {
          console.log("查询 getVehicleList", res);
          var arr = [];
          if (res.resultCode == "1") {
            if (res.data) {
              arr = res.data.list || [];
              resolve(arr);
            } else {
              reject();
            }
          } else {
            reject(res.errMsg);
          }
        });
      });
    },
    mescrollInit(mescroll) {
      this.mescroll = mescroll;
    },
    //添加试乘试驾车成功
    saveVehicleListSuccess() {
      this.addPopupVisible = !this.addPopupVisible;
      this.mescroll.scrollTo(0, 0);
      this.mescroll.triggerDownScroll();
    },
    //试乘试驾列表更新
    updateVehicleList(vehicle, index) {
      const { id, isValue, vin, license } = vehicle;
      var params = {
        id: id,
        isValue: isValue == 0 ? 1 : 0,
        phone: this.$route.query.mobile,
        remark: "",
        wxId: this.$route.query.userid,
        vin: vin,
        license: license
      };
      console.log("updateVehicleList,参数:", params);
      if (params.isValue == 1) {
        //开关禁用
        console.log("开关禁用");
        // return
        var _this = this;
        this.$vux.confirm.prompt("禁用原因", {
          title: "禁用原因",
          // dialogTransition:'android',
          hideOnBlur: true,
          onCancel() {
            console.log("取消");
            console.log(this);
          },
          onConfirm(value) {
            params.remark = value;
            _this
              .updateVehicleListAction(params)
              .then(e => {
                console.log("成功", e);
                _this.vehicleList[index].isValue = 1;
              })
              .catch(errMsg => {
                console.log("catch", errMsg);
                MessageBox("提示", errMsg).then(() => {
                  //this.vehicleList[index].isValue = 0
                });
              });
          }
        });
        this.$nextTick(() => {
          $("input[type=text]")
            .off("blur")
            .on("blur", () => {
              $(document).scrollTop(0);
            });
        });

        // MessageBox.prompt('禁用原因')
        //   .then(({value, action}) => {
        //     params.remark = value
        //     this.updateVehicleListAction(params).then((e) => {
        //       console.log('成功', e)
        //       this.vehicleList[index].isValue = 1
        //     }).catch((errMsg) => {
        //       console.log('catch', errMsg)
        //       MessageBox('提示', errMsg).then(()=>{
        //         //this.vehicleList[index].isValue = 0
        //       })
        //     })
        //   })
        //   .catch(() => {
        //     //this.vehicleList[index].isValue = 0
        //   })
        // setTimeout(() => {
        //   console.log($('.v-modal'))
        //   $('.v-modal').off('click').on('click', () => {
        //     console.log('.v-modal')
        //     this.vehicleList[index].isValue = 0
        //   })
        // }, 200)
      } else {
        //开关启用
        console.log("开关启用");
        // return
        this.updateVehicleListAction(params)
          .then(e => {
            console.log("成功", e);
            this.vehicleList[index].isValue = 0;
          })
          .catch(errMsg => {
            console.log("catch", errMsg);
            MessageBox("提示", errMsg).then(() => {
              //this.vehicleList[index].isValue = params.isValue == 0 ? 1 : 0
            });
          });
      }
    },
    updateVehicleListAction(params) {
      return new Promise((resolve, reject) => {
        this.http.post("updateVehicleList", params, res => {
          console.log("试乘试驾列表更新 updateVehicleList", res);
          if (res.resultCode == "1" && res.data) {
            console.log("试乘试驾列表更新 成功");
            if (res.data.errCode == 200) {
              resolve();
            } else {
              reject(res.data.errMsg);
            }
          } else {
            reject(res.errMsg);
          }
        });
      });
    },
    touchmovetest(e) {
      e.preventDefault();
      // var n = e.target.nodeName
      // if (n == 'DIV'){
      //   e.preventDefault()
      // }
    }
  },
  beforeMount() {
    $(document).attr("title", "试乘试驾车列表");
  },
  components: {
    ListCell,
    Popup,
    AddCarPanel,
    DetailPanel,
    WxButton,
    MescrollVue,
    MessageBox,
    Confirm
  },
  mounted() {
    $("input[type=email]")
      .off("blur")
      .on("blur", () => {
        $(document).scrollTop(0);
      });
    // console.log(this.$route.query.mobile);
    // this.$route.query.userid
    // return this.$nextTick(() => this.init());
    // this.getVehicle()
    // console.log(this.$vux)
    // this.$vux.confirm.prompt('禁用原因', {
    //   title: '禁用原因',
    //   hideOnBlur:true,
    //   onCancel () {
    //     console.log('取消')
    //   },
    //   onConfirm (value) {
    //     console.log('确定')
    //   }
    // })
  }
};
</script>

<style lang="sass" type="text/scss" rel="stylesheet/scss" scoped>
  .index {
    position: relative;
    width: 100vw;
    .index-bd {
      position: relative;
      height: calc(100vh - 80px);
      overflow: auto;

      .scroll-view {
        height: 100%;
        background-color: #F5F5F5;

        &.empty {
          background-color: white;
        }

        #empty-wrap {
          /*position: absolute;*/
          /*left: 0;*/
          /*right: 0;*/
          /*top: 0;*/
          /*bottom: 0;*/
          display: flex;
          justify-content: center;
          align-items: center;
        }
      }
    }

    .index-ft {
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 20px;
      height: 80px;
    }
  }

  .add-car-panel-wrap {
    position: relative;
    width: 100vw;
  }

  .car-detail-panel {

  }

  .mint-popup {
    background-color: initial;
  }

</style>
