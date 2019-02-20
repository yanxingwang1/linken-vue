<template>
  <div class="continental-index">
    <img class="img-width" v-lazy="locationBaseUtl + 'fs01/imgs/continental/continental-01.jpg'"/>
    <img class="img-width" v-lazy="locationBaseUtl + 'fs01/imgs/continental/continental-02.jpg'"/>
    <img class="img-width" v-lazy="locationBaseUtl + 'fs01/imgs/continental/continental-03.jpg'"/>
    <img class="img-width" v-lazy="locationBaseUtl + 'fs01/imgs/continental/continental-04.jpg'"/>
    <img class="img-width" v-lazy="locationBaseUtl + 'fs01/imgs/continental/continental-05.jpg'"/>
    <img class="img-width last-img" v-lazy="locationBaseUtl + 'fs01/imgs/continental/continental-06.jpg'"/>
  </div>
</template>

<script>

  export default {
    name: "navigator",
    components: {
        
    },
    created() {
      end_time = new Date().getTime();
      console.log("index加载时间：", end_time - start_time, "ms");
    },
    beforeDestroy() {
      clearInterval(this.timer)
    },
    data() {
      return {
        locationBaseUtl: location.origin + '/',
      }
    },
    directives: {
    },
    watch:{
      
    },
    methods: {
      init() {
      },
      
          
    },
    activated: function () {
      // if(this.$route.query.type=='preview'){
      //   this.init();// this.carOwnerDto.totalPrice = (this.$route.query.money || 81500);
      //   this.configId = this.$route.query.id;
      // }
      $(document).attr('title','林肯大陆CONTINENTAL');
    },
    beforeMount() {
      $(document).attr('title','林肯大陆CONTINENTAL');
    },
  

    mounted() {
    
      // return this.$nextTick(() => this.init());
    }
  };

</script>

<style lang="sass" scoped>
  .continental-index {
    padding: 20px 16px 12px;
    background-color: #fff;
    .img-width {
      width:100%;
      padding-bottom: 8px;
    }
    .last-img {
      padding-bottom: 70px;
    }
  }
</style>
