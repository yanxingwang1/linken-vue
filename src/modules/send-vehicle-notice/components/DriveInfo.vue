<template>
  <div class="fetch-detail-index-drive">
    <div class="fetch-detail-index-drive-top">
      <div class="fetch-detail-index-drive-top-name">
        <img src="../imgs/driver.png">
        <div class="fetch-detail-index-drive-top-name-text">
          <div>司机：{{driverName}}</div>
          <div>工号：{{jobNumber}}</div>
        </div>
      </div>
      <div class="fetch-detail-index-drive-top-phone" @click.stop="phoneClick(driverPhone)">
        <div class="fetch-detail-index-drive-top-phone-img">
          <img src="../imgs/phoneBrown.png">
        </div>
      </div>
    </div>
    <div v-show="driverStatus>0" v-if="onBounce" class="fetch-detail-index-drive-down">
      <incoming-state
        title="司机已到达您的送车地址"
        v-show="driverStatus>2"
        :border="true"
        :status="driverStatus=='3'?'3':'1'"
      ></incoming-state>
      <incoming-state
        title="司机正驾车驶向您的送车地址"
        v-show="driverStatus>1"
        :border="true"
        :status="driverStatus=='2'?'3':'1'"
      ></incoming-state>
      <incoming-state title="司机出发前往林肯中心" :border="false" :status="driverStatus=='1'?'3':'1'"></incoming-state>
    </div>
    <div
      :class="!onBounce?'active':''"
      class="fetch-detail-index-drive-code"
      v-show="code!='0'&&driverStatus>0"
      @click.stop="phoneClick(driverPhone)"
    >接车验证码&nbsp;{{code}}</div>
  </div>
</template>

<script>
import IncomingState from "./IncomingState";
export default {
  name: "DriveInfo",
  data() {
    return {
      // switchValue: false,
      onBounce: false
    };
  },
  computed: {},
  watch: {},
  props: {
    driverName: {
      type: String
    },
    jobNumber: {
      type: String
    },
    driverPhone: {
      type: String
    },
    driverStatus: {
      type: String
    },
    code: {
      type: String
    }
  },
  created() {
    this.$Bus.$on("onBounce", data => {
      if (data.state == "close") {
        this.onBounce = false;
      } else {
        this.onBounce = true;
      }
    });
  },
  methods: {
    phoneClick(phone) {
      if (phone) {
        console.log("打电话", phone);
        window.location.href = `tel:${phone}`;
      }
    }
  },
  components: {
    IncomingState
  }
};
</script>

<style scoped lang="sass" type="text/scss">
    .fetch-detail-index-drive{
        padding:20px 15px 0 15px;
        border-bottom: 10px solid #F5F5F5;
        .fetch-detail-index-drive-top {
            display:flex;
            align-items: center;
            font-size:14px;
            font-family:PingFangSC-Regular;
            font-weight:400;
            color:rgba(50,50,50,1);
            padding-bottom: 20px;
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
            border-top: 1px solid #E2E2E2;
            border-bottom: 1px solid #E2E2E2;
        }
        .fetch-detail-index-drive-code {
            padding:14px 0 14px 0;
            text-align:center;
            color:rgba(184,97,34,1);
            font-size:15px;   
        }
        .active{
          background:rgba(255,248,243,1);
          margin:0 -20px;
        }
    }
</style>
