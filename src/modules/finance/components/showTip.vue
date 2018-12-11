<template>
  <div class="show-tip-detail">
      <div class="title">{{title}}</div>
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
    .show-tip-detail {
        display:flex;
        margin-bottom:5px;
        .title {
            width:35%;
            font-family: PingFangSC-Regular;
            font-size: 12px;
            color: #676767;
            letter-spacing: -0.39px;
        }
        .detail {
            width:65%;
            font-family: PingFangSC-Regular;
            font-size: 12px;
            color: #323232;
            letter-spacing: -0.39px;
        }
    }
</style>
