<template>
  <div class="mkx-car-book-index">
    <img class="img-width" v-lazy="locationBaseUtl + 'fs01/imgs/mkx-car-book/mkx-car-book-01.jpg'"/>
    <img class="img-width" v-lazy="locationBaseUtl + 'fs01/imgs/mkx-car-book/mkx-car-book-02.jpg'"/>
    <img class="img-width" v-lazy="locationBaseUtl + 'fs01/imgs/mkx-car-book/mkx-car-book-03.jpg'"/>
    <img class="img-width" v-lazy="locationBaseUtl + 'fs01/imgs/mkx-car-book/mkx-car-book-04.jpg'"/>
    <img class="img-width" v-lazy="locationBaseUtl + 'fs01/imgs/mkx-car-book/mkx-car-book-05.jpg'"/>
    <img class="img-width" v-lazy="locationBaseUtl + 'fs01/imgs/mkx-car-book/mkx-car-book-06.jpg'"/>
    <img class="img-width" v-lazy="locationBaseUtl + 'fs01/imgs/mkx-car-book/mkx-car-book-07.jpg'"/>
    <img class="img-width" v-lazy="locationBaseUtl + 'fs01/imgs/mkx-car-book/mkx-car-book-08.jpg'"/>
    <img class="img-width" v-lazy="locationBaseUtl + 'fs01/imgs/mkx-car-book/mkx-car-book-09.jpg'"/>
    <img class="img-width" v-lazy="locationBaseUtl + 'fs01/imgs/mkx-car-book/mkx-car-book-10.jpg'"/>
    <img class="img-width" v-lazy="locationBaseUtl + 'fs01/imgs/mkx-car-book/mkx-car-book-11.jpg'"/>
    <img class="img-width" v-lazy="locationBaseUtl + 'fs01/imgs/mkx-car-book/mkx-car-book-12.jpg'"/>
    <img class="img-width" v-lazy="locationBaseUtl + 'fs01/imgs/mkx-car-book/mkx-car-book-13.jpg'"/>
    <img class="img-width" v-lazy="locationBaseUtl + 'fs01/imgs/mkx-car-book/mkx-car-book-14.jpg'"/>
    <img class="img-width" v-lazy="locationBaseUtl + 'fs01/imgs/mkx-car-book/mkx-car-book-15.jpg'"/>
    <img class="img-width last-img" v-lazy="locationBaseUtl + 'fs01/imgs/mkx-car-book/mkx-car-book-16.jpg'"/>
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
      $(document).attr('title','林肯MKX');
    },
    beforeMount() {
      $(document).attr('title','林肯MKX');
    },
  

    mounted() {
    
      // return this.$nextTick(() => this.init());
    }
  };

</script>

<style lang="sass" scoped>
  .mkx-car-book-index {
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
