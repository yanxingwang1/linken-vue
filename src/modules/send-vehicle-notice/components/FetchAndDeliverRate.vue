<template>
  <div @touchmove.prevent>
    <div class="fetch-and-deliver-rate">
      <div class="fetch-and-deliver-rate-title">您的评价会让我们做的更好</div>
      <question
        title="对本次林肯中心的服务评价"
        :disabled="hasRated"
        :rate="rateValue.assStatus"
        @changeSelect="val=>{this.userRate=val}"
      ></question>
      <question
        title="对本次送车服务评价"
        :disabled="hasRated"
        :rate="rateValue.eAssStatus"
        @changeSelect="val=>{this.driverRate=val}"
      ></question>
      <div class="fetch-and-deliver-rate-show" v-if="remark">
        <div class="fetch-and-deliver-rate-show-date">{{rateValue.date}}</div>
        <div class="fetch-and-deliver-rate-show-text">{{rateValue.remark}}</div>
      </div>
      <div class="wx-input-wrap port-c" v-else  v-show="showComit">
        <div class="wx-content">
          <textarea
            class="wx-input wx-textarea"
            rows="4"
            placeholder="看来您对我们的服务不太满意？请留下宝贵意见，帮助我们进一步改进。"
            v-model="userRateText"
            maxlength="50"
            @blur="onblurBottom()"
          ></textarea>
        </div>
      </div>
      <div :class="{'visibility-hidden':hasRated}" class="fetch-and-deliver-rate-button">
        <mt-button
          type="default"
          :disabled="userRate==''||driverRate==''"
          @click="backUserRate()"
        >确认提交</mt-button>
      </div>
    </div>
  </div>
</template>

<script>
import Question from "./Question";
import { Button } from "mint-ui";
export default {
  name: "fetchAndDeliverRate",
  components: {
    Question,
    Button
  },
  props: {
    hasRated: {
      type: Boolean
    },
    rateValue: {
      type: Object
    },
    remark:{
      type:String
    }
  },
  computed: {
    showComit(){
      var showComit=false;
      if(this.userRate=="90061003"||this.userRate=="90061004"||this.driverRate=="90061003"||this.driverRate=="90061004"){
          showComit=true;
      }
      return showComit;
    },
  
 
  },
  data() {
    return {
      userRate: "",
      driverRate: "",
      userRateText: ""
    };
  },
  mounted() {

  },
  methods: {
    backUserRate() {
      this.$Bus.$emit("userRate", { assStatus: this.userRate,eAssStatus:this.driverRate, remark: this.userRateText });
    },
    onblurBottom() {
      $("body").scrollTop(0);
    }
  }
};
</script>

<style scoped lang="sass" type="text/scss">
  @function px($px) {
    @return ($px/20)+rem;
  }

  .fetch-and-deliver-rate {
        position: relative;
        width:100vw;
        heigth:409px;
        .fetch-and-deliver-rate-title {
            text-align: center;
            height: px(60);
            line-height: px(40);
            font-size: px(16);
            padding: px(10) 0;
            font-weight: 500;
            color:#5A5A5A;
            border-bottom: 1px solid #E2E2E2;
        }
        .wx-input-wrap {
          position: relative;
          width: 100%;
          display: flex;
          align-items: center;
          font-size: 14px;
          padding: 0 23px;

          .wx-content {
            position: relative;
            width: 100%;
            display: flex;
            align-items: center;
            //height: 60px;

            .wx-input,.wx-licen-wrap {
              position: relative;
              width: 100%;
              height: 40px;
              border-radius: 4px;
              border: 1px solid rgb(230, 230, 230);
              padding: 10px 17px;
              margin: 10px 0;
              -webkit-appearance: none;
              -webkit-user-select: text;
              &::placeholder{
                font-size: 14px;
                color:#BBBBBB;
              }
            }
            .wx-textarea{
              height: initial;
            }
            &.wx-validation{
              justify-content: space-between;
              .wx-input{
                width: 50%;
              }
              button{
                width: 40%;
                font-size: 14px;
                height: 36px;
              }
            }
          }
          &.port-c{
            .wx-content{
              .wx-input,.wx-licen-wrap{
                border-color: #FBDECD;
              }
            }
          }
        }
        .fetch-and-deliver-rate-show {
          margin: 11px 23px;
          padding: 10px 17px;
          min-height: 100px;
          background: #F5F5F5;
          border-radius:4px;
          color: #3E3E3E;
          font-size: 12px;
          font-weight: 400;
          text-align: justify;
          .fetch-and-deliver-rate-show-text {
            font-size: 14px;
            margin-top: 12px;
          }
        }
        .fetch-and-deliver-rate-button {
          padding: 17px 24px 30px;
          .mint-button{
            position: relative;
            width: 100%;
            height: 44px;
            background-color: #B45F1A;
            color: #FFFFFF;
            font-size: 16px;
            &:disabled{
              background-color: #9F9F9F;
            }
            label {
              font-weight:400;
            }
            .mint-button-text{
              font-weight:400!important;
            }
          }
        }
        .visibility-hidden {
          visibility: hidden;
        }
  }

</style>
