<template>
    <div class="fetch-detail-index-drive">
        <div class="fetch-detail-index-drive-top">
            <div class="fetch-detail-index-drive-top-name">
                <img :src="driverImg=='null'?driverImg:require('../imgs/driver.png')"/>
                <div class="fetch-detail-index-drive-top-name-text">
                    <div>司机：{{driverName}}</div>
                    <div>工号：{{jobNumber}}</div>
                </div>
            </div>
            <div class="fetch-detail-index-drive-top-phone" @click.stop="phoneClick(driverPhone)">
                <div class="fetch-detail-index-drive-top-phone-img">
                <img src="../imgs/phone.png"/>
                </div>
            </div>
        </div>
        <div class="fetch-detail-index-drive-down">
            <incoming-state 
                title="司机已接单"
                v-show="orderStatus==90041003"
                :border="false"
                :status="'3'">
            </incoming-state>
            <incoming-state 
                title="司机已到达客户的送车地址"
                v-show="orderStatus==90041006"
                :border="true" 
                :status="orderStatus==90041006?'3':'1'">
            </incoming-state>
            <incoming-state 
                title="司机正驾车驶向客户的送车地址"
                v-show="orderStatus==90041005||orderStatus==90041006"
                :border="true" 
                :status="orderStatus==90041005?'3':'1'">
            </incoming-state>
            <incoming-state 
                title="司机出发前往林肯中心"
                v-show="orderStatus==90041004||orderStatus==90041005||orderStatus==90041006"
                :border="false" 
                :status="orderStatus==90041004?'3':'1'">
            </incoming-state>
        </div>
    </div>
</template>

<script>
  import IncomingState from './IncomingState'
  export default {
    name: 'DriveInfo',
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
      driverImg: {
        type: String
      },
      driverName: {
        type: String
      },
      jobNumber: {
        type: String
      },
      driverPhone: {
        type: String
      },
      orderStatus: {
        type: String
      }
    },
    methods: {
        phoneClick(phone) {
            if (phone) {
                console.log('打电话', phone)
                window.location.href = `tel:${phone}`
            }
        },
    },
    components: {
        IncomingState
    }
  }
</script>

<style scoped lang="sass" type="text/scss">
    .fetch-detail-index-drive{
        padding:20px 15px 10px 15px;
        border-bottom: 10px solid #F5F5F5;
        .fetch-detail-index-drive-top {
            display:flex;
            align-items: center;
            font-size:14px;
            font-family:PingFangSC-Regular;
            font-weight:400;
            color:rgba(50,50,50,1);
            padding-bottom: 20px;
            border-bottom: 1px solid #E2E2E2;
            &-name {
                width:85%;
                display:flex;
                img {
                    width:46px;
                    height:46px;
                }
                &-text {
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    margin-left:15px;
                }
            }
            &-phone {
                width:13%;
                border-left:1px solid #E2E2E2;
                line-height: 30px;
                &-img {
                    float:right;
                    img {
                        width: 18px;
                        height: 18px;
                        vertical-align: sub;
                    }
                }
            }
        }
        .fetch-detail-index-drive-down {
            padding:19px 0;
        }
    }
</style>
