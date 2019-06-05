<template>
  <div class="fetch-detail-index-drive">
    <div class="fetch-detail-index-drive-top">
      <div class="fetch-detail-index-drive-top-name">
        <div class="fetch-detail-index-drive-top-name-img">
          <img :src="driverImg!=null?driverImg:require('../imgs/driver.png')"/>
        </div>
        <div class="fetch-detail-index-drive-top-name-text">
          <div>{{driverName}}</div>
          <div class="fetch-detail-index-drive-top-name-text-no">工号：{{jobNumber}}</div>
          <div class="fetch-detail-index-drive-top-name-text-no fetch-detail-index-drive-top-name-text-star">
              <img v-for="i in starFullRate" :key="'full'+i" src="../imgs/star-full.png"/>
              <img v-if="starFalfRate" src="../imgs/star-half.png"/>
              <img v-for="j in starEmptyRate" :key="'empty'+j" src="../imgs/star-empty.png"/>
              <!-- &nbsp;&nbsp;{{driverStar}}星 -->
          </div>
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
        title="您的爱车已送达"
        v-show="driverStatus>2"
        :border="true"
        :status="driverStatus=='3'?'3':'1'"
      ></incoming-state>
      <incoming-state
        title="正护送爱车向您驶来"
        v-show="driverStatus>1"
        :border="true"
        :status="driverStatus=='2'?'3':'1'"
      ></incoming-state>
      <incoming-state title="正前往林肯中心" :border="false" :status="driverStatus=='1'?'3':'1'"></incoming-state>
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
  computed: {
    starFullRate() {
        if(this.driverStar){
            return parseInt(this.driverStar);
        }
    },
    starFalfRate() {
        if(this.driverStar){
            if((parseFloat(this.driverStar)-parseInt(this.driverStar))>0){
                return true;
            }
            return false;
        }
    },
    starEmptyRate() {
        if(this.driverStar){
            if((parseFloat(this.driverStar)-parseInt(this.driverStar))>0){
                return parseInt(4-parseInt(this.driverStar));
            }
            return parseInt(5-parseInt(this.driverStar));
        }
    }
  },
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
    },
    driverImg: {
      type: String
    },
    driverStar: {
      type: [Number,String]
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
                align-items: center;
                &-img {
                    width: 46px;
                    height: 46px;
                    overflow: hidden;
                    border-radius: 50%;
                    img {
                        width:46px;
                    }
                }
                &-text {
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    margin-left:15px;
                    &-no {
                        font-size: 12px;
                        transform: scale(0.9,0.9);
                        transform-origin: 0 50% 0;
                        img {
                            width: 12px;
                            height: 12px;
                            margin-left: 1px;
                            border-radius: 0;
                        }
                    }
                    &-star {
                        display: flex;
                        align-items: center;
                    }
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
