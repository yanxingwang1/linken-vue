<template>
  <div class="license-plate noselect">
    <!--<div class="cph-wrap cph-wrap-shadow">-->
    <!--<span><strong style="opacity: ">苏</strong></span><span class=""></span><span class=""></span><span-->
    <!--class=""></span><span class=""></span><span class=""></span><span></span>-->
    <!--</div>-->
    <div class="cph-wrap" style="z-index: 2" @click="cphInputClick">
      <span :class="{active: (activeIndex-1)==index}" v-for="(item,index) in cph">{{item}}</span>
    </div>

    <transition name="slide">
      <div class="keyboard-wrap" @click="clickBoard" v-show="show_keyboard">
        <div class="keyboard-mask"
             @click="clickBoardMask"
        ></div>
        <div class="keyboard" style="justify-content: flex-end;" v-if="activeIndex==7">
          <span class="k-done" v-on:>完成</span>
        </div>
        <div v-if="activeIndex==0">
          <div class="keyboard">
            <span v-for="item in provice.slice(0,10)">{{ item }}</span>
          </div>
          <div class="keyboard">
            <span v-for="item in provice.slice(10,19)">{{ item }}</span>
          </div>
          <div class="keyboard">
            <span v-for="item in provice.slice(19,26)">{{ item }}</span>
          </div>
          <div class="keyboard">
            <span v-for="item in provice.slice(26)">{{ item }}</span>
            <span class="k-del"></span>
          </div>
        </div>
        <div v-else>
          <div class="keyboard" v-if="activeIndex > 1">
            <span v-for="item in numbers">{{ item }}</span>
          </div>
          <div class="keyboard">
            <span v-for="item in letters.slice(0,10)">{{ item }}</span>
          </div>
          <div class="keyboard">
            <span v-for="item in letters.slice(10,19)">{{ item }}</span>
          </div>
          <div class="keyboard">
            <span v-for="item in letters.slice(19)">{{ item }}</span>
            <span v-if="activeIndex>=6" style="position: absolute; left: 2px;">挂</span>
            <span class="k-del"></span>

          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
  export default {
    name: "VehicleKeyboard",
    data() {
      return {
        provice: ["京", "津", "沪", "渝", "翼", "豫", "云", "辽", "黑", "湘", "皖", "鲁", "新", "苏", "浙", "赣", "鄂", "桂", "甘", "晋", "蒙", "陕", "吉", "闵", "贵", "粤", "青", "藏", "川", "宁", "琼"],
        numbers: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"],
        letters: ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "A", "S", "D", "F", "G", "H", "J", "K", "L", "Z", "X", "C", "V", "B", "N", "M"],
        cph: [],
        show_keyboard: false
      }
    },
    props: {
      value:{
        type:Array
      }
    },
    watch:{
      value(val){
        if (val.length == 0)
        this.cph = this.value
      }
    },
    methods: {
      clickBoard: function (e) {
        if (e.target.tagName.toLowerCase() == 'span') {
          if (e.target.className.indexOf('k') == -1 && this.cph.length < 7) {
            this.cph.push(e.target.textContent)
          }

          if (e.target.className == 'k-del') {
            this.cph.pop()
          }

          if (e.target.className == 'k-done') {
            // this.setPlateNumber(this.cph)
            this.cphInputClick()
          }
          this.$emit('input', this.cph)
        }
      },
      cphInputClick: function () {
        this.show_keyboard = !this.show_keyboard
      },
      clickBoardMask() {
        console.log('clickBoardMask')
        this.cphInputClick()
      }
    },
    computed: {
      activeIndex: function () {
        return this.cph.length
      }
    }
  }
</script>

<style scoped lang="sass" type="text/scss">
  .noselect {
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    width: 100%;
    height: 40px;
  }

  .license-plate .cph-wrap {
    display: flex;
    justify-content: flex-start;
    font-size: 18px;
    height: 40px;
    line-height: 40px;
    border: solid 1px rgb(230, 230, 230);
    border-radius: 3px;
    padding: 2px 10px;
    align-items: center;
    /*line-height: 55px;*/
    /*min-height: 55px;*/
    /*position: absolute;*/
    /*left: 15px;*/
    /*right: 15px;*/
    /*top: 15px;*/
  }

  .license-plate .cph-wrap-shadow {
    /*box-shadow: 0 1px 8px rgba(92, 169, 214, .43);*/
    /*background: #f7f7f7;*/
    /*z-index: 0;*/
  }

  .license-plate .cph-wrap span {
    text-align: center;
    position: relative;
    /*width: 20px;*/
    display: inline-block;
    height: 20px;
    line-height: 20px;
    font-size: 16px;
    /*margin-right: 1px;*/
    font-weight: normal;
  }

  /*.license-plate .cph-wrap-shadow span::before {*/
  /*content: '';*/
  /*display: block;*/
  /*height: 30px;*/
  /*width: 1px;*/
  /*background: #83d4ff;*/
  /*position: absolute;*/
  /*top: 0;*/
  /*margin-top: 13px;*/
  /*right: 0;*/
  /*box-shadow: 0 0 5px rgba(92, 169, 214, .43);*/
  /*}*/

  /*.license-plate .cph-wrap span:last-child::before {*/
  /*content: none;*/
  /*}*/

  /*.license-plate .cph-wrap .active {*/
  /*border-bottom: 3px solid #007AFF;*/
  /*background: #fff;*/
  /*width: 14%;*/
  /*}*/

  .license-plate .keyboard-wrap {
    background: #CFD3DD;
    padding: 10px 2px 0;
    position: fixed;
    bottom: 0;
    width: 100%;
    left: 0;
  }

  .license-plate .keyboard-mask {
    /*background: rgba(111, 111, 111, 0.5);*/
    height: 200vh;
    position: absolute;
    left: 0;
    width: 100%;
    top: -100vh;
  }

  .license-plate .keyboard {
    display: flex;
    justify-content: center;
    flex-flow: row wrap;
    position: relative;
  }

  .license-plate .keyboard span {
    background: #fff;
    border-radius: 4px;
    box-shadow: 0 1px 2px #666;
    width: calc(10% - 4px);
    text-align: center;
    height: 46px;
    line-height: 46px;
    margin: 0 2px 8px;
  }

  .license-plate .keyboard > div {
    display: flex;
  }

  .license-plate .keyboard .k-del {
    background: #ABB1BD url(./../imgs/x-mark.png) no-repeat center center;
    width: 40px;
    position: absolute;
    right: 2px;
    display: block;

  }

  .license-plate .keyboard .k-del img {
    display: block;
    margin: 9px auto;
  }

  .license-plate .keyboard .k-done {
    width: 72px;
    background: #007AFF;
    color: #fff;
    height: 38px;
    line-height: 38px;
  }

  .license-plate .slide-enter-active, .slide-leave-active {
    transition: all .3s;
    opacity: 1;
    transform: translateY(0);
  }

  .license-plate .slide-enter, .slide-leave-to /* .fade-leave-active below version 2.1.8 */
  {
    opacity: 0;
    transform: translateY(400px);
  }
</style>
