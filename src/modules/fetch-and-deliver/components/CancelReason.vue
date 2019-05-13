<template>
  <!-- 服务工程师送车订单明细 -->
  <div class="cancel-reason-index" @touchmove.prevent>
    <div class="tree-list-picker-wrap">
        <ul id="treelist">  
          <li v-for="(item,i) in reasonChoose" :key="i" :data-val="item.id">{{item.value}}</li>
        </ul>
    </div>
    <div class="cancel-reason-button">
        <mt-button
            type="default"
            @click="back()"
        >确认取消</mt-button>
    </div>
  </div>
</template>

<script>
import { Button } from "mint-ui";
import { setTimeout } from "timers";

export default {
  name: "cancelReason",
  components: {
  },
  beforeDestroy() {
    clearInterval(this.timer);
  },
  props: {
      reasonChoose:{
          type: Array
      }
  },
  data() {
    return {
      treelistIns: null,
      choose:''
    };
  },
  directives: {},
  watch: {},
  methods: {
    back() {
        this.$emit('cancel', this.choose);
    }
  },

  mounted() {
    this.treelistIns = mobiscroll.treelist('#treelist', {
        display: 'inline',
        layout: 'liquid',
        rows: 3,
        height: 46,
        showInput: false,
        defaultValue: [this.reasonChoose[0].id], 
        circular: false,
        cssClass: 'my-yan-picker-wrap',
        touchUi: false,
        headerText: function (valueText) { return "取消原因"; } ,
        onChange: (event, inst) => {
          // this.$emit('change', event.valueText)
          this.choose = event.valueText;
        },
        onInit: (event, inst) => {
          // console.log('onInit', moment(inst.getVal(true)).format('HH:mm'))
          // this.$emit('input', moment(inst.getVal(true)).format('HH:mm'))
        }
        // circular: [false, false, false],
        // maxWidth:150,
    });
  }
};
</script>

<style lang="sass">
  @function px($px) {
    @return ($px/20)+rem;
  }
    .cancel-reason-index {
        .tree-list-picker-wrap {
            width: 100vw;
            padding: 0 10vw;
            .my-yan-picker-wrap {
                margin-top: px(10);
                .mbsc-fr-hdr {
                    font-size: 18px;
                    border-bottom: none!important;
                }
                .mbsc-fr-c {
                    margin-top: px(-15);
                }
                .mbsc-btn-e {
                    font-size: 14px;
                }
                .mbsc-sc-itm-sel, .mbsc-sc-whl-gr-3d .mbsc-sc-itm {
                    color: #363636;
                }
                .mbsc-sc-whl-gr-3d .mbsc-sc-itm-3d {
                    color: #CACACA;
                }
            }
        }
        .cancel-reason-button {
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
    }
</style>
