<template>
  <div class="work-total-price">
      <div :class="{'title':black}">{{title}}</div>
      <div :class="{'title':black,'detail':brown}"><slot></slot>￥{{detail}}</div>
  </div>
</template>

<script>

  export default {
    name: 'workTotalPrice',
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
      title:String,
      detail:String,
      black:false,
      brown:false,
    },
    methods: {
    },
    components: {
    }
  }
</script>

<style scoped lang="sass" type="text/scss">
    @function px($px) {
        @return ($px/20) + rem;
    }
    .work-total-price {
        font-size:12px;
        line-height: px(22);
        font-family:PingFangSC-Regular;
        font-weight:400;
        display: flex;
        justify-content: space-between;
        color: #676767;
        .title {
            color: #1A1919;
        }
        .detail {
            color: #B45F1A!important;
        }
    }
</style>
