<template>
  <div :class="{'incoming-state-detail':true,'incoming-state-detail-grey':status=='1'||status=='4','incoming-state-detail-brown':status=='2'}">
        <div class="title">{{title}}</div>
        <div :class="{
            'line':border&&status=='1',
            'line-on':border&&status=='2',
            'line-after':border&&status=='3',
            'line-after-none':border&&status=='4',
            'line-after-no-next':border&&status=='5',
            'line-no-border':!border&&status=='1',
            'line-no-border-on':!border&&status=='2',
            'line-no-border-after':!border&&status=='3'}">
            <div class="top-tip"></div>
        </div>
        <div class="date">{{date}}</div>
  </div>
</template>

<script>

  export default {
    name: 'stateDetail',
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
      date:String,
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
        color: #323232;
        letter-spacing: -0.39px;
        .title {
            width:26%;
            white-space: nowrap;
            letter-spacing: -0.39px;
            display: flex;
            justify-content: space-between;
            padding-right: 9%;
            margin-top:1px;
        }
        .line{
            height:28px;
            width:9%;
            border-left:1px solid #BDBDBD;
            position: relative;
            top: 7px;
            .top-tip {
                height:5px;
                width:5px;
                background: #BDBDBD;
                margin-left: -3px;
                border-radius: 5px;
            }
        }
        .line-on{
            height:28px;
            width:9%;
            border-left:1px solid #BDBDBD;
            position: relative;
            top: 7px;
            .top-tip {
                height:7px;
                width:7px;
                border:1px solid #B45F1A;
                background: #FFB57B;
                margin-left: -4px;
                border-radius: 5px;
            }
        }
        .line-after {
            height:28px;
            width:9%;
            border-left:1px solid #FFB57B;
            position: relative;
            top: 7px;
            .top-tip {
                height:5px;
                width:5px;
                background: #FFB57B;
                margin-left: -3px;
                border-radius: 5px;
            }
        }
        .line-after-none {
            height:28px;
            width:9%;
            border-left:1px solid #BDBDBD;
            position: relative;
            top: 7px;
            .top-tip {
                height:5px;
                width:5px;
                background: #BDBDBD;
                margin-left: -3px;
                border-radius: 5px;
            }
        }
        .line-after-no-next {
            height:28px;
            width:9%;
            border-left:1px solid #BDBDBD;
            position: relative;
            top: 7px;
            .top-tip {
                height:5px;
                width:5px;
                background: #FFB57B;
                margin-left: -3px;
                border-radius: 5px;
            }
        }
        .line-no-border{
            width:9%;
            position: relative;
            top: 7px;
            .top-tip {
                height:5px;
                width:5px;
                background: #BDBDBD;
                margin-left: -2px;
                border-radius: 5px;
            }
        }
        .line-no-border-on {
            width:9%;
            position: relative;
            top: 7px;
            .top-tip {
                height:7px;
                width:7px;
                border:1px solid #B45F1A;
                background: #FFB57B;
                margin-left: -3px;
                border-radius: 5px;
            }
        }
        .line-no-border-after{
            width:9%;
            position: relative;
            top: 7px;
            .top-tip {
                height:5px;
                width:5px;
                background: #FFB57B;
                margin-left: -2px;
                border-radius: 5px;
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
    .incoming-state-detail-brown {
        color:#B45F1A;
    }
</style>
