<template>
    <div class="route-main">
       <span class="title">{{title}}</span>
    </div>
</template>

<script>
  export default {
    name: 'route-title',
    props: {
        title:{
            type:String,
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
    },
  }
</script>
<style lang="sass" scoped>
    .route-main {
        font-family:'PingFangSC-Regular';
        margin: 30px 0 10px 0;
        .title {
            font-size:14px;
            color:#FFFFFF;
            background-color:#B45F1A;
            padding: 1px 10px;
        }
    }
</style>



