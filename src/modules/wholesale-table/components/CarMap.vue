<template>
  <!-- 销售车型 -->
  <div class="car-type">
    <div v-for="(item,index) in cars" :key="index">
      <div>
        <img src="../images/car.png" alt>
      </div>
      <div>{{item.name}}</div>
    </div>

    <div>
      <div>达成率</div>
      <div class="pass" @click="tiggle">
        <img v-if="persent" src="../images/open.png">
        <img v-else src="../images/close.png">
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    cars: Array
  },
  data() {
    return {
      persent: false
    };
  },
  methods: {
    tiggle() {
      this.persent = !this.persent;
    }
  },
  mounted() {
    console.log(this.cars);
  }
};
</script>
<style lang="sass" scope>
    .car-type{
    display: flex;
    text-align: center;
    margin: 15px 0 10px 65px;
        img{
            width:50px;
            height:25px;
        }
        .pass{
            img{
             width:24px;
            height:12px;
            }
          
        }
    }

    </style>
