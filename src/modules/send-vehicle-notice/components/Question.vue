<template>
    <div class="question-inner-main">
        <div class="question-inner-main-title">{{title}}</div>
        <checker v-model="select" :radio-required="true">
            <checker-item value="90061001">
                <img ref="imgChooseV" class="choose-img-style" :src="require('../../sales-director/imgs/very-satisfied-grey.png')"/>
                <div class="question-inner-text">非常满意</div>
            </checker-item>
            <checker-item value="90061002">
                <img ref="imgChooseS" class="choose-img-style" :src="require('../../sales-director/imgs/satisfied-grey.png')"/>
                <div class="question-inner-text">满意</div>
            </checker-item>
            <checker-item value="90061003">
                <img ref="imgChooseC" class="choose-img-style" :src="require('../../sales-director/imgs/commonly-grey.png')"/>
                <div class="question-inner-text">一般</div>
            </checker-item>
            <checker-item value="90061004">
                <img ref="imgChooseD" class="choose-img-style" :src="require('../../sales-director/imgs/disappointment-grey.png')"/>
                <div class="question-inner-text">不满意</div>
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
        disabled: {
            type: Boolean
        },
        rate: {
            type: String
        },
        title: {
            type: String
        }
    },
    data() {
      return {
          select:''
      }
    },
    watch: {
        select:function() {
            if(!this.disabled){
                if(this.select=='90061001'){
                    // this.desc = '非常满意';
                    this.$refs.imgChooseV.src = require('../../sales-director/imgs/very-satisfied.png');
                    this.$refs.imgChooseS.src = require('../../sales-director/imgs/satisfied-grey.png');
                    this.$refs.imgChooseC.src = require('../../sales-director/imgs/commonly-grey.png');
                    this.$refs.imgChooseD.src = require('../../sales-director/imgs/disappointment-grey.png');
                }else if(this.select=='90061002'){
                    // this.desc = '满意';
                    this.$refs.imgChooseV.src = require('../../sales-director/imgs/very-satisfied-grey.png');
                    this.$refs.imgChooseS.src = require('../../sales-director/imgs/satisfied.png');
                    this.$refs.imgChooseC.src = require('../../sales-director/imgs/commonly-grey.png');
                    this.$refs.imgChooseD.src = require('../../sales-director/imgs/disappointment-grey.png');
                }else if(this.select=='90061003'){
                    // this.desc = '一般';
                    this.$refs.imgChooseV.src = require('../../sales-director/imgs/very-satisfied-grey.png');
                    this.$refs.imgChooseS.src = require('../../sales-director/imgs/satisfied-grey.png');
                    this.$refs.imgChooseC.src = require('../../sales-director/imgs/commonly.png');
                    this.$refs.imgChooseD.src = require('../../sales-director/imgs/disappointment-grey.png');
                }else if(this.select=='90061004'){
                    // this.desc = '失望';
                    this.$refs.imgChooseV.src = require('../../sales-director/imgs/very-satisfied-grey.png');
                    this.$refs.imgChooseS.src = require('../../sales-director/imgs/satisfied-grey.png');
                    this.$refs.imgChooseC.src = require('../../sales-director/imgs/commonly-grey.png');
                    this.$refs.imgChooseD.src = require('../../sales-director/imgs/disappointment.png');
                }
                this.$emit('changeSelect',this.select);
            }
        }
    },
    methods:{

    },
    mounted() {
        if(this.disabled) {
            if(this.rate=='90061001'){
                // this.desc = '非常满意';
                this.$refs.imgChooseV.src = require('../../sales-director/imgs/very-satisfied.png');
            }else if(this.rate=='90061002'){
                // this.desc = '满意';
                this.$refs.imgChooseS.src = require('../../sales-director/imgs/satisfied.png');
            }else if(this.rate=='90061003'){
                // this.desc = '一般';
                this.$refs.imgChooseC.src = require('../../sales-director/imgs/commonly.png');
            }else if(this.rate=='90061004'){
                // this.desc = '失望';
                this.$refs.imgChooseD.src = require('../../sales-director/imgs/disappointment.png');
            }
        }
    },
  }
</script>
<style lang="sass" scoped>
    @function px($px){
        @return ($px/20)+rem;
    }
    .question-inner-main {
        height:px(140);
        &-title {
            font-size: 14px;
            text-align: center;
            color: #C6C6C6;
            padding: px(25) 0 px(15) 0;
        }
        .vux-checker-box {
            display: flex;
            justify-content: space-between;
            padding:0 px(50);
        }
        .vux-checker-item {
            text-align: center;
            img {
                width:px(42);
                height:px(42);
            }
        }
        .vux-tap-active:active {
            background-color: unset;
        }
        .question-inner-text {
            font-size:px(12);
            font-family:PingFangSC-Regular;
            font-weight:400;
            color:rgba(62,62,62,1);
            margin-top: px(12);
        }
    }
    
</style>



