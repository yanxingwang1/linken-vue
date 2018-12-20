<template>
  <div class="daily">
    <mescroll-vue ref="mescroll" :down="mescrollDown" :up="mescrollUp" @init="mescrollInit">
      <div id="empty-wrap"></div>
      <mt-cell-swipe
        v-for="(item,i) in list"
        @click.native="detail(item,i)"
        :key="item.id"

        :right="item.status=='3'?'':[
                  {
                    content: 'DeleteDel',
                    style: {
                      color:'red',
                      background: `red url(${require('./images/delate.png')}) center/20px no-repeat`,
                    },
                    handler: () => deleteCell(item,i)
                  }
                ]">
        <list-car
          ref='card'
          :datas="item"
          :user="parmas"
          @refreshList="refreshList">
        </list-car>
      </mt-cell-swipe>

    </mescroll-vue>
  </div>
</template>

<script>
  import listCar from "./components/dailycar.vue";
  import {Toast, MessageBox} from "mint-ui";
  import util from '../../common/DMC.util.js'
  import MescrollVue from 'mescroll.js/mescroll.vue'
  import {CellSwipe} from 'mint-ui';

  export default {
    name: "daily",
    components: {
      listCar,
      MescrollVue,
      CellSwipe
    },
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
            warpId: 'empty-wrap', //父布局的id (1.3.5版本支持传入dom元素)
            icon: require('./images/dd@3x.png'),//"../imgs/dd@3x.png", //图标,默认null,支持网络图
            tip: '您还没有添加试乘试驾车' //提示
          },
          htmlNodata: '<p class="upwarp-nodata">— — END — —</p>'
        },
        //
        wxPhone: util.getQueryValue('wxPhone'),//用户手机号
        wxUserId: util.getQueryValue('wxUserId'),//用户id
        parmas: {
          wxPhone: util.getQueryValue('wxPhone'),//用户手机号
          wxUserId: util.getQueryValue('wxUserId'),//用户id
        },

        list: [
          // {
          //   title: "王1111  先生",
          //   qrCodeUrl: "二维码",
          //   phone: "13677990765",
          //   createDate: "2018年9月20日  13:00",
          //   id:'1'
          // },

        ]
      };
    },
    directives: {},
    watch: {},
    methods: {
      deleteCell(item, i) {
        console.log('shanchu', item, i)
        var _this = this;
        MessageBox({
          title: "提示",
          message: "删除后将不能恢复",
          showCancelButton: true,
          confirmButtonText: "确认",
          cancelButtonText: "取消",
          closeOnClickModal: false,
          cancelButtonHighlight: true,
          confirmButtonClass: "remove",
          cancelButtonClass: "cancel"
        }).then(function (res) {
          if (res === "confirm") {
            var parmas = {
              "id": item.id,
              "phone": _this.parmas.wxPhone,
              "wxUserId": _this.parmas.wxUserId
            }
            _this.http.post('deleteTodayTestDrive', parmas, res => {
              if (res.resultCode == '1') {
                _this.list.splice(i, 1)
                // _this.$emit('refreshList');
                // 删除成
              } else {
                Toast({
                  message: '删除异常',
                });
              }
            })
          }
        });
      },
      mescrollInit(mescroll) {
        this.mescroll = mescroll
      },
      scrollUpAction(page, mescroll) {
        var parmas = {
          'phone': this.wxPhone,
          'wxUserId': this.wxUserId,
          'page': page.num,
          'limit': page.size
        }
        this.http.post('queryTodayTestDrive', parmas, res => {
          if (res.resultCode == '1') {
            if (res.data) {
              if (page.num == 1) this.list = []
              var arr = res.data.list;
              this.list = this.list.concat(arr)
              mescroll.endSuccess(arr.length)
              // this.$nextTick(() => {
              //   util.siledelate();
              // })
            }
          } else {
            mescroll.endSuccess(0)
            Toast({
              message: res.errMsg,
            });
          }
        })
      },
      refreshList() {
        this.init();
      },
      detail(item, index) {
        var card = this.$refs.card[index].$el.children[0].className;
        if (card == 'list siledelate swipeleft') {
          return;
        }
        if (item.status == 1) {
          this.$router.push("/driverform?id=" + item.id + "&wxPhone=" + this.wxPhone + "&wxUserId=" + this.wxUserId);
        } else if (item.status == 2) {
          this.$router.push("/endDrive?id=" + item.id + "&wxPhone=" + this.wxPhone + "&wxUserId=" + this.wxUserId);
        } else {
          // 试驾成功
          this.$router.push("/qrCode?qrCodeUrl=" + encodeURIComponent(item.qrCodeUrl));
        }

      },

      init() {
        var parmas = {
          'phone': this.wxPhone,
          'wxUserId': this.wxUserId,
          'page': 1,
          'limit': 10
        }
        this.http.post('queryTodayTestDrive', parmas, res => {
          if (res.resultCode == '1') {
            if (res.data) {
              this.list = res.data.list;
              this.$nextTick(() => {
                util.siledelate();
              })
            }
          } else {
            Toast({
              message: res.errMsg,
            });
          }
        })
      },

    },
    beforeMount() {
      $(document).attr("title", "当日试乘试驾登记表");
    },

    mounted() {
      //this.init();
    }
  };
</script>
<style lang="sass">
  // .register-container {
  //     background: #f5f5f5 !important;
  // }

</style>
<style lang="sass" scoped type="text/scss">
  @function px($px) {
    @return ($px/20)+rem;
  }

  .right {
    float: right !important;
  }

  .left {
    float: left !important;
  }

  .clearfix {
    overflow: auto;
    zoom: 1;
  }

  .daily {
    height: 100%;
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
    .today {
      height: px(54);
      line-height: px(54);
      margin-left: 23px;
    }


    .createtable {
      background: #B45F1A;
      border: 1px solid #B45F1A;
      border-radius: 3px;
      width: calc(100vw - 46px);
      font-size: 17px;
      color: #FFFFFF;
      padding: 10px 0;
      text-align: center;
      margin: 0 23px;
      position: absolute;
      bottom: 0;
    }

  }

</style>
