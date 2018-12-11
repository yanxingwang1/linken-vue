<template>
  <div class="listcar">
    <!-- ref="siledelate" -->
    <div class="list siledelate">
      <div class="name clearfix">
        <span class="left">{{datas.title}}</span>
        <span class="right" @click.native="showurl(datas.qrCodeUrl)">
          <img :src="datas.qrCodeUrl" alt="" style="width:25px">
        </span>
      </div>
      <div class="phone">
        <span>联系电话：{{datas.phone}}</span>
      </div>
      <div class="drivertime">
        <span>创建时间：{{datas.createDate}}</span>
      </div>
      <!--<div class="media-deleteCart" @click.stop="deleteCart(datas.id)">-->
      <!--<span><img src="../images/delate.png" style="width:20px" alt=""></span>-->
      <!--</div>-->

    </div>

  </div>
</template>
<script>
  import util from "../../../common/DMC.util.js";
  import {Toast, MessageBox} from "mint-ui";

  export default {
    name: "prop",
    data() {
      return {
        data: [],
        prop: this.user

      };
    },
    props: {
      datas: {
        type: Object,
        required: true
      },
      user: Object,
      // change1:Function,
    },
    methods: {
      deleteCart(id) {

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
              "id": id,
              "phone": _this.prop.wxPhone,
              "wxUserId": _this.prop.wxUserId
            }
            _this.http.post('deleteTodayTestDrive', parmas, res => {
              if (res.resultCode == '1') {

                _this.$emit('refreshList');
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
      showurl(qrCodeUrl) {
        this.$router.push("/qrCode?qrCodeUrl=" + encodeURIComponent(qrCodeUrl));
      }
    },
    mounted() {

      // debugger;
      // this.data = this._props.dailydata.list;
    }
  };
</script>
<style lang="sass" scoped type="text/scss">
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

  //  购物车左滑
  .swipeleft {
    transform: translateX(-30%);
    -webkit-transform: translateX(-30%);
    transition: all 0.3s linear;
  }

  .swipeleft .media-deleteCart {
    display: block;
  }

  // 删除按钮
  .media-deleteCart {
    position: absolute;
    right: -30%;
    top: 0;
    height: 100%;
    width: 30%;
    background: #E2421B;
    text-align: center;
    display: none;

    span {
      color: #fff;
      position: absolute;
      top: 44%;
      left: 45%;
      font-size: 18px;
    }
  }

  .listcar {
    background: #F5f5f5f;
    /*border-bottom: 10px solid #f5f5f5;*/

    .list {
      background: #FFFFFF;
      padding: 17px 23px;

      position: relative;

      .name .left {
        font-family: PingFangSC-Medium;
        font-size: 18px;
      }

      .phone {
        margin: 12px 0;
      }
    }

    //  .list:nth-last(1){
    //    margin-bottom:0px;
    //  }
  }
</style>>



