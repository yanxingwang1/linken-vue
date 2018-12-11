<template>
  <div class="wx-input-wrap" @touchmove.prevent>
    <div class="wx-label">
      {{label}}
      <span class="reqired" v-if="required">*</span></div>
    <div class="wx-content">
      <!--<input class="wx-input" type="email">-->
      <div class="wx-licen-wrap">
        <div class="capital" @click="show_keyboard=!show_keyboard">{{value?value.match(/[\u4e00-\u9fa5]/g).join(""):''}}</div>
        <input class="licen-input" :value="value.replace(/[\u4e00-\u9fa5]/g, '')" @input="inputVal = $event.target.value" type="email" maxlength="5" placeholder="请输入您的车牌号码">
      </div>
    </div>
    <mt-popup
      v-model="show_keyboard"
      position="bottom">
      <div class="cph-key-board-wrap">
        <div class="key-board-0">
          <div @click="keywordHandleClick(item,i)" class="keyword" v-for="(item,i) in provice">{{item}}</div>
          <div @click="keywordHandleClick('')" class="keyword"></div>
        </div>
      </div>
    </mt-popup>
  </div>
</template>

<script>
  import './../assets/style/form.scss'
  import { Popup } from 'mint-ui'
  export default {
    name: "WxLicenSelect",
    components:{
      Popup
    },
    data() {
      return {
        show_keyboard:false,
        provice: ["京", "津", "沪", "渝", "翼", "豫", "云", "辽", "黑", "湘", "皖", "鲁", "新", "苏", "浙", "赣", "鄂", "桂", "甘", "晋", "蒙", "陕", "吉", "闵", "贵", "粤", "青", "藏", "川", "宁", "琼"],
        proviceWord:'',
        inputVal:''
      }
    },
    props: {
      label: {
        type: String,
        default: '车牌号码'
      },
      placeholder: {
        type: String
      },
      value: {
        type: String,
        default: ''
      },
      required: {
        type: Boolean,
        default: false
      }
    },
    watch:{
      inputVal(v){
        this.test()
      }
    },
    methods:{
      keywordHandleClick(item,i){
        console.log(item)
        this.proviceWord = item
        this.test()
      },
      test(){
        this.$emit('input',this.proviceWord + this.inputVal)
      }
    }
  }
</script>

<style scoped lang="sass" type="text/scss">
  @function px($px) {
    @return ($px/20)+rem;
  }
  .cph-key-board-wrap {
    position: relative;
    width: 100vw;
    color: #323232;
    .key-board-0{
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      background-color: #EEEEEE;
      padding: 10px;

      .keyword {
        background-color: #ffffff;
        width: px(34);
        height: px(40);
        line-height: px(40);
        font-size: 18px;
        text-align: center;
        border-radius: 5px;
        margin: 5px;
        &:last-child{
          background: #DEDEDE url("./imgs/key-delete.png") center/18px no-repeat;
        }
      }
    }
  }
</style>
