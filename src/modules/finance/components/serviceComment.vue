<template>
  <div class="show-comment-detail">
      <div class="date">{{date}}</div>
      <div class="detail">{{detail}}</div>
  </div>
</template>

<script>

  export default {
    name: 'showTip',
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
      date:String,
      detail:String
    },
    methods: {
    },
    components: {
    }
  }
</script>

<style scoped lang="sass" type="text/scss">
    .show-comment-detail {
        font-family: PingFangSC-Regular;
        padding:0 20px;
        .date {
            font-size: 12px;
            color: #979797;
            letter-spacing: -0.32px;
            text-align: right;
        }
        .detail {
            font-size: 14px;
            color: #323232;
            letter-spacing: 0.37px;
            text-align: justify;
            line-height: 26px;
        } 
    }
</style>
