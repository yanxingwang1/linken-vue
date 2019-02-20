<template>
  <div class="nautilus-index">
    <img class="img-width" v-lazy="locationBaseUtl + 'fs01/imgs/nautilus/nautilus-01.jpg'"/>
    <img class="img-width" v-lazy="locationBaseUtl + 'fs01/imgs/nautilus/nautilus-02.jpg'"/>
    <img class="img-width" v-lazy="locationBaseUtl + 'fs01/imgs/nautilus/nautilus-03.jpg'"/>
    <img class="img-width" v-lazy="locationBaseUtl + 'fs01/imgs/nautilus/nautilus-04.jpg'"/>
    <img class="img-width" v-lazy="locationBaseUtl + 'fs01/imgs/nautilus/nautilus-05.jpg'"/>
    <img class="img-width" v-lazy="locationBaseUtl + 'fs01/imgs/nautilus/nautilus-06.jpg'"/>
    <img class="img-width" v-lazy="locationBaseUtl + 'fs01/imgs/nautilus/nautilus-07.jpg'"/>
    <img class="img-width last-img" v-lazy="locationBaseUtl + 'fs01/imgs/nautilus/nautilus-08.jpg'"/>
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
      $(document).attr('title','全新林肯航海家NAUTILUS');
    },
    beforeMount() {
      $(document).attr('title','全新林肯航海家NAUTILUS');
    },
  

    mounted() {
    
      // return this.$nextTick(() => this.init());
    }
  };

</script>

<style lang="sass" scoped>
  .nautilus-index {
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
