<template>
    <div class="listcar">

        <div class="list"  v-for="(item,i) in datas" :key="i"  @click="addform(item)">
       
          <div class="name clearfix">
            <span class="left">{{item.lastName }}{{item.sex=='0'?'   先生':'   女士'}}</span>
            <span :class="item.driveType=='1'?'right registershop':'right registerhome'">{{item.driveType=='1'?'预约入店试驾':'预约上门试驾'}}</span>
          </div>
          <div class="phone">
            <span>联系电话：{{item.appointmentPhone}}</span>
          </div>
          <div class="drivertime">
            <span>试驾时间：{{item.appointmentTime}}</span>
          </div>
          
        </div>
        
    </div>
</template>
<script>
export default {
  name: "prop-event",
  data() {
    return {
      data: []
    };
  },
  props: {
    datas: {
      type: Array,
      required: true
    }
  },
  methods: {
    addform(item) {
      //给父组件传参
      // debugger
      this.$emit("addform", item);
    }
  },
  mounted() {
    // this;
    // debugger;
    // this.data = this._props.datas.list;
  }
};
</script>
<style lang="sass" scoped>
  .right{
      float:right!important;
    }
     .left{
      float:left!important;
    }
    .clearfix{
      overflow: auto;
      zoom: 1;
    }
       .listcar{

       .list{
         background: #FFFFFF;
         padding:17px 23px;
         margin-bottom:10px;
         .name .left{
            font-family: PingFangSC-Medium;
            font-size:18px;
         }
         .registershop{
           background: #B45F1A;
           padding:2px 5px;
           color:#fff;
               font-size: 12px;
         }
         .registerhome{
           background: #1A68B4;
           padding:2px 5px;
           color:#fff;
           font-size: 12px;
         }
         .phone{
           margin:12px 0;
         }
       }
      //  .list:nth-last(1){
      //    margin-bottom:0px;
      //  }
     }
</style>>



