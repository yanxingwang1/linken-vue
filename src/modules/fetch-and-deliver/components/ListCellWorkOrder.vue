<template>
    <div :class="{'sub-cell-wrap':true,'item-cell-margin-top':index>0}">
        <div class="show-detail">
                <div :class="{'show-tab-detail':true}">
                    <span :class="{'show-tab-span':true,'visibility-hidden':subscribe.ifDelivery!='12781001'}">送车服务</span>
                    <div class="show-tab-rono">工单号：{{subscribe.roNo}}</div>
                </div>
                <div class="show-main-content">
                    <div class="show-main-content-tab"><div class="show-main-content-tab-title">车辆信息：</div><div class="show-main-content-tab-con">{{subscribe.model}}&nbsp;&nbsp;&nbsp;{{subscribe.license}}</div><div :class="{'car-status':true,'show-main-content-tab-rig':true}">已结算</div></div>
                    <div class="content-label show-main-content-tab"><div class="show-main-content-tab-title">车主信息：</div><div class="show-main-content-tab-con">{{subscribe.userName}}{{subscribe.sex==0?'先生':subscribe.sex==1?'女士':''}}&nbsp;&nbsp;&nbsp;{{subscribe.phone}}</div></div>
                    <div class="content-label show-main-content-tab"><div class="show-main-content-tab-title">服务类型：</div><div class="show-main-content-tab-con">{{subscribe.repairTypeCode=='S001'?'维修':subscribe.repairTypeCode=='S002'?'保养':subscribe.repairTypeCode=='S003'?'检查':subscribe.repairTypeCode=='S004'?'其他':''}}服务</div></div>
                </div>
        </div>
    </div>
</template>

<script>

  export default {
    name: 'ListCellWorkOrder',
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
            .show-tab-detail {
                line-height:48px;
                font-size:12px;
                font-weight:400;
                border-bottom: 1px solid #E2E2E2;
                color: #323232;
                .show-tab-span {
                    font-size: 12px;
                    color: #007AE5;
                    padding: 2px;
                    border: 1px solid #007AE5;
                    border-radius: 2px;
                }
                .visibility-hidden {
                    visibility: hidden;
                }
                .show-tab-rono {
                    float: right;
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
                        width:80px;
                    }
                    .show-main-content-tab-con {
                        flex-grow: 3;
                    }
                    .show-main-content-tab-rig {
                        align-self: center;
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
