<template>
  <div :class="{'sub-cell-wrap':true,'item-cell-margin-top':subscribe.showMarTop=='show'}">
        <div class="show-date" v-if="!subscribe.id">{{subscribe}}</div>
        <div class="show-detail" v-else>
                <div class="show-tab">
                    <span class="show-tab-span">{{subscribe.serviceType==1?'维修服务':subscribe.serviceType==2?'保养服务':subscribe.serviceType==3?'检查服务':'其他服务'}}</span>
                </div>
                <div class="show-main-content">
                    <div>客户称谓：{{subscribe.lastName}}  {{subscribe.sex==0?'先生':'女士'}}<span class="car-status">{{subscribe.status==10661000?'已进厂':subscribe.status==10661003?'已确认':subscribe.status==10661004?'已完成':'已取消'}}</span></div>
                    <div class="content-label">服务车型：{{subscribe.carModelName}}</div>
                    <div class="content-label">预约服务时间：{{subscribe.appointmentTime}}</div>
                    <div class="content-label">
                        来源：{{subscribe.appointmentSource==0?'微信':'其他'}}
                        <!-- <img class="content-img" :src="require('../imgs/daibuche.png')"/> -->
                    </div>
                </div>
        </div>
        <div class="daibuche" v-if="subscribe.scootor==0">
            <img class="content-img" :src="require('../imgs/daibuche.png')"/>
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
                    color: #0B1665;
                    padding: 2px;
                    border: 1px solid #0B1665;
                    border-radius: 2px;
                }
            }
            .show-main-content {
                font-family: PingFangSC-Regular;
                margin-top:20px;
                padding-bottom:17px;
                font-size: 15px;
                color: #323232;
                letter-spacing: -0.48px;
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
