<template>
  <div class="wholesaleTable">
    <!-- 展示类型 -->
    <div class="datetype">
      <div :class="{'active':timetype==1}" @click="touchfix('1')">日</div>
      <div :class="{'active':timetype==2}" @click="touchfix('2')">周</div>
      <div :class="{'active':timetype==3}" @click="touchfix('3')">月</div>
      <div :class="{'active':timetype==4}" @click="touchfix('4')">季</div>
    </div>
    <!-- 展示控件 -->
    <date-picker @updatetime="updatetime" :timetype="Number(timetype)"></date-picker>

    <!-- 订单类型 -->
    <div class="saletype">
      <div :class="{'active':saletype==3}" @click="touchsale('3')" style="margin-left: -1px">
        <div>零售</div>
      </div>
      <div :class="{'active':saletype==2}" @click="touchsale('2')">
        <div :style="{borderLeft:saletype==1||saletype==4?'1px solid #BABABA':''}">订单</div>
      </div>
      <div class="mid" :class="{'active':saletype==1}" @click="touchsale('1')">
        <div>首客</div>
      </div>
      <div :class="{'active':saletype==4}" @click="touchsale('4')" style="margin-left: -1px">
        <div>批售</div>
      </div>
    </div>
    <div v-show="JSON.stringify(treeData)!='{}'">
      <div class="table-body">
        <div class="scrol scrol1">
          <car-map
            :percent="percent"
            @percents="percents"
            :cars="cars"
            :saletype="Number(saletype)"
            :timetype="Number(timetype)"
            v-if="JSON.stringify(cars)!='[]'"
          ></car-map>
          <!-- <a href="#">全国权限</a> -->
          <sale-map :percent="percent" :item="treeData" v-if="JSON.stringify(treeData)!='{}'"></sale-map>
          <!-- 汇总组件 -->
          <total
            :data="salestatal"
            :percent="percent"
            v-if="JSON.stringify(treeData)!='{}'&&showHeJi&&rule"
          ></total>
        </div>
        <div class="scrol-wrapper" ref="wrapper" style="overflow: hidden;">
          <div class="scrol" :class="{'scrol3':autowidth,'scrol2':!autowidth}">
            <car-map
              :percent="percent"
              @percents="percents"
              :saletype="Number(saletype)"
              :cars="cars"
              :timetype="Number(timetype)"
              v-if="JSON.stringify(cars)!='[]'"
            ></car-map>
            <!-- <a href="#">全国权限</a> -->
            <sale-map :percent="percent" :item="treeData" v-if="JSON.stringify(treeData)!='{}'"></sale-map>
            <!-- 汇总组件 -->
            <total
              :data="salestatal"
              :percent="percent"
              v-if="JSON.stringify(treeData)!='{}'&&showHeJi&&rule"
            ></total>
          </div>
        </div>
      </div>
      <div
        style="text-align:right"
        v-if="JSON.stringify(treeData)!='{}'"
        class="restime"
      >数据同步时间：{{formatrestime}}</div>

      <!--
      <a href="#">东区权限</a>
      <sale-map :item="treeData1" v-if="JSON.stringify(treeData1)!='{}'"></sale-map>
      <a href="#">东1区权限</a>
      <sale-map :item="treeData2" v-if="JSON.stringify(treeData2)!='{}'"></sale-map>-->
    </div>
    <full-mask @click="fullMaskHandlleClick" v-if="showMask&&maskFlag"></full-mask>
  </div>
</template>

<script>
import DatePicker from "./components/DatePicker";
import CarMap from "./components/CarMap";
import SaleMap from "./components/SaleMap";
import Total from "./components/Total";
import { object } from "prop-types";
import util from "../../common/DMC.util";
import { element } from "prop-types";
import { Indicator } from "mint-ui";
import FullMask from "./components/FullMask";
import BScroll from "better-scroll";
import { debug, debuglog } from "util";

export default {
  data() {
    return {
      timetype: 1,
      startTime: moment(new Date()).format("YYYY-MM-DD"),
      endTime: moment(new Date()).format("YYYY-MM-DD"),
      saletype: 3,
      saletypes: {
        1: "首客",
        2: "订单",
        3: "零售",
        4: "批售"
      },
      percent: false,
      datetype: {
        1: "日",
        2: "周",
        3: "月",
        4: "季"
      },
      treejson: [],

      treeData: {},
      scroll: null,
      cars: [
        // {
        //   createBy: null,
        //   createDate: null,
        //   id: 1000000,
        //   seriesGroup: "MKZ",
        //   updateBy: null,
        //   updateDate: null,
        //   url: "https://lincoln-mp.yonyouauto.com/fs01/KPI/con2019_3x.png"
        // },
        // {
        //   createBy: null,
        //   createDate: null,
        //   id: 1000000,
        //   seriesGroup: "NAUTILUS",
        //   updateBy: null,
        //   updateDate: null,
        //   url: "https://lincoln-mp.yonyouauto.com/fs01/KPI/con2019_3x.png"
        // },
        // {
        //   createBy: null,
        //   createDate: null,
        //   id: 1000000,
        //   seriesGroup: "NAVIGATOR",
        //   updateBy: null,
        //   updateDate: null,
        //   url: "https://lincoln-mp.yonyouauto.com/fs01/KPI/con2019_3x.png"
        // },
        // {
        //   createBy: null,
        //   createDate: null,
        //   id: 1000000,
        //   seriesGroup: "MKC",
        //   updateBy: null,
        //   updateDate: null,
        //   url: "https://lincoln-mp.yonyouauto.com/fs01/KPI/con2019_3x.png"
        // },
        // {
        //   createBy: null,
        //   createDate: null,
        //   id: 1000000,
        //   seriesGroup: "CONTINENTAL",
        //   updateBy: null,
        //   updateDate: null,
        //   url: "https://lincoln-mp.yonyouauto.com/fs01/KPI/con2019_3x.png"
        // },
        // {
        //   createBy: null,
        //   createDate: null,
        //   id: 1000000,
        //   seriesGroup: "MKX",
        //   updateBy: null,
        //   updateDate: null,
        //   url: "https://lincoln-mp.yonyouauto.com/fs01/KPI/con2019_3x.png"
        // }
      ],
      carsinfo: [],
      // salestatal: [], //销售数量汇总
      restime: "", //后台返回时间
      rule: false, //岗位角色
      maskFlag:
        window.localStorage.getItem("maskFlag") == "false" ? false : true,
      showMask: false
    };
  },
  components: {
    DatePicker,
    CarMap,
    SaleMap,
    Total,
    FullMask
  },
  methods: {
    // 更新日期控件
    touchfix(value) {
      if (value == this.timetype) {
        //防止重复请求
        return;
      }
      this.timetype = value;
    },
    // 更新零售方式
    touchsale(value) {
      if (value == this.saletype) {
        //防止重复请求
        return;
      }
      // 切换组件
      this.saletype = value;
      //  更新后台
      this.updatemsg();
    },
    // 修改日历控件触发回调
    updatetime(parmas) {
      // debugger
      // console.log('updatetime',parmas)
      if (parmas.timetype == 1) {
        //日
        this.startTime = parmas.date;
        this.endTime = parmas.date;
      } else if (parmas.timetype == 2) {
        //周
        this.startTime = parmas.week_s;
        this.endTime = parmas.week_e;
      } else if (parmas.timetype == 3) {
        //月
        this.startTime = parmas.month_s;
        this.endTime = parmas.month_e;
      } else {
        this.startTime = parmas.quarter_s;
      }
      //  更新后台
      this.updatemsg();
    },
    /**
     * element 传入需要递归的对象
     * type 3最低层次隐藏箭头  true 返回百比分数据 false返回销售数量
     */
    recursion(element, type) {
      var cube = {};
      cube.name = element.dataName;
      cube.code = element.data_CODE;
      cube.amount = [];
      cube.rate = [];

      if (type == 1) {
        cube.type = "daqu";
      } else if (type == 2) {
        cube.type = "xiaoqu";
      } else if (type == 3) {
        cube.type = "jxs";
      }
      this.cars.forEach((item, i) => {
        element.series_DATA_LIST.forEach(group => {
          if (item.seriesGroup == group.series_GROUP) {
            cube.amount.push(group.amount);
            cube.rate.push(group.rate);
          }
        });
      });

      cube.amount.push(element.total_AMOUNT);
      cube.rate.push(element.total_RATE);
      //存放数量
      return cube;
    },
    /**
     * 对后端数据进行初始化过滤，返回权限类型 和大区 小区的数据分类
     */
    sortinit(date) {
      var info = {
        daqu: [],
        xiaoqu: [],
        jxs: [],
        rule: 0
      };

      if (date[1].data_TYPE == "大区") {
        info.rule = 1;
        this.rule = true;
      } else if (date[1].data_TYPE == "小区") {
        info.rule = 2;
      } else if (date[1].data_TYPE == "经销商") {
        info.rule = 3;
      }
      date.forEach(element => {
        if (element.data_TYPE == "大区") {
          info.daqu.push(element);
        } else if (element.data_TYPE == "小区") {
          info.xiaoqu.push(element);
        } else {
          info.jxs.push(element);
        }
      });
      return info;
    },
    formatdate(date) {
      return new Promise((resolve, reject) => {
        var carinfo = []; //存放车型及图片
        var numinfo = {}; //存放车辆数量
        var percentinfo = {}; //存放当月销售百分比
        numinfo.name = "全国区";
        numinfo.isOpen = true;
        numinfo.num = [1, 1, 1, 1, 1, 1];
        numinfo.children = [];
        var info = this.sortinit(date);

        if (info.rule == 1 || info.rule == 2) {
          //全国权限
          info.daqu.forEach(element => {
            //遍历大区权限
            numinfo.children.push(this.recursion(element, 1));
          });
          // 小区遍历把每个code和父级type比较如果相同则放到children
          info.xiaoqu.forEach(value => {
            numinfo.children.forEach(element => {
              if (value.type == element.code) {
                if (!element.children) {
                  //第一次进入
                  element.children = [];
                } else {
                  element.children = [...element.children];
                }

                element.children.push(this.recursion(value, 2));
              }
            });
          });
          // 经销商遍历把每个code和父级type比较如果相同则放到children
          info.jxs.forEach(value => {
            numinfo.children.forEach(xiaoqu => {
              xiaoqu.children.forEach(element => {
                if (value.type == element.code) {
                  if (!element.children) {
                    //第一次进入
                    element.children = [];
                  } else {
                    element.children = [...element.children];
                  }
                  element.children.push(this.recursion(value, 3));
                }
              });
            });
          });
          // date.forEach(element => {
          //   if (element.data_TYPE == "大区") {

          //   } else if (element.data_TYPE == "小区") {
          //     numinfo.children.forEach(value => {
          //       if (value.code == element.type) {
          //         value.children = [];
          //         value.children.push(this.recursion(element));
          //       }
          //     });

          //   } else {
          //     numinfo.children.forEach(quarray => {
          //       quarray.children.forEach(value => {
          //         if (value.code == element.type) {
          //           value.children = [];
          //           value.children.push(this.recursion(element, 3));
          //         }
          //       });
          //     });
          //   }
          // });
        } else {
          //小区权限
          info.xiaoqu.forEach(element => {
            //遍历小区权限
            numinfo.children.push(this.recursion(element, 2));
          });
          info.jxs.forEach(value => {
            numinfo.children.forEach(element => {
              if (value.type == element.code) {
                if (!element.children) {
                  //第一次进入
                  element.children = [];
                } else {
                  element.children = [...element.children];
                }
                element.children.push(this.recursion(value, 3));
              }
            });
          });
          // date.forEach(element => {
          //   if (element.data_TYPE == "小区") {
          //     numinfo.children.push(this.recursion(element));
          //   } else if (element.data_TYPE == "经销商") {
          //     numinfo.children.forEach(value => {
          //       if (value.code == element.type) {
          //         value.children = [];
          //         value.children.push(this.recursion(element, 3));
          //       }
          //     });
          //   }
          // });
        }
        var res = {
          numinfo: numinfo,
          percentinfo: percentinfo,
          carinfo: carinfo
        };
        resolve(res);
      });
    },
    scrollRefresh() {
      //$refs绑定元素
      if (!this.scroll) {
        this.scroll = new BScroll(this.$refs.wrapper, {
          scrollX: true,
          preventDefault: false,
          //开启点击事件 默认为 false
          click: true
        });
        // console.log(this.scroll)
      } else if (!this.$refs.wrapper) {
        return;
      } else {
        this.scroll.refresh();
      }
    },
    // 触发后台接口更新销售信息
    async updatemsg() {
      var parmas = {
        searchDate: this.startTime,
        searchType: this.datetype[this.timetype],
        quotaType: this.saletypes[this.saletype],
        mobile: util.getQueryValue("mobile"),
        wxUserId: util.getQueryValue("wxUserId")

        // endTime: this.endTime,
        // saletype: this.saletype,
        // time: moment().format("YYYY-MM-DD HH时mm分ss秒")
      };
      // console.log("===>请求后台", JSON.stringify(parmas));
      // let res = await fetch("http://localhost:3003/info");
      // let result = await res.json();
      // this.treeData = result;

      this.treeData = {};
      this.treejson = {};
      // 如果是月报表不管，如果是其他报表关闭百分比
      if (this.timetype != 3 || this.timetype != 4) {
        this.percent = false; //百分比被设置后重复显示
      }
      Indicator.open({
        spinnerType: "triple-bounce"
      });
      this.http.get("getDcsDates", parmas, res => {
        if (res.data) {
          this.treejson = res.data.data;
          this.restime = res.data.data[0].report_TIME; //有接口时间显示接口时间没有接口时间显示系统时间
          this.formatdate(this.treejson).then(date => {
            Indicator.close();
            // console.log(JSON.stringify(date.numinfo));
            this.treeData = date.numinfo;
            this.$nextTick(() => {
              this.scrollRefresh();
            });
            // window.localStorage.setItem("showMask", "true");
            this.showMask = true;
          });
        } else {
          Indicator.close();
          alert(res.data.error);
        }
      });

      // this.formatdate(this.treejson).then(date => {
      //   console.log(JSON.stringify(date.numinfo));
      //   this.treeData = date.numinfo;
      // });
    },
    // 监听月销售百分比  zjw
    percents(boole) {
      this.percent = boole;
      return;
      this.treeData = {};
      this.formatdate(this.treejson).then(date => {
        // console.log(JSON.stringify(date.numinfo));
        this.treeData = date.numinfo;
      });
    },
    /**
     * 初始化汽车类型接口
     */
    initcar() {
      this.http.get("pictureSearch", {}, res => {
        this.cars = res.data;
      });
    },
    fullMaskHandlleClick() {
      this.maskFlag = false;
      window.localStorage.setItem("maskFlag", "false");
    }
  },
  computed: {
    // 计算属性的 getter
    salestatal: function() {
      if (!this.treejson) {
        return;
      }
      var newtotal = {
        //新数据
        series_DATA_LIST: [],
        total_AMOUNT: "",
        total_RATE: ""
      };

      var oldtotal = this.treejson[this.treejson.length - 1];
      newtotal.total_AMOUNT = oldtotal.total_AMOUNT;
      newtotal.total_RATE = oldtotal.total_RATE;
      this.cars.forEach((item, i) => {
        oldtotal.series_DATA_LIST.forEach(group => {
          if (item.seriesGroup == group.series_GROUP) {
            newtotal.series_DATA_LIST.push({
              amount: group.amount,
              rate: group.rate
            });
          }
        });
      });
      return newtotal;
    },
    autowidth: function() {
      var oldtotal = this.treejson[this.treejson.length - 1];
      var totallength = oldtotal
        ? oldtotal.series_DATA_LIST[5].rate.length
        : null;
      if (totallength && totallength > 5) {
        return true;
      } else {
        return false;
      }
    },
    formatrestime: function() {
      if (!this.restime) {
        return;
      }
      // console.log(moment().format("YYYY年MM月DD日  HH:mm"));
      return moment(this.restime).format("YYYY年MM月DD日  HH:mm");
    },
    showHeJi() {
      return true
      const { treeData } = this;
      let flag = true;
      if (treeData.children) {
        const tmp = treeData.children.find(item => {
          return item.isOpen === true;
        });
        if (tmp) {
          flag = false;
        }
      }
      return flag;
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initcar();
    });
  }
};
</script>

<style lang="sass" type="text/sass" scoped>

  .wholesaleTable {

    .datetype {

      display:flex;

      justify-content:space-around;
      height: 44px;
      background: #F6F6F6;

      align-items:center;

      div {

        position:relative;
        color: #909090;

  }

    .active {
      color: #444344;

  }

    .active:after {
      content: '';

      position:absolute;
      left: -3px;
      bottom: -12px;
      width: 20px;
      height: 3PX;
      background-color: #B45F1A

  } }

    .saletype {

      display:flex;

      justify-content:space-around;

      align-items:center;
      margin: 0 25px;
      border: 1px solid #979797;
      height: 32px;

    border-radius: 4px;
      > div {
        width: 34%;

        text-align:center;
        padding: 6px 5px;
  }

    .mid {
      padding: 6px 0;

      > div {
        border-left: 1px solid #BABABA;
        border-right: 1px solid #BABABA;
        margin: 0 -1px;

  } }

    .active {
      background: #B45F1A;
      color: #fff;
      z-index: 1;
      border-radius: 3px;

  }

    .mid.active > div {

      border-color:transparent;

  } }

    .restime {

      font-family:PingFangSC-Regular;
      font-size: 10px;
      color: #909090;
      letter-spacing: 0;

      text-align:center;
      margin: 15px 22px;

  }

    .scrol{
    /*width: 460px;*/

  }

    .table-body{
    /*overflow:auto;*/

  } }
</style>
