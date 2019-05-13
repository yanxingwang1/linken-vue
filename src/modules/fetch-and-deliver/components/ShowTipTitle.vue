<template>
  <div class="show-tip-title">
      {{title}}
  </div>
</template>

<script>

  export default {
    name: 'ShowTipTitle',
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
    .show-tip-title {
        font-size:14px;
        color:#323232;
        font-family:PingFangSC-Regular;
        font-weight:400;
        border-bottom:1px solid #E2E2E2;
        padding:19px 0 13px 0;
        margin-bottom:13px;
    }
</style>
