<template>
    <div :class="{'sub-cell-wrap':true,'item-cell-margin-top':subscribe.showMarTop=='show'}">
        <div class="show-date" v-if="!subscribe.id">{{subscribe}}</div>
        <div class="show-detail" v-else>
                <div class="show-tab">
                    <span class="show-tab-span">{{subscribe.serverStatus==90051002?'送车服务':subscribe.serverStatus==90051001?'取车服务':'其他服务'}}</span>
                </div>
                <div class="show-main-content">
                    <div class="show-main-content-tab">
                        <div class="show-main-content-tab-title">车辆信息：</div>
                        <div class="show-main-content-tab-con">{{subscribe.carModelName}}&nbsp;&nbsp;&nbsp;{{subscribe.carNo}}</div>
                        <div class="car-status show-main-content-tab-rig">
                            {{subscribe.orderStatus==90041001?'待确认':subscribe.orderStatus==90041002?'派单中':subscribe.orderStatus==90041003?'已接单':subscribe.orderStatus==90041004?'送车订单开启':subscribe.orderStatus==90041005?'送车中':subscribe.orderStatus==90041006?'已送达':subscribe.orderStatus==90041007?'已完成':subscribe.orderStatus==90041008?'已取消':''}}
                        </div>
                    </div>
                    <div class="content-label show-main-content-tab"><div class="show-main-content-tab-title">车主信息：</div><div class="show-main-content-tab-con">{{subscribe.lastName}}{{subscribe.sex==0?'先生':subscribe.sex==1?'女士':''}}&nbsp;&nbsp;&nbsp;{{subscribe.phone}}</div></div>
                    <div class="content-label show-main-content-tab"><div class="show-main-content-tab-title">服务工程师：</div><div class="show-main-content-tab-con">{{subscribe.engineerName}}</div></div>
                </div>
        </div>
    </div>
</template>

<script>

  export default {
    name: 'ListCell',
    data() {
      return {
        // switchValue: false
      }
    },
    computed: {
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
            .show-tab {
                line-height:48px;
                border-bottom: 1px solid  #E2E2E2;
                .show-tab-span {
                    font-size: 12px;
                    color: #007AE5;
                    padding: 2px;
                    border: 1px solid #007AE5;
                    border-radius: 2px;
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
                        width: 100px;
                    }
                    .show-main-content-tab-rig {
                        align-self: flex-start;
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
    }
    .item-cell-margin-top {
        margin-top:4px;
    }
</style>
