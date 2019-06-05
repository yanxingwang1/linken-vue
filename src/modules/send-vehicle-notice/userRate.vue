<template>
  <div @touchmove.prevent>
    <div class="user-rate">
      <div class="user-rate-title">{{hasRated?'感谢您的评价':'您的评价会让我们做的更好'}}</div>
      <question
        title="对本次林肯中心的服务评价"
        :disabled="hasRated"
        :rate="rateValue.assStatus"
        @changeSelect="val=>{this.userRate=val}"
      ></question>
      <question
        title="对本次林肯代驾专员的服务评价"
        :disabled="hasRated"
        :rate="rateValue.eAssStatus"
        @changeSelect="val=>{this.driverRate=val}"
      ></question>
      <div class="user-rate-show" v-if="rateValue.remark!=''&&rateValue.remark!=null">
        <div class="user-rate-show-date">2019年3月10日 20:30</div>
        <div class="user-rate-show-text">{{rateValue.remark}}</div>
      </div>
      <div :class="{'visibility-hidden':hasRated}" class="user-rate-button">
        <mt-button
          type="default"
          :disabled="userRate==''||driverRate==''"
          @click="backUserRate()"
        >提交评价</mt-button>
      </div>
    </div>
  </div>
</template>

<script>
import Question from "./components/Question";
import { Button } from "mint-ui";
export default {
  name: "fetchAndDeliverRate",
  components: {
    Question,
    Button
  },
  props: {
  },
  computed: {
    // showComit(){
    //   var showComit=false;
    //   if(this.userRate=="90061003"||this.userRate=="90061004"||this.driverRate=="90061003"||this.driverRate=="90061004"){
    //       showComit=true;
    //   }
    //   return showComit;
    // },
  },
  data() {
    return {
      userRate: "",
      driverRate: "",
      userRateText: "",
      rateValue: {},
      hasRated: false,
      remark: false,
    };
  },
  mounted() {
  },
  methods: {
    backUserRate() {
        this.userRateText = "";
        if(this.userRate=="90061003"||this.userRate=="90061004"||this.driverRate=="90061003"||this.driverRate=="90061004"){
            $.dialog({
                title: "",
                type: "wx-alert",
                // message:'你好 林肯',
                html: `
                    <style>
                        .wx-input-wrap {
                            position: relative;
                            width: 100%;
                            display: flex;
                            align-items: center;
                            font-size: 14px;
                        }
                        .wx-content {
                            position: relative;
                            width: 100%;
                            display: flex;
                            align-items: center;
                        }
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
                        }
                        .wx-textarea{
                            height: initial;
                            border-color: #FBDECD;
                        }
                        .wx-textarea::placeholder{
                            font-size: 14px;
                            color:#BBBBBB;
                        }
                        &.wx-validation{
                            justify-content: space-between;
                        }
                        button{
                            width: 40%;
                            font-size: 14px;
                            height: 36px;
                        }
                        &.port-c .wx-content .wx-input,.wx-licen-wrap{
                            border-color: #FBDECD;
                        }
                    </style>
                    <div class="wx-input-wrap port-c">
                        <div class="wx-content">
                        <textarea
                            id="user-text"
                            class="wx-input wx-textarea"
                            rows="4"
                            placeholder="看来您对我们的服务不太满意？请留下宝贵意见，帮助我们进一步改进。"
                            maxlength="50"
                        ></textarea>
                        </div>
                    </div>
                `,
                buttons: [
                {
                    title: "提交评价",
                    isBold: true,
                    callback: () => {
                    this.userRateText = document.getElementById('user-text').value
                    this.submit();
                    }
                }
                ],
                isMask: true
            });
            $("textarea")
                .off("blur")
                .on("blur", () => {
                    $(document).scrollTop(9999);
                });
        }else {
            this.submit();
        }
    },
    submit() {
        this.rateValue.remark = this.userRateText;
        this.hasRated = true;
    }
  }
};
</script>

<style scoped lang="sass" type="text/scss">
  @function px($px) {
    @return ($px/20)+rem;
  }

  .user-rate {
        position: relative;
        width:100vw;
        heigth:409px;
        .user-rate-title {
            text-align: center;
            height: px(60);
            line-height: px(40);
            font-size: px(16);
            padding: px(10) 0;
            font-weight: 500;
            color:#5A5A5A;
            background: #FFF8F3;
        }
        .user-rate-show {
          margin: 11px 23px;
          padding: 10px 17px;
          min-height: 100px;
          background: #F5F5F5;
          border-radius:4px;
          color: #3E3E3E;
          font-size: 12px;
          font-weight: 400;
          text-align: justify;
          .user-rate-show-text {
            font-size: 14px;
            margin-top: 12px;
          }
        }
        .user-rate-button {
          padding: 30px 24px;
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
