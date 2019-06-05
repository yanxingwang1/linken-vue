<template>
  <div :class="{'work-project-detail':true,'work-project-detail-border':borderBottom}">
      <div class="name">{{name}}</div>
      <div class="number"><div class="cheng">✖</div>{{number}}</div>
      <div class="price"><div style="float:right;">￥{{price}}</div></div>
  </div>
</template>

<script>
  export default {
    name: 'workProjectDetail',
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
      name:String,
      number:[Number,String],
      price:[Number,String],
      borderBottom: Boolean,
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
    .work-project-detail {
        font-size:12px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        margin: 0 px(20);
        padding: px(27) 0;
        display: flex;
        justify-content: space-between;
        .name {
            width: 60%;
            font-family:PingFangSC-Regular;
            color: #1A1919;
            font-weight:400;
        }
        .number {
            color: #9F9F9F;
            font-family:PingFangSC-Regular;
            font-weight:400;
            display: flex;
            .cheng {
                transform: scale(0.6, 0.8);
                transform-origin: 90% 80% 0;
            }
        }
        .price {
            width: 30%;
            color: #1A1919;
            font-weight:500;
            font-family:PingFangSC-Medium;
        }
    }
    .work-project-detail-border {
        border-bottom: 1px solid #E2E2E2;
    }
</style>
