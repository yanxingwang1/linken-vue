<template>
  <div :class="{'incoming-state-detail':true,'incoming-state-detail-grey':status=='1'}">
        <div :class="{
            'line':border&&status=='1',
            'line-after':border&&status=='3',
            'line-no-border':!border&&status=='1',
            'line-no-border-after':!border&&status=='3'}">
            <div class="top-tip"></div>
        </div>
        <div class="title">{{title}}</div>
  </div>
</template>

<script>

  export default {
    name: 'stateDetail',
    data() {
      return {
      }
    },
    computed: {
    },
    watch: {
    },
    props: {
      title:String,
      border:Boolean,
      status:String
    },
    methods: {
    },
    components: {
    }
  }
</script>

<style scoped lang="sass" type="text/scss">
    .incoming-state-detail {
        display:flex;
        font-family: PingFangSC-Regular;
        font-size: 12px;
        font-weight:400;
        color: #343434;
        letter-spacing: -0.39px;
        .title {
            width:26%;
            white-space: nowrap;
            letter-spacing: -0.39px;
            display: flex;
            justify-content: space-between;
            padding-right: 9%;
            margin-top:-2px;
        }
        .line{
            height:20px;
            width:6%;
            border-left:1px solid #E2E2E2;
            margin-top: 13px;
            margin-left:4px;
            .top-tip {
                height:7px;
                width:7px;
                background: #CDCDCD;
                margin-left: -4px;
                margin-top: -10px;
                border-radius: 50%;
            }
        }
        .line-after {
            height:20px;
            width:6%;
            border-left:1px solid #E2E2E2;
            margin-top: 13px;
            margin-left:4px;
            .top-tip {
                height:7px;
                width:7px;
                background: #C5844E;
                margin-left: -4px;
                margin-top: -10px;
                border-radius: 50%;
            }
        }
        .line-no-border{
            width:6%;
            margin-top: 16px;
            margin-left: 4px;
            .top-tip {
                height:7px;
                width:7px;
                background: #CDCDCD;
                margin-left: -3px;
                margin-top: -13px;
                border-radius: 50%;
            }
        }
        .line-no-border-after{
            width:6%;
            margin-top: 16px;
            margin-left: 4px;
            .top-tip {
                height:7px;
                width:7px;
                background: #C5844E;
                margin-left: -3px;
                margin-top: -13px;
                border-radius: 50%;
            }
        }
        .date {
            width:65%;
            letter-spacing: -0.39px;
            margin-top:1px;
        }
    }
    .incoming-state-detail-grey {
        color:#BDBDBD;
    }
</style>
