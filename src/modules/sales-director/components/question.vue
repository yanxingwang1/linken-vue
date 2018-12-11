<template>
    <div class="question-inner-main">
        <div class="question-title-line">
            <span class="question-inner-title">{{title}}</span>
            <span class="question-inner-desc">{{desc}}</span>
        </div>
        <checker v-model="select" :radio-required="true">
            <checker-item value="10731001">
                <img ref="imgChooseV" class="choose-img-style" :src="require('../imgs/very-satisfied-grey.png')"/>
            </checker-item>
            <checker-item value="10731002">
                <img ref="imgChooseS" class="choose-img-style" :src="require('../imgs/satisfied-grey.png')"/>
            </checker-item>
            <checker-item value="10731003">
                <img ref="imgChooseC" class="choose-img-style" :src="require('../imgs/commonly-grey.png')"/>
            </checker-item>
            <checker-item value="10731004">
                <img ref="imgChooseD" class="choose-img-style" :src="require('../imgs/disappointment-grey.png')"/>
            </checker-item>
        </checker>
    </div>
</template>

<script>
  import {
      Checker, CheckerItem
  } from 'vux'
  export default {
    name: 'question',
    components: {
      Checker, CheckerItem
    },
    props: {
        title:{
            type:String,
            required:true
        },
        
    },
    data() {
      return {
          select:'',
          desc:''
      }
    },
    watch: {
        select:function() {
            if(this.select=='10731001'){
                this.desc = '非常满意';
                this.$refs.imgChooseV.src = require('../imgs/very-satisfied.png');
                this.$refs.imgChooseS.src = require('../imgs/satisfied-grey.png');
                this.$refs.imgChooseC.src = require('../imgs/commonly-grey.png');
                this.$refs.imgChooseD.src = require('../imgs/disappointment-grey.png');
            }else if(this.select=='10731002'){
                this.desc = '满意';
                this.$refs.imgChooseV.src = require('../imgs/very-satisfied-grey.png');
                this.$refs.imgChooseS.src = require('../imgs/satisfied.png');
                this.$refs.imgChooseC.src = require('../imgs/commonly-grey.png');
                this.$refs.imgChooseD.src = require('../imgs/disappointment-grey.png');
            }else if(this.select=='10731003'){
                this.desc = '一般';
                this.$refs.imgChooseV.src = require('../imgs/very-satisfied-grey.png');
                this.$refs.imgChooseS.src = require('../imgs/satisfied-grey.png');
                this.$refs.imgChooseC.src = require('../imgs/commonly.png');
                this.$refs.imgChooseD.src = require('../imgs/disappointment-grey.png');
            }else if(this.select=='10731004'){
                this.desc = '失望';
                this.$refs.imgChooseV.src = require('../imgs/very-satisfied-grey.png');
                this.$refs.imgChooseS.src = require('../imgs/satisfied-grey.png');
                this.$refs.imgChooseC.src = require('../imgs/commonly-grey.png');
                this.$refs.imgChooseD.src = require('../imgs/disappointment.png');
            }
            this.$emit('changeSelect',this.select);
        }
    },
    methods:{

    },
    mounted() {
    },
  }
</script>
<style lang="sass" scoped>
    @function px($px){
        @return ($px/20)+rem;
    }
    .question-inner-main {
        margin-top: px(20);
        .question-title-line{
            display: flex;
            justify-content: space-between;
            .question-inner-title {
                font-family: PingFangSC-Regular;
                font-size: 14px;
                color: #3E3E3E;
                letter-spacing: -0.34px;
            }
            .question-inner-desc {
                font-family: PingFangSC-Regular;
                font-size: 12px;
                color: #3E3E3E;
                letter-spacing: -0.29px;
            }
        }
        .vux-checker-box {
            display: flex;
            justify-content: space-between;
            margin-top:px(15.2);
        }
        .vux-checker-item {
            width:px(42);
            height:px(42);
            img {
                width:px(42);
                height:px(42);
            }
        }
        .vux-tap-active:active {
            background-color: unset;
        }
    }
    
</style>



