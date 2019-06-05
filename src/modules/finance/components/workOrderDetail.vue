<template>
  <div class="work-order-detail">
      <div class="title">{{title}}</div>
      <div class="detail">{{detail}}</div>
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
      title:String,
      detail:String
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
    .work-order-detail {
        font-size:12px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        display: flex;
        .title {
            width: 30%;
            color: #676767;
        }
        .detail {
            width: 70%;
            color: #1A1919;
        }
    }
</style>
