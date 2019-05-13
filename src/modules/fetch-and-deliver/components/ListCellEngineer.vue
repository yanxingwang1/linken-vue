<template>
    <div :class="{'sub-cell-wrap':true,'item-cell-margin-top':subscribe.showMarTop=='show'}">
        <div class="show-date" v-if="!subscribe.id">{{subscribe}}</div>
        <div class="show-detail" v-else>
                <div :class="{'show-tab-detail':true,'show-tab-detail-red':showRed}">
                    <div class="car-board">{{subscribe.carNo}}</div>
                    <div class="date">创建时间：{{createFormat()}}</div>
                </div>
                <div class="show-main-content">
                    <div class="show-main-content-tab">
                        <div class="show-main-content-tab-title">车辆信息：</div>
                        <div class="show-main-content-tab-con">{{subscribe.carModelName}}</div>
                        <div :class="{'car-status':true,'show-main-content-tab-rig':true,'show-main-content-tab-brown':subscribe.orderStatus==90041001}">
                            {{subscribe.orderStatus==90041001?'待确认':subscribe.orderStatus==90041002?'派单中':subscribe.orderStatus==90041003?'已接单':subscribe.orderStatus==90041004?'订单开启':subscribe.orderStatus==90041005?'代驾中':subscribe.orderStatus==90041006?'已到达':subscribe.orderStatus==90041007?'已完成':subscribe.orderStatus==90041008?'已取消':''}}
                        </div>
                    </div>
                    <div class="content-label show-main-content-tab"><div class="show-main-content-tab-title">车主信息：</div><div class="show-main-content-tab-con">{{subscribe.lastName}}{{subscribe.sex==0?'先生':subscribe.sex==1?'女士':''}}&nbsp;&nbsp;&nbsp;{{subscribe.phone}}</div></div>
                    <div class="content-label show-main-content-tab"><div class="show-main-content-tab-title">预约送出时间：</div><div class="show-main-content-tab-con">{{bookingTime}}</div></div>
                </div>
        </div>
    </div>
</template>

<script>

  export default {
    name: 'ListCellEngineer',
    data() {
      return {
        // switchValue: false
      }
    },
    computed: {
        bookingTime() {
            return moment(Number(this.subscribe.bookingTime)).format('YYYY年MM月DD日  星期dd  HH:mm')
        },
        showRed() {
            // console.log(Number(moment(new Date()).valueOf())-Number(this.subscribe.createDate));
            if(this.subscribe.orderStatus==90041001&&((Number(moment(new Date()).valueOf())-Number(this.subscribe.createDate))>1800000)) {
                return true;
            }else {
                return false;
            }
        }
    },
    watch: {
    },
    props: {
      subscribe: {
        type: [Object, String]
      },
      index: {
        type: Number
      },
      showTip: {
          type: Boolean
      }
    },
    methods: {
        createFormat() {
            return moment(this.subscribe.createDate).format('YYYY年MM月DD日  HH:mm');
            // return moment(this.subscribe.createTime).valueOf();
        }
    },
    components: {
    }
  }
</script>

<style scoped lang="sass" type="text/scss">
    .sub-cell-wrap {
        .show-date {
            font-family: PingFangSC-Regular;
            line-height:30px;
            height:30px;
            text-align:right;
            background:#EBEBEB;
            font-size: 14px;
            color: #323232;
            letter-spacing: 0;
            padding-right:3%;
        }
        .show-detail {
            padding:0 3%;
            background:white;
            .show-tab-detail {
                display:flex;
                justify-content: space-between;
                line-height:48px;
                font-weight:400;
                border-bottom: 1px solid #E2E2E2;
                color: #323232;
                .date {
                    font-size:12px;
                    color: #8A8A8A;
                }
            }
            .show-tab-detail-red {
                color: #E30000;
                .date {
                    color: #E30000;
                }
            }
            .show-main-content {
                font-family: PingFangSC-Regular;
                margin-top:20px;
                padding-bottom:17px;
                font-size: 14px;
                color: #323232;
                letter-spacing: -0.48px;
                .show-main-content-tab {
                    display:flex;
                    justify-content: space-between;
                    .show-main-content-tab-title {
                        width:110px;
                    }
                    .show-main-content-tab-con {
                        flex-grow: 3;
                    }
                    .show-main-content-tab-rig {
                        align-self: center;
                    }
                    .show-main-content-tab-brown {
                        color: #B76725;
                    }
                }
                .car-status {
                    float:right;
                    margin-right:5px;
                    font-size:14px;
                }
                .content-label {
                    margin-top: 5px;
                }
            }
        }
        .daibuche {
            display: flex;
            flex-direction: row-reverse;
            margin-top: -39px;
            .content-img {
                width:39px;
                height:39px;
            }
        }
    }
    .item-cell-margin-top {
        margin-top:4px;
    }
</style>
