<template>
  <div class="work-order-title">
      <div class="title">{{title}}<slot></slot></div>
  </div>
</template>

<script>

  export default {
    name: 'workOrderTitle',
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
      title:String
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
    .work-order-title {
        font-size:14px;
        height: px(40);
        line-height: px(40);
        font-family:PingFangSC-Regular;
        font-weight:400;
        color: #1A1919;
        background: #FFF8F3;
        padding: 0 px(20);
    }
</style>
