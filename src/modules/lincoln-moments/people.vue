<template>
  <div>
    <img src="https://lincoln-mp-dev.yonyouauto.com/fs01/material/lincoln-team.jpg" style="width:100%"/>
    <desc-tion v-bind:desc='people'></desc-tion>
    <div class="top-hr"></div>
    <desc-tion v-bind:desc='receptionist'></desc-tion>
    <desc-tion v-bind:desc='commissioner'></desc-tion>
    <desc-tion v-bind:desc='counselor'></desc-tion>
    <desc-tion v-bind:desc='connoisseurer'></desc-tion>
    <desc-tion v-bind:desc='serviceDivision'></desc-tion>
    <div style="background-color:rgb(247, 247, 247)">
      <desc-tion v-bind:desc='lincoln'></desc-tion>
    </div>
  </div>
</template>

<script>
import descTion from "./components/desction.vue"
  export default {
    name: "index",
    components: {
      descTion
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
        people:{
          title:'人，是林肯最重要的标配',
          cons:[
            {desc:'在林肯，结识一支懂你的团队。'},
            {desc:'经林肯学院严苛培训的服务团队，由首席顾问师、鉴赏工程师、服务工程师、前门接待员与招待专员等人组成，打破一对一的服务，首创”多对一”的贴心豪华体验，各司其职，为你的需求，尽力找到最好的答案。'},
            {desc:'你的心声被悉心聆听，你的需求总能得到尊重与实现。处处礼遇，只因一切唯你。'}
          ]
        },
        receptionist:{
          title:'林肯前门接待员',
          cons:[
            {desc:'他是你对林肯的第一印象，为你打开每一次体验林肯的大门。他牢记你的名字，细心礼遇你的到来，为即将展开的林肯体验，拉开一个令人倍享尊重的序幕。'}
          ]
        },
        commissioner:{
          title:'林肯招待专员',
          cons:[
            {desc:'他将一切关于你的小细节，都认真对待。他穿梭在展厅间，或许很难发现他的存在，但他对所有细节了如指掌，'},
            {desc:'你喜欢的茶，偏好的温度……于无形中，让体验，得以流畅进行。'}
          ]
        },
        counselor:{
          title:'林肯首席顾问师',
          cons:[
            {desc:'他是你的林肯专属服务代表，他最懂得你的需求和个性偏好，为你提供贴心便利，钜细无遗的个性服务，建立与你长久而真挚的关系。'}
          ]
        },
        connoisseurer:{
          title:'林肯鉴赏工程师',
          cons:[
            {desc:'他是你选购林肯座驾最可信赖的专家，他精通座驾的方方面面，且没有任何销售压力，他将根据你的需求偏好，为你提供公正，有益的选车购车建议。'}
          ]
        },
        serviceDivision:{
          title:'林肯服务工程师',
          cons:[
            {desc:'他是你售后服务的专属工程师，了解你更了解你的林肯座驾。他将欢迎你的每一次保养与维修到访，并为你悉心讲解售后的流程和具体的细节。'}
          ]
        },
        lincoln:{
          title:'林肯之道',
          cons:[
            {desc:'以人性化体验，与你建立真挚而恒久的关系'}
          ]
        },
      }
    },
    directives: {
    },
    watch:{
      
    },
    methods: {
      init() {
        this.queryOrder();
      },
      
          
    },
    activated: function () {
      // if(this.$route.query.type=='preview'){
      //   this.init();// this.carOwnerDto.totalPrice = (this.$route.query.money || 81500);
      //   this.configId = this.$route.query.id;
      // }
      $(document).attr('title','林肯团队');
    },
    beforeMount() {
      $(document).attr('title','林肯团队');
    },
  

    mounted() {
    
      // return this.$nextTick(() => this.init());
    }
  };

</script>

<style lang="sass" scoped>
  .top-hr{
    margin-top: 20px;
    margin-bottom: 20px;
    border-top: 1px solid #eee;
  }
  
</style>
