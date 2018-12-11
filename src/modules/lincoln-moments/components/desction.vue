<template>
    <div class="desction">
       <div class="desctitle">{{desc.title}}</div>
       <div class="desc"  v-for="(item,i) in desc.cons"  :key="i">
            <div class="descline">{{item.desc}}</div>
       </div>
    </div>
</template>

<script>
  export default {
    name: 'prop-event',
    props: {
        desc:{
            type:Object,
            required:true
        },
        
    },
    data() {
      return {
      }
    },
    watch: {
    },
    methods:{

    },
    mounted() {
        console.log("tempDesc",this.tempDesc)
    },
  }
</script>
<style lang="sass" scoped>
    .desction{
        font-family: lincolnmillerb, Georgia, "Microsoft Yahei", 微软雅黑, STXihei, sans-serif, Heiti, Songti;
        font-weight: normal;
        padding: 15px 30px 20px 30px;
        line-height:1.5;
        .desctitle{
            color: #000;
            font-weight:bold;
            font-size:20px;
            text-align:center;
            margin-top: 20px;
            margin-bottom: 10px;
        }
        .desc{
            font-size: 12px;
            .descline{
                text-align: center;
                color: #4f4c43;
                padding-bottom:10px;
            }
        }
    }
</style>



